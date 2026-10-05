import { ArrowLabel, buttonClasses } from "../Button";
import { SiteLink } from "../SiteLink";
import { ZoomImage } from "../ZoomImage";
import { focusStyle, imageProps } from "@/lib/site/images.ts";
import type { SectionProps } from "./types";

export function HeroSection({ section }: SectionProps<"hero">) {
  return (
    // The photo fills the first screen on every device under an even dark filter. The white text sits near the
    // bottom on phones and tablets, and just below the middle on the left on desktop.
    <section
      id={section.anchor || undefined}
      className="relative isolate flex min-h-[calc(100svh-4rem)] flex-col overflow-hidden bg-secondary sm:min-h-[calc(100svh-5rem)]"
    >
      <ZoomImage
        {...imageProps(section.image, "100vw")}
        alt={section.image.alt}
        priority
        parallax="top"
        style={focusStyle(section.image)}
        className="absolute inset-0 -z-10 h-full w-full object-cover object-[74%_center] lg:object-[75%_55%]"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/45" />

      <div className="mx-auto mt-auto w-full max-w-content px-4 pb-12 sm:px-6 sm:pb-16 lg:my-auto lg:px-8 lg:pb-0 lg:pt-[8svh]">
        {/* Eyebrow, heading and button rise into place one after another as the page loads. */}
        {section.eyebrow && (
          <p className="animate-rise text-tag uppercase text-white/85 [animation-delay:150ms] lg:text-[14px]">{section.eyebrow}</p>
        )}
        <h1 className="mt-4 max-w-[9.5em] animate-rise [animation-delay:300ms] text-[36px] font-semibold leading-[1.04] tracking-[-0.02em] text-white min-[380px]:text-[40px] sm:text-[56px] lg:mt-6 lg:text-[52px] xl:text-[64px] 2xl:text-[88px]">
          {section.heading}
        </h1>
        {section.button.label && (
          <div className="animate-rise [animation-delay:450ms]">
            <SiteLink href={section.button.href} className={buttonClasses("solid", "group/arrow mt-8 focus-visible:outline-white lg:mt-10")}>
              <span>
                <ArrowLabel spaced>{section.button.label}</ArrowLabel>
              </span>
            </SiteLink>
          </div>
        )}
      </div>
    </section>
  );
}
