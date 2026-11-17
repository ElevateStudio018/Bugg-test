import { Reveal } from "../Reveal";
import { SectionIntro } from "./SectionIntro";
import { list } from "@/lib/site/collection.ts";
import { key } from "@/lib/site/edit.ts";
import type { SectionProps } from "./types";

/** Prices as plain rows split by thin lines, like the questions under Vanliga frågor. */
export function PricelistSection({ section, ctx }: SectionProps<"pricelist">) {
  return (
    <section id={section.anchor || undefined} data-k={ctx.path} className="scroll-mt-20">
      <div className="mx-auto max-w-content px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
        <SectionIntro heading={section.heading} text={section.text} k={ctx.path} />
        <Reveal delayMs={100} className="mt-10 max-w-4xl">
          <dl className="border-t border-line/15">
            {list(section.rows).map((row) => (
              <div key={row.id} className="flex items-start justify-between gap-6 border-b border-line/15 py-4 lg:py-5">
                <dt>
                  <span data-k={key(ctx.path, "rows.items", row.id, "name")} className="block text-copy font-semibold text-heading">
                    {row.name}
                  </span>
                  {row.description && (
                    <span data-k={key(ctx.path, "rows.items", row.id, "description")} className="mt-1.5 block text-copy leading-[1.35] text-body">
                      {row.description}
                    </span>
                  )}
                </dt>
                <dd data-k={key(ctx.path, "rows.items", row.id, "price")} className="shrink-0 whitespace-nowrap text-copy font-semibold text-heading">
                  {row.price}
                </dd>
              </div>
            ))}
          </dl>
          {section.note && (
            <p data-k={key(ctx.path, "note")} className="mt-5 text-small text-muted">
              {section.note}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
