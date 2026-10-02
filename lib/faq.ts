import { rotAvdrag } from "./content";

export interface FaqItem {
  question: string;
  answer: string;
}

// No FAQ data was supplied for this rebrand, so per the FAQ rules this list
// is AI-generated to address common mark- och grundarbeten concerns —
// except the ROT-avdrag entry, whose answer reflects the real Skatteverket
// rule rather than a company-specific claim.
export const faqItems: FaqItem[] = [
  {
    question: "Hur går en offertförfrågan till?",
    answer:
      "Du kontaktar oss via telefon eller formuläret på sidan och berättar kort om ditt projekt. Därefter bokar vi ett kostnadsfritt hembesök där vi går igenom förutsättningarna tillsammans, och du får en fast offert innan något arbete påbörjas.",
  },
  {
    question: "Hur lång tid tar ett mark- eller grundarbete?",
    answer:
      "Tidsåtgången beror helt på projektets omfattning – allt från en dränering till grundläggning av en hel villa. Vid hembesöket går vi igenom en realistisk tidsplan för just ditt projekt, så att du vet vad du kan förvänta dig innan arbetet startar.",
  },
  {
    question: "Vad innebär det att ni arbetar som totalentreprenör?",
    answer:
      "Som totalentreprenör tar Markmontage BEAB AB helhetsansvaret för mark- och grundarbetet och samordnar samtliga moment som krävs, från schaktning och dränering till grundläggning och VA. Du behöver bara en kontakt genom hela processen istället för att själv hantera flera olika entreprenörer.",
  },
  {
    question: "Kan ni arbeta året runt, även när det är tjäle i marken?",
    answer:
      "Tjäle påverkar när och hur vissa markarbeten kan utföras. Vid hembesöket bedömer vi förutsättningarna för just din tomt och planerar arbetet efter årstid och väderlek, så att du får en realistisk tidsplan redan från start.",
  },
  {
    question: rotAvdrag.question,
    answer: rotAvdrag.answer,
  },
  {
    question: "Ger ni fast pris på era projekt?",
    answer:
      "Ja, efter det kostnadsfria hembesöket får du en fast offert innan arbetet påbörjas, så att du vet exakt vad som ingår och vad projektet kostar. Skulle nya önskemål tillkomma under projektets gång stämmer vi alltid av med dig innan vi går vidare.",
  },
  {
    question: "Vilka områden arbetar ni i?",
    answer:
      "Vi utför mark- och grundarbeten i Kungälv, Göteborg och övriga Västra Götaland. Är du osäker på om vi arbetar där du bor är du varmt välkommen att höra av dig, så ger vi dig snabbt besked.",
  },
];
