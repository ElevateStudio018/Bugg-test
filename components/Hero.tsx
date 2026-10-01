import { QuoteTrigger } from "./QuoteTrigger";
import { ArrowLabel, buttonClasses } from "./Button";
import { hero } from "@/lib/content";

export function Hero() {
  return (
    // The photo fills the first screen on every device under an even dark filter; the text sits just below the
    // middle on the left, in white.
    <section className="relative isolate flex min-h-[calc(100svh-4rem)] flex-col overflow-hidden bg-olive-dark sm:min-h-[calc(100svh-5rem)]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={hero.image}
        alt=""
        className="absolute inset-0 -z-10 h-full w-full object-cover object-[74%_center] lg:object-[75%_55%]"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/45" />

      <div className="mx-auto my-auto w-full max-w-content px-4 pt-[14svh] sm:px-6 lg:px-8 lg:pt-[8svh]">
        <p className="text-tag uppercase text-white/85 lg:text-[14px]">{hero.eyebrow}</p>
        <h1 className="mt-4 max-w-[9.5em] text-[36px] font-semibold leading-[1.04] tracking-[-0.02em] text-white min-[380px]:text-[40px] sm:text-[56px] lg:mt-6 lg:text-[52px] xl:text-[64px] 2xl:text-[88px]">
          {hero.heading}
        </h1>
        <QuoteTrigger className={buttonClasses("olive", "group/arrow mt-8 focus-visible:outline-white lg:mt-10")}>
          <span>
            <ArrowLabel spaced>Begär offert</ArrowLabel>
          </span>
        </QuoteTrigger>
      </div>
    </section>
  );
}
