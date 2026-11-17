import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SiteLogin, type StaffContent } from "@/components/site/SiteLogin";
import { getSite } from "@/lib/site/data.ts";
import { list } from "@/lib/site/collection.ts";
import type { SiteData } from "@/lib/site/schema.ts";

// The staff's page: signed in, they see the suggestion box, the company's policies and certificates, and who to call.
export const metadata: Metadata = { title: "Personal – logga in", robots: { index: false, follow: false } };

function staffContent(site: SiteData): StaffContent {
  const documents: StaffContent["documents"] = [];
  const people: StaffContent["people"] = [];
  for (const page of list(site.pages)) {
    for (const section of list(page.sections)) {
      if (section.type === "policies") {
        for (const policy of list(section.items)) if (policy.document) documents.push({ name: policy.name, href: policy.document });
      }
      if (section.type === "team") {
        for (const member of list(section.members)) people.push({ name: member.name, role: member.role, phone: member.phone, email: member.email });
      }
    }
  }
  for (const certificate of list(site.certificates)) if (certificate.document) documents.push({ name: certificate.name, href: certificate.document });
  return { documents, people };
}

export default function StaffPage() {
  const site = getSite();
  return (
    <div className="mx-auto max-w-content px-4 pb-20 pt-8 sm:px-6 lg:px-8 lg:pb-28 lg:pt-10">
      <Breadcrumbs items={[{ label: site.ui.breadcrumbHome, href: "/" }, { label: "Personal" }]} label={site.ui.breadcrumbsLabel} />
      <h1 className="mt-6 text-display text-heading lg:text-[56px] lg:leading-[1.08]">Personal</h1>
      <p className="mt-4 max-w-2xl text-copy text-body lg:text-lead">
        För dig som jobbar på {site.company.shortName}. Logga in med kontot du fått av din chef.
      </p>
      <div className="mt-8">
        <SiteLogin area="staff" staff={staffContent(site)} />
      </div>
    </div>
  );
}
