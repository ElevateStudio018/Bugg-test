import { Reveal } from "../Reveal";
import { tapTarget } from "../Button";
import { FaqAccordion } from "../FaqAccordion";
import { list } from "@/lib/site/collection.ts";
import { toTelHref } from "@/lib/site/format.ts";
import { key } from "@/lib/site/edit.ts";
import type { SectionProps } from "./types";

/** The questions with the heading and the phone number centred above them, the whole vertically centred in a tall section. */
export function FaqSection({ section, ctx }: SectionProps<"faq">) {
  const { phone } = ctx.site.company;
  return (
    <section id={section.anchor || undefined} data-k={ctx.path} className="scroll-mt-20">
      <div className="mx-auto flex max-w-content flex-col justify-center px-4 py-16 sm:px-6 sm:py-24 lg:min-h-[min(80svh,860px)] lg:px-8 lg:py-32">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 data-k={key(ctx.path, "heading")} className="text-h2 text-heading lg:text-h2-lg">
            {section.heading}
          </h2>
          {section.phonePrompt && phone && (
            <p className="mt-3 text-copy text-muted lg:mt-5 lg:text-lead">
              <span data-k={key(ctx.path, "phonePrompt")}>{section.phonePrompt}</span>{" "}
              <a
                href={toTelHref(phone)}
                data-k="company.phone"
                className={`${tapTarget} whitespace-nowrap font-semibold text-link transition-colors duration-200 hover:text-accent`}
              >
                {phone}
              </a>
              .
            </p>
          )}
        </Reveal>

        <Reveal delayMs={100} className="mx-auto mt-10 w-full max-w-3xl border-t border-line/15 lg:mt-14">
          <FaqAccordion
            items={list(section.items).map(({ id, question, answer }) => ({ id, question, answer }))}
            base={key(ctx.path, "items.items")}
          />
        </Reveal>
      </div>
    </section>
  );
}
