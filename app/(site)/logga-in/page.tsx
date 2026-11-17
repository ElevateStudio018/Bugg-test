import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SiteLogin } from "@/components/site/SiteLogin";
import { getSite } from "@/lib/site/data.ts";

// The admin's way in, as a page of the site; the admin panel itself opens after signing in. Not for search engines.
export const metadata: Metadata = { title: "Admin – logga in", robots: { index: false, follow: false } };

export default function AdminLoginPage() {
  const site = getSite();
  return (
    <div className="mx-auto max-w-content px-4 pb-20 pt-8 sm:px-6 lg:px-8 lg:pb-28 lg:pt-10">
      <Breadcrumbs items={[{ label: site.ui.breadcrumbHome, href: "/" }, { label: "Admin" }]} label={site.ui.breadcrumbsLabel} />
      <h1 className="mt-6 text-display text-heading lg:text-[56px] lg:leading-[1.08]">Admin</h1>
      <p className="mt-4 max-w-2xl text-copy text-body lg:text-lead">
        Logga in för att ändra hemsidan, se offertförfrågningar och förbättringsförslag.
      </p>
      <div className="mt-8">
        <SiteLogin area="admin" />
      </div>
    </div>
  );
}
