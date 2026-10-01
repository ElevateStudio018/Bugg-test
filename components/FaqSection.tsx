"use client";

import { useId, useState } from "react";
import { Icon } from "./Icon";
import { Reveal } from "./Reveal";
import { arrowLinkClasses } from "./Button";
import { faqItems } from "@/lib/faq";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const idPrefix = useId();

  return (
    <section id="faq" className="scroll-mt-20">
      <div className="mx-auto grid max-w-content grid-cols-1 gap-10 px-4 pb-16 pt-12 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16 lg:px-8 lg:py-28">
        <Reveal>
          <h2 className="text-h2 text-ink lg:text-h2-lg">Vanliga frågor</h2>
          <p className="mt-3 text-copy text-coal lg:mt-5 lg:text-lead">
            Här hittar du svar på några av de frågor vi ofta får om våra mark- och grundarbeten.
          </p>
          <a href="#kontakt" className={arrowLinkClasses("ink", "mt-4")}>
            Har du en annan fråga?
          </a>
        </Reveal>

        <Reveal delayMs={100}>
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            const buttonId = `${idPrefix}-trigger-${index}`;
            const panelId = `${idPrefix}-panel-${index}`;

            return (
              <div key={item.question}>
                <h3>
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-6 py-2 text-left text-[18px] font-semibold leading-[1.06] text-ink transition-colors duration-200 hover:text-olive focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive lg:py-3 lg:text-[20px]"
                  >
                    {item.question}
                    <Icon
                      name="ChevronDown"
                      strokeWidth={1.5}
                      className={`h-7 w-7 shrink-0 text-ink transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
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
                    <p className="pb-4 pr-12 pt-1 text-copy text-coal">{item.answer}</p>
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
