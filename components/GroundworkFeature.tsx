import { Reveal } from "./Reveal";
import { ArrowLabel, arrowLinkClasses } from "./Button";
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
  return (
    <section className="relative isolate overflow-hidden bg-olive-dark text-center text-white">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={companyPhotos.arbete}
        alt=""
        loading="lazy"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-black/55 via-black/65 to-black/80" />

      <div className="mx-auto max-w-[1040px] px-[18px] py-16 sm:px-6 lg:py-28">
        <Reveal className="mx-auto max-w-[760px]">
          <h2 className="text-balance text-display lg:text-[56px] lg:leading-[1.06]">Ett bygge är aldrig starkare än sin grund</h2>
          <p className="mt-3 text-copy lg:mt-5 lg:text-lead">
            Därför lägger vi stor vikt vid fackmannamässigt utförande i varje moment – från första spadtaget till färdig
            yta.
          </p>
        </Reveal>

        {/* The two points sit side by side under a thin rule, split by a vertical line (stacked on mobile). */}
        <div className="mt-10 grid divide-y divide-white/25 border-t border-white/25 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:mt-16">
          {blocks.map((block, index) => (
            <Reveal
              key={block.heading}
              delayMs={index * 120}
              className="py-10 last:pb-0 sm:px-8 sm:pb-0 lg:px-12 lg:pt-12"
            >
              <h3 className="text-h3 lg:text-[26px]">{block.heading}</h3>
              <p className="mt-4 text-copy lg:text-lead">{block.text}</p>
              <a href={block.link.href} className={arrowLinkClasses("white", "mt-5")}>
                <ArrowLabel>{block.link.label}</ArrowLabel>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
