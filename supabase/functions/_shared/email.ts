// E-mail for the site. Sends through Gmail (SMTP) when GMAIL_USER and GMAIL_APP_PASSWORD are set, otherwise through
// Resend (resend.com). RESEND_API_URL can point elsewhere for tests. All mail is HTML with a plain-text twin, in a
// simple layout in the site's colours.
import { env, optionalEnv } from "./env.ts";

export interface Mail {
  to: string | string[];
  subject: string;
  /** Paragraphs and other blocks, see block helpers below. */
  blocks: string[];
  replyTo?: string;
}

const escapeHtml = (text: string) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

export const block = {
  heading: (text: string) => `<h1 style="margin:0 0 16px;font-size:24px;line-height:1.2;color:#222222">${escapeHtml(text)}</h1>`,
  text: (text: string) => `<p style="margin:0 0 14px;font-size:16px;line-height:1.5;color:#333333">${escapeHtml(text)}</p>`,
  rows: (rows: [string, string][]) =>
    `<table role="presentation" style="width:100%;border-collapse:collapse;margin:0 0 18px">${rows
      .map(
        ([label, value]) =>
          `<tr><td style="padding:8px 12px 8px 0;border-bottom:1px solid #e3e1d8;font-size:14px;color:#63625C;white-space:nowrap;vertical-align:top">${escapeHtml(label)}</td><td style="padding:8px 0;border-bottom:1px solid #e3e1d8;font-size:15px;color:#222222">${escapeHtml(value).replace(/\n/g, "<br>")}</td></tr>`
      )
      .join("")}</table>`,
  button: (label: string, href: string, tone: "primary" | "danger" = "primary") =>
    `<p style="margin:8px 0 18px"><a href="${escapeHtml(href)}" style="display:inline-block;padding:14px 28px;border-radius:999px;background:${
      tone === "danger" ? "#8B1D1D" : "#1C2817"
    };color:#ffffff;font-weight:700;font-size:15px;text-decoration:none;letter-spacing:0.03em">${escapeHtml(label)}</a></p>`,
  small: (text: string) => `<p style="margin:18px 0 0;font-size:13px;line-height:1.5;color:#63625C">${escapeHtml(text)}</p>`,
};

function html(mail: Mail): string {
  return `<!doctype html><html lang="sv"><body style="margin:0;background:#E3E1D8;font-family:Figtree,Arial,sans-serif">
<table role="presentation" style="width:100%;border-collapse:collapse"><tr><td style="padding:24px 12px">
<table role="presentation" style="max-width:560px;margin:0 auto;border-collapse:collapse;background:#F2F0E9">
<tr><td style="background:#1C2817;padding:18px 28px;color:#ffffff;font-size:15px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase">Markmontage · Adminpanel</td></tr>
<tr><td style="padding:28px">${mail.blocks.join("")}</td></tr>
</table></td></tr></table></body></html>`;
}

function plain(mail: Mail): string {
  return mail.blocks
    .map((b) =>
      b
        .replace(/<a [^>]*href="([^"]+)"[^>]*>([^<]*)<\/a>/g, "$2: $1")
        .replace(/<\/(p|h1|tr)>/g, "\n")
        .replace(/<\/td><td[^>]*>/g, ": ")
        .replace(/<[^>]+>/g, "")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
    )
    .join("\n")
    .trim();
}

const recipients = (to: string | string[]) => (Array.isArray(to) ? to : [to]);

// ---- Gmail / SMTP ---------------------------------------------------------

function base64Bytes(bytes: Uint8Array): string {
  let binary = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  return btoa(binary);
}
const base64Text = (text: string) => base64Bytes(new TextEncoder().encode(text));
const base64Wrapped = (text: string) => base64Text(text).replace(/(.{76})/g, "$1\r\n");
// RFC 2047 for a Subject that may hold Swedish letters; plain ASCII is left as-is.
const encodeSubject = (subject: string) => (/^[\x20-\x7e]*$/.test(subject) ? subject : `=?UTF-8?B?${base64Text(subject)}?=`);

/** Sends one e-mail through Gmail over SMTPS (port 465). Returns false on any problem; never throws. */
async function sendViaGmail(mail: Mail, user: string, password: string, from: string): Promise<boolean> {
  const to = recipients(mail.to);
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  let conn: Deno.TlsConn | undefined;

  const withTimeout = <T>(promise: Promise<T>, ms: number) =>
    Promise.race([promise, new Promise<T>((_, reject) => setTimeout(() => reject(new Error("SMTP timeout")), ms))]);

  const readReply = async (): Promise<{ code: number; text: string }> => {
    let out = "";
    const buf = new Uint8Array(4096);
    while (true) {
      const n = await withTimeout(conn!.read(buf), 20000);
      if (n === null) break;
      out += decoder.decode(buf.subarray(0, n));
      const lines = out.split("\r\n").filter((l) => l.length > 0);
      const last = lines[lines.length - 1];
      if (last && /^\d{3} /.test(last)) return { code: parseInt(last.slice(0, 3), 10), text: out };
    }
    return { code: 0, text: out };
  };
  const writeAll = async (text: string) => {
    const bytes = encoder.encode(text);
    let offset = 0;
    while (offset < bytes.length) offset += await withTimeout(conn!.write(bytes.subarray(offset)), 20000);
  };
  const cmd = async (line: string, ok: number[]) => {
    await writeAll(line + "\r\n");
    const reply = await readReply();
    if (!ok.includes(reply.code)) throw new Error(`SMTP "${line.split(" ")[0]}" → ${reply.text.trim().slice(0, 200)}`);
    return reply;
  };

  const boundary = `mm_${crypto.randomUUID()}`;
  const message =
    [
      `From: ${from}`,
      `To: ${to.join(", ")}`,
      ...(mail.replyTo ? [`Reply-To: ${mail.replyTo}`] : []),
      `Subject: ${encodeSubject(mail.subject)}`,
      `Date: ${new Date().toUTCString()}`,
      `Message-ID: <${crypto.randomUUID()}@markmontage.se>`,
      `MIME-Version: 1.0`,
      `Content-Type: multipart/alternative; boundary="${boundary}"`,
      "",
      `--${boundary}`,
      `Content-Type: text/plain; charset=UTF-8`,
      `Content-Transfer-Encoding: base64`,
      "",
      base64Wrapped(plain(mail)),
      `--${boundary}`,
      `Content-Type: text/html; charset=UTF-8`,
      `Content-Transfer-Encoding: base64`,
      "",
      base64Wrapped(html(mail)),
      `--${boundary}--`,
      "",
    ].join("\r\n");

  try {
    conn = await withTimeout(Deno.connectTls({ hostname: "smtp.gmail.com", port: 465 }), 20000);
    const greeting = await readReply();
    if (greeting.code !== 220) throw new Error(`SMTP greeting → ${greeting.text.trim().slice(0, 200)}`);
    await cmd("EHLO markmontage.se", [250]);
    await cmd("AUTH LOGIN", [334]);
    await cmd(btoa(user), [334]);
    await cmd(btoa(password), [235]);
    await cmd(`MAIL FROM:<${user}>`, [250]);
    for (const rcpt of to) await cmd(`RCPT TO:<${rcpt}>`, [250, 251]);
    await cmd("DATA", [354]);
    await writeAll(message + "\r\n.\r\n");
    const done = await readReply();
    if (done.code !== 250) throw new Error(`SMTP DATA → ${done.text.trim().slice(0, 200)}`);
    try {
      await cmd("QUIT", [221]);
    } catch {
      // Closing is best-effort once the mail is accepted.
    }
    return true;
  } catch (error) {
    console.error("Could not send via Gmail:", error instanceof Error ? error.message : error, "—", mail.subject);
    return false;
  } finally {
    try {
      conn?.close();
    } catch {
      // Already closed.
    }
  }
}

// ---- Resend ---------------------------------------------------------------

async function sendViaResend(mail: Mail, from: string): Promise<boolean> {
  const apiKey = optionalEnv("RESEND_API_KEY");
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set; e-mail not sent:", mail.subject);
    return false;
  }
  try {
    const response = await fetch(`${env("RESEND_API_URL", "https://api.resend.com")}/emails`, {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: recipients(mail.to),
        subject: mail.subject,
        html: html(mail),
        text: plain(mail),
        ...(mail.replyTo ? { reply_to: mail.replyTo } : {}),
      }),
    });
    if (!response.ok) {
      console.error("Resend refused the e-mail:", response.status, await response.text());
      return false;
    }
    return true;
  } catch (error) {
    console.error("Could not reach Resend:", error);
    return false;
  }
}

/** Sends one e-mail; returns false (and logs) instead of throwing, so a mail problem never undoes the action itself. */
export async function sendMail(mail: Mail): Promise<boolean> {
  const gmailUser = optionalEnv("GMAIL_USER");
  const gmailPassword = optionalEnv("GMAIL_APP_PASSWORD");
  if (gmailUser && gmailPassword) {
    return await sendViaGmail(mail, gmailUser, gmailPassword, env("EMAIL_FROM", `Markmontage <${gmailUser}>`));
  }
  return await sendViaResend(mail, env("EMAIL_FROM", "Markmontage <onboarding@resend.dev>"));
}
