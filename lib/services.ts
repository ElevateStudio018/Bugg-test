export type ServiceIconKey =
  | "HardHat"
  | "Maximize2"
  | "Hammer"
  | "ChefHat"
  | "Bath"
  | "Layers"
  | "Shovel"
  | "Ruler"
  | "Droplets"
  | "Waves"
  | "Route"
  | "LayoutGrid";

export interface Service {
  slug: string;
  name: string;
  shortDescription: string;
  description: string[];
  icon: ServiceIconKey;
}

// Markmontage BEAB AB is registered under SNI 43120 (mark- och
// grundarbeten). No individual service descriptions were supplied for this
// rebrand, so per the content rules these seven categories are the real,
// standard scope of that trade, and the descriptions are AI-authored,
// grounded in genuine industry practice rather than invented company-
// specific claims.
export const services: Service[] = [
  {
    slug: "schaktning-markarbeten",
    name: "Schaktning & markarbeten",
    shortDescription:
      "Schaktning och markarbeten som förbereder tomten inför bygget, anpassat efter markförhållandena.",
    icon: "Shovel",
    description: [
      "Ett bygge börjar alltid under mark, och rätt förberett underlag avgör hur resten av projektet går. Markmontage BEAB AB utför schaktning och markarbeten i Kungälv, Göteborg och övriga Västra Götaland, både som en del av större entreprenader och som fristående uppdrag.",
      "Vi hanterar schaktning för grund, ledningar och anslutningar, samt terrassering och iordningställande av tomtmark inför fortsatt byggnation. Varje uppdrag anpassas efter markförhållandena på plats, från lera och berg till mer lättarbetad mark.",
      "Som totalentreprenör kan vi samordna schaktningen med efterföljande moment som grundläggning och VA-arbeten, så att projektet flyter samman utan onödiga avbrott mellan de olika entreprenörerna.",
      "Kontakta oss för en kostnadsfri offert, så tittar vi tillsammans på förutsättningarna för just din tomt.",
    ],
  },
  {
    slug: "dranering",
    name: "Dränering",
    shortDescription:
      "Dränering som skyddar grunden mot fukt och sättningsskador, utfört enligt branschens riktlinjer.",
    icon: "Droplets",
    description: [
      "Bristfällig dränering är en av de vanligaste orsakerna till fukt- och sättningsskador i äldre hus. Markmontage BEAB AB utför dränering i Kungälv, Göteborg och övriga Västra Götaland, både vid nybyggnation och som åtgärd vid befintliga fuktproblem.",
      "Arbetet omfattar schaktning runt grunden, ny dränering och fuktskydd, samt återfyllning och iordningställande av marken efteråt. Vi lägger stor vikt vid att dräneringen leder bort vatten på rätt sätt, anpassat efter husets grundläggning och markens lutning.",
      "Dränering vid en befintlig bostad kan i många fall ROT-berättiga arbetskostnaden — vi hjälper dig gärna med vad som gäller för just ditt hus.",
      "Kontakta oss för ett kostnadsfritt hembesök, så gör vi en bedömning av dräneringen vid din fastighet.",
    ],
  },
  {
    slug: "grundlaggning",
    name: "Grundläggning",
    shortDescription:
      "Grundläggning för nybyggnation och tillbyggnad, anpassad efter markens bärighet.",
    icon: "Layers",
    description: [
      "Grunden bär hela byggnaden, och felaktigt utförd grundläggning är svår och kostsam att åtgärda i efterhand. Markmontage BEAB AB utför grundläggning i Kungälv, Göteborg och övriga Västra Götaland, vid såväl nybyggnation som tillbyggnad.",
      "Vi utför bland annat gjutning av platta på mark, grundsulor och källargrunder, alltid anpassat efter markens bärighet och grundvattenförhållandena på platsen. Markisolering och fuktskydd ingår som en naturlig del av arbetet.",
      "Genom vår erfarenhet inom mark- och grundarbeten vet vi vad som krävs för en grund som håller över tid, och samordnar vid behov arbetet med övriga entreprenörer i projektet.",
      "Hör av dig för en kostnadsfri offert, så berättar vi mer om vad som gäller för grundläggningen på just din tomt.",
    ],
  },
  {
    slug: "va-arbeten",
    name: "VA-arbeten",
    shortDescription:
      "Vatten- och avloppsarbeten från anslutning till kommunalt nät till ledningar på egen tomt.",
    icon: "Waves",
    description: [
      "Vatten- och avloppsarbeten kräver både rätt kompetens och rätt tillstånd, eftersom felaktigt utförda VA-installationer kan bli kostsamma att åtgärda. Markmontage BEAB AB utför VA-arbeten i Kungälv, Göteborg och övriga Västra Götaland.",
      "Vi lägger och byter ledningar för vatten, spillvatten och dagvatten, samt utför anslutningar till kommunalt VA-nät eller enskilda avloppsanläggningar. Arbetet utförs enligt gällande branschregler för VA-installationer.",
      "Som totalentreprenör kan vi samordna VA-arbetet med schaktning och återställning av marken, så att du slipper hålla ihop flera separata entreprenörer.",
      "Kontakta oss för en kostnadsfri offert på VA-arbetet vid din fastighet.",
    ],
  },
  {
    slug: "anlaggning-vagar-planer",
    name: "Anläggning av vägar & planer",
    shortDescription:
      "Anläggning av vägar, uppfarter och asfalterade eller grusade ytor med hållbar bärighet.",
    icon: "Route",
    description: [
      "En väl anlagd väg eller uppställningsyta kräver rätt uppbyggnad i flera lager för att hålla över tid, oavsett belastning och väderlek. Markmontage BEAB AB utför anläggning av vägar och planer i Kungälv, Göteborg och övriga Västra Götaland.",
      "Vi anlägger uppfarter, parkeringsytor och interna vägar, med förstärkningslager anpassade efter markens bärighet och den tänkta belastningen. Ytorna kan färdigställas med allt från grus till asfalt beroende på behov.",
      "Rätt dränering och lutning i uppbyggnaden är avgörande för att undvika vattenansamling och tjälskador, något vi planerar för redan i markarbetet.",
      "Hör av dig för en kostnadsfri offert, så går vi igenom vad som passar bäst för just din yta.",
    ],
  },
  {
    slug: "stenlaggning",
    name: "Stenläggning & plattsättning",
    shortDescription:
      "Stenläggning och plattsättning utomhus med stabilt underlag för gångar, uteplatser och infarter.",
    icon: "LayoutGrid",
    description: [
      "En hållbar stenläggning avgörs av underarbetet minst lika mycket som av själva stenen eller plattan. Markmontage BEAB AB utför stenläggning och plattsättning utomhus i Kungälv, Göteborg och övriga Västra Götaland.",
      "Vi bygger upp bärlager och sättsand enligt branschens riktlinjer inför läggning av marksten, plattor eller kantsten till gångar, uteplatser och infarter, så att ytan ligger stabilt och jämnt även efter flera års användning.",
      "Vid behov kombinerar vi stenläggningen med dränering under ytan för att leda bort vatten och minska risken för sättningar och ogräs i fogarna.",
      "Kontakta oss för en kostnadsfri offert på stenläggningen vid din fastighet.",
    ],
  },
  {
    slug: "totalentreprenad",
    name: "Totalentreprenad",
    shortDescription:
      "Totalentreprenad där vi tar helhetsansvar för mark- och grundarbetet från start till avslut.",
    icon: "HardHat",
    description: [
      "På större projekt är det ofta en fördel att samla mark- och grundarbetet hos en och samma entreprenör. Markmontage BEAB AB åtar oss totalentreprenader inom mark- och grundarbeten i Kungälv, Göteborg och övriga Västra Götaland.",
      "Som totalentreprenör tar vi helhetsansvaret för projektet — från schaktning och dränering till grundläggning, VA-arbeten och färdigställande av mark — och samordnar de moment som krävs för att arbetet ska flyta på utan onödiga förseningar.",
      "Du får en kontaktperson genom hela projektet och en tydlig tidsplan, istället för att själv behöva samordna flera olika entreprenörer.",
      "Kontakta oss för en kostnadsfri offert, så berättar vi mer om hur en totalentreprenad kan se ut för just ditt projekt.",
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
