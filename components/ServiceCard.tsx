import Link from "next/link";
import { ArrowLabel } from "./Button";
import { Photo } from "./Photo";
import type { Service } from "@/lib/services";

export function ServiceCard({ service, wide = false }: { service: Service; wide?: boolean }) {
  return (
    // On hover a thin olive line also slides in along the bottom of the card, like the line under the links.
    <Link
      href={`/tjanster/${service.slug}`}
      className="group group/arrow relative flex h-full flex-col bg-cream after:absolute after:inset-x-0 after:bottom-0 after:h-[3px] after:origin-left after:scale-x-0 after:bg-olive after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-olive"
    >
      <div className={`relative overflow-hidden bg-olive/20 ${wide ? "aspect-square md:aspect-[2/1]" : "aspect-square"}`}>
        <Photo
          src={service.image}
          className="absolute inset-0 h-full w-full object-cover group-hover:scale-[1.04]"
          transition="transform 700ms ease-out"
          style={{ objectPosition: service.imageFocus }}
        />
      </div>
      <div className="flex flex-1 flex-col justify-between gap-6 px-6 py-6 sm:px-8 sm:py-8">
        <h3 className="text-h3 text-ink">{service.name}</h3>
        <span className="text-label uppercase text-ink transition-colors duration-200 group-hover:text-olive">
          <ArrowLabel spaced>{`Läs mer om ${service.name}`}</ArrowLabel>
        </span>
      </div>
    </Link>
  );
}
