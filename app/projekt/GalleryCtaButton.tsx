"use client";

import { buttonClasses } from "@/components/Button";
import { useQuoteModal } from "@/contexts/QuoteModalContext";

export function GalleryCtaButton() {
  const { open } = useQuoteModal();
  return (
    <button type="button" onClick={open} className={buttonClasses("accent")}>
      Få gratis offert
    </button>
  );
}
