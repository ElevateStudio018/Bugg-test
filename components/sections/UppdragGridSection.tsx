import { Breadcrumbs } from "../Breadcrumbs";
import { UppdragGrid } from "../UppdragGrid";
import { list } from "@/lib/site/collection.ts";
import { key } from "@/lib/site/edit.ts";
import type { SectionProps } from "./types";

export function UppdragGridSection({ section, ctx }: SectionProps<"uppdragGrid">) {
  const { breadcrumbs } = ctx;
  const Heading = breadcrumbs ? "h1" : "h2";
  return (
    <div id={section.anchor || undefined} data-k={ctx.path} className="mx-auto max-w-content px-4 pt-10 sm:px-6 lg:px-8 lg:pt-14">
      {breadcrumbs && (
        // The text rises into place one part after another as the page loads, as on the homepage.
        <div className="animate-rise [animation-delay:150ms]">
          <Breadcrumbs items={breadcrumbs} label={ctx.site.ui.breadcrumbsLabel} />
        </div>
      )}

      <Heading data-k={key(ctx.path, "heading")} className="mt-8 animate-rise [animation-delay:250ms] text-display text-heading lg:text-display-lg">
        {section.heading}
      </Heading>
      {section.text && (
        <p data-k={key(ctx.path, "text")} className="mt-5 max-w-3xl animate-rise text-copy text-body [animation-delay:350ms] lg:text-lead">
          {section.text}
        </p>
      )}

      <div className="mt-10 animate-rise [animation-delay:450ms]">
        <UppdragGrid items={list(ctx.site.uppdrag)} allLabel={section.filterAllLabel} filterLabel={ctx.site.ui.uppdragFilterLabel} />
      </div>
    </div>
  );
}
