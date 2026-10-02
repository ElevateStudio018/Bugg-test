import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { QuoteTrigger } from "./QuoteTrigger";
import { Topography } from "./Topography";
import { ZoomImage } from "./ZoomImage";
import { pexelsPhoto } from "@/lib/pexels";
import { companyPhotos } from "@/lib/photos";

type Side = "left" | "right";

// Which side the box sits on (desktop) and where the contour pattern is anchored.
const sideClasses: Record<Side, { box: string; pattern: string }> = {
  left: { box: "lg:mr-auto lg:ml-12", pattern: "left-[36%] top-full" },
  right: { box: "lg:ml-auto lg:mr-12", pattern: "left-[76%] top-[88%]" },
};

/** Thin white outline pill; wrapped labels stay left-aligned like the single-line ones. */
const promoPillClasses =
  "mt-6 inline-flex max-w-full items-center rounded-full border-[1.5px] border-white px-8 py-4 text-left text-label uppercase text-white transition-colors duration-200 hover:bg-white hover:text-olive focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

interface PromoBoxProps {
  side: Side;
  image: string;
  heading: string;
  text: string;
  children: ReactNode;
}

function PromoBox({ side, image, heading, text, children }: PromoBoxProps) {
  const classes = sideClasses[side];

  return (
    <Reveal>
      <div className="aspect-[2/1] w-full overflow-clip bg-olive/20 lg:aspect-[21/9]">
        <ZoomImage src={image} loading="lazy" parallax="band" className="h-full w-full object-cover" />
      </div>
      {/* The box lands on the photo a moment after the photo itself. */}
      <Reveal delayMs={60} className={`relative mx-2 -mt-12 sm:mx-6 lg:-mt-48 lg:w-[46%] ${classes.box}`}>
        <div className="relative overflow-hidden bg-olive px-8 pb-8 pt-7 text-white lg:p-12">
          <Topography
            className={`pointer-events-none absolute h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 text-white/[0.09] ${classes.pattern}`}
          />
          <div className="relative">
            <h2 className="text-h2 lg:text-[38px] lg:leading-[1.12]">{heading}</h2>
            <p className="mt-3 text-copy lg:mt-4 lg:text-lead">{text}</p>
            {children}
          </div>
        </div>
      </Reveal>
    </Reveal>
  );
}

export function PromoSection() {
  return (
    <section className="py-14 lg:py-24">
      <div className="mx-auto max-w-content space-y-8 sm:px-6 lg:space-y-20 lg:px-8">
        <PromoBox
          side="left"
          image={companyPhotos.kabeltrumma}
          heading="Hela markarbetet hos en entreprenör"
          text="Som totalentreprenör tar vi helhetsansvaret – från schaktning och dränering till grundläggning, VA-arbeten och färdig mark. Du får en kontaktperson genom hela projektet."
        >
          <Link href="/tjanster/totalentreprenad" className={promoPillClasses}>
            Läs mer om totalentreprenad
          </Link>
        </PromoBox>

        <PromoBox
          side="right"
          image={pexelsPhoto(29735767, 1600)}
          heading="Ska du bygga nytt eller bygga till?"
          text="Vi tar hand om markarbetet inför bygget – schakt, grundläggning och VA – och samordnar vid behov arbetet med övriga entreprenörer i projektet."
        >
          <QuoteTrigger className={promoPillClasses}>Få en kostnadsfri offert</QuoteTrigger>
        </PromoBox>
      </div>
    </section>
  );
}
