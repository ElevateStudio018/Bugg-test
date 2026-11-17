import { Photo } from "../Photo";
import { Reveal } from "../Reveal";
import { SiteLink } from "../SiteLink";
import { arrowLinkClasses, ArrowLabel } from "../Button";
import { list } from "@/lib/site/collection.ts";
import { imageProps } from "@/lib/site/images.ts";
import { key } from "@/lib/site/edit.ts";
import type { SectionProps } from "./types";

/** The certificates' badges side by side under a short heading, linking to the page that shows them in full. */
export function CertificateStripSection({ section, ctx }: SectionProps<"certificateStrip">) {
  const badges = list(ctx.site.certificates).filter((certificate) => certificate.image);
  if (badges.length === 0) return null;

  return (
    <section id={section.anchor || undefined} data-k={ctx.path} className="scroll-mt-20 border-b border-line/10 bg-card">
      <div className="mx-auto flex max-w-content flex-col items-center gap-6 px-4 py-8 sm:px-6 lg:flex-row lg:justify-between lg:gap-10 lg:px-8 lg:py-10">
        {section.heading && (
          <h2 data-k={key(ctx.path, "heading")} className="text-center text-h3 text-heading lg:max-w-[12em] lg:text-left">
            {section.heading}
          </h2>
        )}
        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 sm:gap-x-10 lg:flex-nowrap lg:gap-x-6 xl:gap-x-10">
          {badges.map((certificate, index) =>
            certificate.image ? (
              <Reveal key={certificate.id} as="li" delayMs={index * 80}>
                <Photo
                  {...imageProps(certificate.image, "120px")}
                  alt={certificate.image.alt}
                  k={`certificates.items.${certificate.id}.image`}
                  className="h-14 w-auto object-contain sm:h-16"
                />
              </Reveal>
            ) : null,
          )}
        </ul>
        {section.link.label && (
          <SiteLink href={section.link.href} k={key(ctx.path, "link")} className={arrowLinkClasses("shrink-0")}>
            <ArrowLabel>{section.link.label}</ArrowLabel>
          </SiteLink>
        )}
      </div>
    </section>
  );
}
