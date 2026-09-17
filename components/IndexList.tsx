"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Icon, type IconKey } from "./Icon";
import { Reveal } from "./Reveal";
import { buttonClasses } from "./Button";

export interface IndexListItem {
  key: string;
  icon: IconKey;
  title: string;
  description?: string;
  category?: string;
  href?: string;
}

interface IndexListProps {
  items: IndexListItem[];
  categories?: string[];
  showFilter?: boolean;
}

function RowContent({ item, number }: { item: IndexListItem; number: string }) {
  return (
    <>
      <span className="w-8 shrink-0 text-sm font-semibold text-steel sm:w-10">{number}</span>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-dark/15 text-dark">
        <Icon name={item.icon} className="h-4 w-4" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-base font-bold text-dark sm:text-lg">{item.title}</span>
        {item.description && (
          <span className="mt-1 block text-sm leading-relaxed text-gray-body">{item.description}</span>
        )}
      </span>
      {item.href && (
        <Icon
          name="ArrowRight"
          className="h-5 w-5 shrink-0 text-dark transition-transform duration-200 group-hover:translate-x-1"
        />
      )}
    </>
  );
}

function Row({ item, number }: { item: IndexListItem; number: string }) {
  const rowClass = "group flex items-center gap-4 border-b border-dark/10 py-6 sm:gap-6 sm:py-7";

  if (item.href) {
    return (
      <Link href={item.href} className={`${rowClass} transition-colors hover:bg-mist`}>
        <RowContent item={item} number={number} />
      </Link>
    );
  }

  return (
    <div className={rowClass}>
      <RowContent item={item} number={number} />
    </div>
  );
}

export function IndexList({ items, categories = [], showFilter = false }: IndexListProps) {
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

      <div className="border-t border-dark/10">
        {filteredItems.map((item, index) => (
          <Reveal key={item.key} delayMs={(index % 6) * 60}>
            <Row item={item} number={String(index + 1).padStart(2, "0")} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
