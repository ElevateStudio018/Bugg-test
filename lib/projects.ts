import type { ServiceIconKey } from "./services";

export interface ProjectItem {
  id: string;
  category: string;
  icon: ServiceIconKey;
  // No real project photos, titles, locations or client names were
  // provided or found for this rebrand. Per the gallery fallback rules
  // these placeholder entries stand in for real project case studies, and
  // specific titles/locations are intentionally omitted rather than
  // invented.
}

export const projectItems: ProjectItem[] = [
  { id: "proj-1", category: "Schaktning & markarbeten", icon: "Shovel" },
  { id: "proj-2", category: "Dränering", icon: "Droplets" },
  { id: "proj-3", category: "Grundläggning", icon: "Layers" },
  { id: "proj-4", category: "VA-arbeten", icon: "Waves" },
  { id: "proj-5", category: "Anläggning av vägar & planer", icon: "Route" },
  { id: "proj-6", category: "Stenläggning & plattsättning", icon: "LayoutGrid" },
  { id: "proj-7", category: "Totalentreprenad", icon: "HardHat" },
  { id: "proj-8", category: "Dränering", icon: "Droplets" },
  { id: "proj-9", category: "Grundläggning", icon: "Layers" },
];

export const projectCategories = Array.from(new Set(projectItems.map((p) => p.category)));
