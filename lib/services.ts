export type ServiceIconKey =
  | "HardHat"
  | "Maximize2"
  | "Hammer"
  | "ChefHat"
  | "Bath"
  | "Layers"
  | "Shovel"
  | "Ruler";

export interface Service {
  slug: string;
  name: string;
  shortDescription: string;
  description: string[];
  icon: ServiceIconKey;
}

// The 8 services are the client's real, named service list ("Våra
// tjänster"). Descriptions were not provided individually, so per the
// content rules they are AI-authored — grounded in the real supplementary
// phrases from the client's own text (villor och fritidshus, tvättstuga,
// taklyft, totalentreprenad, underleverantörer, 35 års erfarenhet, Uppsala
// med omnejd) rather than invented from nothing.
export const services: Service[] = [
  {
    slug: "nybyggnation",
    name: "Nybyggnation",
    shortDescription:
      "Nybyggnation av villor och fritidshus i Uppsala med omnejd, från grund till nyckelfärdigt hem.",
    icon: "HardHat",
    description: [
      "Att bygga nytt är ett av de största projekt man kan ta sig an som privatperson, och det förtjänar en byggpartner som tar ansvar genom hela processen. Flottsunds Bygg AB utför nybyggnation av villor och fritidshus i Uppsala med omnejd, från första spadtag till nyckelfärdigt hem. Med över 35 års samlad erfarenhet i branschen vet vi vad som krävs för att ett nybygge ska hålla både tidsplan, budget och kvalitet.",
      "Vi arbetar som totalentreprenör och tar ansvar för hela byggprocessen — markarbete, grund, stomme, tak, installationer och invändig finish. Genom vårt nätverk av duktiga och pålitliga underleverantörer säkerställer vi att varje del av projektet utförs fackmannamässigt, utan att du som kund behöver samordna flera hantverkare själv.",
      "Redan i planeringsstadiet är vi lyhörda för dina önskemål kring planlösning, material och detaljer, så att slutresultatet blir precis det hem du har föreställt dig. Du får en fast offert innan arbetet påbörjas och tydlig kommunikation genom hela byggets gång — inga obehagliga överraskningar på slutfakturan.",
      "Oavsett om du planerar ett permanent boende eller ett fritidshus för avkoppling får du ett tryggt och genomtänkt nybygge, anpassat efter Uppsalas klimat och förutsättningar. Kontakta oss för en kostnadsfri offert och ta första steget mot ditt nya hem.",
    ],
  },
  {
    slug: "tillbyggnad-utbyggnad",
    name: "Tillbyggnad & Utbyggnad",
    shortDescription:
      "Tillbyggnation och ombyggnation som ger ditt hem mer yta och bättre flöde.",
    icon: "Maximize2",
    description: [
      "Behöver familjen mer utrymme, eller vill du skapa ett bättre flöde i ett hem som inte längre möter dina behov? Flottsunds Bygg AB utför tillbyggnation och ombyggnation i Uppsala med omnejd, från mindre tillbyggnader till mer omfattande utbyggnadsprojekt.",
      "En tillbyggnad är ett tekniskt känsligt projekt där den nya delen måste knyta an sömlöst till befintlig stomme, både konstruktivt och estetiskt. Vår erfarenhet av över 35 år i branschen gör att vi vet hur man bygger vidare på ett äldre hus utan att äventyra vare sig hållfasthet eller karaktär.",
      "Vi hjälper dig genom hela processen — från idé och planlösning till konstruktion och färdig inflyttning. Som totalentreprenör samordnar vi alla moment och underleverantörer, så att du slipper hålla ihop projektet själv.",
      "Vi är flexibla och lyhörda för dina önskemål, oavsett om det handlar om ett nytt sovrumsplan, ett större kök eller en helt ny våning. Målet är alltid ett resultat där till- och ombyggnaden känns som en naturlig del av huset, inte en påbyggnad. Kontakta oss för ett kostnadsfritt hembesök, så tittar vi tillsammans på förutsättningarna för just ditt hus.",
    ],
  },
  {
    slug: "renovering-ombyggnation",
    name: "Renovering & Ombyggnation",
    shortDescription:
      "Renovering invändigt och utvändigt, anpassad efter husets förutsättningar och dina behov.",
    icon: "Hammer",
    description: [
      "Ett hus som renoveras med omsorg håller längre, fungerar bättre och känns nytt igen. Flottsunds Bygg AB utför renovering både invändigt och utvändigt i Uppsala med omnejd — allt från enskilda rum till mer omfattande ombyggnationer av hela bostäder.",
      "Med gedigen erfarenhet av både äldre och nyare fastigheter vet vi hur man renoverar varsamt utan att tumma på kvalitet eller funktion. Vi utför bland annat planlösningsändringar, fasadrenoveringar och invändig ytskiktsrenovering, och tar alltid hänsyn till husets ålder, konstruktion och befintliga material.",
      "Som totalentreprenör samlar vi alla hantverkare som krävs under ett och samma tak, från snickare till våra pålitliga underleverantörer inom el och VVS. Det gör renoveringen enklare för dig som kund, med en kontaktperson och en tydlig tidsplan genom hela projektet.",
      "Vi vet att en renovering påverkar vardagen och planerar därför arbetet noggrant för att minimera störningar i ditt boende. Du får en fast offert innan arbetet startar, så att du vet exakt vad som ingår. Hör av dig för en kostnadsfri offert, så berättar vi mer om hur just din renovering kan genomföras.",
    ],
  },
  {
    slug: "koksrenovering",
    name: "Köksrenovering",
    shortDescription:
      "Köksrenovering med fokus på funktion, hållbarhet och ett kök du vill laga mat i varje dag.",
    icon: "ChefHat",
    description: [
      "Köket är hemmets mest använda rum, och en genomtänkt köksrenovering gör stor skillnad i vardagen. Flottsunds Bygg AB utför köksrenoveringar i Uppsala med omnejd, från mindre uppfräschningar till kompletta ombyggnationer där vi flyttar både väggar och avlopp.",
      "Vi hjälper dig att planera en köksplanlösning som fungerar för hur du faktiskt lagar mat och umgås, med rätt balans mellan bänkyta, förvaring och rörelseutrymme. I arbetet ingår rivning, stomkomplettering, el- och VVS-samordning via våra pålitliga underleverantörer, samt montering av kök, bänkskiva och vitvaror.",
      "Eftersom köket ofta gränsar till vattenkänsliga installationer lägger vi stor vikt vid fackmannamässigt utförda tätskikt och anslutningar, så att du kan känna dig trygg i många år framöver. Vi är lyhörda för dina önskemål kring stil och material, oavsett om du vill ha en klassisk kökskänsla eller en mer modern lösning.",
      "Hela projektet drivs som en totalentreprenad med fast offert, tydlig tidsplan och en enda kontaktperson hos oss. Kontakta oss för ett kostnadsfritt hembesök, så tittar vi tillsammans på möjligheterna för ditt kök.",
    ],
  },
  {
    slug: "badrumsrenovering",
    name: "Badrumsrenovering",
    shortDescription:
      "Badrumsrenovering med fackmannamässigt våtrumsarbete och ett resultat byggt för att hålla.",
    icon: "Bath",
    description: [
      "Ett badrum ställer höga krav på fackmannamässigt utförande, eftersom fukt och tätskikt avgör hur väl renoveringen håller över tid. Flottsunds Bygg AB utför badrumsrenoveringar i Uppsala med omnejd enligt gällande branschregler, från rivning av det gamla badrummet till ett helt färdigt våtrum.",
      "Vi tar hand om hela processen — rivning, håltagning, våtrumstätning, kakel och klinker, samt samordning av el och VVS genom våra pålitliga underleverantörer. Varje moment utförs enligt branschens våtrumsregler, så att du kan känna dig trygg med att badrummet klarar fukt och daglig användning i många år.",
      "Vi hjälper dig gärna redan i planeringsstadiet med indelning av dusch, badkar, tvättmaskin och förvaring, så att badrummet både fungerar praktiskt och känns rymligt. Som totalentreprenör tar vi ansvar för helheten, med en fast offert och en tydlig tidsplan innan arbetet påbörjas.",
      "Vi vet att ett badrum sällan kan vara ur bruk under lång tid, och planerar därför arbetet för att hålla ner byggtiden så mycket som möjligt utan att tumma på kvaliteten. Kontakta oss för en kostnadsfri offert på din badrumsrenovering.",
    ],
  },
  {
    slug: "takrenovering",
    name: "Takrenovering",
    shortDescription:
      "Takrenovering och taklyft som skyddar hela huset från fukt och slitage.",
    icon: "Layers",
    description: [
      "Taket är husets viktigaste skydd mot väder och vind, och eftersatt underhåll kan i förlängningen leda till fukt- och konstruktionsskador. Flottsunds Bygg AB utför takarbeten i Uppsala med omnejd, så som takrenovering och taklyft, med fokus på hållbara lösningar anpassade efter husets konstruktion.",
      "Vi hjälper dig att bedöma takets skick och föreslår rätt åtgärd, oavsett om det handlar om omläggning av takbeklädnad, förstärkning av takstolar eller ett komplett taklyft för att skapa mer boyta på vinden. Arbetet utförs med rätt säkerhetsrutiner och med material anpassade för det nordiska klimatet.",
      "Genom vårt samarbete med pålitliga underleverantörer kan vi vid behov även samordna plåtarbeten, ventilation och isolering som en del av takprojektet, så att du får en helhetslösning istället för flera separata entreprenader. Vi skyddar resten av fastigheten under arbetets gång och städar efter oss när taket är klart.",
      "Med över 35 års erfarenhet i branschen vet vi vad som krävs för ett tak som håller i decennier, inte bara år. Kontakta oss för ett kostnadsfritt hembesök, så gör vi en bedömning av just ditt tak.",
    ],
  },
  {
    slug: "markarbeten-grunder",
    name: "Markarbeten & grunder",
    shortDescription:
      "Markarbeten och grundläggning som lägger en stabil bas för hela byggprojektet.",
    icon: "Shovel",
    description: [
      "Ett bygge är aldrig starkare än sin grund, och därför är markarbeten och grundläggning några av de mest avgörande momenten i varje projekt. Flottsunds Bygg AB utför markarbeten och grunder i Uppsala med omnejd, både som en del av större nybyggnationer och som fristående uppdrag.",
      "Vi hanterar schaktning, dränering, markisolering samt gjutning av platta på mark, grundsulor eller källare, alltid anpassat efter markförhållandena på just din tomt. Uppsalatraktens varierande mark- och grundvattenförhållanden kräver lokal erfarenhet, vilket vi har byggt upp under mer än 35 år i branschen.",
      "Genom att lägga stor vikt vid dränering och fuktskydd redan i grundarbetet minskar vi risken för framtida fukt- och sättningsskador i huset. Vi samordnar vid behov markentreprenörer och övriga underleverantörer, så att grundarbetet flyter samman med resten av byggprocessen utan onödiga förseningar.",
      "Oavsett om det gäller grunden till ett nytt hus, en tillbyggnad eller en carport får du ett noggrant utfört markarbete med en tydlig och fast offert innan start. Hör av dig för en kostnadsfri offert, så berättar vi mer om vad som gäller för just din tomt.",
    ],
  },
  {
    slug: "finsnickeri",
    name: "Finsnickeri",
    shortDescription:
      "Finsnickeri med precision och känsla för detaljer, från specialtillverkade lösningar till fina träarbeten.",
    icon: "Ruler",
    description: [
      "Det är ofta detaljerna som avgör om ett hem känns färdigt och genomtänkt, och finsnickeri handlar just om den sortens precisionsarbete. Flottsunds Bygg AB utför finsnickeri i Uppsala med omnejd, från specialanpassade garderober och inbyggda förvaringslösningar till trappor, lister och andra synliga träarbeten.",
      "Våra snickare har lång erfarenhet av att arbeta med både nya och äldre hus, vilket är särskilt viktigt när ny snickerier ska smälta in i en befintlig miljö med gamla proportioner och material. Vi lägger stor vikt vid rena linjer, noggranna infästningar och en finish som håller för det dagliga slitaget i ett hem.",
      "Uppdragen varierar från mindre kompletteringar i samband med en renovering till större skräddarsydda snickeriprojekt som planeras från grunden tillsammans med dig som kund. Vi är lyhörda för önskemål kring material, form och funktion, och hjälper gärna till med förslag om du är osäker på vad som är möjligt.",
      "Eftersom finsnickeri sällan går att gömma efteråt lägger vi extra tid på noggrannhet i varje steg, från uppmätning till sista finputsning. Kontakta oss för en kostnadsfri offert, så pratar vi igenom vad du har i åtanke.",
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
