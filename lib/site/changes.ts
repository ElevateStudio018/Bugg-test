// Names changes in plain Swedish, for the version history ("Startsidan › Toppen › Rubrik") and the save indicator.
import { getAt } from "./paths.ts";
import { rootLabels, sectionFields, sectionTypeLabels, type FieldSpec } from "./labels.ts";
import type { SectionType } from "./schema.ts";

const otherLabels: Record<string, string> = {
  seo: "Sökmotorer",
  title: "Rubrik",
  description: "Beskrivning",
  order: "ordning",
  hidden: "visas eller döljs",
  label: "namn",
  anchor: "ankare",
  name: "Namn",
  shortDescription: "Kort beskrivning",
  slug: "Adress",
  image: "Bild",
  icon: "Symbol",
  phone: "Telefon",
  email: "E-post",
  address: "Adress",
  legalName: "Företagsnamn",
  orgNumber: "Organisationsnummer",
  openingHours: "Öppettider",
  social: "Sociala medier",
  logo: "Logga",
  favicon: "Favikon",
  maintenance: "Underhållsläge",
  analyticsId: "Google Analytics",
};

function fieldLabel(fields: FieldSpec[] | undefined, key: string): string | undefined {
  return fields?.find((field) => field.key === key)?.label;
}

/** "Startsidan › Toppen › Rubrik" for a path in the document. */
export function describePath(doc: unknown, path: string[]): string {
  const [root, ...rest] = path;
  if (root === "pages" && rest[0] === "items" && rest[1]) {
    const page = getAt(doc, ["pages", "items", rest[1]]) as { title?: string; slug?: string } | undefined;
    const pageName = page?.slug === "" ? "Startsidan" : page?.title || rest[1];
    if (rest[2] === "sections" && rest[3] === "items" && rest[4]) {
      const section = getAt(doc, ["pages", "items", rest[1], "sections", "items", rest[4]]) as
        | { type?: SectionType; label?: string }
        | undefined;
      const type = section?.type;
      const sectionName = section?.label || (type ? sectionTypeLabels[type]?.label : undefined) || rest[4];
      const fieldKey = rest[5];
      if (!fieldKey) return `${pageName} › ${sectionName}`;
      const fields = type ? sectionFields[type] : undefined;
      const spec = fields?.find((field) => field.key === fieldKey);
      const field = spec?.label ?? otherLabels[fieldKey] ?? fieldKey;
      if (spec?.kind === "collection" && rest[6] === "items" && rest[7]) {
        const item = getAt(doc, ["pages", "items", rest[1], "sections", "items", rest[4], fieldKey, "items", rest[7]]) as
          | Record<string, unknown>
          | undefined;
        const title = spec.item?.titleKey ? String(item?.[spec.item.titleKey] ?? "") : "";
        const itemField = rest[8] ? fieldLabel(spec.item?.fields, rest[8]) ?? rest[8] : "";
        return [pageName, sectionName, `${spec.item?.label ?? field}${title ? ` ”${title.slice(0, 40)}”` : ""}`, itemField]
          .filter(Boolean)
          .join(" › ");
      }
      return `${pageName} › ${sectionName} › ${field}`;
    }
    if (rest[2] === "sections") return `${pageName} › sektionernas ordning`;
    return `${pageName} › ${otherLabels[rest[2]] ?? rest[2] ?? "sidan"}`;
  }
  const rootName = rootLabels[root] ?? root;
  if ((root === "services" || root === "uppdrag" || root === "certificates") && rest[0] === "items" && rest[1]) {
    const item = getAt(doc, [root, "items", rest[1]]) as { name?: string; title?: string } | undefined;
    const itemName = item?.name ?? item?.title ?? rest[1];
    return [rootName, itemName, rest[2] ? otherLabels[rest[2]] ?? rest[2] : ""].filter(Boolean).join(" › ");
  }
  const last = rest[rest.length - 1];
  return [rootName, last ? otherLabels[last] ?? last : ""].filter(Boolean).join(" › ");
}

/** A short summary of several changes: the first few named, the rest counted. */
export function summarize(doc: unknown, paths: string[][], extra: string[] = []): string {
  const names = Array.from(new Set([...extra, ...paths.map((path) => describePath(doc, path))]));
  if (names.length === 0) return "Inga ändringar";
  const shown = names.slice(0, 3).join(", ");
  return names.length > 3 ? `${shown} och ${names.length - 3} till` : shown;
}
