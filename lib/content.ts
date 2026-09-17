// Real business data for Flottsunds Bygg AB, taken as-is from the client's
// provided content. Nothing in this file is invented — if a field is ever
// empty, the component consuming it must omit it rather than fabricate one.

export const company = {
  legalName: "Flottsunds Bygg AB",
  shortName: "Flottsunds Bygg",
  foundedYear: 2006,
  employeeCountLabel: "cirka 10 anställda",
  employeeCountValue: 10,
  yearsExperienceLabel: "över 35 års erfarenhet",
  yearsExperienceValue: 35,
  city: "Uppsala",
  serviceArea: "Uppsala med omnejd",
  address: {
    street: "Hållnäsgatan 2",
    postalCode: "752 28",
    city: "Uppsala",
    country: "SE",
    full: "Hållnäsgatan 2, 752 28 Uppsala",
  },
  phoneNational: "0708-722 192",
  email: "info@flottsundsbygg.se",
  orgNumber: "556709-2621",
  vatNumber: "SE556709262101",
} as const;

export const hero = {
  label: null, // No Google rating provided — hero rating label omitted.
  heading: "Ditt byggföretag i Uppsala",
} as const;

export const intro = {
  heading: "Ditt byggföretag i Uppsala",
  lead: "Flottsunds Bygg AB utför nybyggnationer och renoveringar i Uppsala med omnejd",
};

// Verbatim paragraphs from the client's "Om oss" content.
export const about = {
  heading: "Om oss",
  subheading: `${company.legalName} har sitt säte i Uppsala och grundades ${company.foundedYear}`,
  paragraphs: [
    `${company.legalName} är ett byggföretag med sitt säte i Uppsala. Vi arbetar med byggentreprenader och ROT-arbeten. Vi samarbetar med duktiga och pålitliga underleverantörer och kan på så vis utföra totalentreprenader.`,
    `${company.legalName} är ett byggföretag med ${company.yearsExperienceLabel} inom branschen. Vi strävar alltid för att uppnå högsta kvalité samtidigt som vi är flexibla och lyhörda för kundens önskemål.`,
    `${company.legalName} grundades ${company.foundedYear} och har idag ${company.employeeCountLabel}.`,
    `Du är varmt välkommen att kontakta oss!`,
  ],
};

// Verbatim intro copy that originally sat above the services list.
export const servicesIntro = {
  heading: "Våra tjänster",
  lead: "Vi utför de flesta typer av bygg- och snickeriarbeten i Uppsala med omnejd.",
  body: "Flottsunds Bygg AB är ett byggföretag med stor kapacitet och vi samarbetar med duktiga och pålitliga underleverantörer. Detta gör att vi kan åta oss totalentreprenader. Vår strävan är alltid att uppnå högsta kvalité samt att vara flexibla och lyhörda för kundens önskemål.",
};

// Real ROT-avdrag copy, provided verbatim by the client. Rendered as an FAQ
// answer further down — never rewritten.
export const rotAvdrag = {
  question: "Vad gäller för ROT-avdrag vid renovering?",
  answer:
    "Som privatperson kan ni vid renovering och tillbyggnad få göra ett avdrag på 30% av arbetskostnaden upp till max 50 000 kr per person. Vi sköter ansökan till Skatteverket och avdraget gör vi direkt på er faktura.",
};

export const footerBlurb = `${company.legalName} - Byggföretag i Uppsala`;
export const footerCopyright = `© ${new Date().getFullYear()} - ${company.legalName}, ditt byggföretag i Uppsala`;

// No Google rating and no reviews were provided in the content object, so
// per the reviews rules the entire Reviews section must stay hidden rather
// than rendering empty or fabricated testimonials.
export const reviews: never[] = [];
export const googleRating: number | null = null;
