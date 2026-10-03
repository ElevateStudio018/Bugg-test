"use client";

import { useRef } from "react";

export interface TabItem {
  id: string;
  label: string;
  /** A count shown beside the label, such as new items waiting; read out with its meaning. */
  badge?: { count: number; label: string };
}

/** A row of tabs; arrow keys move between them, as screen readers expect. */
export function Tabs({ items, active, onChange, label }: { items: TabItem[]; active: string; onChange: (id: string) => void; label: string }) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  return (
    <div role="tablist" aria-label={label} className="no-scrollbar -mx-1 flex gap-1 overflow-x-auto px-1 pb-1">
      {items.map((item, index) => {
        const selected = item.id === active;
        return (
          <button
            key={item.id}
            ref={(node) => {
              refs.current[index] = node;
            }}
            role="tab"
            type="button"
            id={`tab-${item.id}`}
            aria-selected={selected}
            aria-controls={`panel-${item.id}`}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(item.id)}
            onKeyDown={(event) => {
              const step = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
              if (!step) return;
              event.preventDefault();
              const next = (index + step + items.length) % items.length;
              refs.current[next]?.focus();
              onChange(items[next].id);
            }}
            className={`min-h-11 shrink-0 whitespace-nowrap rounded-xl px-4 text-[14px] font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-admin ${
              selected ? "bg-white text-admin-ink shadow-sm ring-1 ring-admin-line" : "text-admin-muted hover:bg-stone-900/5 hover:text-admin-ink"
            }`}
          >
            {item.label}
            {item.badge && item.badge.count > 0 && (
              <span className="ml-1.5 rounded-full bg-admin px-1.5 py-0.5 text-[11px] font-bold text-admin-contrast">
                <span aria-hidden="true">{item.badge.count}</span>
                <span className="sr-only">, {item.badge.label}</span>
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
