import { Reveal } from "../Reveal";
import { SiteLink } from "../SiteLink";
import { ArrowLabel, buttonClasses } from "../Button";
import { key } from "@/lib/site/edit.ts";
import type { SectionProps } from "./types";

// Google's four-colour "G", so the card is recognised at a glance as being about Google reviews.
function GoogleMark({ className }: { className: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 48 48" className={className}>
      <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.5l6.7-6.7C35.6 2.4 30.2 0 24 0 14.6 0 6.6 5.4 2.7 13.3l7.8 6C12.4 13.7 17.7 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.1 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.4c-.5 2.9-2.2 5.3-4.6 7l7.4 5.7c4.3-4 6.9-9.9 6.9-17.2z" />
      <path fill="#FBBC05" d="M10.5 28.7a14.6 14.6 0 010-9.4l-7.8-6a24 24 0 000 21.4l7.8-6z" />
      <path
        fill="#34A853"
        d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.4-5.7c-2.1 1.4-4.8 2.2-8.5 2.2-6.3 0-11.6-4.2-13.5-9.9l-7.8 6C6.6 42.6 14.6 48 24 48z"
      />
    </svg>
  );
}

/** A white card asking for a review on Google: the Google mark, five stars in the logo's orange, a heading and the button. */
export function ReviewInviteSection({ section, ctx }: SectionProps<"reviewInvite">) {
  return (
    <section id={section.anchor || undefined} data-k={ctx.path} className="scroll-mt-20">
      <div className="mx-auto max-w-content px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <Reveal className="mx-auto max-w-2xl rounded-[20px] bg-white px-5 py-9 text-center shadow-[0_20px_50px_-20px_rgba(0,0,0,0.25)] sm:px-12 sm:py-12">
          {section.badge && (
            <p className="inline-flex items-center gap-2.5 text-[15px] font-bold text-muted">
              <GoogleMark className="h-[22px] w-[22px] shrink-0" />
              <span data-k={key(ctx.path, "badge")}>{section.badge}</span>
            </p>
          )}
          <div aria-hidden="true" className="mt-6 flex justify-center gap-1.5">
            {Array.from({ length: 5 }, (_, index) => (
              <svg key={index} viewBox="0 0 24 24" className="h-8 w-8 fill-[#F39200] sm:h-9 sm:w-9">
                <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6L2.5 9.4l6.6-.8z" />
              </svg>
            ))}
          </div>
          <h2 data-k={key(ctx.path, "heading")} className="mt-3 text-h2 text-heading lg:text-[44px] lg:leading-[1.08]">
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
