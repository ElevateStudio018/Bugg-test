"use client";

import type { ReactNode } from "react";
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
import { QuoteModal } from "../QuoteModal";
import { ConfirmationToast } from "../ConfirmationToast";
import { PageView } from "./PageView";
import { ServicePageView } from "./ServicePageView";
import { MaintenanceView } from "./MaintenanceView";
import { navContent } from "./navContent";
import { quoteFormContent } from "./quoteFormContent";
import { QuoteModalProvider } from "@/contexts/QuoteModalContext";
import { list } from "@/lib/site/collection.ts";
import { googleFontsHref } from "@/lib/site/fonts.ts";
import { homePage, pageBySlug } from "@/lib/site/pages.ts";
import { siteDataSchema, type SiteData } from "@/lib/site/schema.ts";
import { themeCss } from "@/lib/site/theme.ts";

/** Google Fonts for fonts the build has not downloaded yet (the built site hosts its own copies). */
function fontHref(site: SiteData): string | null {
  const families = Array.from(new Set(Object.values(site.theme.fonts).map((font) => font.family))).filter((family) => family !== "Figtree");
  return families.length > 0 ? googleFontsHref(families) : null;
}

/** The page at this address drawn from newer published content, with the site's own components (see LiveSite). */
export function LiveView({ data, pathname, children }: { data: unknown; pathname: string; children: ReactNode }) {
  const parsed = siteDataSchema.safeParse(data);
  if (!parsed.success) return <>{children}</>;
  const site = parsed.data;

  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const path = (pathname.startsWith(base) ? pathname.slice(base.length) : pathname).replace(/^\/+|\/+$/g, "");
  const [first, second] = path.split("/");
  let body: ReactNode = null;
  if (!path) {
    body = <PageView page={homePage(site)} site={site} isHome />;
  } else if (first === "tjanster" && second) {
    const service = list(site.services).find((item) => item.slug === second);
    if (service) body = <ServicePageView site={site} service={service} />;
  } else if (!second) {
    const page = pageBySlug(site, first);
    if (page) body = <PageView page={page} site={site} isHome={false} />;
  }
  // An address the newer content does not know (or a page added since the build) keeps the built page.
  if (!body) return <>{children}</>;

  const fonts = fontHref(site);
  const head = (
    <>
      <style dangerouslySetInnerHTML={{ __html: themeCss(site.theme) }} />
      {fonts && <link rel="stylesheet" href={fonts} />}
    </>
  );
  if (site.settings.maintenance.enabled) {
    return (
      <>
        {head}
        <MaintenanceView site={site} />
      </>
    );
  }
  return (
    <>
      {head}
      <QuoteModalProvider>
        <Navbar content={navContent(site)} />
        <main id="innehall" tabIndex={-1} className="pt-16 outline-none sm:pt-20">
          {body}
        </main>
        <Footer site={site} />
        <QuoteModal content={quoteFormContent(site)} closeLabel={site.ui.closeLabel} />
        <ConfirmationToast message={site.form.confirmation} />
      </QuoteModalProvider>
    </>
  );
}
