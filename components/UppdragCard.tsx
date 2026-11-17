"use client";

import { useState } from "react";
import { Icon } from "./Icon";
import { Photo } from "./Photo";
import { SiteLink } from "./SiteLink";
import { UppdragGallery } from "./UppdragGallery";
import { focusStyle, imageProps } from "@/lib/site/images.ts";
import type { Uppdrag } from "@/lib/site/schema.ts";

const cardClasses =
  "group relative block aspect-[4/5] w-full overflow-hidden bg-primary text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

/**
 * A project card. With photos of its own it opens them, in order, over the page; otherwise it links to the service.
 * With the project's id its parts carry their places in the content (lib/site/edit.ts).
 */
export function UppdragCard({ item }: { item: Uppdrag & { id?: string } }) {
  const [open, setOpen] = useState(false);
  const base = item.id ? `uppdrag.items.${item.id}` : undefined;
  const gallery = item.gallery ?? [];

  const inside = (
    <>
      <Photo
        {...imageProps(item.image, "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 85vw")}
        alt={item.image.alt}
        k={base && `${base}.image`}
        className="absolute inset-0 h-full w-full object-cover group-hover:scale-[1.04]"
        transition="transform 700ms ease-out"
        style={focusStyle(item.image)}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/25" aria-hidden="true" />
      <span data-k={base && `${base}.tag`} className="absolute left-0 top-0 bg-accent px-4 py-[11px] text-tag uppercase text-on-primary">
        {item.tag}
      </span>
      {gallery.length > 0 && (
        <span className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-black/55 px-3 py-1.5 text-[13px] font-semibold text-white">
          <Icon name="Images" className="h-4 w-4" />
          {gallery.length} bilder
        </span>
      )}
      <h3
        data-k={base && `${base}.title`}
        className="absolute inset-x-0 bottom-8 px-6 text-center text-[26px] font-semibold leading-tight text-white sm:bottom-10"
      >
        {item.title}
      </h3>
    </>
  );

  if (gallery.length === 0) {
    return (
      <SiteLink href={item.href} k={base} className={cardClasses}>
        {inside}
      </SiteLink>
    );
  }

  return (
    <>
      <button type="button" data-k={base} onClick={() => setOpen(true)} aria-haspopup="dialog" className={cardClasses}>
        {inside}
      </button>
      {open && <UppdragGallery title={item.title} tag={item.tag} images={gallery} href={item.href} base={base} onClose={() => setOpen(false)} />}
    </>
  );
}
