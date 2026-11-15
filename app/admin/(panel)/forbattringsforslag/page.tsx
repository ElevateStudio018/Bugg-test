"use client";

import { PageHeader } from "@/components/admin/PageHeader";
import { SuggestionsTab } from "@/components/admin/suggestions/SuggestionsTab";

/** What the staff think the company could do better, sent from the link the owner gives them. */
export default function SuggestionsPage() {
  return (
    <>
      <PageHeader title="Förbättringsförslag" description="Förslag från medarbetarna på vad företaget kan göra bättre." />
      <SuggestionsTab />
    </>
  );
}
