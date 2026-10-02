import { DropPin } from "./DropPin";
import { Reveal } from "./Reveal";
import { ArrowLabel, arrowLinkClasses } from "./Button";
import { company } from "@/lib/content";

// By coordinates rather than the address text, which Google has placed in Norway.
const { lat, lng } = company.address.geo;
const mapEmbedSrc = `https://www.google.com/maps?q=${lat},${lng}&z=11&hl=sv&output=embed`;
const mapLinkHref = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

export function MapSection() {
  return (
    <section aria-labelledby="har-finns-vi">
      <div className="mx-auto max-w-content px-4 pb-10 text-center sm:px-6 lg:px-8 lg:pb-14">
        <Reveal>
          <h2 id="har-finns-vi" className="text-h2 text-ink lg:text-h2-lg">
            Här finns vi
          </h2>
        </Reveal>
      </div>

      <div className="h-[420px] w-full bg-olive/20 sm:h-[480px] lg:h-[300px]">
        <iframe
          src={mapEmbedSrc}
          title={`Karta: ${company.legalName}, ${company.address.full}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-full w-full border-0"
        />
      </div>

      <div className="bg-white">
        <div className="mx-auto flex max-w-content flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p className="flex items-center gap-3 text-[18px] text-ink">
            <DropPin className="flex shrink-0" />
            Kontor: {company.address.full}
          </p>
          <a href={mapLinkHref} target="_blank" rel="noopener noreferrer" className={arrowLinkClasses("ink")}>
            <ArrowLabel>Öppna i Google Maps</ArrowLabel>
          </a>
        </div>
      </div>
    </section>
  );
}
