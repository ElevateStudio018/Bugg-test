import { rotAvdrag } from "./content";

export interface FaqItem {
  question: string;
  answer: string;
}

// No FAQ data was provided in the content object, so per the FAQ rules this
// list is AI-generated to address common renovation concerns — except the
// ROT-avdrag entry, whose answer is the client's own verbatim text.
export const faqItems: FaqItem[] = [
  {
    question: "Hur går en offertförfrågan till?",
    answer:
      "Du kontaktar oss via telefon eller formuläret på sidan och berättar kort om ditt projekt. Därefter bokar vi ett kostnadsfritt hembesök där vi går igenom förutsättningarna tillsammans, och du får en fast offert innan något arbete påbörjas.",
  },
  {
    question: "Hur lång tid tar en renovering eller ett nybygge?",
    answer:
      "Tidsåtgången beror helt på projektets omfattning — allt från en badrumsrenovering till en villa från grunden. Vid hembesöket går vi igenom en realistisk tidsplan för just ditt projekt, så att du vet vad du kan förvänta dig innan arbetet startar.",
  },
  {
    question: "Vad innebär det att ni arbetar som totalentreprenör?",
    answer:
      "Som totalentreprenör tar Flottsunds Bygg AB helhetsansvaret för projektet och samordnar samtliga moment och underleverantörer, från mark och stomme till el, VVS och finish. Du behöver bara en kontakt genom hela processen istället för att själv hantera flera olika hantverkare.",
  },
  {
    question: "Hur mycket påverkas vardagen under en renovering?",
    answer:
      "Vi planerar varje projekt för att minimera störningar i ditt boende, och informerar dig löpande om vad som händer och när. Behöver du bo kvar under arbetet pratar vi igenom det redan vid hembesöket, så att upplägget passar din vardag.",
  },
  {
    question: "Vad gäller för ROT-avdrag vid renovering?",
    answer: rotAvdrag.answer,
  },
  {
    question: "Ger ni fast pris på era projekt?",
    answer:
      "Ja, efter det kostnadsfria hembesöket får du en fast offert innan arbetet påbörjas, så att du vet exakt vad som ingår och vad projektet kostar. Skulle önskemål tillkomma under projektets gång stämmer vi alltid av det med dig innan vi går vidare.",
  },
  {
    question: "Vilka områden i och runt Uppsala arbetar ni i?",
    answer:
      "Vi utför bygg- och renoveringsprojekt i Uppsala med omnejd. Är du osäker på om din adress ligger inom vårt upptagningsområde är du varmt välkommen att höra av dig, så ger vi dig snabbt besked.",
  },
];
