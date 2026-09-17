import type { ServiceIconKey } from "./services";

export interface ProjectItem {
  id: string;
  category: string;
  icon: ServiceIconKey;
  // No real project photos, titles, locations or client names were provided
  // in the content object. Per the gallery fallback rules these placeholder
  // entries stand in for real project case studies, and specific titles/
  // locations are intentionally omitted rather than invented.
}

export const projectItems: ProjectItem[] = [
  { id: "proj-1", category: "Nybyggnation", icon: "HardHat" },
  { id: "proj-2", category: "Köksrenovering", icon: "ChefHat" },
  { id: "proj-3", category: "Badrumsrenovering", icon: "Bath" },
  { id: "proj-4", category: "Tillbyggnad & Utbyggnad", icon: "Maximize2" },
  { id: "proj-5", category: "Renovering & Ombyggnation", icon: "Hammer" },
  { id: "proj-6", category: "Takrenovering", icon: "Layers" },
  { id: "proj-7", category: "Finsnickeri", icon: "Ruler" },
  { id: "proj-8", category: "Markarbeten & grunder", icon: "Shovel" },
  { id: "proj-9", category: "Renovering & Ombyggnation", icon: "Hammer" },
];

export const projectCategories = Array.from(new Set(projectItems.map((p) => p.category)));
