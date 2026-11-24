// Shared helpers for search-engine and social-sharing metadata (Open Graph, Twitter cards, JSON-LD images).
// Imported by the root layout and the page templates so every page links to the same preview image.
import { list } from "./collection.ts";
import { homePage } from "./pages.ts";
import type { SiteData, SiteImage } from "./schema.ts";

/** The copy of an image closest to a link-preview size (about 1200px wide), falling back to the original. */
function previewVariant(image: SiteImage): string {
  const exact = image.variants.find((v) => v.width === 1200);
  if (exact) return exact.src;
  const underSized = [...image.variants].filter((v) => v.width <= 1600).sort((a, b) => b.width - a.width);
  return underSized[0]?.src ?? image.src;
}

/** The homepage hero, used as the preview image for links shared on social media. Falls back to the favicon. */
export function shareImagePath(site: SiteData): string {
  try {
    const hero = list(homePage(site).sections).find((s) => s.type === "hero" || s.type === "pageHero") as
      | { image?: SiteImage }
      | undefined;
    if (hero?.image) return previewVariant(hero.image);
  } catch {
    // No start page or no hero: fall through to the favicon.
  }
  return site.settings.favicon.src;
}

/** The share image as an absolute URL, for JSON-LD (which cannot rely on a metadata base). */
export function shareImageUrl(site: SiteData): string {
  const path = shareImagePath(site);
  return path.startsWith("http") ? path : `${site.settings.siteUrl}${path}`;
}

/** Open Graph / Twitter image list. Relative paths resolve against the metadata base (the site URL). */
export function shareImages(site: SiteData): { url: string; alt: string }[] {
  return [{ url: shareImagePath(site), alt: site.settings.siteName }];
}
