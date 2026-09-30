"use client";

import { useMemo, useState } from "react";
import { Icon, type IconKey } from "./Icon";
import { Reveal } from "./Reveal";
import { buttonClasses } from "./Button";

export interface ProjectGridItem {
  key: string;
  image: string;
  icon: IconKey;
  title: string;
  category?: string;
}

interface ProjectGridProps {
  items: ProjectGridItem[];
  categories?: string[];
  showFilter?: boolean;
}

export function ProjectGrid({ items, categories = [], showFilter = false }: ProjectGridProps) {
  const [activeCategory, setActiveCategory] = useState<string>("Alla");

  const filteredItems = useMemo(() => {
    if (!showFilter || activeCategory === "Alla") return items;
    return items.filter((item) => item.category === activeCategory);
  }, [items, activeCategory, showFilter]);

  return (
    <div>
      {showFilter && (
        <div className="mb-10 flex flex-wrap gap-3">
          {["Alla", ...categories].map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={buttonClasses(activeCategory === category ? "primary" : "outline", "px-4 py-2 text-sm")}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item, index) => (
          <Reveal key={item.key} delayMs={(index % 6) * 60}>
            <div className="group overflow-hidden border border-dark/10">
              <div className="aspect-[4/3] w-full overflow-hidden bg-mist">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex items-center gap-3 border-t border-dark/10 bg-white px-4 py-3">
                <Icon name={item.icon} className="h-5 w-5 shrink-0 text-dark" />
                <span className="text-sm font-semibold text-dark">{item.title}</span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
