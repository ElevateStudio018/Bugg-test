import { Breadcrumbs } from "../Breadcrumbs";
import { Icon } from "../Icon";
import { Photo } from "../Photo";
import { tapTarget } from "../Button";
import { list } from "@/lib/site/collection.ts";
import { toTelHref } from "@/lib/site/format.ts";
import { imageProps, withBasePath } from "@/lib/site/images.ts";
import { key } from "@/lib/site/edit.ts";
import type { SectionProps } from "./types";

export function CertificatesSection({ section, ctx }: SectionProps<"certificates">) {
  const { breadcrumbs } = ctx;
  const { company } = ctx.site;
  const certificates = list(ctx.site.certificates);
  const Heading = breadcrumbs ? "h1" : "h2";

  return (
    <div id={section.anchor || undefined} data-k={ctx.path} className="mx-auto max-w-content px-4 pt-8 sm:px-6 lg:px-8 lg:pt-10">
      {breadcrumbs && (
        // The text rises into place one part after another as the page loads, as on the homepage.
        <div className="animate-rise [animation-delay:150ms]">
          <Breadcrumbs items={breadcrumbs} label={ctx.site.ui.breadcrumbsLabel} />
        </div>
      )}

      <Heading
        data-k={key(ctx.path, "heading")}
        className="mt-4 animate-rise text-display text-heading [animation-delay:250ms] lg:mt-8 lg:text-display-lg"
      >
        {section.heading}
      </Heading>
      {section.text && (
        <p data-k={key(ctx.path, "text")} className="mt-3 max-w-3xl animate-rise text-copy text-body [animation-delay:350ms] lg:mt-6 lg:text-lead">
          {section.text}
        </p>
      )}

      {certificates.length > 0 ? (
        <ul className="mt-10 grid animate-rise gap-4 [animation-delay:450ms] sm:grid-cols-2 lg:mt-14">
          {certificates.map((certificate) => {
            const base = `certificates.items.${certificate.id}`;
            return (
              <li key={certificate.id} data-k={base} className="flex flex-col bg-card p-6 lg:p-8">
                {certificate.image ? (
                  // The badge whole, at the same height for every certificate.
                  <Photo
                    {...imageProps(certificate.image, "200px")}
                    alt={certificate.image.alt}
                    k={`${base}.image`}
                    className="h-24 w-auto max-w-full self-start object-contain lg:h-32"
                  />
                ) : (
                  <Icon name="BadgeCheck" className="h-9 w-9 text-accent" />
                )}
                <h2 data-k={`${base}.name`} className="mt-5 text-h3 text-heading">
                  {certificate.name}
                </h2>
                {certificate.issuer && (
                  <p className="mt-2 text-small text-muted">
                    <span data-k={key(ctx.path, "issuerPrefix")}>{section.issuerPrefix}</span>{" "}
                    <span data-k={`${base}.issuer`}>{certificate.issuer}</span>
                  </p>
                )}
                {certificate.description && (
                  <p data-k={`${base}.description`} className="mt-3 text-copy leading-[1.35] text-body">
                    {certificate.description}
                  </p>
                )}
                {(certificate.validUntil || certificate.document) && (
                  <div className="mt-auto pt-6">
                    {certificate.validUntil && (
                      <p className="text-small text-muted">
                        <span data-k={key(ctx.path, "validUntilPrefix")}>{section.validUntilPrefix}</span>{" "}
                        <span data-k={`${base}.validUntil`}>{certificate.validUntil}</span>
                      </p>
                    )}
                    {certificate.document && (
                      // The whole certificate, opened in a new tab, under the dates it is valid between.
                      <a
                        href={withBasePath(certificate.document)}
                        target="_blank"
                        rel="noopener"
                        className={`${tapTarget} mt-2 inline-flex items-center gap-2 font-semibold text-link underline underline-offset-4 hover:text-accent`}
                      >
                        <Icon name="FileText" className="h-5 w-5 shrink-0" />
                        <span data-k={key(ctx.path, "documentLabel")}>{section.documentLabel}</span>
                      </a>
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="mt-10 max-w-3xl animate-rise bg-card p-6 [animation-delay:450ms] lg:mt-14 lg:p-8">
          <h2 data-k={key(ctx.path, "emptyHeading")} className="text-h3 text-heading">
            {section.emptyHeading}
          </h2>
          {section.emptyText && (
            <p className="mt-3 text-copy leading-[1.35] text-body">
              <span data-k={key(ctx.path, "emptyText")}>{section.emptyText}</span>
              {company.phone && (
                <>
                  {" "}
                  <a
                    href={toTelHref(company.phone)}
                    data-k="company.phone"
                    className={`${tapTarget} font-semibold text-link underline underline-offset-4 hover:text-accent`}
                  >
                    {company.phone}
                  </a>
                </>
              )}
              .
            </p>
          )}
        </div>
      )}
    </div>
  );
}
