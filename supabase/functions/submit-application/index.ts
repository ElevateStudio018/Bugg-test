// Interest in working at the company (the form behind "Jobba hos oss"): checks what was sent, stores it for the admin
// (Intresseanmälningar) and e-mails the company, with the applicant as the address to reply to.
import { z } from "zod";
import { clientIp, handle, json, readJson, UserError } from "../_shared/http.ts";
import { serviceClient } from "../_shared/supabase.ts";
import { sha256 } from "../_shared/crypto.ts";
import { block, sendMail } from "../_shared/email.ts";
import { config } from "../_shared/env.ts";

const requestSchema = z
  .object({
    name: z.string().trim().min(1).max(100),
    phone: z.string().trim().max(40).default(""),
    email: z.union([z.literal(""), z.string().trim().toLowerCase().email().max(200)]).default(""),
    experience: z.string().trim().max(200).default(""),
    message: z.string().trim().min(3).max(3000),
    /** Left empty by people; filled in by bots that fill in every field. */
    website: z.string().max(500).optional(),
  })
  .refine((form) => form.phone !== "" || form.email !== "", { message: "contact" });

Deno.serve(
  handle(async (request) => {
    if (request.method !== "POST") throw new UserError(405, "method", "Fel metod.");
    const parsed = requestSchema.safeParse(await readJson(request, 20_000));
    if (!parsed.success) throw new UserError(400, "invalid", "Skriv ditt namn, telefon eller e-post och några rader om dig själv.");
    const form = parsed.data;
    // A bot: thank it and do nothing.
    if (form.website) return json(request, { ok: true });

    const service = serviceClient();
    const senderHash = await sha256(clientIp(request), config.secret("IP_HASH_SALT", "application"));
    const { data, error } = await service.rpc("insert_job_application", {
      p_name: form.name,
      p_phone: form.phone,
      p_email: form.email,
      p_experience: form.experience,
      p_message: form.message,
      p_sender_hash: senderHash,
    });
    if (error) throw error;
    if (data.status === "rate_limited") {
      throw new UserError(429, "rate_limited", "Du har skickat flera anmälningar på kort tid. Vänta en stund och försök igen.");
    }

    // The company's inbox gets it by e-mail; the admin sees it under Intresseanmälningar.
    await sendMail({
      to: config.applicationEmail(),
      replyTo: form.email || undefined,
      subject: `Intresseanmälan från ${form.name}`,
      blocks: [
        block.heading("Ny intresseanmälan – Jobba hos oss"),
        block.rows([
          ["Namn", form.name],
          ["Telefon", form.phone || "–"],
          ["E-post", form.email || "–"],
          ["Erfarenhet / vill jobba med", form.experience || "–"],
          ["Om sig själv", form.message],
        ]),
        block.button("Öppna i adminpanelen", `${config.adminUrl()}/intresseanmalningar/`),
      ],
    });
    return json(request, { ok: true });
  }),
);
