import { QuoteTrigger } from "./QuoteTrigger";
import { hero } from "@/lib/content";

export function Hero() {
  return (
    // The photo fills the whole first screen on every device; a soft neutral shade at the bottom keeps the text readable.
    <section className="relative isolate flex min-h-[calc(100svh-4rem)] items-end overflow-hidden bg-olive sm:min-h-[calc(100svh-5rem)]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={hero.image} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover object-[58%_center]" />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
      />

      <div className="mx-auto w-full max-w-content px-4 pb-12 pt-32 [text-shadow:0_1px_14px_rgba(0,0,0,0.35)] sm:px-6 sm:pb-16 lg:px-8 lg:pb-20">
        <p className="text-tag uppercase text-white/85 lg:text-[14px]">{hero.eyebrow}</p>
        <h1 className="mt-3 max-w-4xl text-display text-white lg:mt-5 lg:text-display-lg xl:text-[76px] xl:leading-[1.04] 2xl:max-w-5xl 2xl:text-[88px]">
          {hero.heading}
        </h1>
        <p className="mt-4 max-w-2xl text-copy text-white lg:mt-5 lg:text-[22px] lg:leading-[1.4] 2xl:text-[24px]">
          {hero.subheading}
        </p>
        <QuoteTrigger className="mt-6 inline-flex items-center rounded-full bg-white px-5 py-2.5 text-[14px] font-bold uppercase tracking-[0.08em] text-olive [text-shadow:none] transition-colors duration-200 hover:bg-sand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white lg:mt-8">
          Begär offert
        </QuoteTrigger>
      </div>
    </section>
  );
}
