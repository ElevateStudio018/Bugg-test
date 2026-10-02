// Real business data for Markmontage BEAB AB, gathered from public Swedish
// business registries (allabolag.se, bolagsfakta.se, hitta.se) since the
// client did not supply a content object for this rebrand. Nothing here is
// invented — fields with no confirmed public source (there is no listed
// email or website for this company) are left out rather than fabricated;
// components consuming them must handle that rather than filling in a
// placeholder.

import { companyPhotos } from "./photos";

export const company = {
  legalName: "Markmontage BEAB AB",
  shortName: "Markmontage",
  foundedYear: 2002,
  // Headcount as given by the company (the registry still lists an older figure).
  employeeCountLabel: "18 anställda",
  employeeCountValue: 18,
  yearsExperienceLabel: "över 20 års erfarenhet",
  yearsExperienceValue: 24,
  city: "Kungälv",
  serviceArea: "Kungälv, Göteborg och övriga Västra Götaland",
  address: {
    street: "Lybeck 140",
    postalCode: "442 91",
    city: "Romelanda",
    country: "SE",
    full: "Lybeck 140, 442 91 Romelanda",
  },
  phoneNational: "031-385 41 41",
  email: null as string | null,
  orgNumber: "556625-8157",
  vatNumber: "SE556625815701",
} as const;

export const hero = {
  eyebrow: `${company.legalName} · Sedan ${company.foundedYear}`,
  heading: "Mark- och grundarbeten i Kungälv & Göteborg",
  image: companyPhotos.heroHamnen,
} as const;

export const intro = {
  heading: "Mark- och grundarbeten i Kungälv & Göteborg",
  lead: `${company.legalName} utför mark- och grundarbeten i ${company.serviceArea}`,
};

// Written from confirmed registry facts (founding year, address, employee
// count, industry classification) rather than client-supplied copy, since
// none was provided for this rebrand.
export const about = {
  heading: "Om oss",
  image: companyPhotos.teamet,
  subheading: `${company.legalName} har sin bas i Romelanda utanför Kungälv och grundades ${company.foundedYear}`,
  paragraphs: [
    `${company.legalName} är ett entreprenadföretag inom mark- och grundarbeten, verksamt i ${company.serviceArea}. Vi utför bland annat schaktning, dränering, grundläggning och VA-arbeten, och tar även helhetsansvar som totalentreprenör på större projekt.`,
    `${company.legalName} har ${company.yearsExperienceLabel} inom branschen. Ett bygge är aldrig starkare än sin grund, och vi lägger därför stor vikt vid fackmannamässigt utförande i varje moment av mark- och grundarbetet.`,
    `${company.legalName} grundades ${company.foundedYear} och har idag ${company.employeeCountLabel}.`,
    `Du är varmt välkommen att kontakta oss!`,
  ],
};

export const aboutFacts: { label: string; value: string }[] = [
  { label: "Grundat", value: String(company.foundedYear) },
  { label: "Anställda", value: String(company.employeeCountValue) },
  { label: "Säte", value: `${company.address.city}, ${company.city}` },
  { label: "Verksamhet", value: "Mark- och grundarbeten" },
  { label: "Org.nr", value: company.orgNumber },
];

// The /om-oss page. Photos are the company's own; the copy only restates
// what the About text, the process steps and the service pages already say.
export const aboutPage = {
  heroImage: companyPhotos.teamet,
  middleImage: companyPhotos.gravmaskinRor,
  // Side by side under the intro text; focus is the part of each photo to keep (CSS object-position).
  photos: [
    { src: companyPhotos.konferens, focus: "50% 50%" },
    { src: companyPhotos.minigravareSlap, focus: "50% 40%" },
  ],
  foundation: {
    heading: "Vi lägger grunden för ditt bygge",
    text: `Vi utför bland annat schaktning, dränering, grundläggning och VA-arbeten i ${company.serviceArea} – och tar helhetsansvar som totalentreprenör på större projekt. Oavsett uppdrag lägger vi stor vikt vid fackmannamässigt utförande i varje moment.`,
  },
  together: {
    heading: "Från första spadtaget till färdig yta",
    text: "Du hör av dig, vi kommer ut på ett kostnadsfritt hembesök och du får en fast offert innan något arbete påbörjas. Därefter genomför vi arbetet enligt tidsplan, med löpande avstämning hela vägen.",
  },
};

// General Swedish tax rule (Skatteverket), scoped to the work types it
// actually covers — not a claim that all of the company's work qualifies.
export const rotAvdrag = {
  question: "Kan jag få ROT-avdrag på mark- och grundarbete?",
  answer:
    "Som privatperson kan du få ROT-avdrag på arbetskostnaden för vissa mark- och grundarbeten vid din bostad, till exempel dränering och grundförstärkning i samband med renovering eller tillbyggnad — avdraget är 30% av arbetskostnaden, upp till max 50 000 kr per person och år. Vi hjälper dig med ansökan till Skatteverket och drar av beloppet direkt på fakturan.",
};

export const footerCopyright = `© ${new Date().getFullYear()} - ${company.legalName}`;

// No Google rating and no reviews were found for this company, so per the
// reviews rules the entire Reviews section must stay hidden rather than
// rendering empty or fabricated testimonials.
export const reviews: never[] = [];
export const googleRating: number | null = null;
