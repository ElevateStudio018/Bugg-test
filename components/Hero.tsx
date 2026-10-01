import { QuoteTrigger } from "./QuoteTrigger";
import { ArrowLabel, buttonClasses } from "./Button";
import { hero } from "@/lib/content";

export function Hero() {
  return (
    // The photo fills the whole first screen. A light wash on the text side (the top on phones, the left on
    // desktop) keeps the dark heading readable while the work itself stays clear on the other side.
    <section className="relative isolate flex min-h-[calc(100svh-4rem)] items-start overflow-hidden bg-cream sm:min-h-[calc(100svh-5rem)] lg:items-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={hero.image} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover object-[58%_center] lg:origin-left lg:scale-[1.12]" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-cream/95 via-cream/85 via-35% to-transparent to-[58%] lg:bg-gradient-to-r lg:via-cream/80 lg:via-[38%] lg:to-[66%] lg:[mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)]"
      />

      <div className="mx-auto w-full max-w-content px-4 pb-16 pt-12 sm:px-6 sm:pt-16 lg:px-8 lg:pb-24 lg:pt-16">
        <p className="text-tag uppercase text-moss lg:text-[14px]">{hero.eyebrow}</p>
        <h1 className="mt-4 max-w-[9.5em] text-[40px] font-semibold leading-[1.04] tracking-[-0.02em] text-olive sm:text-[56px] lg:mt-6 lg:text-[64px] xl:text-[72px] 2xl:text-[88px]">
          {hero.heading}
        </h1>
        <QuoteTrigger className={buttonClasses("olive", "group/arrow mt-8 lg:mt-10")}>
          <span>
            <ArrowLabel spaced>Begär offert</ArrowLabel>
          </span>
        </QuoteTrigger>
      </div>
    </section>
  );
}
