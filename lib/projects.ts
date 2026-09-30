import type { ServiceIconKey } from "./services";

export interface ProjectItem {
  id: string;
  category: string;
  icon: ServiceIconKey;
  image: string;
  // No real project photos, titles, locations or client names were
  // provided or found for this rebrand. These are free-license stock
  // photos (Pexels) illustrating each real service category — not photos
  // of this company's own work — so titles/locations stay generic rather
  // than invented.
}

const IMAGE_BY_CATEGORY: Record<string, string> = {
  "Schaktning & markarbeten": "https://images.pexels.com/photos/13098128/pexels-photo-13098128.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "Dränering": "https://images.pexels.com/photos/3964564/pexels-photo-3964564.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "Grundläggning": "https://images.pexels.com/photos/2469/pexels-photo-2469.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "VA-arbeten": "https://images.pexels.com/photos/6419128/pexels-photo-6419128.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "Anläggning av vägar & planer": "https://images.pexels.com/photos/19394246/pexels-photo-19394246.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "Stenläggning & plattsättning": "https://images.pexels.com/photos/6083/pexels-photo-6083.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "Totalentreprenad": "https://images.pexels.com/photos/10202865/pexels-photo-10202865.jpeg?auto=compress&cs=tinysrgb&w=1200",
};

const rawItems: Array<Omit<ProjectItem, "image">> = [
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

export const projectItems: ProjectItem[] = rawItems.map((item) => ({
  ...item,
  image: IMAGE_BY_CATEGORY[item.category],
}));

export const projectCategories = Array.from(new Set(projectItems.map((p) => p.category)));
