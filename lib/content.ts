
import { company } from "./company";
import { companyPhotos } from "./photos";

export { company };

export const hero = {
  eyebrow: `${company.legalName} · Sedan ${company.foundedYear}`,
  heading: "Mark- och grundarbeten i Kungälv & Göteborg",
  image: companyPhotos.heroHamnen,
} as const;

export const intro = {
  heading: "Mark- och grundarbeten i Kungälv & Göteborg",
  lead: `${company.legalName} utför mark- och grundarbeten i ${company.serviceArea}.`,
};

// Written from confirmed registry facts (founding year, address, employee
// count, industry classification) rather than client-supplied copy, since
// none was provided for this rebrand.
export const about = {
  heading: "Om oss",
  image: companyPhotos.teamet,
  subheading: `${company.legalName} har sin bas i Romelanda utanför Kungälv och grundades ${company.foundedYear}.`,
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

export const footerCopyright = `© ${new Date().getFullYear()} ${company.legalName}`;

// No Google rating and no reviews were found for this company, so per the
// reviews rules the entire Reviews section must stay hidden rather than
// rendering empty or fabricated testimonials.
export const reviews: never[] = [];
export const googleRating: number | null = null;
