import { DrawIcon } from "./DrawIcon";
import { GrowLine } from "./GrowLine";
import { Reveal } from "./Reveal";
import { processSteps } from "@/lib/process";

// Each card fades up, its top edge draws in and then its icon draws itself, on one quick beat. Cards sharing a row
// (2 columns from sm, 4 from lg) come a beat apart, so the edges run from step to step like a timeline; a card alone
// on its row (phones) doesn't wait.
const stagger = [
  { card: "delay-0", line: "delay-100", icon: "[--draw-delay:200ms]" },
  { card: "delay-0 sm:delay-[70ms]", line: "delay-100 sm:delay-[170ms]", icon: "[--draw-delay:200ms] sm:[--draw-delay:270ms]" },
  { card: "delay-0 lg:delay-[140ms]", line: "delay-100 lg:delay-[240ms]", icon: "[--draw-delay:200ms] lg:[--draw-delay:340ms]" },
  {
    card: "delay-0 sm:delay-[70ms] lg:delay-[210ms]",
    line: "delay-100 sm:delay-[170ms] lg:delay-[310ms]",
    icon: "[--draw-delay:200ms] sm:[--draw-delay:270ms] lg:[--draw-delay:410ms]",
  },
];

export function ProcessSection() {
  return (
    <section id="process" className="scroll-mt-20">
      <div className="mx-auto max-w-content px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
        <Reveal className="max-w-3xl">
          <h2 className="text-h2 text-ink lg:text-h2-lg">Så går det till</h2>
          <p className="mt-5 text-copy text-coal lg:text-lead">Fyra tydliga steg från första kontakt till avslutat markarbete.</p>
        </Reveal>

        <ol className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, index) => (
            <Reveal
              as="li"
              key={step.title}
              className={`relative flex flex-col bg-cream p-7 sm:p-8 ${stagger[index % stagger.length].card}`}
            >
              <GrowLine className={`absolute inset-x-0 top-0 h-[3px] bg-olive ${stagger[index % stagger.length].line}`} />
              <div className="flex items-center justify-between">
                <DrawIcon
                  name={step.icon}
                  className={`flex h-12 w-12 items-center justify-center bg-olive text-white ${stagger[index % stagger.length].icon}`}
                  iconClassName="h-6 w-6"
                />
                <span className="text-[44px] font-semibold leading-none text-ink/15" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-7 text-h3 text-ink">
                <span className="sr-only">Steg {index + 1}: </span>
                {step.title}
              </h3>
              <p className="mt-3 text-[16px] leading-relaxed text-coal">{step.description}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
