"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Icon } from "./Icon";
import { SiteLink } from "./SiteLink";
import { imageProps } from "@/lib/site/images.ts";
import type { SiteImage } from "@/lib/site/schema.ts";

/**
 * A project's photos, one at a time over the page, in the order the work was done: arrows, a swipe or the arrow keys
 * move between them, the small pictures below jump straight to one, and Escape or the cross closes it.
 */
export function UppdragGallery({
  title,
  tag,
  images,
  href,
  base,
  onClose,
}: {
  title: string;
  tag: string;
  images: SiteImage[];
  href: string;
  /** The project's place in the content, for the photos' data-k (lib/site/edit.ts). */
  base?: string;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(0);
  const closeRef = useRef<HTMLButtonElement>(null);
  const start = useRef<number | null>(null);
  const count = images.length;
  const go = useCallback((step: number) => setIndex((current) => (current + step + count) % count), [count]);

  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") go(1);
      if (event.key === "ArrowLeft") go(-1);
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      previousFocus?.focus();
    };
  }, [go, onClose]);

  const image = images[index];
  const arrow =
    "absolute top-1/2 z-10 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white transition hover:bg-black/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white";

  return createPortal(
    <div role="dialog" aria-modal="true" aria-label={title} className="fixed inset-0 z-[70] flex flex-col bg-[#0d120b]/95 text-white">
      <div className="flex items-start justify-between gap-4 px-4 pb-2 pt-4 sm:px-6">
        <div className="min-w-0">
          <p className="text-tag uppercase text-white/60">{tag}</p>
          <h2 className="mt-1 truncate text-h3">{title}</h2>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <span className="text-small tabular-nums text-white/70" aria-live="polite">
            {index + 1} / {count}
          </span>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Stäng bilderna"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
          >
            <Icon name="X" className="h-6 w-6" />
          </button>
        </div>
      </div>

      <div
        className="relative min-h-0 flex-1 touch-pan-y select-none"
        onPointerDown={(event) => (start.current = event.clientX)}
        onPointerUp={(event) => {
          if (start.current === null) return;
          const moved = event.clientX - start.current;
          start.current = null;
          if (Math.abs(moved) > 40) go(moved < 0 ? 1 : -1);
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={image.src}
          {...imageProps(image, "100vw")}
          alt={image.alt}
          data-k={base && `${base}.gallery.${index}`}
          draggable={false}
          className="absolute inset-0 m-auto h-full w-full animate-rise-fast object-contain px-2 sm:px-20"
        />
        {count > 1 && (
          <>
            <button type="button" onClick={() => go(-1)} aria-label="Föregående bild" className={`${arrow} left-2 sm:left-5`}>
              <Icon name="ChevronLeft" className="h-7 w-7" />
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Nästa bild" className={`${arrow} right-2 sm:right-5`}>
              <Icon name="ChevronRight" className="h-7 w-7" />
            </button>
          </>
        )}
      </div>

      <div className="px-4 pb-5 pt-3 sm:px-6">
        {image.alt && <p className="mx-auto max-w-3xl text-center text-small text-white/80">{image.alt}</p>}
        {count > 1 && (
          <ul className="no-scrollbar mx-auto mt-3 flex max-w-full justify-center gap-2 overflow-x-auto" aria-label="Alla bilder">
            {images.map((thumb, position) => (
              <li key={thumb.src} className="shrink-0">
                <button
                  type="button"
                  onClick={() => setIndex(position)}
                  aria-label={`Bild ${position + 1}`}
                  aria-current={position === index ? "true" : undefined}
                  className={`block h-14 w-20 overflow-hidden rounded-md ring-2 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-white ${
                    position === index ? "opacity-100 ring-white" : "opacity-55 ring-transparent hover:opacity-90"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img {...imageProps(thumb, "80px")} alt="" loading="lazy" className="h-full w-full object-cover" />
                </button>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-4 text-center">
          <SiteLink
            href={href}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border-[1.5px] border-white/60 px-6 text-label uppercase transition hover:bg-white hover:text-black"
          >
            Läs mer om tjänsten
          </SiteLink>
        </div>
      </div>
    </div>,
    document.body,
  );
}
