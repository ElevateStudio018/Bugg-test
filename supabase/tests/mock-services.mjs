// Stands in for Resend and GitHub in local tests: records every request (GET /__requests lists them,
// DELETE /__requests clears them) and answers like the real services. Run: node supabase/tests/mock-services.mjs
import http from "node:http";

const port = Number(process.env.MOCK_PORT ?? 54399);
let requests = [];

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

    requests.push({ method: req.method, url: req.url, headers: req.headers, body: parsed, at: new Date().toISOString() });

    if (req.url === "/emails" && req.method === "POST") return send(200, { id: `mail-${requests.length}` });
    if (/\/actions\/workflows\/.+\/dispatches$/.test(req.url) && req.method === "POST") return send(204);
    send(404, { error: "not mocked", url: req.url });
  })
  .listen(port, "0.0.0.0", () => console.log(`mock services on ${port}`));
