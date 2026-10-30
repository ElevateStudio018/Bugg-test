import type { MetadataRoute } from "next";
import { getSite } from "@/lib/site/data.ts";
import { list } from "@/lib/site/collection.ts";
import { subpages } from "@/lib/site/pages.ts";

// How often each kind of page tends to change, and how much it matters, as hints for search engines.
const pageHints: Record<string, { changeFrequency: "monthly" | "yearly"; priority: number }> = {
  "om-oss": { changeFrequency: "yearly", priority: 0.8 },
  certifikat: { changeFrequency: "yearly", priority: 0.6 },
};

// The static exports serve every page as a folder, so their addresses end in a slash, as in the canonical links.
const slash = process.env.TRAILING_SLASH === "true" ? "/" : "";

export default function sitemap(): MetadataRoute.Sitemap {
  const site = getSite();
  const siteUrl = site.settings.siteUrl;

  const pages: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, changeFrequency: "monthly", priority: 1 },
    ...subpages(site).map((page) => ({
      url: `${siteUrl}/${page.slug}${slash}`,
      ...(pageHints[page.slug] ?? { changeFrequency: "monthly" as const, priority: 0.8 }),
    })),
  ];

  const services: MetadataRoute.Sitemap = list(site.services).map((service) => ({
    url: `${siteUrl}/tjanster/${service.slug}${slash}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...pages, ...services];
}
