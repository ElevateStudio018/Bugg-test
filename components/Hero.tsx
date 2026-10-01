import { QuoteTrigger } from "./QuoteTrigger";
import { buttonClasses } from "./Button";
import { hero } from "@/lib/content";

export function Hero() {
  return (
    // Mobile: photo on top, text block below. Desktop: the photo fills the whole first screen behind the text.
    <section className="relative isolate bg-olive lg:flex lg:min-h-[calc(100svh-5rem)] lg:items-center">
      <div className="relative aspect-[5/3] w-full overflow-hidden sm:aspect-[2/1] lg:absolute lg:inset-0 lg:-z-10 lg:aspect-auto">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={hero.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div
          aria-hidden="true"
          className="absolute inset-0 hidden bg-gradient-to-r from-olive/95 via-olive/65 to-olive/15 lg:block"
        />
      </div>

      <div className="mx-auto w-full max-w-content px-4 pb-8 pt-6 sm:px-6 sm:pb-14 sm:pt-10 lg:px-8 lg:py-24">
        <p className="text-tag uppercase text-white/75 lg:text-[14px]">{hero.eyebrow}</p>
        <h1 className="mt-3 max-w-4xl text-display text-white lg:mt-6 lg:text-display-lg xl:text-[76px] xl:leading-[1.04] 2xl:max-w-5xl 2xl:text-[88px]">
          {hero.heading}
        </h1>
        <p className="mt-5 max-w-2xl text-copy text-white/90 lg:mt-6 lg:text-[22px] lg:leading-[1.4] 2xl:text-[24px]">{hero.subheading}</p>
        <QuoteTrigger className={buttonClasses("white", "mt-7 lg:mt-10")}>Få en kostnadsfri offert</QuoteTrigger>
      </div>
    </section>
  );
}
