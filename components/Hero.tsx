import { QuoteTrigger } from "./QuoteTrigger";
import { ArrowLabel, buttonClasses } from "./Button";
import { hero } from "@/lib/content";

export function Hero() {
  return (
    // Desktop: the photo fills the first screen and the text sits on its open sky, top left.
    // Phones and tablets: the text sits on a sky-coloured top (matched to the photo) and the photo fills the
    // rest below, fading in at its top edge, so the whole excavator stays in view instead of a tight crop.
    <section className="relative isolate flex min-h-[calc(100svh-4rem)] flex-col overflow-hidden bg-gradient-to-b from-[#c3d8f1] to-[#a9c6ea] sm:min-h-[calc(100svh-5rem)]">
      <div className="mx-auto w-full max-w-content px-4 pt-10 sm:px-6 sm:pt-14 lg:px-8 lg:pt-[13svh]">
        <p className="text-tag uppercase text-moss lg:text-[14px]">{hero.eyebrow}</p>
        <h1 className="mt-4 max-w-[9.5em] text-[40px] font-semibold leading-[1.04] tracking-[-0.02em] text-olive sm:text-[56px] lg:mt-6 xl:text-[72px] 2xl:text-[88px]">
          {hero.heading}
        </h1>
        <QuoteTrigger className={buttonClasses("olive", "group/arrow mt-8 lg:mt-10")}>
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
          className="absolute inset-0 h-full w-full object-cover object-[86%_bottom] [mask-image:linear-gradient(to_bottom,transparent,black_35%)] lg:object-[70%_65%] lg:[mask-image:none]"
        />
      </div>
    </section>
  );
}
