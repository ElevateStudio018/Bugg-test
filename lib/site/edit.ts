// Every text, link and photo on the site carries its place in the content as a data-k attribute: the admin's visual
// editor finds what was clicked by it, and the owner's element styles (lib/site/styles.ts) apply through it.

export interface EditAttrs {
  "data-k"?: string;
}

/** The attribute for the content at these path parts ("pages.items.hem.sections.items.hero", "heading"). */
export function ek(...parts: (string | number | undefined)[]): EditAttrs {
  const k = parts.filter((part) => part !== undefined && part !== "").join(".");
  return k ? { "data-k": k } : {};
}

/** The path of an item in one of a section's or the site's collections. */
export function itemKey(base: string | undefined, collection: string, id: string): string | undefined {
  return base === undefined ? undefined : [base, collection, "items", id].filter(Boolean).join(".");
}

/** The data-k value for these path parts under a base, or undefined (no attribute) when there is no base. */
export function key(base: string | undefined, ...parts: (string | number)[]): string | undefined {
  return base === undefined ? undefined : [base, ...parts].filter((part) => part !== "").join(".");
}
