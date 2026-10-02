import { Reveal } from "./Reveal";
import { DrawIcon } from "./DrawIcon";
import type { IconKey } from "./Icon";
import { Photo } from "./Photo";
import { ArrowLabel, buttonClasses } from "./Button";
import { ZoomImage } from "./ZoomImage";
import { companyPhotos } from "@/lib/photos";

interface Block {
  heading: string;
  text: string;
  icon: IconKey;
  link: { href: string; label: string };
  photo: string;
  /** Part of the photo to keep in the card (CSS object-position). */
  focus: string;
}

// Restates claims the site already makes (About, the process steps and the service pages).
const blocks: Block[] = [
  {
    heading: "Tydligt från start",
    text: "Vid ett kostnadsfritt hembesök går vi igenom förutsättningarna på plats. Därefter får du en fast offert, så att du vet vad som ingår innan något arbete påbörjas.",
    icon: "Home",
    link: { href: "#process", label: "Så går det till" },
    photo: companyPhotos.arbete,
    focus: "20% 45%",
  },
  {
    heading: "Anpassat efter marken",
    text: "Varje uppdrag anpassas efter förhållandena på platsen – från lera och berg till mer lättarbetad mark, och efter markens bärighet och grundvatten.",
    icon: "Layers",
    link: { href: "#tjanster", label: "Se våra tjänster" },
    photo: companyPhotos.minigravare,
    focus: "88% 70%",
  },
];

export function GroundworkFeature() {
  return (
    <section>
      {/* Photo band: heading on the darker left side, the work itself on the right. */}
      <div className="relative isolate overflow-clip bg-olive-dark text-white">
        <ZoomImage
          src={companyPhotos.gravmaskinRor}
          loading="lazy"
          parallax="band"
          className="absolute inset-0 -z-10 h-full w-full object-cover object-[72%_35%] lg:object-[60%_75%]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-r from-black/80 via-black/60 to-black/45 lg:via-black/45 lg:to-black/5"
        />

        <div className="mx-auto max-w-content px-4 pb-24 pt-14 sm:px-6 lg:px-8 lg:pb-44 lg:pt-24">
          <Reveal className="max-w-[560px] lg:max-w-[640px]">
            <h2 className="text-balance text-display lg:text-[56px] lg:leading-[1.06]">Ett bygge är aldrig starkare än sin grund</h2>
            <p className="mt-4 text-copy text-white/90 lg:mt-6 lg:text-lead">
              Därför lägger vi stor vikt vid fackmannamässigt utförande i varje moment – från första spadtaget till färdig
              yta.
            </p>
          </Reveal>
        </div>
      </div>

      {/* The two points as cards that overlap the bottom of the photo band. */}
      <div className="relative mx-auto -mt-12 max-w-content px-3 sm:px-6 lg:-mt-28 lg:px-8">
        <div className="grid gap-4 lg:gap-6 xl:grid-cols-2">
          {blocks.map((block, index) => (
            <Reveal key={block.heading} delayMs={index * 100} className="h-full">
              <article className="flex h-full flex-col bg-cream sm:flex-row">
                <div className="flex flex-1 flex-col p-6 sm:p-8 lg:p-10">
                  <div className="flex items-center gap-4">
                    <DrawIcon
                      name={block.icon}
                      delayMs={350 + index * 120}
                      className="flex h-12 w-12 shrink-0 items-center justify-center bg-olive text-white"
                      iconClassName="h-6 w-6"
                    />
                    <h3 className="text-h3 text-ink">{block.heading}</h3>
                  </div>
                  <p className="mt-5 text-copy leading-[1.4] text-coal">{block.text}</p>
                  <div className="mt-auto pt-7">
                    <a href={block.link.href} className={buttonClasses("olive", "group/arrow")}>
                      <span>
                        <ArrowLabel spaced>{block.link.label}</ArrowLabel>
                      </span>
                    </a>
                  </div>
                </div>

                {/* Beside the text, cut on the diagonal along its left edge. Left out on phones, where the cards follow straight on. */}
                <div className="relative hidden sm:block sm:w-[40%] sm:shrink-0 sm:[clip-path:polygon(18%_0,100%_0,100%_100%,0_100%)]">
                  <Photo
                    src={block.photo}
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{ objectPosition: block.focus }}
                  />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
