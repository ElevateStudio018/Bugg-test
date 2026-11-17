import { GoogleMark } from "../GoogleMark";
import { Icon } from "../Icon";
import { Photo } from "../Photo";
import { SectionIntro } from "./SectionIntro";
import { list } from "@/lib/site/collection.ts";
import { focusStyle, imageProps } from "@/lib/site/images.ts";
import { fill } from "@/lib/site/format.ts";
import { key } from "@/lib/site/edit.ts";
import type { SectionProps } from "./types";

// The colours Google gives the round initials of reviewers without a photo.
const avatarColours = [
  "#1A73E8",
  "#D93025",
  "#188038",
  "#E37400",
  "#8430CE",
  "#12B5CB",
];

type Review =
  SectionProps<"testimonials">["section"]["items"]["items"][string] & {
    id: string;
  };

/** Five stars in Google's yellow, as many filled as the rating (rounded). */
function Stars({ rating, className }: { rating: number; className: string }) {
  return (
    <span aria-hidden="true" className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, star) => (
        <Icon
          key={star}
          name="Star"
          className={`${className} ${star < Math.round(rating) ? "fill-[#FBBC04] text-[#FBBC04]" : "text-[#dadce0]"}`}
        />
      ))}
    </span>
  );
}

/** One review as it looks on Google: the reviewer, Google's "G", the stars when given, and what they wrote. */
function ReviewCard({
  item,
  index,
  base,
  ratingLabel,
}: {
  item: Review;
  index: number;
  base?: string;
  ratingLabel: string;
}) {
  const k = base && key(base, "items.items", item.id);
  return (
    <figure className="flex h-full w-[300px] shrink-0 flex-col rounded-[18px] bg-white p-6 shadow-[0_12px_32px_-14px_rgba(0,0,0,0.3)] sm:w-[360px]">
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
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[18px] font-semibold text-white"
            style={{ background: avatarColours[index % avatarColours.length] }}
          >
            {item.name.trim().charAt(0).toUpperCase()}
          </span>
        )}
        <span className="min-w-0 flex-1">
          <span
            data-k={k && `${k}.name`}
            className="block truncate text-[16px] font-semibold text-[#202124]"
          >
            {item.name}
          </span>
          {item.detail && (
            <span
              data-k={k && `${k}.detail`}
              className="block truncate text-[14px] text-[#5f6368]"
            >
              {item.detail}
            </span>
          )}
        </span>
        <GoogleMark className="h-6 w-6 shrink-0" />
      </figcaption>
      {item.rating > 0 && (
        <p className="mt-4" aria-label={fill(ratingLabel, { n: item.rating })}>
          <Stars rating={item.rating} className="h-5 w-5" />
        </p>
      )}
      <blockquote
        data-k={k && `${k}.quote`}
        className="mt-4 flex-1 text-[16px] leading-[1.5] text-[#3c4043]"
      >
        {item.quote}
      </blockquote>
    </figure>
  );
}

/**
 * What customers say on Google, as Google-style cards in a row that scrolls by on its own and stops while pointed at.
 * There are always enough cards to fill a wide screen: a short list is repeated.
 */
export function TestimonialsSection({
  section,
  ctx,
}: SectionProps<"testimonials">) {
  const items = list(section.items);
  if (items.length === 0) return null;
  // At least six cards in a set, so the row is wider than the screen; the set is shown twice for a seamless loop.
  const repeat = Math.max(1, Math.ceil(6 / items.length));
  const set = Array.from({ length: repeat }, () => items).flat();
  // The average of the stars given, to one decimal; 0 when no review has stars.
  const rated = items.filter((item) => item.rating > 0);
  const average = rated.length
    ? Math.round(
        (rated.reduce((sum, item) => sum + item.rating, 0) / rated.length) * 10,
      ) / 10
    : 0;

  return (
    <section
      id={section.anchor || undefined}
      data-k={ctx.path}
      className="scroll-mt-20 overflow-hidden bg-card"
    >
      <div className="mx-auto max-w-content px-4 pt-16 sm:px-6 sm:pt-20 lg:px-8 lg:pt-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionIntro
            heading={section.heading}
            text={section.text}
            k={ctx.path}
          />
          <p className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[15px] font-semibold text-muted">
            <GoogleMark className="h-6 w-6" />
            {average > 0 && (
              <span
                className="flex items-center gap-1.5"
                aria-label={fill(ctx.site.ui.ratingLabel, {
                  n: average.toLocaleString("sv-SE"),
                })}
              >
                <span
                  aria-hidden="true"
                  className="text-[18px] font-bold text-heading"
                >
                  {average.toLocaleString("sv-SE", {
                    minimumFractionDigits: 1,
                    maximumFractionDigits: 1,
                  })}
                </span>
                <Stars rating={average} className="h-[18px] w-[18px]" />
              </span>
            )}
            Recensioner på Google
          </p>
        </div>
      </div>

      {/* The row runs edge to edge and fades out at both sides. Only the first copy is read out. */}
      <div
        className="marquee relative mt-10 pb-16 sm:pb-20 lg:mt-14 lg:pb-28 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
        style={
          { "--marquee-duration": `${set.length * 7}s` } as React.CSSProperties
        }
      >
        <ul className="marquee-track flex w-max gap-5 py-2">
          {[0, 1].map((copy) =>
            set.map((item, index) => (
              <li
                key={`${copy}-${index}`}
                aria-hidden={
                  copy === 1 || index >= items.length ? true : undefined
                }
                className="flex"
              >
                <ReviewCard
                  item={item}
                  index={index % items.length}
                  base={
                    copy === 0 && index < items.length ? ctx.path : undefined
                  }
                  ratingLabel={ctx.site.ui.ratingLabel}
                />
              </li>
            )),
          )}
        </ul>
      </div>
    </section>
  );
}
