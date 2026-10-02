"use client";

import { useId, useState } from "react";
import { Reveal } from "./Reveal";
import { company } from "@/lib/content";
import { faqItems } from "@/lib/faq";
import { toTelHref } from "@/lib/format";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const idPrefix = useId();

  return (
    <section id="faq" className="scroll-mt-20">
      <div className="mx-auto grid max-w-content grid-cols-1 gap-10 px-4 pb-16 pt-12 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16 lg:px-8 lg:py-28">
        <Reveal>
          <h2 className="text-h2 text-ink lg:text-h2-lg">Vanliga frågor</h2>
          <p className="mt-3 text-copy text-coal/75 lg:mt-5 lg:text-lead">
            Hittar du inte svaret? Ring oss på{" "}
            <a
              href={toTelHref(company.phoneNational)}
              className="whitespace-nowrap font-semibold text-ink transition-colors duration-200 hover:text-olive"
            >
              {company.phoneNational}
            </a>
            .
          </p>
        </Reveal>

        {/* Plain rows split by thin lines; the answer opens under its question. */}
        <Reveal delayMs={100} className="border-t border-ink/15">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            const buttonId = `${idPrefix}-trigger-${index}`;
            const panelId = `${idPrefix}-panel-${index}`;

            return (
              <div key={item.question} className="border-b border-ink/15">
                <h3>
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-6 py-4 text-left text-[18px] font-bold leading-[1.25] text-ink transition-colors duration-200 hover:text-olive focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive lg:py-5 lg:text-[20px]"
                  >
                    {item.question}
                    {/* A plus drawn with two thin bars; the upright one turns down flat into a minus while open. */}
                    <span aria-hidden="true" className="relative h-5 w-5 shrink-0">
                      <span className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 rounded-full bg-current" />
                      <span
                        className={`absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2 rounded-full bg-current transition-transform duration-300 ease-out ${
                          isOpen ? "rotate-90" : ""
                        }`}
                      />
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={`grid overflow-hidden transition-all duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pb-5 pr-10 text-copy leading-[1.4] text-coal">{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
