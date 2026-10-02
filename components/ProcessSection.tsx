import { Icon } from "./Icon";
import { Reveal } from "./Reveal";
import { processSteps } from "@/lib/process";

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
            <li key={step.title} className="flex flex-col border-t-[3px] border-olive bg-cream p-7 sm:p-8">
              <div className="flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center bg-olive text-white">
                  <Icon name={step.icon} className="h-6 w-6" />
                </span>
                <span className="text-[44px] font-semibold leading-none text-ink/15" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-7 text-h3 text-ink">
                <span className="sr-only">Steg {index + 1}: </span>
                {step.title}
              </h3>
              <p className="mt-3 text-[16px] leading-relaxed text-coal">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
