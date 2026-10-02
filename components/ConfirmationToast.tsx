"use client";

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
      <div className="flex items-center gap-3 bg-olive px-5 py-4 shadow-2xl">
        {/* The tick draws itself as the message appears. */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="h-6 w-6 shrink-0 text-white"
        >
          <path
            d="m7 12 3 3 7-7"
            pathLength={1}
            strokeDasharray={1}
            className={`transition-[stroke-dashoffset] duration-500 ease-out ${
              confirmationVisible ? "delay-200 [stroke-dashoffset:0]" : "[stroke-dashoffset:1]"
            }`}
          />
        </svg>
        <p className="text-[16px] font-semibold text-white">Tack! Vi återkommer strax</p>
      </div>
    </div>
  );
}
