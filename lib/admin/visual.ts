// The visual editor's view of the content: what sits at an element's address (its data-k), what kind of value it is,
// what the owner calls it, and how to change it. Addresses are content paths joined with dots (lib/site/edit.ts).
import { describePath } from "@/lib/site/changes.ts";
import { pageFields, rootCollections, rootFields, sectionFields, type FieldSpec } from "@/lib/site/labels.ts";
import { setAt, type ContentPath } from "@/lib/site/paths.ts";
import type { ElementStyle, SectionType, SiteData, SiteImage } from "@/lib/site/schema.ts";

export type ElementKind = "text" | "textarea" | "href" | "number" | "link" | "image" | "group" | "none";

/** The value at a path, reading into lists too ("paragraphs.2"). */
export function readAt(doc: unknown, path: ContentPath): unknown {
  let node = doc;
  for (const key of path) {
    if (node === null || typeof node !== "object") return undefined;
    node = Array.isArray(node) ? node[Number(key)] : (node as Record<string, unknown>)[key];
  }
  return node;
}

/**
 * The change that sets `value` at `path`. A list is saved whole (the content saves set whole values, not single list
 * entries), so a path into a list becomes the list with that entry replaced.
 */
export function changeAt(doc: unknown, path: ContentPath, value: unknown): { path: ContentPath; value: unknown } {
  for (let index = 0; index < path.length; index++) {
    const node = readAt(doc, path.slice(0, index));
    if (Array.isArray(node)) {
      const list = [...node];
      const position = Number(path[index]);
      const rest = path.slice(index + 1);
      list[position] = rest.length === 0 ? value : setAt(list[position], rest, value);
      return { path: path.slice(0, index), value: list };
    }
  }
  return { path, value };
}

export function isImage(value: unknown): value is SiteImage {
  return typeof value === "object" && value !== null && "src" in value && "variants" in value;
}

export function isLink(value: unknown): value is { label: string; href: string } {
  return typeof value === "object" && value !== null && "label" in value && "href" in value && !("src" in value);
}

/** The field description from the admin's forms for a path, when there is one (its label, kind, length hint). */
export function specAt(doc: unknown, path: ContentPath): FieldSpec | undefined {
  const [root, ...rest] = path;
  let fields: FieldSpec[] | undefined;
  let remaining: string[];
  if (root === "pages" && rest[2] === "sections" && rest[4]) {
    const type = (readAt(doc, path.slice(0, 6)) as { type?: SectionType } | undefined)?.type;
    fields = type ? sectionFields[type] : undefined;
    remaining = rest.slice(5);
  } else if (root === "pages") {
    fields = pageFields;
    remaining = rest.slice(2);
  } else if (root in rootCollections) {
    fields = rootCollections[root as keyof typeof rootCollections].fields;
    remaining = rest.slice(2);
  } else {
    fields = rootFields[root as keyof typeof rootFields];
    remaining = rest;
  }
  let spec: FieldSpec | undefined;
  for (let index = 0; index < remaining.length; index++) {
    const key = remaining[index];
    spec = fields?.find((field) => field.key === key);
    if (!spec) return undefined;
    if (spec.kind === "collection" && spec.item && remaining[index + 1] === "items") {
      fields = spec.item.fields;
      index += 2;
      if (index === remaining.length - 1) return undefined;
      continue;
    }
    if (spec.kind === "paragraphs") return spec;
    fields = spec.fields;
  }
  return spec;
}

export function kindOf(value: unknown, spec: FieldSpec | undefined): ElementKind {
  if (typeof value === "string") {
    if (spec?.kind === "href") return "href";
    return spec?.kind === "textarea" || spec?.kind === "paragraphs" || value.length > 90 ? "textarea" : "text";
  }
  if (typeof value === "number") return "number";
  if (isImage(value)) return "image";
  if (isLink(value)) return "link";
  if (typeof value === "object" && value !== null && !Array.isArray(value)) return "group";
  return "none";
}

/** "Startsidan › Toppen" and "Rubrik": where the element is, and what it is. */
export function nameOf(doc: unknown, path: ContentPath): { context: string; label: string } {
  const parts = describePath(doc, path).split(" › ");
  const spec = specAt(doc, path);
  const last = path[path.length - 1];
  const label = spec?.kind === "paragraphs" && /^\d+$/.test(last) ? `${spec.label} – stycke ${Number(last) + 1}` : parts[parts.length - 1];
  return { context: parts.slice(0, -1).join(" › "), label: path.length === 6 && path[0] === "pages" ? `Sektion: ${label}` : label };
}

/** The plain text fields directly inside an object (an address), for editing them together. */
export function textFields(value: unknown): string[] {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return [];
  // A section's own settings (its type, its name in the admin, its anchor) are not texts on the page.
  const section = "type" in value;
  return Object.entries(value)
    .filter(
      ([key, field]) =>
        typeof field === "string" && !["type", "anchor", "side", "tone", "size", "imageSide"].includes(key) && !(section && key === "label"),
    )
    .map(([key]) => key);
}

export type StyleProps = Omit<ElementStyle, "k">;

export function draftStyles(draft: SiteData): Record<string, ElementStyle> {
  return draft.styles ?? {};
}
