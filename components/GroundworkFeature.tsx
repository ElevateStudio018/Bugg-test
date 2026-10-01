"use client";

import { Reveal } from "./Reveal";
import { Icon } from "./Icon";
import { useInView, usePrefersReducedMotion } from "@/hooks/useInView";
import { companyPhotos } from "@/lib/photos";

// Restates claims the site already makes (About, the process steps and the service pages).
const blocks = [
  {
    heading: "Tydligt från start",
    text: "Vid ett kostnadsfritt hembesök går vi igenom förutsättningarna på plats. Därefter får du en fast offert, så att du vet vad som ingår innan något arbete påbörjas.",
    link: { href: "#process", label: "Så går det till" },
  },
  {
    heading: "Anpassat efter marken",
    text: "Varje uppdrag anpassas efter förhållandena på platsen – från lera och berg till mer lättarbetad mark, och efter markens bärighet och grundvatten.",
    link: { href: "#tjanster", label: "Se våra tjänster" },
  },
];

export function GroundworkFeature() {
  const { ref, isInView } = useInView<HTMLDivElement>(0.15);
  const reducedMotion = usePrefersReducedMotion();
  // The photo settles from a slight zoom as the panel scrolls into view.
  const photoScale = reducedMotion || isInView ? "scale-100" : "scale-[1.08]";

  return (
    // An inset, rounded panel with the company photo as its background; heading and glass cards float on top.
    <section className="px-3 py-3 sm:px-4 sm:py-4 lg:px-6 lg:py-6">
      <div
        ref={ref}
        className="relative isolate mx-auto flex max-w-[1680px] flex-col overflow-hidden rounded-[22px] bg-olive-dark text-white lg:min-h-[min(880px,calc(100svh-8rem))] lg:rounded-[32px]"
      >
        <div className="relative aspect-square overflow-hidden sm:aspect-[16/10] lg:absolute lg:inset-0 lg:-z-10 lg:aspect-auto">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={companyPhotos.arbete}
            alt=""
            loading="lazy"
            className={`absolute inset-0 h-full w-full object-cover object-[22%_center] transition-transform duration-[1800ms] ease-out sm:object-[center_40%] ${photoScale}`}
          />
          {/* Mobile: the photo fades into the panel. Desktop: darker along the bottom and the left, where the text sits. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-olive-dark via-olive-dark/20 to-transparent lg:from-olive-dark/95 lg:via-olive-dark/65 lg:via-40% lg:to-transparent lg:to-75%"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 hidden bg-gradient-to-r from-olive-dark/60 via-olive-dark/10 via-50% to-transparent lg:block"
          />
        </div>

        <p className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-olive-dark/60 px-3.5 py-2 text-[12px] font-bold uppercase tracking-[0.16em] ring-1 ring-inset ring-white/20 backdrop-blur-md sm:left-6 sm:top-6 lg:left-12 lg:top-12">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-white" />
          Vårt arbetssätt
        </p>

        <div className="relative -mt-16 grid gap-8 px-5 pb-5 sm:-mt-24 sm:px-8 sm:pb-8 lg:mt-auto lg:grid-cols-[minmax(0,1fr)_340px] lg:items-end lg:gap-12 lg:p-12 xl:grid-cols-[minmax(0,1fr)_400px] xl:gap-16 2xl:grid-cols-[minmax(0,1fr)_420px]">
          <Reveal>
            <h2 className="text-balance text-[34px] [text-shadow:0_2px_24px_rgba(0,0,0,0.3)] font-semibold leading-[1.04] tracking-[-0.025em] sm:text-[44px] lg:text-[52px] xl:text-[60px] 2xl:text-[72px]">
              Ett bygge är aldrig starkare <span className="text-white/55">än sin grund.</span>
            </h2>
            <p className="mt-5 max-w-md text-copy leading-[1.4] text-white/75 lg:mt-6 lg:text-lead lg:leading-[1.45]">
              Därför lägger vi stor vikt vid fackmannamässigt utförande i varje moment – från första spadtaget till färdig
              yta.
            </p>
          </Reveal>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {blocks.map((block, index) => (
              <Reveal key={block.heading} delayMs={index * 120} className="h-full">
                <a
                  href={block.link.href}
                  className="group flex h-full flex-col rounded-2xl bg-white/[0.06] p-5 ring-1 ring-inset ring-white/15 backdrop-blur-xl transition-colors duration-300 hover:bg-white/[0.12] lg:bg-olive-dark/55 lg:hover:bg-olive/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:p-6"
                >
                  <span className="text-[13px] font-semibold tracking-[0.1em] text-white/55">0{index + 1}</span>
                  <h3 className="mt-3 text-h3">{block.heading}</h3>
                  <p className="mt-2 text-[16px] leading-[1.45] text-white/75">{block.text}</p>
                  <span className="mt-auto flex items-center justify-between gap-4 pt-5 text-[13px] font-bold uppercase tracking-[0.14em]">
                    {block.link.label}
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-olive transition-transform duration-300 group-hover:rotate-45">
                      <Icon name="ArrowUpRight" className="h-5 w-5" />
                    </span>
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
