"use client";

import { Reveal } from "./Reveal";
import { buttonClasses } from "./Button";
import { company } from "@/lib/content";
import { toIntlDisplay, toTelHref } from "@/lib/format";
import { useQuoteModal } from "@/contexts/QuoteModalContext";

export function FinalCta() {
  const { open } = useQuoteModal();

  return (
    <section className="bg-dark">
      <div className="mx-auto max-w-content px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-24">
        <Reveal>
          <h2 className="text-h2-mobile text-white lg:text-h2">Redo att starta ditt byggprojekt?</h2>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href={toTelHref(company.phoneNational)} className={buttonClasses("accent")}>
              {toIntlDisplay(company.phoneNational)}
            </a>
            <button type="button" onClick={open} className={buttonClasses("ghost")}>
              Få gratis offert
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
