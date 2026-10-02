import { pexelsPhoto } from "./pexels";
import { companyPhotos } from "./photos";

export interface UppdragItem {
  id: string;
  tag: string;
  title: string;
  serviceSlug: string;
  image: string;
}

// The company has no published reference projects, so these are the kinds of
// assignments its real services cover — generic job types, never named
// projects, clients, places or dates. Photos are the company's own where one
// fits the job type, otherwise illustrative stock images.
export const uppdragItems: UppdragItem[] = [
  { id: "schakt", tag: "Markarbeten", title: "Schakt och massförflyttning", serviceSlug: "schaktning-markarbeten", image: companyPhotos.minigravareGrasmatta },
  { id: "grund", tag: "Grund & dränering", title: "Platta på mark och grundsulor", serviceSlug: "grundlaggning", image: pexelsPhoto(17410739) },
  { id: "dagvatten", tag: "Grund & dränering", title: "Dagvatten och fuktskydd", serviceSlug: "dranering", image: pexelsPhoto(3964564) },
  { id: "vagar", tag: "Markarbeten", title: "Vägar, planer och uppfarter", serviceSlug: "anlaggning-vagar-planer", image: pexelsPhoto(1188532) },
  { id: "marksten", tag: "Markarbeten", title: "Marksten och kantsten", serviceSlug: "stenlaggning", image: pexelsPhoto(214045) },
  { id: "helhet", tag: "Totalentreprenad", title: "Helhetsansvar för markprojektet", serviceSlug: "totalentreprenad", image: pexelsPhoto(30223853) },
];

export const uppdragTags = Array.from(new Set(uppdragItems.map((item) => item.tag)));
