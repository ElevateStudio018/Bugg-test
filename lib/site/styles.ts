// The look the owner has given single elements in the visual editor: a colour, background, font, size, weight,
// rounding or alignment on top of the theme. Each element carries its place in the content as a data-k attribute
// (lib/site/edit.ts), and these rules find it by that.
import type { ElementStyle, SiteData } from "./schema.ts";
import { fontStack } from "./theme.ts";

/** A short, stable key for an element's address: the styles are stored under it (content paths allow no dots). */
export function styleKey(k: string): string {
  // FNV-1a, 32 bits, plus the length: short, and in practice never the same for two addresses on one site.
  let hash = 0x811c9dc5;
  for (let index = 0; index < k.length; index++) {
    hash ^= k.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return `${hash.toString(36)}${k.length.toString(36)}`;
}

export function styleFor(site: Pick<SiteData, "styles">, k: string): ElementStyle | undefined {
  return site.styles?.[styleKey(k)];
}

/** The fonts the element styles use, so they can be loaded alongside the theme's. */
export function styleFonts(site: Pick<SiteData, "styles">): string[] {
  return Array.from(new Set(Object.values(site.styles ?? {}).flatMap((style) => (style.font ? [style.font.family] : []))));
}

const selector = (k: string) => `[data-k="${k}"]`;

/**
 * The element styles as CSS. Text colour, font, size and weight also reach the element's own inner parts (an arrow
 * label, a link's text), but not other elements inside it that have a place of their own; background, rounding and
 * alignment apply to the element alone. Outer elements come first, so an inner element's own style wins.
 */
export function stylesCss(site: Pick<SiteData, "styles">): string {
  const styles = Object.values(site.styles ?? {}).sort((a, b) => a.k.split(".").length - b.k.split(".").length || a.k.localeCompare(b.k));
  return styles
    .map((style) => {
      const text: string[] = [];
      if (style.color) text.push(`color:${style.color}!important`);
      if (style.font) text.push(`font-family:${fontStack(style.font)}!important`);
      if (style.size) text.push(`font-size:${style.size}px!important`, "line-height:1.2!important");
      if (style.weight) text.push(`font-weight:${style.weight}!important`);
      const own: string[] = [];
      if (style.background) own.push(`background-color:${style.background}!important`, "background-image:none!important");
      if (style.radius !== undefined) own.push(`border-radius:${style.radius}px!important`, "overflow:hidden");
      if (style.align) own.push(`text-align:${style.align}!important`);
      const rules: string[] = [];
      const element = selector(style.k);
      if (text.length) rules.push(`${element},${element} :not([data-k]){${text.join(";")}}`);
      if (own.length) rules.push(`${element}{${own.join(";")}}`);
      return rules.join("");
    })
    .join("");
}

/** Every font family the site draws in, the theme's and the element styles', other than Figtree (always bundled). */
export function fontFamilies(site: Pick<SiteData, "theme" | "styles">): string[] {
  const theme = Object.values(site.theme.fonts).map((font) => font.family);
  return Array.from(new Set([...theme, ...styleFonts(site)])).filter((family) => family !== "Figtree");
}
