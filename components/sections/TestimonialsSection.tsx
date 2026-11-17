import { GoogleMark } from "../GoogleMark";
import { Photo } from "../Photo";
import { SectionIntro } from "./SectionIntro";
import { Topography } from "../Topography";
import { list } from "@/lib/site/collection.ts";
import { focusStyle, imageProps } from "@/lib/site/images.ts";
import { fill } from "@/lib/site/format.ts";
import { key } from "@/lib/site/edit.ts";
import type { SectionProps } from "./types";

// The colours Google gives the round initials of reviewers without a photo.
const avatarColours = ["#1A73E8", "#D93025", "#188038", "#E37400", "#8430CE", "#12B5CB"];

type Review = SectionProps<"testimonials">["section"]["items"]["items"][string] & { id: string };

// A star with sharp points and straight sides, as Google draws it.
const STAR = "12 1.6 14.95 8.55 22.5 9.2 16.78 14.15 18.5 21.5 12 17.6 5.5 21.5 7.22 14.15 1.5 9.2 9.05 8.55";

/** Five stars in Google's yellow, as many filled as the rating (rounded). */
function Stars({ rating, className }: { rating: number; className: string }) {
  return (
    <span aria-hidden="true" className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, star) => (
        <svg
          key={star}
          viewBox="0 0 24 24"
          focusable="false"
          className={`${className} ${star < Math.round(rating) ? "fill-[#FBBC04]" : "fill-[#dadce0]"}`}
        >
          <polygon points={STAR} />
        </svg>
      ))}
    </span>
  );
}

/** One review as it looks on Google, on a white card: the reviewer, Google's "G", the stars when given, and what they wrote (if anything). */
function ReviewCard({ item, colour, base, ratingLabel }: { item: Review; colour: string; base?: string; ratingLabel: string }) {
  const k = base && key(base, "items.items", item.id);
  return (
    <figure className="marquee-card flex h-full w-[300px] shrink-0 flex-col rounded-[10px] bg-white p-6 shadow-[0_16px_36px_-18px_rgba(0,0,0,0.6)] sm:w-[360px]">
      <figcaption className="flex items-center gap-3">
        {item.image ? (
          <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-primary/20">
            <Photo
              {...imageProps(item.image, "44px")}
              alt={item.image.alt}
              k={k && `${k}.image`}
              className="absolute inset-0 h-full w-full object-cover"
              style={focusStyle(item.image)}
            />
          </span>
        ) : (
          <span
            aria-hidden="true"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-copy font-semibold text-white"
            style={{ background: colour }}
          >
            {item.name.trim().charAt(0).toUpperCase()}
          </span>
        )}
        <span className="min-w-0 flex-1">
          <span data-k={k && `${k}.name`} className="block truncate text-copy font-semibold text-[#202124]">
            {item.name}
          </span>
          {item.detail && (
            <span data-k={k && `${k}.detail`} className="block truncate text-small text-[#5f6368]">
              {item.detail}
            </span>
          )}
        </span>
        <GoogleMark className="h-6 w-6 shrink-0" />
      </figcaption>
      {item.rating > 0 && (
        // A review with only stars shows them larger, so its card is not left empty.
        <p className={item.quote.trim() ? "mt-4" : "flex flex-1 items-center pt-4"} aria-label={fill(ratingLabel, { n: item.rating })}>
          <Stars rating={item.rating} className={item.quote.trim() ? "h-5 w-5" : "h-9 w-9"} />
        </p>
      )}
      {item.quote.trim() && (
        <blockquote data-k={k && `${k}.quote`} className="mt-4 flex-1 text-copy leading-relaxed text-[#3c4043]">
          {item.quote}
        </blockquote>
      )}
    </figure>
  );
}

/**
 * One row of cards that scrolls by on its own (the second the other way) and stops while a card is pointed at. A short
 * list is repeated so the row is always wider than the screen, and the whole is shown twice for a seamless loop; only
 * the first copy of each review is read out and carries its place in the content.
 */
function ReviewRow({
  reviews,
  reverse,
  base,
  colours,
  ratingLabel,
}: {
  reviews: Review[];
  reverse: boolean;
  /** The section's place in the content; left out for a row that only repeats the other, which is then not read out. */
  base?: string;
  colours: Map<string, string>;
  ratingLabel: string;
}) {
  const repeat = Math.max(1, Math.ceil(6 / reviews.length));
  const set = Array.from({ length: repeat }, () => reviews).flat();
  return (
    <ul
      className={`marquee-track flex w-max gap-5 py-2 ${reverse ? "marquee-track-reverse" : ""}`}
      style={{ "--marquee-duration": `${set.length * 7}s` } as React.CSSProperties}
    >
      {[0, 1].map((copy) =>
        set.map((item, index) => {
          const first = Boolean(base) && copy === 0 && index < reviews.length;
          return (
            <li key={`${copy}-${index}`} aria-hidden={first ? undefined : true} className="flex">
              <ReviewCard item={item} colour={colours.get(item.id) ?? avatarColours[0]} base={first ? base : undefined} ratingLabel={ratingLabel} />
            </li>
          );
        }),
      )}
    </ul>
  );
}

/** What customers say on Google: white cards in two rows that scroll by in opposite directions, on the dark green with contour lines. */
export function TestimonialsSection({ section, ctx }: SectionProps<"testimonials">) {
  const items = list(section.items);
  if (items.length === 0) return null;
  const colours = new Map(items.map((item, index) => [item.id, avatarColours[index % avatarColours.length]]));
  // With many reviews each row has its own half; with few both rows show all of them, the second starting halfway.
  const split = items.length >= 8;
  const half = Math.ceil(items.length / 2);
  const rows = split
    ? [items.filter((_, index) => index % 2 === 0), items.filter((_, index) => index % 2 === 1)]
    : [items, [...items.slice(half), ...items.slice(0, half)]];
  // The average of the stars given, to one decimal; 0 when no review has stars.
  const rated = items.filter((item) => item.rating > 0);
  const average = rated.length ? Math.round((rated.reduce((sum, item) => sum + item.rating, 0) / rated.length) * 10) / 10 : 0;

  return (
    <section id={section.anchor || undefined} data-k={ctx.path} className="relative scroll-mt-20 overflow-hidden bg-primary text-on-primary">
      {/* The contour lines of the footer, faint behind the cards. */}
      <Topography className="pointer-events-none absolute -right-48 -top-48 h-[900px] w-[900px] text-on-primary/[0.07]" />
      <div className="relative mx-auto max-w-content px-4 pt-16 sm:px-6 sm:pt-20 lg:px-8 lg:pt-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionIntro heading={section.heading} text={section.text} tone="primary" k={ctx.path} />
          <p className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-small font-semibold text-on-primary/80">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
              <GoogleMark className="h-5 w-5" />
            </span>
            {average > 0 && (
              <span className="flex items-center gap-1.5" aria-label={fill(ctx.site.ui.ratingLabel, { n: average.toLocaleString("sv-SE") })}>
                <span aria-hidden="true" className="text-h3 text-on-primary">
                  {average.toLocaleString("sv-SE", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
                </span>
                <Stars rating={average} className="h-[18px] w-[18px]" />
              </span>
            )}
            Recensioner på Google
          </p>
        </div>
      </div>

      {/* The rows run edge to edge and fade out at both sides. */}
      <div className="relative mt-10 flex flex-col gap-3 pb-16 sm:gap-4 sm:pb-20 lg:mt-14 lg:pb-28 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        {rows.map((row, index) => (
          <ReviewRow
            key={index}
            reviews={row}
            reverse={index === 1}
            base={split || index === 0 ? ctx.path : undefined}
            colours={colours}
            ratingLabel={ctx.site.ui.ratingLabel}
          />
        ))}
      </div>
    </section>
  );
}
