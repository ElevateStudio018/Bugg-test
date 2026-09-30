"use client";

import { Eyebrow } from "./Eyebrow";
import { buttonClasses } from "./Button";
import { company, hero } from "@/lib/content";
import { useQuoteModal } from "@/contexts/QuoteModalContext";

export function Hero() {
  const { open } = useQuoteModal();

  return (
    <section className="relative overflow-hidden bg-dark px-6 pb-20 pt-40 sm:px-10 sm:pb-28 sm:pt-48 lg:px-16 lg:pb-36 lg:pt-56">
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.pexels.com/photos/6915593/pexels-photo-6915593.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-dark/80" />
      </div>

      <div className="relative">
        <Eyebrow label={`${company.legalName} · Sedan ${company.foundedYear}`} light rule={false} className="mb-6" />
        <h1 className="max-w-4xl text-h1-mobile text-white lg:text-h1">{hero.heading}</h1>
        <button type="button" onClick={open} className={`${buttonClasses("primary-inverse")} mt-10`}>
          Få gratis offert
        </button>
      </div>
    </section>
  );
}
