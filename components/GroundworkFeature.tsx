import { Reveal } from "./Reveal";
import { ArrowLabel } from "./Button";
import workPhoto from "@/assets/photos/markmontage-arbete.webp";

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
    // Mobile: photo on top fading into the green. Desktop: the photo fills the section, text sits on the darker lower part.
    <section className="relative isolate overflow-hidden bg-olive text-white">
      <div className="relative aspect-[4/3] w-full sm:aspect-[16/9] lg:absolute lg:inset-0 lg:-z-10 lg:aspect-auto">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={workPhoto.src}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover object-[center_35%]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-olive via-olive/20 to-transparent lg:from-30% lg:via-olive/70 lg:to-olive/5"
        />
      </div>

      <div className="relative mx-auto -mt-10 max-w-content px-4 pb-14 sm:px-6 lg:mt-0 lg:flex lg:min-h-[880px] lg:flex-col lg:justify-end lg:px-8 lg:pb-20 lg:pt-80">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-end lg:gap-16">
          <Reveal>
            <p className="text-tag uppercase text-white/70">Vårt arbetssätt</p>
            <h2 className="mt-4 text-display lg:text-[52px] lg:leading-[1.06]">Ett bygge är aldrig starkare än sin grund</h2>
            <p className="mt-5 max-w-xl text-copy text-white/85 lg:text-lead">
              Därför lägger vi stor vikt vid fackmannamässigt utförande i varje moment – från första spadtaget till färdig
              yta.
            </p>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {blocks.map((block, index) => (
              <Reveal key={block.heading} delayMs={index * 100} className="h-full">
                <a
                  href={block.link.href}
                  className="group/arrow flex h-full flex-col bg-white/[0.07] p-6 ring-1 ring-inset ring-white/15 backdrop-blur-md transition-colors duration-200 hover:bg-white/[0.13] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white lg:p-8"
                >
                  <span className="text-tag text-white/55">0{index + 1}</span>
                  <h3 className="mt-5 text-h3">{block.heading}</h3>
                  <p className="mt-3 text-copy text-white/80">{block.text}</p>
                  <span className="mt-auto pt-6 text-label uppercase">
                    <ArrowLabel>{block.link.label}</ArrowLabel>
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
