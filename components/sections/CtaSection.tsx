import { AccentBlock } from "../AccentBlock";
import { SiteLink } from "../SiteLink";
import { buttonClasses } from "../Button";
import { key } from "@/lib/site/edit.ts";
import type { SectionProps } from "./types";

/** A call to action beside an accent bar: it closes off the section before it, or stands on its own. */
export function CtaSection({ section, ctx }: SectionProps<"cta">) {
  return (
    <div id={section.anchor || undefined} data-k={ctx.path} className="mx-auto max-w-content px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-28">
      {/* After a section with its own bottom space, that space is enough. */}
      <AccentBlock className={ctx.attached ? "mt-16 lg:mt-20" : ""}>
        <h2 data-k={key(ctx.path, "heading")} className="text-h2 text-heading lg:text-h2-lg">
          {section.heading}
        </h2>
        {section.text && (
          <p data-k={key(ctx.path, "text")} className="mt-4 max-w-2xl text-copy text-body">
            {section.text}
          </p>
        )}
        {section.button.label && (
          <SiteLink href={section.button.href} k={key(ctx.path, "button")} className={buttonClasses("solid", "mt-7")}>
            {section.button.label}
          </SiteLink>
        )}
      </AccentBlock>
    </div>
  );
}
