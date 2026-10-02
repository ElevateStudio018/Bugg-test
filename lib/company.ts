// Real business data for Markmontage BEAB AB, gathered from public Swedish
// business registries (allabolag.se, bolagsfakta.se, hitta.se) and the
// company's own website (markmontage.se), since the client did not supply a
// content object for this rebrand. Nothing here is invented — fields with no
// confirmed public source are left out rather than fabricated; components
// consuming them must handle that rather than filling in a placeholder.
//
// Kept apart from content.ts, which imports the photos, so client components can use these details without
// pulling every photo's data into the browser's JavaScript.

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
    // Where Lybeck 140 lies (hitta.se), for the map.
    geo: { lat: 57.90671, lng: 12.019944 },
  },
  phoneNational: "031-385 41 41",
  // The general address on the company's own contact page (markmontage.se/kontakta-oss).
  email: "info@markmontage.se" as string | null,
  orgNumber: "556625-8157",
  vatNumber: "SE556625815701",
} as const;
