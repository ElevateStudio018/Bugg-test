"use client";

import { Icon } from "./Icon";
import { useQuoteModal } from "@/contexts/QuoteModalContext";

export function ConfirmationToast() {
  const { confirmationVisible } = useQuoteModal();

  return (
    <div
      aria-live="polite"
      className={`fixed left-1/2 top-24 z-[200] -translate-x-1/2 px-4 transition-all duration-400 ease-out ${
        confirmationVisible ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-3 opacity-0"
      }`}
    >
      <div className="flex items-center gap-3 border border-dark/10 bg-white px-5 py-4 shadow-2xl">
        <Icon name="CheckCircle2" className="h-6 w-6 shrink-0 text-green-600" />
        <p className="text-sm font-medium text-dark sm:text-base">Tack! Vi återkommer strax</p>
      </div>
    </div>
  );
}
