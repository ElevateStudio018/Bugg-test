import { Reveal } from "./Reveal";
import { ArrowLabel, arrowLinkClasses } from "./Button";
import { pexelsPhoto } from "@/lib/pexels";

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
        src={pexelsPhoto(14651, 1920)}
        alt=""
        loading="lazy"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/55" />

      <div className="mx-auto max-w-[760px] px-[18px] py-16 sm:px-6 lg:py-28">
        <Reveal>
          <h2 className="text-display lg:text-[52px] lg:leading-[1.08]">Ett bygge är aldrig starkare än sin grund</h2>
          <p className="mt-3 text-copy lg:mt-5 lg:text-lead">
            Därför lägger vi stor vikt vid fackmannamässigt utförande i varje moment – från första spadtaget till färdig
            yta.
          </p>
        </Reveal>

        {blocks.map((block) => (
          <Reveal key={block.heading} className="mt-12 lg:mt-16">
            <h3 className="text-h3 lg:text-[26px]">{block.heading}</h3>
            <p className="mt-4 text-copy lg:text-lead">{block.text}</p>
            <a href={block.link.href} className={arrowLinkClasses("white", "mt-4")}>
              <ArrowLabel>{block.link.label}</ArrowLabel>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
