"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { GoogleMark } from "../GoogleMark";
import { Icon } from "../Icon";
import { Topography } from "../Topography";
import { withBasePath } from "@/lib/site/images.ts";

// Fifteen ways the reviews could look, side by side on one page for the customer to choose from. They use the site's
// own colours, type and shapes (square corners, the green accent bar, the contour lines, the uppercase tags) and the
// real reviews. Nothing here is on the site itself.

export interface ProposalReview {
  id: string;
  name: string;
  quote: string;
  rating: number;
}

const avatarColours = ["#1A73E8", "#D93025", "#188038", "#E37400", "#8430CE"];

function Stars({
  rating = 5,
  className = "h-4 w-4",
  tone = "google",
}: {
  rating?: number;
  className?: string;
  tone?: "google" | "accent" | "light";
}) {
  const on = tone === "google" ? "fill-[#FBBC04] text-[#FBBC04]" : tone === "accent" ? "fill-accent text-accent" : "fill-white text-white";
  return (
    <span className="flex gap-0.5" role="img" aria-label={`${rating} av 5 stjärnor`}>
      {Array.from({ length: 5 }, (_, star) => (
        <Icon key={star} name="Star" aria-hidden="true" className={`${className} ${star < rating ? on : "text-current opacity-25"}`} />
      ))}
    </span>
  );
}

function Initial({
  name,
  index,
  className = "h-11 w-11 text-[18px]",
  square = false,
  accent = false,
}: {
  name: string;
  index: number;
  className?: string;
  square?: boolean;
  accent?: boolean;
}) {
  return (
    <span
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center font-semibold text-white ${square ? "" : "rounded-full"} ${accent ? "bg-accent" : ""} ${className}`}
      style={accent ? undefined : { background: avatarColours[index % avatarColours.length] }}
    >
      {name.trim().charAt(0).toUpperCase()}
    </span>
  );
}

/** A row (or column) of items that runs by on its own, shown twice for a seamless loop; stops while a card is pointed at. */
function Marquee({
  children,
  reverse = false,
  vertical = false,
  seconds = 40,
  className = "",
}: {
  children: ReactNode;
  reverse?: boolean;
  vertical?: boolean;
  seconds?: number;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        className={`flex ${vertical ? "w-full flex-col pr-px" : "w-max"} ${vertical ? "rf-track-y" : "marquee-track"} ${reverse ? "marquee-track-reverse" : ""}`}
        style={{ "--marquee-duration": `${seconds}s` } as CSSProperties}
      >
        <div className={`flex shrink-0 ${vertical ? "flex-col gap-4 pb-4" : "gap-5 pr-5"}`}>{children}</div>
        <div aria-hidden="true" className={`flex shrink-0 ${vertical ? "flex-col gap-4 pb-4" : "gap-5 pr-5"}`}>
          {children}
        </div>
      </div>
    </div>
  );
}

/** At least `min` items, repeating a short list. */
function fillTo<T>(items: T[], min: number): T[] {
  const repeat = Math.max(1, Math.ceil(min / items.length));
  return Array.from({ length: repeat }, () => items).flat();
}

const fade = "[mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]";
const fadeY = "[mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]";

function Heading({ light = false, children = "Vad våra kunder säger" }: { light?: boolean; children?: ReactNode }) {
  return <h2 className={`text-h2 lg:text-h2-lg ${light ? "text-white" : "text-heading"}`}>{children}</h2>;
}

function Tag({ light = false, children = "Omdömen" }: { light?: boolean; children?: ReactNode }) {
  return <p className={`text-tag uppercase ${light ? "text-white/70" : "text-muted"}`}>{children}</p>;
}

function GoogleLine({ count, light = false }: { count: number; light?: boolean }) {
  return (
    <p className={`flex flex-wrap items-center gap-2.5 text-[15px] font-semibold ${light ? "text-white/80" : "text-muted"}`}>
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
        <GoogleMark className="h-5 w-5" />
      </span>
      <span className={`text-[18px] font-bold ${light ? "text-white" : "text-heading"}`}>5,0</span>
      <Stars className="h-[18px] w-[18px]" />
      {count} recensioner på Google
    </p>
  );
}

// ---------------------------------------------------------------------------------------------------------------------

/** 1. Like the process steps: square cards with the green bar on top, two rows the opposite way. */
function P1({ reviews }: { reviews: ProposalReview[] }) {
  const half = Math.ceil(reviews.length / 2);
  const rows = [reviews, [...reviews.slice(half), ...reviews.slice(0, half)]];
  return (
    <div className="bg-page py-16 lg:py-24">
      <div className="mx-auto flex max-w-content flex-wrap items-end justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <div>
          <Tag />
          <div className="mt-4">
            <Heading />
          </div>
        </div>
        <GoogleLine count={reviews.length} />
      </div>
      <div className={`mt-10 space-y-5 ${fade}`}>
        {rows.map((row, r) => (
          <Marquee key={r} reverse={r === 1} seconds={45}>
            {fillTo(row, 6).map((review, i) => (
              <figure key={i} className="marquee-card flex w-[300px] flex-col border-t-[3px] border-accent bg-card p-7 sm:w-[360px]">
                <div className="flex items-center justify-between">
                  <Initial name={review.name} index={reviews.indexOf(review)} square accent className="h-12 w-12 text-[20px]" />
                  <GoogleMark className="h-6 w-6" />
                </div>
                <Stars className="mt-6 h-5 w-5" />
                {review.quote && <blockquote className="mt-4 text-[17px] leading-relaxed text-body">”{review.quote}”</blockquote>}
                <figcaption className="mt-auto pt-5 text-[16px] font-semibold text-heading">{review.name}</figcaption>
              </figure>
            ))}
          </Marquee>
        ))}
      </div>
    </div>
  );
}

/** 2. The dark green of the footer with its contour lines; light cards in two rows. */
function P2({ reviews }: { reviews: ProposalReview[] }) {
  const half = Math.ceil(reviews.length / 2);
  const rows = [reviews, [...reviews.slice(half), ...reviews.slice(0, half)]];
  return (
    <div className="relative overflow-hidden bg-primary py-16 text-white lg:py-24">
      <Topography className="pointer-events-none absolute -right-40 -top-40 h-[900px] w-[900px] text-white/[0.07]" />
      <div className="relative mx-auto flex max-w-content flex-wrap items-end justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <div>
          <Tag light />
          <div className="mt-4">
            <Heading light />
          </div>
        </div>
        <GoogleLine count={reviews.length} light />
      </div>
      <div className={`relative mt-10 space-y-5 ${fade}`}>
        {rows.map((row, r) => (
          <Marquee key={r} reverse={r === 1} seconds={45}>
            {fillTo(row, 6).map((review, i) => (
              <figure
                key={i}
                className="marquee-card flex w-[300px] flex-col border border-white/15 bg-white/[0.06] p-7 backdrop-blur-sm sm:w-[360px]"
              >
                <div className="flex items-center gap-3">
                  <Initial name={review.name} index={reviews.indexOf(review)} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold">{review.name}</p>
                    <p className="text-[14px] text-white/60">Recension på Google</p>
                  </div>
                  <GoogleMark className="h-6 w-6" />
                </div>
                <Stars className="mt-5 h-5 w-5" />
                {review.quote && <blockquote className="mt-4 text-[17px] leading-relaxed text-white/90">{review.quote}</blockquote>}
              </figure>
            ))}
          </Marquee>
        ))}
      </div>
    </div>
  );
}

/** 3. One quote at a time, large, changing by itself; the score beside it. */
function P3({ reviews }: { reviews: ProposalReview[] }) {
  const quoted = reviews.filter((review) => review.quote);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setIndex((current) => (current + 1) % quoted.length), 5000);
    return () => clearInterval(timer);
  }, [quoted.length]);
  const review = quoted[index];
  return (
    <div className="bg-card py-16 lg:py-24">
      <div className="mx-auto grid max-w-content gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_320px] lg:items-center lg:px-8">
        <div>
          <Tag />
          <span aria-hidden="true" className="mt-4 block font-heading text-[120px] font-bold leading-[0.7] text-accent">
            ”
          </span>
          <blockquote key={review.id} className="mt-2 animate-fade-up text-[30px] font-semibold leading-[1.2] text-heading lg:text-[44px]">
            {review.quote}
          </blockquote>
          <p className="mt-6 flex items-center gap-3 text-[17px] font-semibold text-heading">
            <span className="h-[3px] w-10 bg-accent" />
            {review.name}
          </p>
          <div className="mt-8 flex gap-2">
            {quoted.map((other, i) => (
              <button
                key={other.id}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Visa omdömet från ${other.name}`}
                className={`h-[6px] transition-all ${i === index ? "w-10 bg-accent" : "w-5 bg-heading/20"}`}
              />
            ))}
          </div>
        </div>
        <div className="bg-page p-8">
          <p className="text-stat text-heading">5,0</p>
          <Stars className="mt-3 h-6 w-6" />
          <p className="mt-4 text-[16px] text-body">Snittbetyg från {reviews.length} recensioner på Google</p>
          <p className="mt-5 flex items-center gap-2 text-[14px] font-semibold text-muted">
            <GoogleMark className="h-5 w-5" /> Google
          </p>
        </div>
      </div>
    </div>
  );
}

/** 4. A big score block in green on the left, reviews running upwards on the right. */
function P4({ reviews }: { reviews: ProposalReview[] }) {
  return (
    <div className="bg-page py-16 lg:py-24">
      <div className="mx-auto grid max-w-content gap-8 px-4 sm:px-6 lg:grid-cols-[400px_1fr] lg:px-8">
        <div className="flex flex-col justify-between bg-primary p-8 text-white sm:p-10">
          <div>
            <Tag light />
            <div className="mt-4">
              <Heading light />
            </div>
          </div>
          <div className="mt-10">
            <p className="text-[88px] font-extrabold leading-none">5,0</p>
            <Stars className="mt-3 h-7 w-7" />
            <p className="mt-4 flex items-center gap-2 text-[16px] text-white/80">
              <GoogleMark className="h-5 w-5" /> {reviews.length} recensioner på Google
            </p>
          </div>
        </div>
        <Marquee vertical seconds={30} className={`h-[440px] ${fadeY}`}>
          {fillTo(reviews, 6).map((review, i) => (
            <figure key={i} className="marquee-card flex items-start gap-4 bg-card p-6">
              <Initial name={review.name} index={reviews.indexOf(review)} />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <p className="font-semibold text-heading">{review.name}</p>
                  <Stars className="h-4 w-4" />
                </div>
                {review.quote && <blockquote className="mt-2 text-[16px] leading-relaxed text-body">{review.quote}</blockquote>}
              </div>
              <GoogleMark className="h-5 w-5 shrink-0" />
            </figure>
          ))}
        </Marquee>
      </div>
    </div>
  );
}

/** 5. Still: the written reviews with the accent bar beside them, and the rest as a line of names with stars. */
function P5({ reviews }: { reviews: ProposalReview[] }) {
  const quoted = reviews.filter((review) => review.quote);
  const starsOnly = reviews.filter((review) => !review.quote);
  return (
    <div className="bg-page py-16 lg:py-24">
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <Tag />
        <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
          <Heading />
          <GoogleLine count={reviews.length} />
        </div>
        <div className="mt-12 grid gap-10 md:grid-cols-2">
          {quoted.map((review) => (
            <figure key={review.id} className="relative pl-[30px]">
              <span className="absolute inset-y-0 left-0 w-[6px] bg-accent" />
              <Stars className="h-5 w-5" />
              <blockquote className="mt-4 text-[24px] font-semibold leading-snug text-heading lg:text-[28px]">”{review.quote}”</blockquote>
              <figcaption className="mt-4 text-[16px] text-muted">{review.name} · Recension på Google</figcaption>
            </figure>
          ))}
        </div>
        {starsOnly.length > 0 && (
          <ul className="mt-12 flex flex-wrap gap-3 border-t border-line/15 pt-8">
            {starsOnly.map((review) => (
              <li key={review.id} className="flex items-center gap-3 bg-card px-4 py-3">
                <Initial name={review.name} index={reviews.indexOf(review)} className="h-8 w-8 text-[14px]" />
                <span className="font-semibold text-heading">{review.name}</span>
                <Stars className="h-4 w-4" />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/** 6. Numbered cards like the steps, side by side; on phones they slide sideways with a finger. */
function P6({ reviews }: { reviews: ProposalReview[] }) {
  return (
    <div className="bg-card py-16 lg:py-24">
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Heading />
          <GoogleLine count={reviews.length} />
        </div>
      </div>
      <ol className="no-scrollbar mx-auto mt-10 flex max-w-content snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-2 sm:px-6 lg:px-8">
        {reviews.map((review, i) => (
          <li key={review.id} className="flex w-[82%] shrink-0 snap-start flex-col bg-page p-7 sm:w-[340px]">
            <div className="flex items-start justify-between">
              <Stars className="h-5 w-5" />
              <span aria-hidden="true" className="text-[44px] font-semibold leading-none text-heading/15">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <blockquote className="mt-5 flex-1 text-[17px] leading-relaxed text-body">{review.quote || "Gav 5 av 5 stjärnor på Google."}</blockquote>
            <figcaption className="mt-6 flex items-center gap-3 border-t border-line/15 pt-5">
              <Initial name={review.name} index={i} className="h-9 w-9 text-[15px]" />
              <span className="font-semibold text-heading">{review.name}</span>
              <GoogleMark className="ml-auto h-5 w-5" />
            </figcaption>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** 7. A slim green band under the heading: names, stars and words running by like a ticker. */
function P7({ reviews }: { reviews: ProposalReview[] }) {
  return (
    <div className="bg-page pt-16 lg:pt-24">
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Heading />
          <GoogleLine count={reviews.length} />
        </div>
      </div>
      <div className="mt-10 bg-primary py-5 text-white">
        <Marquee seconds={35}>
          {fillTo(reviews, 8).map((review, i) => (
            <p key={i} className="marquee-card flex items-center gap-4 whitespace-nowrap pr-6 text-[18px]">
              <Stars className="h-[18px] w-[18px]" />
              <span className="font-semibold">{review.name}</span>
              {review.quote && <span className="text-white/75">”{review.quote}”</span>}
              <span aria-hidden="true" className="ml-2 h-2 w-2 bg-accent ring-2 ring-white/40" />
            </p>
          ))}
        </Marquee>
      </div>
    </div>
  );
}

/** 8. Over one of the company's own photos, darkened, with the cards running across it. */
function P8({ reviews }: { reviews: ProposalReview[] }) {
  return (
    <div className="relative overflow-hidden py-20 lg:py-28">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={withBasePath("/photos/markmontage-bil-solnedgang-1200.webp")} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-secondary/80" />
      <div className="relative mx-auto max-w-content px-4 text-white sm:px-6 lg:px-8">
        <Tag light />
        <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
          <Heading light />
          <GoogleLine count={reviews.length} light />
        </div>
      </div>
      <div className={`relative mt-10 ${fade}`}>
        <Marquee seconds={40}>
          {fillTo(reviews, 6).map((review, i) => (
            <figure key={i} className="marquee-card flex w-[300px] flex-col bg-white p-7 sm:w-[360px]">
              <div className="flex items-center gap-3">
                <Initial name={review.name} index={reviews.indexOf(review)} />
                <p className="flex-1 font-semibold text-[#202124]">{review.name}</p>
                <GoogleMark className="h-6 w-6" />
              </div>
              <Stars className="mt-5 h-5 w-5" />
              {review.quote && <blockquote className="mt-4 text-[16px] leading-relaxed text-[#3c4043]">{review.quote}</blockquote>}
            </figure>
          ))}
        </Marquee>
      </div>
    </div>
  );
}

/** 9. A small stack of cards; the top one moves to the back every few seconds (or with the arrows). */
function P9({ reviews }: { reviews: ProposalReview[] }) {
  const [top, setTop] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setTop((current) => (current + 1) % reviews.length), 4000);
    return () => clearInterval(timer);
  }, [reviews.length]);
  return (
    <div className="bg-card py-16 lg:py-24">
      <div className="mx-auto grid max-w-content items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <Tag />
          <div className="mt-4">
            <Heading />
          </div>
          <p className="mt-5 max-w-md text-copy text-body lg:text-lead">Omdömen från våra kunder på Google.</p>
          <div className="mt-6">
            <GoogleLine count={reviews.length} />
          </div>
          <div className="mt-8 flex gap-3">
            {[-1, 1].map((step) => (
              <button
                key={step}
                type="button"
                onClick={() => setTop((current) => (current + step + reviews.length) % reviews.length)}
                aria-label={step < 0 ? "Föregående" : "Nästa"}
                className="flex h-12 w-12 items-center justify-center rounded-full border-[1.5px] border-heading text-heading transition hover:bg-heading hover:text-white"
              >
                <Icon name={step < 0 ? "ChevronLeft" : "ChevronRight"} className="h-6 w-6" />
              </button>
            ))}
          </div>
        </div>
        <div className="relative mx-auto h-[300px] w-full max-w-[420px]">
          {reviews.map((review, i) => {
            const place = (i - top + reviews.length) % reviews.length;
            return (
              <figure
                key={review.id}
                aria-hidden={place !== 0}
                className="absolute inset-x-0 top-0 flex h-[260px] flex-col border-t-[3px] border-accent bg-page p-7 shadow-[0_18px_40px_-20px_rgba(0,0,0,0.45)] transition-all duration-500"
                style={{
                  transform: `translateY(${place * 14}px) scale(${1 - place * 0.05}) rotate(${place === 0 ? 0 : place % 2 ? 2 : -2}deg)`,
                  zIndex: reviews.length - place,
                  opacity: place > 2 ? 0 : 1,
                }}
              >
                <div className="flex items-center gap-3">
                  <Initial name={review.name} index={i} />
                  <p className="flex-1 font-semibold text-heading">{review.name}</p>
                  <GoogleMark className="h-6 w-6" />
                </div>
                <Stars className="mt-5 h-5 w-5" />
                <blockquote className="mt-4 text-[18px] leading-relaxed text-body">{review.quote || "Gav 5 av 5 stjärnor på Google."}</blockquote>
              </figure>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/** 10. Split in two: green with the heading and score, light with two columns running up and down. */
function P10({ reviews }: { reviews: ProposalReview[] }) {
  const half = Math.ceil(reviews.length / 2);
  const columns = [reviews, [...reviews.slice(half), ...reviews.slice(0, half)]];
  return (
    <div className="grid lg:grid-cols-[2fr_3fr]">
      <div className="relative overflow-hidden bg-primary px-4 py-16 text-white sm:px-10 lg:py-24">
        <Topography className="pointer-events-none absolute -bottom-60 -left-60 h-[700px] w-[700px] text-white/[0.07]" />
        <div className="relative">
          <Tag light />
          <div className="mt-4">
            <Heading light />
          </div>
          <p className="mt-10 text-[72px] font-extrabold leading-none">5,0</p>
          <Stars className="mt-3 h-6 w-6" />
          <p className="mt-4 flex items-center gap-2 text-white/80">
            <GoogleMark className="h-5 w-5" /> {reviews.length} recensioner på Google
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 bg-page px-4 sm:grid-cols-2 sm:px-6">
        {columns.map((column, c) => (
          <Marquee key={c} vertical reverse={c === 1} seconds={28} className={`h-[520px] ${fadeY} ${c === 1 ? "hidden sm:block" : ""}`}>
            {fillTo(column, 5).map((review, i) => (
              <figure key={i} className="marquee-card bg-card p-6">
                <Stars className="h-4 w-4" />
                {review.quote && <blockquote className="mt-3 text-[16px] leading-relaxed text-body">{review.quote}</blockquote>}
                <figcaption className="mt-4 flex items-center gap-2.5 text-[15px] font-semibold text-heading">
                  <Initial name={review.name} index={reviews.indexOf(review)} className="h-7 w-7 text-[13px]" />
                  {review.name}
                </figcaption>
              </figure>
            ))}
          </Marquee>
        ))}
      </div>
    </div>
  );
}

/** 11. A round seal like the certificates, with the score, next to the written reviews. */
function P11({ reviews }: { reviews: ProposalReview[] }) {
  const quoted = reviews.filter((review) => review.quote);
  return (
    <div className="bg-page py-16 lg:py-24">
      <div className="mx-auto grid max-w-content items-center gap-12 px-4 sm:px-6 lg:grid-cols-[300px_1fr] lg:px-8">
        <div className="mx-auto flex h-[260px] w-[260px] flex-col items-center justify-center rounded-full border-[3px] border-accent bg-card text-center ring-8 ring-card">
          <GoogleMark className="h-9 w-9" />
          <p className="mt-2 text-[56px] font-extrabold leading-none text-heading">5,0</p>
          <Stars className="mt-2 h-5 w-5" />
          <p className="mt-2 text-tag uppercase text-muted">{reviews.length} recensioner</p>
        </div>
        <div>
          <Tag />
          <div className="mt-4">
            <Heading />
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {quoted.map((review) => (
              <figure key={review.id} className="bg-card p-6">
                <blockquote className="text-[18px] leading-relaxed text-heading">”{review.quote}”</blockquote>
                <figcaption className="mt-4 flex items-center justify-between text-[15px] text-muted">
                  {review.name}
                  <Stars className="h-4 w-4" />
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-5 text-[15px] text-muted">
            Även{" "}
            {reviews
              .filter((review) => !review.quote)
              .map((review) => review.name.split(" ")[0])
              .join(", ")}{" "}
            gav oss 5 stjärnor.
          </p>
        </div>
      </div>
    </div>
  );
}

/** 12. Outlined cards with no fill, sharp corners and a large quotation mark, running by. */
function P12({ reviews }: { reviews: ProposalReview[] }) {
  return (
    <div className="bg-card py-16 lg:py-24">
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Heading />
          <GoogleLine count={reviews.length} />
        </div>
      </div>
      <div className={`mt-10 ${fade}`}>
        <Marquee seconds={40}>
          {fillTo(reviews, 6).map((review, i) => (
            <figure key={i} className="marquee-card relative flex w-[300px] flex-col border-2 border-heading p-7 sm:w-[340px]">
              <span aria-hidden="true" className="absolute -top-5 left-5 bg-card px-2 font-heading text-[64px] font-bold leading-none text-accent">
                ”
              </span>
              <Stars className="mt-2 h-5 w-5" />
              <blockquote className="mt-4 flex-1 text-[17px] leading-relaxed text-heading">{review.quote || "5 av 5 stjärnor."}</blockquote>
              <figcaption className="mt-5 flex items-center justify-between text-label uppercase text-heading">
                {review.name}
                <GoogleMark className="h-5 w-5" />
              </figcaption>
            </figure>
          ))}
        </Marquee>
      </div>
    </div>
  );
}

/** 13. A plain list like a record: name, stars and words, one line each, with thin lines between. */
function P13({ reviews }: { reviews: ProposalReview[] }) {
  return (
    <div className="bg-page py-16 lg:py-24">
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Heading />
          <GoogleLine count={reviews.length} />
        </div>
        <ul className="mt-10 border-t-[3px] border-accent">
          {reviews.map((review, i) => (
            <li key={review.id} className="grid items-center gap-x-8 gap-y-2 border-b border-line/15 py-6 sm:grid-cols-[240px_140px_1fr]">
              <p className="flex items-center gap-3 text-[18px] font-semibold text-heading">
                <Initial name={review.name} index={i} className="h-9 w-9 text-[15px]" />
                {review.name}
              </p>
              <Stars className="h-5 w-5" />
              <p className="text-[17px] text-body">{review.quote ? `”${review.quote}”` : <span className="text-muted">Betyg utan kommentar</span>}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** 14. A mosaic: written reviews large, star reviews small, the score as a green tile. */
function P14({ reviews }: { reviews: ProposalReview[] }) {
  const quoted = reviews.filter((review) => review.quote);
  const starsOnly = reviews.filter((review) => !review.quote);
  return (
    <div className="bg-card py-16 lg:py-24">
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <Tag />
        <div className="mt-4">
          <Heading />
        </div>
        <div className="mt-10 grid auto-rows-[minmax(150px,auto)] grid-cols-2 gap-4 lg:grid-cols-4">
          <div className="col-span-2 row-span-1 flex flex-col justify-between bg-primary p-7 text-white lg:col-span-1 lg:row-span-2">
            <GoogleMark className="h-8 w-8" />
            <div>
              <p className="text-[64px] font-extrabold leading-none">5,0</p>
              <Stars className="mt-2 h-5 w-5" />
              <p className="mt-3 text-white/75">{reviews.length} recensioner på Google</p>
            </div>
          </div>
          {quoted.map((review, i) => (
            <figure key={review.id} className="col-span-2 flex flex-col bg-page p-7 lg:row-span-1">
              <Stars className="h-5 w-5" />
              <blockquote className="mt-4 flex-1 text-[22px] font-semibold leading-snug text-heading">”{review.quote}”</blockquote>
              <figcaption className="mt-4 flex items-center gap-3 text-muted">
                <Initial name={review.name} index={i} className="h-8 w-8 text-[14px]" />
                {review.name}
              </figcaption>
            </figure>
          ))}
          {starsOnly.map((review, i) => (
            <figure key={review.id} className="flex flex-col justify-between bg-page p-5">
              <Stars className="h-5 w-5" />
              <figcaption className="mt-4 flex items-center gap-2.5 font-semibold text-heading">
                <Initial name={review.name} index={quoted.length + i} className="h-8 w-8 text-[14px]" />
                {review.name}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}

/** 15. Two tilted bands crossing, like site tape: one green, one light, running opposite ways. */
function P15({ reviews }: { reviews: ProposalReview[] }) {
  const band = (light: boolean) =>
    fillTo(reviews, 8).map((review, i) => (
      <p key={i} className={`marquee-card flex items-center gap-4 whitespace-nowrap pr-8 text-[19px] ${light ? "text-heading" : "text-white"}`}>
        <Stars className="h-5 w-5" />
        <span className="font-semibold">{review.name}</span>
        {review.quote && <span className={light ? "text-body" : "text-white/80"}>”{review.quote}”</span>}
      </p>
    ));
  return (
    <div className="overflow-hidden bg-page py-16 lg:py-24">
      <div className="mx-auto flex max-w-content flex-wrap items-end justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Heading />
        <GoogleLine count={reviews.length} />
      </div>
      <div className="relative mt-14 h-[260px]">
        <div className="absolute inset-x-[-5%] top-4 -rotate-[4deg] bg-primary py-5 shadow-[0_14px_30px_-16px_rgba(0,0,0,0.5)]">
          <Marquee seconds={40}>{band(false)}</Marquee>
        </div>
        <div className="absolute inset-x-[-5%] top-[140px] rotate-[3deg] border-y-[3px] border-accent bg-card py-5 shadow-[0_14px_30px_-16px_rgba(0,0,0,0.35)]">
          <Marquee seconds={40} reverse>
            {band(true)}
          </Marquee>
        </div>
      </div>
    </div>
  );
}

const proposals: { name: string; text: string; View: (props: { reviews: ProposalReview[] }) => ReactNode }[] = [
  { name: "Stegkorten", text: "Fyrkantiga kort med den gröna linjen överst, som korten för Så går det till. Två rader åt olika håll.", View: P1 },
  { name: "Mörk topografi", text: "Mörkgröna bakgrunden och höjdkurvorna från footern. Ljusa, genomskinliga kort i två rader.", View: P2 },
  { name: "Det stora citatet", text: "Ett omdöme i taget i stor text som byter av sig självt. Snittbetyget i en ruta bredvid.", View: P3 },
  { name: "Betygsblocket", text: "Stort grönt block med 5,0 till vänster, omdömena rullar uppåt till höger.", View: P4 },
  { name: "Accentlinjen", text: "Stilla. De skrivna omdömena med den gröna stapeln bredvid, stjärnbetygen som namnbrickor under.", View: P5 },
  { name: "Numrerade kort", text: "Kort med stora siffror som i stegen. På mobilen drar man dem i sidled med fingret.", View: P6 },
  { name: "Tickern", text: "En smal grön remsa där namn, stjärnor och citat rullar förbi, som en nyhetsremsa.", View: P7 },
  { name: "Över eget foto", text: "Bilen i solnedgången, mörklagd, med vita kort som rullar över bilden.", View: P8 },
  { name: "Kortleken", text: "En liten hög kort där det översta byts ut med några sekunders mellanrum, eller med pilarna.", View: P9 },
  { name: "Delad yta", text: "Grön halva med rubrik och betyg, ljus halva med två kolumner som rullar upp och ner.", View: P10 },
  { name: "Sigillet", text: "En rund stämpel med 5,0, i stil med certifikaten, bredvid de skrivna omdömena.", View: P11 },
  { name: "Ramarna", text: "Kort med bara mörk ram och stort citattecken i grönt. En rad som rullar.", View: P12 },
  { name: "Protokollet", text: "Stilla och stramt: namn, stjärnor och citat på en rad var med tunna linjer emellan.", View: P13 },
  { name: "Mosaiken", text: "Rutnät: skrivna omdömen stora, stjärnbetyg små och snittbetyget som en grön ruta.", View: P14 },
  { name: "Avspärrningsband", text: "Två lutande band som korsar varandra, ett grönt och ett ljust, och rullar åt olika håll.", View: P15 },
];

export function ReviewProposals({ reviews }: { reviews: ProposalReview[] }) {
  return (
    <>
      {/* The columns that run up and down. */}
      <style>{`
        .rf-track-y { animation: rf-up var(--marquee-duration, 30s) linear infinite; }
        .rf-track-y:has(.marquee-card:hover) { animation-play-state: paused; }
        @keyframes rf-up { to { transform: translateY(-50%); } }
      `}</style>
      <nav aria-label="Förslagen" className="sticky top-0 z-30 border-b border-line/10 bg-page/95 backdrop-blur">
        <ul className="no-scrollbar mx-auto flex max-w-content gap-2 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8">
          {proposals.map((proposal, i) => (
            <li key={proposal.name} className="shrink-0">
              <a
                href={`#forslag-${i + 1}`}
                className="flex min-h-10 items-center rounded-full bg-card px-4 text-[14px] font-semibold text-heading hover:bg-primary hover:text-white"
              >
                {i + 1}. {proposal.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      {proposals.map(({ name, text, View }, i) => (
        <section key={name} id={`forslag-${i + 1}`} className="scroll-mt-16 border-b-[6px] border-heading/10">
          <div className="bg-heading px-4 py-4 text-white sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-content flex-wrap items-baseline gap-x-4 gap-y-1">
              <h2 className="text-[22px] font-semibold">
                Förslag {i + 1}: {name}
              </h2>
              <p className="text-[15px] text-white/75">{text}</p>
            </div>
          </div>
          <View reviews={reviews} />
        </section>
      ))}
    </>
  );
}
