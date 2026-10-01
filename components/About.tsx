import Link from "next/link";
import { Reveal } from "./Reveal";
import { ArrowLabel, arrowLinkClasses } from "./Button";
import { about } from "@/lib/content";

export function About() {
  return (
    <section id="om-oss" className="scroll-mt-20 bg-cream">
      <div className="mx-auto grid max-w-content grid-cols-1 gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16 lg:px-8 lg:py-28">
        <Reveal>
          <h2 className="text-h2 text-ink lg:text-h2-lg">{about.heading}</h2>
          <Link href="/om-oss" className={arrowLinkClasses("ink", "mt-0.5 lg:mt-2")}>
            <ArrowLabel>Mer om oss</ArrowLabel>
          </Link>
          <p className="mt-6 text-copy font-semibold text-ink lg:text-[22px]">{about.subheading}</p>
          <p className="mt-4 text-copy text-coal">{about.paragraphs[0]}</p>
        </Reveal>

        <Reveal delayMs={120} className="lg:pt-2">
          <div className="relative aspect-[4/3] overflow-hidden bg-olive/20 lg:aspect-[4/5]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={about.image} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
