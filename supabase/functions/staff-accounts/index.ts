// The staff's accounts for their page on the site (/personal), managed by the admin: list them, add one with a
// password the admin chooses (and tells the employee), or remove one. Only for a signed-in admin.
import { z } from "zod";
import { handle, json, readJson, UserError } from "../_shared/http.ts";
import { audit, requireAdmin, serviceClient } from "../_shared/supabase.ts";

const requestSchema = z.discriminatedUnion("action", [
  z.object({ action: z.literal("list") }),
  z.object({
    action: z.literal("create"),
    name: z.string().trim().min(1).max(100),
    email: z.string().trim().toLowerCase().email().max(200),
    password: z.string().min(12).max(200),
  }),
  z.object({ action: z.literal("remove"), id: z.string().uuid() }),
]);

Deno.serve(
  handle(async (request) => {
    if (request.method !== "POST") throw new UserError(405, "method", "Fel metod.");
    const { user } = await requireAdmin(request);
    const parsed = requestSchema.safeParse(await readJson(request, 5_000));
    if (!parsed.success) throw new UserError(400, "invalid", "Fyll i namn, e-postadress och ett lösenord på minst 12 tecken.");
    const body = parsed.data;
    const service = serviceClient();

    if (body.action === "list") {
      const { data, error } = await service.from("profiles").select("id, email, full_name, created_at").eq("role", "staff").order("full_name");
      if (error) throw error;
      return json(request, { staff: data ?? [] });
    }

    if (body.action === "create") {
      const { data, error } = await service.auth.admin.createUser({
        email: body.email,
        password: body.password,
        email_confirm: true,
        user_metadata: { full_name: body.name },
      });
      if (error || !data.user) {
        const message = error?.message ?? "";
        if (/already/i.test(message)) throw new UserError(409, "exists", "Det finns redan ett konto med den e-postadressen.");
        if (/password/i.test(message)) {
          throw new UserError(400, "weak_password", "Lösenordet behöver minst 12 tecken med stora och små bokstäver, siffror och tecken.");
        }
        throw error ?? new Error("No user");
      }
      // The new account starts without a role (or as admin, for an address on the admin list); an admin stays admin.
      const { error: roleError } = await service
        .from("profiles")
        .update({ role: "staff", full_name: body.name })
        .eq("id", data.user.id)
        .neq("role", "admin");
      if (roleError) throw roleError;
      await audit("staff.create", body.email, null, { name: body.name }, user.id);
      return json(request, { id: data.user.id });
    }

    // Remove: the account goes; if it cannot be deleted it is shut instead, so it can never sign in again.
    const { data: profile } = await service.from("profiles").select("email, role").eq("id", body.id).maybeSingle();
    if (!profile || profile.role !== "staff") throw new UserError(404, "not_found", "Kontot finns inte.");
    const { error: deleteError } = await service.auth.admin.deleteUser(body.id);
    if (deleteError) {
      await service.auth.admin.updateUserById(body.id, { ban_duration: "876000h" });
      await service.from("profiles").update({ role: "none" }).eq("id", body.id);
    }
    await audit("staff.remove", profile.email, null, null, user.id);
    return json(request, { removed: true });
  }),
);
