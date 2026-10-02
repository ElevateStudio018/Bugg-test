import { QuoteTrigger } from "./QuoteTrigger";
import { ArrowLabel, buttonClasses } from "./Button";
import { ZoomImage } from "./ZoomImage";
import { hero } from "@/lib/content";
import { responsiveImage } from "@/lib/photos";

export function Hero() {
  return (
    // The photo fills the first screen on every device under an even dark filter. The white text sits near the
    // bottom on phones and tablets, and just below the middle on the left on desktop.
    <section className="relative isolate flex min-h-[calc(100svh-4rem)] flex-col overflow-hidden bg-olive-dark sm:min-h-[calc(100svh-5rem)]">
      <ZoomImage
        {...responsiveImage(hero.image, "100vw")}
        priority
        parallax="top"
        className="absolute inset-0 -z-10 h-full w-full object-cover object-[74%_center] lg:object-[75%_55%]"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/45" />

      <div className="mx-auto mt-auto w-full max-w-content px-4 pb-12 sm:px-6 sm:pb-16 lg:my-auto lg:px-8 lg:pb-0 lg:pt-[8svh]">
        {/* Eyebrow, heading and button rise into place one after another as the page loads. */}
        <p className="animate-rise text-tag uppercase text-white/85 [animation-delay:150ms] lg:text-[14px]">{hero.eyebrow}</p>
        <h1 className="mt-4 max-w-[9.5em] animate-rise [animation-delay:300ms] text-[36px] font-semibold leading-[1.04] tracking-[-0.02em] text-white min-[380px]:text-[40px] sm:text-[56px] lg:mt-6 lg:text-[52px] xl:text-[64px] 2xl:text-[88px]">
          {hero.heading}
        </h1>
        <div className="animate-rise [animation-delay:450ms]">
          <QuoteTrigger className={buttonClasses("olive", "group/arrow mt-8 focus-visible:outline-white lg:mt-10")}>
            <span>
              <ArrowLabel spaced>Begär offert</ArrowLabel>
            </span>
          </QuoteTrigger>
        </div>
      </div>

      {/* Desktop: a thin line at the bottom with a light running down it, a hint that the page goes on. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-8 hidden justify-center lg:flex">
        <div className="animate-rise [animation-delay:900ms]">
          <div className="relative h-14 w-px overflow-hidden bg-white/25">
            <span className="absolute inset-x-0 top-0 h-1/2 animate-scroll-cue bg-white" />
          </div>
        </div>
      </div>
    </section>
  );
}
