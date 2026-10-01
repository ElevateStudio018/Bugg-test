"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import { UppdragCard } from "./UppdragCard";
import { usePrefersReducedMotion } from "@/hooks/useInView";
import type { UppdragItem } from "@/lib/uppdrag";

const GAP_PX = 16;

export function UppdragCarousel({ items }: { items: UppdragItem[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  // One dot per scroll position: every slide on mobile, fewer when 2–3 slides fit side by side.
  const [pageCount, setPageCount] = useState(items.length);
  const [activePage, setActivePage] = useState(0);

  const stepWidth = useCallback(() => {
    const slide = trackRef.current?.querySelector<HTMLElement>("[data-slide]");
    return slide ? slide.offsetWidth + GAP_PX : 1;
  }, []);

  const updateNavigation = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const maxScroll = track.scrollWidth - track.clientWidth;
    setCanPrev(track.scrollLeft > 4);
    setCanNext(track.scrollLeft < maxScroll - 4);
    const pages = Math.round(maxScroll / stepWidth()) + 1;
    setPageCount(pages);
    setActivePage(Math.min(pages - 1, Math.round(track.scrollLeft / stepWidth())));
  }, [stepWidth]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    updateNavigation();
    track.addEventListener("scroll", updateNavigation, { passive: true });
    window.addEventListener("resize", updateNavigation);
    return () => {
      track.removeEventListener("scroll", updateNavigation);
      window.removeEventListener("resize", updateNavigation);
    };
  }, [updateNavigation]);

  function step(direction: 1 | -1) {
    trackRef.current?.scrollBy({ left: direction * stepWidth(), behavior: reducedMotion ? "auto" : "smooth" });
  }

  function goTo(page: number) {
    trackRef.current?.scrollTo({ left: page * stepWidth(), behavior: reducedMotion ? "auto" : "smooth" });
  }

  const arrowClass =
    "absolute top-1/2 z-10 flex h-16 w-12 -translate-y-1/2 items-center justify-center bg-olive text-white transition-colors duration-200 hover:bg-olive-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive";

  return (
    <div>
      <div className="relative">
        <div ref={trackRef} className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto">
          {items.map((item) => (
            <div
              key={item.id}
              data-slide
              className="w-[86%] shrink-0 snap-start sm:w-[calc((100%-16px)/2)] lg:w-[calc((100%-32px)/3)]"
            >
              <UppdragCard item={item} />
            </div>
          ))}
        </div>

        {canPrev && (
          <button type="button" onClick={() => step(-1)} aria-label="Föregående uppdrag" className={`${arrowClass} left-0`}>
            <Icon name="ChevronLeft" strokeWidth={1.5} className="h-8 w-8" />
          </button>
        )}
        {canNext && (
          <button type="button" onClick={() => step(1)} aria-label="Nästa uppdrag" className={`${arrowClass} right-0`}>
            <Icon name="ChevronRight" strokeWidth={1.5} className="h-8 w-8" />
          </button>
        )}
      </div>

      {pageCount > 1 && (
        <div className="mt-6 flex justify-center">
          {Array.from({ length: pageCount }, (_, page) => (
            <button
              key={page}
              type="button"
              onClick={() => goTo(page)}
              aria-label={`Gå till position ${page + 1} av ${pageCount}`}
              aria-current={page === activePage ? "true" : undefined}
              className="group/dot p-[7.5px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-olive"
            >
              <span
                className={`block h-[11px] w-[11px] rounded-full transition-colors duration-200 ${
                  page === activePage ? "bg-olive" : "bg-pebble group-hover/dot:bg-ash"
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
