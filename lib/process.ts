export interface ProcessStep {
  title: string;
  description: string;
}

// Fixed 4-step process. No step descriptions were provided, so per the
// process rules these are AI-generated, short and reassuring.
export const processSteps: ProcessStep[] = [
  {
    title: "Kontakt",
    description:
      "Du hör av dig via telefon eller formulär och berättar kort om ditt projekt, så återkommer vi snabbt med nästa steg.",
  },
  {
    title: "Kostnadsfritt hembesök",
    description:
      "Vi besöker dig på plats för att gå igenom förutsättningarna och lyssna på dina önskemål, helt utan kostnad eller förpliktelser.",
  },
  {
    title: "Fast offert",
    description:
      "Du får en tydlig och fast offert innan något arbete påbörjas, så att du vet exakt vad som ingår och vad projektet kostar.",
  },
  {
    title: "Renovering",
    description:
      "Vårt team genomför arbetet enligt tidsplan, med löpande avstämning och fokus på högsta kvalitet hela vägen till nyckelfärdigt resultat.",
  },
];
