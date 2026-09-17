"use client";

import { useId, useState } from "react";
import { Icon } from "./Icon";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";
import { faqItems } from "@/lib/faq";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const idPrefix = useId();

  return (
    <section id="faq" className="scroll-mt-24 bg-mist">
      <div className="mx-auto max-w-content px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
        <Reveal className="max-w-2xl">
          <Eyebrow index={4} label="Vanliga frågor" className="mb-5" />
          <h2 className="text-h2-mobile text-dark lg:text-h2">Vanliga frågor</h2>
          <p className="mt-4 text-base leading-relaxed text-gray-body">
            Svar på några av de frågor vi ofta får om våra bygg- och renoveringsprojekt.
          </p>
        </Reveal>

        <Reveal delayMs={100} className="mx-auto mt-12 max-w-3xl divide-y divide-dark/10 border-y border-dark/10">
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
                    className="flex w-full items-center justify-between gap-4 py-5 text-left text-base font-semibold text-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-dark sm:text-lg"
                  >
                    {item.question}
                    <Icon
                      name="ChevronDown"
                      className={`h-5 w-5 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
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
                    <p className="pb-5 text-base leading-relaxed text-gray-body">{item.answer}</p>
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
