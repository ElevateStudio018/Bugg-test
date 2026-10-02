import Link from "next/link";
import { Photo } from "./Photo";
import type { UppdragItem } from "@/lib/uppdrag";

export function UppdragCard({ item }: { item: UppdragItem }) {
  return (
    <Link
      href={`/tjanster/${item.serviceSlug}`}
      className="group relative block aspect-[4/5] overflow-hidden bg-olive focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-olive"
    >
      <Photo
        src={item.image}
        srcSet={item.imageSrcSet}
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 85vw"
        className="absolute inset-0 h-full w-full object-cover group-hover:scale-[1.04]"
        transition="transform 700ms ease-out"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/25" aria-hidden="true" />
      <span className="absolute left-0 top-0 bg-olive px-4 py-[11px] text-tag uppercase text-white">{item.tag}</span>
      <h3 className="absolute inset-x-0 bottom-8 px-6 text-center text-[26px] font-semibold leading-tight text-white sm:bottom-10">
        {item.title}
      </h3>
    </Link>
  );
}
