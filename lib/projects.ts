import type { ServiceIconKey } from "./services";

export interface ProjectItem {
  id: string;
  category: string;
  icon: ServiceIconKey;
  aspect: "portrait-tall" | "portrait" | "square" | "landscape";
  // No real project photos, titles, locations or client names were provided
  // in the content object. Per the gallery fallback rules these images are
  // placeholders standing in for real project photography, and specific
  // titles/locations are intentionally omitted rather than invented.
}

export const projectItems: ProjectItem[] = [
  { id: "proj-1", category: "Nybyggnation", icon: "HardHat", aspect: "portrait-tall" },
  { id: "proj-2", category: "Köksrenovering", icon: "ChefHat", aspect: "square" },
  { id: "proj-3", category: "Badrumsrenovering", icon: "Bath", aspect: "portrait" },
  { id: "proj-4", category: "Tillbyggnad & Utbyggnad", icon: "Maximize2", aspect: "landscape" },
  { id: "proj-5", category: "Renovering & Ombyggnation", icon: "Hammer", aspect: "square" },
  { id: "proj-6", category: "Takrenovering", icon: "Layers", aspect: "portrait" },
  { id: "proj-7", category: "Finsnickeri", icon: "Ruler", aspect: "portrait-tall" },
  { id: "proj-8", category: "Markarbeten & grunder", icon: "Shovel", aspect: "landscape" },
  { id: "proj-9", category: "Renovering & Ombyggnation", icon: "Hammer", aspect: "portrait" },
];

export const projectCategories = Array.from(new Set(projectItems.map((p) => p.category)));
