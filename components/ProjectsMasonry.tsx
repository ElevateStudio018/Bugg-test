"use client";

import { useMemo, useState } from "react";
import { PlaceholderArt } from "./PlaceholderArt";
import { Reveal } from "./Reveal";
import { buttonClasses } from "./Button";
import { company } from "@/lib/content";
import type { ProjectItem } from "@/lib/projects";

const aspectClass: Record<ProjectItem["aspect"], string> = {
  "portrait-tall": "aspect-[3/4]",
  portrait: "aspect-[4/5]",
  square: "aspect-square",
  landscape: "aspect-[4/3]",
};

interface ProjectsMasonryProps {
  items: ProjectItem[];
  categories?: string[];
  showFilter?: boolean;
}

export function ProjectsMasonry({ items, categories = [], showFilter = false }: ProjectsMasonryProps) {
  const [activeCategory, setActiveCategory] = useState<string>("Alla");

  const filteredItems = useMemo(() => {
    if (!showFilter || activeCategory === "Alla") return items;
    return items.filter((item) => item.category === activeCategory);
  }, [items, activeCategory, showFilter]);

  return (
    <div>
      {showFilter && (
        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {["Alla", ...categories].map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={buttonClasses(activeCategory === category ? "accent" : "outline", "px-4 py-2 text-sm")}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
        {filteredItems.map((item, index) => (
          <Reveal key={item.id} delayMs={(index % 3) * 80} className="mb-6 break-inside-avoid">
            <figure className="overflow-hidden rounded-[3px] border border-dark/10">
              <PlaceholderArt
                icon={item.icon}
                alt={`${item.category} i ${company.city}`}
                className={`w-full ${aspectClass[item.aspect]}`}
              />
              <figcaption className="border-t border-dark/10 bg-white px-4 py-3 text-sm font-medium text-dark">
                {item.category}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
