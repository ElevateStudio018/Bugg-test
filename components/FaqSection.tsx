"use client";

import { useId, useState } from "react";
import { Icon } from "./Icon";
import { Reveal } from "./Reveal";
import { ArrowLabel, arrowLinkClasses } from "./Button";
import { faqItems } from "@/lib/faq";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const idPrefix = useId();

  return (
    <section id="faq" className="scroll-mt-20 bg-cream">
      <div className="mx-auto grid max-w-content grid-cols-1 gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16 lg:px-8 lg:py-28">
        <Reveal>
          <h2 className="text-h2 text-ink lg:text-h2-lg">Vanliga frågor</h2>
          <p className="mt-5 text-copy text-coal lg:text-lead">
            Svar på några av de frågor vi ofta får om våra mark- och grundarbeten.
          </p>
          <a href="#kontakt" className={arrowLinkClasses("ink", "mt-6")}>
            <ArrowLabel>Har du en annan fråga?</ArrowLabel>
          </a>
        </Reveal>

        <Reveal delayMs={100} className="space-y-3">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            const buttonId = `${idPrefix}-trigger-${index}`;
            const panelId = `${idPrefix}-panel-${index}`;

            return (
              <div key={item.question} className="bg-sand">
                <h3>
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left text-[18px] font-semibold leading-snug text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-olive sm:px-8 sm:py-6"
                  >
                    {item.question}
                    <Icon
                      name="ChevronDown"
                      strokeWidth={2}
                      className={`h-6 w-6 shrink-0 text-moss transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    />
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
                    <p className="px-6 pb-6 text-copy text-coal sm:px-8 sm:pb-7">{item.answer}</p>
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
