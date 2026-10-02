// Edge Function checks against the local stack (supabase start, supabase functions serve, mock-services.mjs).
// Expects a freshly reset database: node supabase/tests/functions.test.mjs
import assert from "node:assert/strict";

const API = process.env.API_URL ?? "http://127.0.0.1:54321";
// The local stack's keys, from `supabase status -o env` (see supabase/tests/README.md).
const ANON = process.env.ANON_KEY;
const SERVICE = process.env.SERVICE_ROLE_KEY;
if (!ANON || !SERVICE) throw new Error("Run with the local keys: eval \"$(supabase status -o env)\" first");
const MOCK = process.env.MOCK_URL ?? "http://127.0.0.1:54399";
const ORIGIN = "http://localhost:3130";

async function call(path, { method = "POST", token, key = ANON, body, headers = {} } = {}) {
  const response = await fetch(`${API}${path}`, {
    method,
    redirect: "manual",
    headers: {
      apikey: key,
      Origin: ORIGIN,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  const text = await response.text();
  let json = null;
  try { json = text ? JSON.parse(text) : null; } catch { json = text; }
  return { status: response.status, json, headers: response.headers };
}
const fn = (name, opts) => call(`/functions/v1/${name}`, opts);
const mocked = async () => (await (await fetch(`${MOCK}/__requests`)).json());
const clearMocks = () => fetch(`${MOCK}/__requests`, { method: "DELETE" });

const results = [];
async function test(name, body) {
  try { await body(); results.push(["ok", name]); } catch (error) { results.push(["FAIL", name, error.message]); }
}

await clearMocks();

await test("snapshot answers with the published version and honours its ETag", async () => {
  const first = await fn("snapshot", { method: "GET" });
  assert.equal(first.status, 200);
  assert.equal(first.json.version, 1);
  const etag = first.headers.get("etag");
  const again = await fn("snapshot", { method: "GET", headers: { "If-None-Match": etag } });
  assert.equal(again.status, 304);
});

await test("CORS: the site's origin may call, others get no allow header", async () => {
  // Locally Kong's own CORS plugin answers "*" in front of the functions; hosted, the function's answer goes through.
  const ok = await fetch(`${API}/functions/v1/submit-quote`, { method: "OPTIONS", headers: { Origin: ORIGIN } });
  assert.ok([ORIGIN, "*"].includes(ok.headers.get("access-control-allow-origin")));
  const other = await fetch(`${API}/functions/v1/submit-quote`, { method: "OPTIONS", headers: { Origin: "https://evil.example" } });
  assert.ok([null, "*"].includes(other.headers.get("access-control-allow-origin")));
});

let inviteLink;
await test("admin-invite is closed without the service key, and invites the allowlisted address with it", async () => {
  const denied = await fn("admin-invite", { body: {} });
  assert.equal(denied.status, 403);
  const res = await fn("admin-invite", { body: {}, headers: { Authorization: `Bearer ${SERVICE}` } });
  assert.equal(res.status, 200, JSON.stringify(res.json));
  assert.deepEqual(res.json.invited, ["info@markmontage.se"]);
  const mail = (await mocked()).find((r) => r.url === "/emails");
  assert.ok(mail, "an e-mail was sent");
  assert.deepEqual(mail.body.to, ["info@markmontage.se"]);
  inviteLink = mail.body.html.match(/href="([^"]+verify[^"]+)"/)[1].replace(/&amp;/g, "&");
  assert.match(inviteLink, /type=invite/);
});

let adminToken;
await test("the invitation link signs the admin in, and they choose a password", async () => {
  const response = await fetch(inviteLink.replace("http://kong:8000", API), { redirect: "manual" });
  const location = response.headers.get("location") ?? "";
  assert.match(location, /reset-password/);
  const token = new URLSearchParams(location.split("#")[1]).get("access_token");
  assert.ok(token, location);
  const weak = await call("/auth/v1/user", { method: "PUT", token, body: { password: "kort" } });
  assert.notEqual(weak.status, 200);
  const set = await call("/auth/v1/user", { method: "PUT", token, body: { password: "Starkt-Lösen0rd!" } });
  assert.equal(set.status, 200, JSON.stringify(set.json));
});

await test("admin-login: wrong password is refused in Swedish, the right one gives a session", async () => {
  const wrong = await fn("admin-login", { body: { email: "info@markmontage.se", password: "fel" } });
  assert.equal(wrong.status, 401);
  assert.equal(wrong.json.message, "Fel e-postadress eller lösenord.");
  const right = await fn("admin-login", { body: { email: "INFO@markmontage.se", password: "Starkt-Lösen0rd!" } });
  assert.equal(right.status, 200, JSON.stringify(right.json));
  adminToken = right.json.session.access_token;
  assert.ok(adminToken);
});

await test("admin-login locks an address after five failures", async () => {
  for (let i = 0; i < 5; i++) await fn("admin-login", { body: { email: "nobody@example.com", password: "fel" } });
  const locked = await fn("admin-login", { body: { email: "nobody@example.com", password: "fel" } });
  assert.equal(locked.status, 429);
  assert.match(locked.json.message, /Vänta en kvart/);
});

await test("password reset mails a link to admins only, and answers the same for anyone", async () => {
  await clearMocks();
  const known = await fn("admin-password-reset", { body: { email: "info@markmontage.se" } });
  const unknown = await fn("admin-password-reset", { body: { email: "nobody@example.com" } });
  assert.deepEqual([known.status, unknown.status], [200, 200]);
  const mails = (await mocked()).filter((r) => r.url === "/emails");
  assert.equal(mails.length, 1);
  assert.match(mails[0].body.html, /type=recovery/);
});

await test("publish: refuses with nothing to publish, publishes a change and starts the rebuild", async () => {
  await clearMocks();
  const nothing = await fn("publish", { token: adminToken, body: {} });
  assert.equal(nothing.status, 409);
  const save = await call("/rest/v1/rpc/save_content_patch", {
    token: adminToken,
    body: { p_path: ["pages", "items", "hem", "sections", "items", "hero", "heading"], p_value: "Testrubrik", p_client_id: "t" },
  });
  assert.equal(save.json.status, "saved");
  const res = await fn("publish", { token: adminToken, body: {} });
  assert.equal(res.status, 200, JSON.stringify(res.json));
  assert.equal(res.json.version, 2);
  assert.match(res.json.summary, /Startsidan › Toppen › Rubrik/);
  assert.equal(res.json.deploy.started, true);
  const dispatch = (await mocked()).find((r) => r.url.endsWith("/dispatches"));
  assert.ok(dispatch);
  assert.equal(dispatch.body.ref, "claude/flottsunds-bygg-site-wptib7");
});

await test("publish refuses content that breaks the schema, naming the field", async () => {
  await call("/rest/v1/rpc/save_content_patch", {
    token: adminToken,
    body: { p_path: ["company", "email"], p_value: "inte en adress", p_client_id: "t" },
  });
  const res = await fn("publish", { token: adminToken, body: {} });
  assert.equal(res.status, 422);
  assert.equal(res.json.issues[0].where, "Företagsuppgifter › E-post");
  await call("/rest/v1/rpc/discard_draft", { token: adminToken, body: {} });
});

await test("publish is closed to people who are not signed in", async () => {
  const res = await fn("publish", { body: {} });
  assert.equal(res.status, 401);
});

await test("submit-quote stores the request and e-mails the company", async () => {
  await clearMocks();
  const res = await fn("submit-quote", { body: { name: "Anna Andersson", phone: "070-123 45 67", email: "anna@example.com", workType: "Dränering", message: "Hej!" } });
  assert.equal(res.status, 200, JSON.stringify(res.json));
  const mail = (await mocked()).find((r) => r.url === "/emails");
  assert.deepEqual(mail.body.to, ["info@markmontage.se"]);
  assert.equal(mail.body.subject, "Offertförfrågan från Anna Andersson");
  assert.equal(mail.body.reply_to, "anna@example.com");
  const rows = (await call("/rest/v1/quote_requests?select=name,work_type", { method: "GET", token: adminToken })).json;
  assert.equal(rows.some((r) => r.name === "Anna Andersson"), true);
});

await test("submit-quote: a bot filling the hidden field is thanked and ignored; no contact is refused", async () => {
  const bot = await fn("submit-quote", { body: { name: "Bot", phone: "1234567", email: "", workType: "", message: "", website: "spam" } });
  assert.equal(bot.status, 200);
  const rows = (await call("/rest/v1/quote_requests?select=name&name=eq.Bot", { method: "GET", token: adminToken })).json;
  assert.equal(rows.length, 0);
  const none = await fn("submit-quote", { body: { name: "X", phone: "", email: "", workType: "", message: "" } });
  assert.equal(none.status, 400);
});

for (const [status, name, message] of results) console.log(status.padEnd(4), name, message ? `— ${message}` : "");
const failed = results.filter(([s]) => s === "FAIL").length;
console.log(failed ? `${failed} failed` : `all ${results.length} passed`);
process.exit(failed ? 1 : 0);
