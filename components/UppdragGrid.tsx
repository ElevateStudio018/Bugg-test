"use client";

import { useState } from "react";
import { Reveal } from "./Reveal";
import { UppdragCard } from "./UppdragCard";
import type { UppdragItem } from "@/lib/uppdrag";

const ALL = "Alla";

export function UppdragGrid({ items, tags }: { items: UppdragItem[]; tags: string[] }) {
  const [activeTag, setActiveTag] = useState(ALL);
  const visibleItems = activeTag === ALL ? items : items.filter((item) => item.tag === activeTag);

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-3" role="group" aria-label="Filtrera uppdrag">
        {[ALL, ...tags].map((tag) => {
          const isActive = activeTag === tag;
          return (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag(tag)}
              aria-pressed={isActive}
              className={`rounded-full border-2 border-olive px-5 py-2.5 text-label uppercase transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive ${
                isActive ? "bg-olive text-white" : "text-olive hover:bg-olive hover:text-white"
              }`}
            >
              {tag}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visibleItems.map((item, index) => (
          <Reveal key={item.id} delayMs={(index % 3) * 70}>
            <UppdragCard item={item} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
