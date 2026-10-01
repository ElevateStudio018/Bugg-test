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

  const updateArrows = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setCanPrev(track.scrollLeft > 4);
    setCanNext(track.scrollLeft + track.clientWidth < track.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    updateArrows();
    track.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      track.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [updateArrows]);

  function step(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.querySelector<HTMLElement>("[data-slide]");
    const distance = slide ? slide.offsetWidth + GAP_PX : track.clientWidth * 0.8;
    track.scrollBy({ left: direction * distance, behavior: reducedMotion ? "auto" : "smooth" });
  }

  const arrowClass =
    "absolute top-1/2 z-10 flex h-16 w-12 -translate-y-1/2 items-center justify-center bg-olive text-white transition-colors duration-200 hover:bg-moss focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive";

  return (
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
  );
}
