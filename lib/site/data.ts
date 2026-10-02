// The content the site is built from: content/snapshot.json, which scripts/fetch-snapshot.ts writes before every build
// (the published content from Supabase, or the original content while the site is not connected to one).
import snapshot from "@/content/snapshot.json";
import { siteDataSchema, type SiteData } from "./schema.ts";

let site: SiteData | undefined;

export function getSite(): SiteData {
  site ??= siteDataSchema.parse(snapshot);
  return site;
}
