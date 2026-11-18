"use client";

import { PageHeader } from "@/components/admin/PageHeader";
import { ApplicationsTab } from "@/components/admin/applications/ApplicationsTab";

/** People who would like to work at the company, from the form behind "Jobba hos oss" on the site. */
export default function ApplicationsPage() {
  return (
    <>
      <PageHeader
        title="Intresseanmälningar"
        description="Från formuläret under Jobba hos oss på hemsidan. Varje anmälan skickas också till info@markmontage.se."
      />
      <ApplicationsTab />
    </>
  );
}
