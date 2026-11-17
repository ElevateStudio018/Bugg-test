"use client";

import type { CSSProperties } from "react";
import { useInView } from "@/hooks/useInView";

export interface FaktaRow {
  /** The fact's id in the section's list, for its place in the content. */
  id?: string;
  label: string;
  value: string;
  /** Where the label and value are kept, when they are not a fact of the section's own. */
  labelKey?: string;
  valueKey?: string;
}

/**
 * Facts on the primary colour. The lines between the rows draw in from the left, one after another, as the list comes
 * into view. `base` is the section's place in the content (lib/site/edit.ts).
 */
export function FaktaBox({ title, rows, base }: { title: string; rows: FaktaRow[]; base?: string }) {
  const fact = (row: FaktaRow, field: "label" | "value") =>
    (field === "label" ? row.labelKey : row.valueKey) ?? (base && row.id ? `${base}.facts.items.${row.id}.${field}` : undefined);
  const { ref, isInView } = useInView<HTMLDListElement>();

  return (
    <div data-k={base && `${base}.facts`} className="bg-primary px-6 py-7 text-on-primary sm:px-8 sm:py-8">
      <h3 data-k={base && `${base}.factsTitle`} className="text-h3">
        {title}
      </h3>
      <dl ref={ref} className="mt-3">
        {rows.map((row, index) => (
          <div
            key={row.label}
            className={`relative grid grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-4 py-4 text-copy leading-snug after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:bg-on-primary/70 after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.33,1,0.68,1)] after:[transition-delay:var(--line-delay)] last:pb-0 last:after:hidden ${
              isInView ? "after:scale-x-100" : "after:scale-x-0"
            }`}
            style={{ "--line-delay": `${60 + index * 50}ms` } as CSSProperties}
          >
            <dt className="font-bold">
              <span data-k={fact(row, "label")}>{row.label}</span>:
            </dt>
            <dd data-k={fact(row, "value")}>{row.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
