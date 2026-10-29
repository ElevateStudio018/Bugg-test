# Hemsidan på Inleed

Hemsidan byggs med Next.js och kan därför inte laddas upp som den ligger i GitHub. Den byggs först till vanliga
HTML-, CSS- och JavaScript-filer, och de filerna är det som laddas upp i `public_html`. Utvecklingen fortsätter som
vanligt i GitHub, och förhandsvisningen på GitHub Pages finns kvar.

## Hämta en ny zip-fil

- **Från GitHub:** varje push till grenen bygger en ny version. Öppna fliken **Actions** → **Build for Inleed** → den
  senaste körningen, och ladda ner **inleed-hemsida** under **Artifacts**. Filen är redan en zip med rätt innehåll.
- **På en dator med projektet:** `npm ci` och sedan `npm run build:inleed`. Det ger mappen `INLEED-UPLOAD/` och
  `inleed-hemsida.zip`.

Zip-filen innehåller `index.html` och de andra filerna direkt i roten, utan någon mapp runt sig. Där finns också en
`.htaccess` med inställningarna för Apache, som en vanlig fil att ladda upp (källan ligger i `deploy/inleed/`).

## Ladda upp med DirectAdmin

1. Logga in i DirectAdmin hos Inleed.
2. Öppna **File Manager** (Filhanteraren) → `domains` → `markmontagebeab.se` → `public_html`.
3. Om det redan finns en hemsida där: markera allt, välj **Compress** och spara zip-filen som säkerhetskopia. Ta sedan
   bort de gamla filerna, men inte säkerhetskopian.
4. Välj **Upload files**, välj `inleed-hemsida.zip` och vänta tills uppladdningen är klar.
5. Markera zip-filen och välj **Extract**, till `public_html`. Kontrollera att `index.html`, `.htaccess`, `_next`,
   `photos` och de andra filerna nu ligger direkt i `public_html`, inte i en undermapp.
6. Ta bort `inleed-hemsida.zip` från `public_html`.

## Testa före DNS-ändringen

DNS, domänregistreringen och mejlen ändras inte av det här.

- **Website Preview:** finns menyn **Extra Features** → **Website Preview** i DirectAdmin, visar den sidan innan
  domänen pekar på Inleed. Det är det enklaste sättet, och det fungerar från mobilen.
- **Hosts-filen på en dator:** lägg till raden `<serverns IP-adress> www.markmontagebeab.se markmontagebeab.se` i
  hosts-filen. På Mac ligger den i `/etc/hosts` och på Windows i `C:\Windows\System32\drivers\etc\hosts`. IP-adressen
  står i DirectAdmin eller i välkomstmejlet från Inleed. Öppna sedan `https://www.markmontagebeab.se` och ta bort
  raden när du är klar. Visar webbläsaren en varning om certifikatet, är SSL inte aktiverat för domänen ännu (se
  nedan).
- **Fråga Inleeds support** om tillfällig adress om ingen av metoderna fungerar. Den gamla adressen
  `http://IP/~användarnamn/` fungerar inte, eftersom sidan använder sökvägar från domänens rot.

Testa minst startsidan, en tjänstesida, Projekt, Om oss, Certifikat (och PDF-länkarna), en sida som inte finns (ska
visa 404-sidan) och offertformuläret.

## Efter DNS-ändringen

- **SSL:** DirectAdmin → **SSL Certificates** → Let's Encrypt för `markmontagebeab.se` och `www.markmontagebeab.se`,
  om Inleed inte redan har ordnat det.
- **En adress:** `.htaccess` skickar `http://` och `markmontagebeab.se` vidare till `https://www.markmontagebeab.se`,
  samma adress som sitemap och canonical-länkar. Omdirigeringen gäller bara den riktiga domänen, så testadresser
  påverkas inte.
- **Google:** lägg till `https://www.markmontagebeab.se/sitemap.xml` i Google Search Console.

## Vad som fungerar utan backend

| Del | Status på Inleed |
| --- | --- |
| Alla sidor, bilder, typsnitt, PDF:er och 404-sidan | Fungerar direkt. |
| Offertformuläret och `/forslag/` | Skickas via FormSubmit till elevate.studio018@gmail.com tills Supabase är inkopplat. Första gången kan FormSubmit skicka ett aktiveringsmejl dit, och du trycker **Activate**. |
| Adminpanelen (`/admin/`) | Laddas, men visar ”inte inkopplad” tills Supabase är inkopplat (`SETUP.md`). |
| Publicera i adminpanelen | Bygger om GitHub Pages, men inte Inleed. Tills vidare laddas en ny zip upp för hand. En automatisk uppladdning från GitHub till Inleed via FTP kan läggas till senare, med FTP-uppgifterna som GitHub-secrets (aldrig i chatten). |

När Supabase kopplas in för Inleed behöver även de här inställningarna den nya adressen: Auth → Site URL och Redirect
URLs (`https://www.markmontagebeab.se/admin/**`), och funktionernas `SITE_URL`, `ADMIN_URL` och `ALLOWED_ORIGINS`
(se `supabase/functions/.env.example`).
