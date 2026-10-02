import { DrawIcon } from "./DrawIcon";
import { GrowLine } from "./GrowLine";
import { Reveal } from "./Reveal";
import { processSteps } from "@/lib/process";

// Each card's top edge draws in and then its icon draws itself. Where cards share a row (2 columns from sm, 4 from lg)
// the later ones wait, so the edges run from step to step like a timeline.
const stagger = [
  { line: "delay-200", icon: "[--draw-delay:450ms]" },
  { line: "delay-200 sm:delay-[450ms]", icon: "[--draw-delay:450ms] sm:[--draw-delay:700ms]" },
  { line: "delay-200 lg:delay-[700ms]", icon: "[--draw-delay:450ms] lg:[--draw-delay:950ms]" },
  {
    line: "delay-200 sm:delay-[450ms] lg:delay-[950ms]",
    icon: "[--draw-delay:450ms] sm:[--draw-delay:700ms] lg:[--draw-delay:1200ms]",
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
            <Reveal as="li" key={step.title} delayMs={index * 80} className="relative flex flex-col bg-cream p-7 sm:p-8">
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
