import Link from "next/link";
import { ArrowLabel } from "./Button";
import type { Service } from "@/lib/services";

export function ServiceCard({ service, wide = false }: { service: Service; wide?: boolean }) {
  return (
    <Link
      href={`/tjanster/${service.slug}`}
      className="group group/arrow flex h-full flex-col bg-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-olive"
    >
      <div className={`relative overflow-hidden bg-olive/20 ${wide ? "aspect-square md:aspect-[2/1]" : "aspect-square"}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={service.image}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex flex-1 flex-col justify-between gap-6 px-6 py-7 sm:px-8 sm:py-8">
        <h3 className="text-h3 text-ink">{service.name}</h3>
        <span className="text-label uppercase text-ink transition-colors duration-200 group-hover:text-moss">
          <ArrowLabel>{`Läs mer om ${service.name}`}</ArrowLabel>
        </span>
      </div>
    </Link>
  );
}
