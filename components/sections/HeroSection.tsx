import { ArrowLabel, buttonClasses, type ButtonVariant } from "../Button";
import { SiteLink } from "../SiteLink";
import { ZoomImage } from "../ZoomImage";
import { focusStyle, imageProps } from "@/lib/site/images.ts";
import type { SiteImage } from "@/lib/site/schema.ts";
import placeholders from "@/lib/photo-placeholders.json";
import { key } from "@/lib/site/edit.ts";
import type { SectionProps } from "./types";

type HeroProps = SectionProps<"hero">;

export function HeroSection({ section, ctx }: HeroProps) {
  const extras = (
    [
      [section.secondImage, "secondImage"],
      [section.thirdImage, "thirdImage"],
    ] as const
  ).flatMap(([image, field]) => (image ? [{ image, k: key(ctx.path, field) }] : []));
  return extras.length > 0 ? <CollageHero section={section} extras={extras} base={ctx.path} /> : <PhotoHero section={section} base={ctx.path} />;
}

/** One photo fills the first screen under an even dark filter, with the white text over it. */
function PhotoHero({ section, base }: { section: HeroProps["section"]; base?: string }) {
  const placeholder = (placeholders as Record<string, string>)[section.image.src];
  return (
    // The white text sits near the bottom on phones and tablets, and just below the middle on the left on desktop.
    <section
      id={section.anchor || undefined}
      data-k={base}
      className="relative isolate flex min-h-[calc(100svh-4rem)] flex-col overflow-hidden bg-secondary sm:min-h-[calc(100svh-5rem)]"
    >
      {/* A tiny blurred copy, inlined in the page, shows the photo's colours at once while the sharp one loads. */}
      {placeholder && (
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 scale-110 bg-cover blur-xl"
          style={{ backgroundImage: `url(${placeholder})`, backgroundPosition: section.image.focus || "74% center" }}
        />
      )}
      {/* On a portrait screen the photo fills the height and is shown wider than the screen. Asking for a copy about the
          screen's height wide keeps it sharp enough without sending a phone the full 4K photo. */}
      <ZoomImage
        {...imageProps(section.image, "(orientation: portrait) 90vh, 100vw")}
        alt={section.image.alt}
        k={key(base, "image")}
        priority
        parallax="top"
        style={focusStyle(section.image)}
        className="absolute inset-0 -z-10 h-full w-full object-cover object-[74%_center] lg:object-[75%_55%]"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/45" />
      <div className="mx-auto mt-auto w-full max-w-content px-4 pb-12 sm:px-6 sm:pb-16 lg:my-auto lg:px-8 lg:pb-0 lg:pt-[8svh]">
        <HeroText section={section} base={base} button="solid" />
      </div>
    </section>
  );
}

/**
 * The company's own photos as a collage beside the text, so every photo is seen whole and the text never sits on a
 * busy photo. Phones: the main photo across the top, the other two in a row under it, the text below. Desktop: the
 * text on the dark left, the main photo across the top right and the other two under it.
 */
function CollageHero({ section, extras, base }: { section: HeroProps["section"]; extras: { image: SiteImage; k?: string }[]; base?: string }) {
  return (
    <section
      id={section.anchor || undefined}
      data-k={base}
      className="relative flex min-h-[calc(100svh-4rem)] flex-col bg-primary sm:min-h-[calc(100svh-5rem)] lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
    >
      <div
        className={`grid h-[52svh] grid-rows-[3fr_2fr] gap-1 lg:order-2 lg:h-auto lg:grid-rows-[11fr_9fr] ${extras.length === 2 ? "grid-cols-2" : "grid-cols-1"}`}
      >
        <CollagePhoto image={section.image} k={key(base, "image")} sizes="(min-width: 1024px) 58vw, 100vw" priority className="col-span-full" />
        {extras.map(({ image, k }) => (
          <CollagePhoto
            key={image.src}
            image={image}
            k={k}
            sizes={extras.length === 2 ? "(min-width: 1024px) 29vw, 50vw" : "(min-width: 1024px) 58vw, 100vw"}
          />
        ))}
      </div>
      {/* On desktop the text lines up with the logo above it, however wide the screen. */}
      <div className="flex flex-1 flex-col justify-center px-4 py-10 sm:px-6 sm:py-14 lg:order-1 lg:py-16 lg:pl-[max(2rem,calc((100vw-1280px)/2+2rem))] lg:pr-12">
        <HeroText section={section} base={base} button="on-primary" compact />
      </div>
    </section>
  );
}

function CollagePhoto({
  image,
  k,
  sizes,
  priority,
  className = "",
}: {
  image: SiteImage;
  k?: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <ZoomImage
        {...imageProps(image, sizes)}
        alt={image.alt}
        k={k}
        priority={priority}
        style={focusStyle(image)}
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
}

/** Eyebrow, heading and button, rising into place one after another as the page loads. */
function HeroText({
  section,
  base,
  button,
  compact = false,
}: {
  section: HeroProps["section"];
  base?: string;
  button: ButtonVariant;
  compact?: boolean;
}) {
  return (
    <>
      {section.eyebrow && (
        <p data-k={key(base, "eyebrow")} className="animate-rise text-tag uppercase text-white/85 [animation-delay:150ms] lg:text-[14px]">
          {section.eyebrow}
        </p>
      )}
      <h1
        data-k={key(base, "heading")}
        className={`mt-4 max-w-[9.5em] animate-rise [animation-delay:300ms] text-[36px] font-semibold leading-[1.04] tracking-[-0.02em] text-white min-[380px]:text-[40px] sm:text-[56px] lg:mt-6 ${
          compact ? "lg:text-[44px] xl:text-[54px] 2xl:text-[64px]" : "lg:text-[52px] xl:text-[64px] 2xl:text-[88px]"
        }`}
      >
        {section.heading}
      </h1>
      {section.button.label && (
        <div className="animate-rise [animation-delay:450ms]">
          <SiteLink
            href={section.button.href}
            k={key(base, "button")}
            className={buttonClasses(button, "group/arrow mt-8 focus-visible:outline-white lg:mt-10")}
          >
            <span>
              <ArrowLabel spaced>{section.button.label}</ArrowLabel>
            </span>
          </SiteLink>
        </div>
      )}
    </>
  );
}
