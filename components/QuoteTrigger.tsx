"use client";

import type { ReactNode } from "react";
import { useQuoteModal } from "@/contexts/QuoteModalContext";

/** Any element that opens the quote modal; callers decide how it looks. */
export function QuoteTrigger({ className, children, k }: { className: string; children: ReactNode; k?: string }) {
  const { open } = useQuoteModal();
  return (
    <button type="button" onClick={open} className={className} data-k={k}>
      {children}
    </button>
  );
}
