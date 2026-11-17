import { Reveal } from "../Reveal";
import { SiteLink } from "../SiteLink";
import { ArrowLabel, buttonClasses } from "../Button";
import { key } from "@/lib/site/edit.ts";
import { GoogleMark } from "../GoogleMark";
import type { SectionProps } from "./types";

/** A card asking for a review on Google: the Google mark, five stars in the site's green, a heading and the button. */
export function ReviewInviteSection({ section, ctx }: SectionProps<"reviewInvite">) {
  return (
    <section id={section.anchor || undefined} data-k={ctx.path} className="scroll-mt-20">
      <div className="mx-auto max-w-content px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <Reveal className="mx-auto max-w-2xl bg-card px-5 py-9 text-center sm:px-12 sm:py-12">
          {section.badge && (
            <p className="inline-flex items-center gap-2.5 text-tag uppercase text-muted">
              <GoogleMark className="h-[22px] w-[22px] shrink-0" />
              <span data-k={key(ctx.path, "badge")}>{section.badge}</span>
            </p>
          )}
          <div aria-hidden="true" className="mt-6 flex justify-center gap-1.5">
            {Array.from({ length: 5 }, (_, index) => (
              <svg key={index} viewBox="0 0 24 24" className="h-8 w-8 fill-primary sm:h-9 sm:w-9">
                <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6L2.5 9.4l6.6-.8z" />
              </svg>
            ))}
          </div>
          <h2 data-k={key(ctx.path, "heading")} className="mt-3 text-h2 text-heading lg:text-h2-lg">
            {section.heading}
          </h2>
          {section.text && (
            <p data-k={key(ctx.path, "text")} className="mx-auto mt-4 max-w-xl text-copy text-body">
              {section.text}
            </p>
          )}
          {section.button.label && (
            <SiteLink href={section.button.href} k={key(ctx.path, "button")} className={buttonClasses("solid", "group/arrow mt-8")}>
              <span>
                <ArrowLabel spaced>{section.button.label}</ArrowLabel>
              </span>
            </SiteLink>
          )}
        </Reveal>
      </div>
    </section>
  );
}
