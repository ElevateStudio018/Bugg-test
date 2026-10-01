import { QuoteTrigger } from "./QuoteTrigger";
import { ArrowLabel, buttonClasses } from "./Button";
import { hero } from "@/lib/content";

export function Hero() {
  return (
    // Desktop: the photo fills the first screen under an even dark filter; the text sits just below the middle
    // on the left, in white.
    // Phones and tablets: the text sits on a sky-coloured top (matched to the photo) and the photo fills the
    // rest below, fading in at its top edge, so the crew stays in view instead of a tight crop.
    <section className="relative isolate flex min-h-[calc(100svh-4rem)] flex-col overflow-hidden bg-gradient-to-b from-[#bcc3d1] to-[#adb6c8] sm:min-h-[calc(100svh-5rem)]">
      <div className="mx-auto w-full max-w-content px-4 pt-10 sm:px-6 sm:pt-14 lg:my-auto lg:px-8 lg:pt-[8svh]">
        <p className="text-tag uppercase text-olive lg:text-[14px] lg:text-white/85">
          {hero.eyebrow}
        </p>
        <h1 className="mt-4 max-w-[9.5em] text-[40px] font-semibold leading-[1.04] tracking-[-0.02em] text-olive sm:text-[56px] lg:text-white lg:mt-6 lg:text-[52px] xl:text-[64px] 2xl:text-[88px]">
          {hero.heading}
        </h1>
        <QuoteTrigger
          className={buttonClasses(
            "olive",
            "group/arrow mt-8 lg:mt-10 lg:focus-visible:outline-white",
          )}
        >
          <span>
            <ArrowLabel spaced>Begär offert</ArrowLabel>
          </span>
        </QuoteTrigger>
      </div>

      <div className="relative mt-4 min-h-[300px] flex-1 lg:absolute lg:inset-0 lg:-z-10 lg:mt-0 lg:min-h-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={hero.image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-[72%_bottom] [mask-image:linear-gradient(to_bottom,transparent,black_35%)] lg:object-[75%_55%] lg:[mask-image:none]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 hidden bg-black/45 lg:block"
        />
      </div>
    </section>
  );
}
