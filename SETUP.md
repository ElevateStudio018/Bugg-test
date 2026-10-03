# Koppla in adminpanelen

Hemsidan och adminpanelen är färdigbyggda. Kvar är att koppla in Supabase, som är databasen bakom adminpanelen. Del 1
är det du gör, och del 2 är instruktioner för Claude.

**Under testperioden går alla mejl till elevate.studio018@gmail.com:** offertförfrågningar, medarbetarnas förslag
och inbjudan till adminpanelen. Du är admin. Markmontage får ingenting förrän du säger till (se "Vid lansering"
längst ner).

## Del 1 – det här gör du

Det tar ungefär 20 minuter. Enklast är att göra det på en dator. Klistra aldrig in nycklar eller lösenord i chatten.
De ska bara in på de ställen som står nedan.

### Steg 1 – Skapa ett Supabase-projekt

1. Gå till [supabase.com](https://supabase.com) och logga in. "Continue with GitHub" fungerar.
2. Tryck **New project**.
3. Namn: `markmontage`. Region: Stockholm, eller annars närmaste i Europa.
4. Databaslösenord: tryck **Generate a password** och spara lösenordet i din lösenordshanterare. Det behövs inte i
   chatten.
5. Planen **Free** räcker för att testa. Tryck **Create new project** och vänta ett par minuter.

### Steg 2 – Koppla Supabase till Claude

1. Öppna [claude.ai/customize/connectors](https://claude.ai/customize/connectors).
2. Leta upp **Supabase** och tryck **Connect**. Logga in och godkänn.

### Steg 3 – Skapa tre nycklar och lägg in dem i Supabase

Nycklarna läggs in i Supabase under ditt projekt → **Edge Functions** → **Secrets** → **Add new secret**. Namnet ska
skrivas exakt som nedan.

| Namn | Var du skapar nyckeln |
| --- | --- |
| `ANTHROPIC_API_KEY` | [console.anthropic.com](https://console.anthropic.com) → **API keys** → **Create key**. AI-assistenten behöver det. Lägg också in ett betalkort och några dollar under **Billing**. |
| `RESEND_API_KEY` | [resend.com](https://resend.com): registrera dig med **elevate.studio018@gmail.com** → **API Keys** → **Create API key**. Med den adressen behövs ingen egen domän under testperioden. |
| `GITHUB_DISPATCH_TOKEN` | GitHub → din profilbild → **Settings** → **Developer settings** → **Personal access tokens** → **Fine-grained tokens** → **Generate new token**. Resource owner: `ElevateStudio018`. Repository access: **Only select repositories** → `Bugg-test`. Permissions → Repository → **Actions: Read and write**. Den gör att hemsidan byggs om när du publicerar. |

### Steg 4 – Starta en ny session

Claude läser in kopplingar (connectors) när en session startar, så Supabase syns först i en ny session.

1. Starta en ny Claude Code-session på repot **ElevateStudio018/Bugg-test**, grenen
   **claude/flottsunds-bygg-site-wptib7**.
2. Skriv: **Koppla in Supabase enligt SETUP.md**

Claude lägger in databasen och funktionerna, ställer in inloggningen och kopplar ihop hemsidan med adminpanelen.
Claude säger till om något behöver göras på ditt håll.

### Steg 5 – Logga in

1. Du får ett mejl till elevate.studio018@gmail.com: "Välkommen till hemsidans adminpanel". Tryck **Välj lösenord**.
2. Logga in på [elevatestudio018.github.io/Bugg-test/admin](https://elevatestudio018.github.io/Bugg-test/admin/).

### Vid lansering (senare, när du säger till)

- Markmontage läggs till som admin och får sin inbjudan.
- Secret `QUOTE_NOTIFY_EMAIL` = `info@markmontage.se`, så att offertförfrågningarna går till Markmontage.
  Förslagen fortsätter till Elevate.
- Egen domän: verifiera domänen i Resend och sätt `EMAIL_FROM`, `SITE_URL`, `ADMIN_URL` och `ALLOWED_ORIGINS`
  (se `supabase/functions/.env.example`).
- Bestäm priserna på credit-paketen och vilket telefonnummer som stämmer (031-385 41 41 eller 031-385 40 50).

## Del 2 – for Claude: installing the backend

Everything is in this repository. The site is a Next.js static export on GitHub Pages (basePath `/Bugg-test`), built by
`.github/workflows/deploy-pages.yml`. Supabase holds the drafts, published versions, quote requests, staff suggestions,
images, credits and the AI conversations. `supabase/tests/README.md` describes the local test stack these steps were
verified on.

Ground rules: nothing may be e-mailed to info@markmontage.se, and the customer may not be made an admin or invited,
until the user says so. Never ask the user to paste a key, token or password into the chat.

1. **Project.** With the Supabase connector, find the user's project and note its ref, URL and the legacy `anon` key.
   Use the JWT `anon` key, which everything was tested with, not a publishable key.
2. **Database.** Apply every file in `supabase/migrations/` once, in filename order, using each file's name as the
   migration name. Check which migrations are already applied first. `20261003100000_preview_admin.sql` makes
   elevate.studio018@gmail.com the only admin address during the preview.
3. **Edge Functions.** Deploy every folder in `supabase/functions/` except `_shared`. Each function needs its own
   `index.ts`, the `_shared` files it imports (they import each other too) and the import map in
   `supabase/functions/deno.json`. Deploy every function with `verify_jwt = false`, as in `supabase/config.toml`; the
   functions check the caller themselves. `supabase/functions/_shared/site` is a copy of `lib/site`, kept identical by
   `node scripts/sync-shared.mjs`.
4. **Secrets.** The user adds `ANTHROPIC_API_KEY`, `RESEND_API_KEY` and `GITHUB_DISPATCH_TOKEN` (part 1, step 3). Every
   other setting has a default for the preview (`supabase/functions/_shared/env.ts`, `.env.example`).
   `IP_HASH_SALT` and `RESET_SIGNING_SECRET` fall back to values derived from the service role key, and quote requests
   go to `AGENCY_EMAIL` until `QUOTE_NOTIFY_EMAIL` is set. Confirm the three secrets exist by name only, never by value.
5. **Auth settings.** Change these through the connector or the Management API, or have the user change them in the
   dashboard. Site URL: `https://elevatestudio018.github.io/Bugg-test/admin/`. Redirect URLs:
   `https://elevatestudio018.github.io/Bugg-test/admin/**`. Sign-ups off. Minimum password length 12, requiring
   lower- and upper-case letters, digits and symbols, as in `supabase/config.toml`.
6. **Connect the site.** Set the GitHub repository variables `NEXT_PUBLIC_SUPABASE_URL` and
   `NEXT_PUBLIC_SUPABASE_ANON_KEY`. Use the GitHub API if this session may, otherwise the user does it under Settings →
   Secrets and variables → Actions → Variables. Then run the `deploy-pages.yml` workflow (workflow_dispatch) on
   `claude/flottsunds-bygg-site-wptib7` and check that it succeeds.
7. **Invite the admin.** `admin-invite` invites every allowlisted address without an account, and during the preview
   that is only elevate.studio018@gmail.com. It runs with the service role key, or once with a setup token. To use a
   token, make a random one, store its hash with
   `insert into public.settings (key, value) values ('setup_token_hash', to_jsonb(encode(sha256('<token>'::bytea), 'hex')))`
   and POST `{"token": "<token>"}` to `<project url>/functions/v1/admin-invite`. If this sandbox cannot reach
   `*.supabase.co`, send the POST from the database with `pg_net` (`net.http_post`).
8. **Check end to end with the user.** Log in, edit, publish (the site rebuilds), send a quote request and a suggestion
   on `/forslag/` (both e-mail Elevate), and ask the AI a question. Read the functions' logs through the connector when
   something fails.
