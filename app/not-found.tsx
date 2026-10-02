import type { Metadata } from "next";
import { SiteShell } from "@/components/site/SiteShell";
import { SiteLink } from "@/components/SiteLink";
import { buttonClasses } from "@/components/Button";
import { getSite } from "@/lib/site/data.ts";

export function generateMetadata(): Metadata {
  return { title: getSite().notFound.seoTitle };
}

export default function NotFound() {
  const site = getSite();
  const texts = site.notFound;
  return (
    <SiteShell site={site}>
      <div className="mx-auto max-w-content px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        {texts.eyebrow && <p className="text-tag uppercase text-muted">{texts.eyebrow}</p>}
        <h1 className="mt-4 text-display text-heading lg:text-[56px] lg:leading-[1.08]">{texts.heading}</h1>
        {texts.text && <p className="mt-4 max-w-prose text-copy text-body lg:text-lead">{texts.text}</p>}
        {texts.button.label && (
          <SiteLink href={texts.button.href} className={buttonClasses("solid", "mt-8")}>
            {texts.button.label}
          </SiteLink>
        )}
      </div>
    </SiteShell>
  );
}
