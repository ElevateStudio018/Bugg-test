// A tiny blurred copy of every photo in public/photos, inlined in the page as a data URI, so a large photo at the top
// shows its colours at once while the sharp one loads. Written to lib/photo-placeholders.json; run by npm run photos.
import { readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const DIR = "public/photos";
const isCopy = (file) => /-\d+\.webp$/.test(file);

const placeholders = {};
for (const file of (await readdir(DIR)).filter((f) => f.endsWith(".webp") && !isCopy(f) && !f.startsWith("certifikat-")).sort()) {
  const buffer = await sharp(path.join(DIR, file)).resize({ width: 24 }).webp({ quality: 40 }).toBuffer();
  placeholders[`/photos/${file}`] = `data:image/webp;base64,${buffer.toString("base64")}`;
}
await writeFile("lib/photo-placeholders.json", JSON.stringify(placeholders, null, 2) + "\n");
console.log(`lib/photo-placeholders.json: ${Object.keys(placeholders).length} photos`);
