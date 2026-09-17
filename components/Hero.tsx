"use client";

import { Eyebrow } from "./Eyebrow";
import { buttonClasses } from "./Button";
import { company, hero } from "@/lib/content";
import { useQuoteModal } from "@/contexts/QuoteModalContext";

export function Hero() {
  const { open } = useQuoteModal();

  return (
    <section className="bg-dark px-6 pb-20 pt-40 sm:px-10 sm:pb-28 sm:pt-48 lg:px-16 lg:pb-36 lg:pt-56">
      <Eyebrow label={`${company.legalName} · Sedan ${company.foundedYear}`} light rule={false} className="mb-6" />
      <h1 className="max-w-4xl text-h1-mobile text-white lg:text-h1">{hero.heading}</h1>
      <button type="button" onClick={open} className={`${buttonClasses("primary-inverse")} mt-10`}>
        Få gratis offert
      </button>
    </section>
  );
}
