"use client";

import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";
import { buttonClasses } from "./Button";
import { about, company } from "@/lib/content";
import { toIntlDisplay, toTelHref } from "@/lib/format";
import { useQuoteModal } from "@/contexts/QuoteModalContext";

export function About() {
  const { open } = useQuoteModal();

  const facts = [
    { label: "Grundades", value: String(company.foundedYear) },
    { label: "Anställda", value: `~${company.employeeCountValue}` },
    { label: "Erfarenhet", value: `${company.yearsExperienceValue}+ år` },
  ];

  return (
    <section id="om-oss" className="scroll-mt-24 bg-white">
      <div className="mx-auto max-w-content px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
        <Reveal>
          <Eyebrow index={1} label={about.heading} className="mb-5" />
          <h2 className="text-h2-mobile text-dark lg:text-h2">{about.heading}</h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[2fr_1fr] lg:gap-16">
          <Reveal delayMs={80}>
            <p className="text-xl font-bold leading-snug text-dark sm:text-2xl">{about.subheading}</p>

            <div className="mt-6 space-y-4">
              {about.paragraphs.map((paragraph, index) => (
                <p key={index} className="text-base leading-relaxed text-gray-body">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-4">
              <button type="button" onClick={open} className={buttonClasses("primary", "px-4 sm:px-6")}>
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

          <Reveal delayMs={140} className="border-t border-dark/10 pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <dl className="space-y-8">
              {facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="text-xs font-semibold uppercase tracking-widest text-steel">{fact.label}</dt>
                  <dd className="mt-1 text-3xl font-extrabold text-dark">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
