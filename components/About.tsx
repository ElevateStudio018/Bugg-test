"use client";

import { PlaceholderArt } from "./PlaceholderArt";
import { Reveal } from "./Reveal";
import { buttonClasses } from "./Button";
import { about, company } from "@/lib/content";
import { toIntlDisplay, toTelHref } from "@/lib/format";
import { useQuoteModal } from "@/contexts/QuoteModalContext";

export function About() {
  const { open } = useQuoteModal();

  return (
    <section id="om-oss" className="scroll-mt-24 bg-white">
      <div className="mx-auto max-w-content px-4 py-16 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <PlaceholderArt
              icon="Hammer"
              alt={`Hantverkare från ${company.legalName} i arbete`}
              className="aspect-[4/3] w-full rounded-[3px] border border-dark/10"
            />
          </Reveal>

          <Reveal delayMs={100}>
            <h2 className="text-h2-mobile text-dark lg:text-h2">{about.heading}</h2>
            <p className="mt-3 text-lg font-semibold text-dark">{about.subheading}</p>

            <div className="mt-6 space-y-4">
              {about.paragraphs.map((paragraph, index) => (
                <p key={index} className="text-base leading-relaxed text-gray-body">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-4">
              <button type="button" onClick={open} className={buttonClasses("accent", "px-4 sm:px-6")}>
                Få gratis offert
              </button>
              <a
                href={toTelHref(company.phoneNational)}
                className="whitespace-nowrap text-[15px] font-semibold text-dark sm:text-base"
              >
                {toIntlDisplay(company.phoneNational)}
              </a>
            </div>

            <p className="mt-4 text-[13px] text-gray-body">Org.nr: {company.orgNumber}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
