// Stands in for Resend, GitHub and Anthropic in local tests: records every request (GET /__requests lists them,
// DELETE /__requests clears them) and answers like the real services. Run: node supabase/tests/mock-services.mjs
import http from "node:http";

const port = Number(process.env.MOCK_PORT ?? 54399);
let requests = [];
// Scripted answers for the AI, taken in order (POST /__ai with a JSON array to set them).
let aiAnswers = [];

http
  .createServer(async (req, res) => {
    let body = "";
    for await (const chunk of req) body += chunk;
    const parsed = body ? (() => { try { return JSON.parse(body); } catch { return body; } })() : null;
    const send = (status, payload, headers = { "Content-Type": "application/json" }) => {
      res.writeHead(status, headers);
      res.end(payload === undefined ? "" : typeof payload === "string" ? payload : JSON.stringify(payload));
    };

    if (req.url === "/__requests") {
      if (req.method === "DELETE") { requests = []; return send(204); }
      return send(200, requests);
    }
    if (req.url === "/__ai" && req.method === "POST") { aiAnswers = parsed; return send(204); }

    requests.push({ method: req.method, url: req.url, headers: req.headers, body: parsed, at: new Date().toISOString() });

    if (req.url === "/emails" && req.method === "POST") return send(200, { id: `mail-${requests.length}` });
    if (/\/actions\/workflows\/.+\/dispatches$/.test(req.url) && req.method === "POST") return send(204);
    if (req.url === "/v1/messages" && req.method === "POST") {
      const answer = aiAnswers.shift();
      if (!answer) return send(500, { type: "error", error: { type: "api_error", message: "No scripted answer" } });
      return send(200, answer);
    }
    send(404, { error: "not mocked", url: req.url });
  })
  .listen(port, "0.0.0.0", () => console.log(`mock services on ${port}`));
