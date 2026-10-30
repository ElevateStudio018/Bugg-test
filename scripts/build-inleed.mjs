// Builds the site for Inleed: a static export at the site's own domain (no /Bugg-test base path), with the Apache
// settings from deploy/inleed. Leaves the files for public_html in INLEED-UPLOAD/ and the same files in
// inleed-hemsida.zip, without the folder around them, so the zip can be unpacked straight into public_html.
// Run: npm run build:inleed
import { execFileSync } from "node:child_process";
import { cp, rm, stat } from "node:fs/promises";

const OUT = "INLEED-UPLOAD";
const ZIP = "inleed-hemsida.zip";

execFileSync("npm", ["run", "build"], { stdio: "inherit", env: { ...process.env, STATIC_EXPORT: "true", GITHUB_PAGES: "" } });

await rm(OUT, { recursive: true, force: true });
await rm(ZIP, { force: true });
await cp("out", OUT, { recursive: true });
await cp("deploy/inleed/.htaccess", `${OUT}/.htaccess`);
await cp("deploy/inleed/_next-static.htaccess", `${OUT}/_next/static/.htaccess`);

// The export must stand on its own at the domain's root: a front page, a 404 page and no trace of the preview's path.
for (const file of ["index.html", "404.html"]) await stat(`${OUT}/${file}`);
let leftovers = "";
try {
  leftovers = execFileSync("grep", ["-rl", "/Bugg-test/", OUT], { encoding: "utf8" }).trim();
} catch {
  // grep found nothing.
}
if (leftovers) throw new Error(`Paths with /Bugg-test/ left in:\n${leftovers}`);

execFileSync("zip", ["-r", "-X", "-q", `../${ZIP}`, "."], { cwd: OUT, stdio: "inherit" });
console.log(`${OUT}/ and ${ZIP} are ready (${Math.round((await stat(ZIP)).size / 1024 / 1024)} MB).`);
