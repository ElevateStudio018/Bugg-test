"use client";

import { useCallback, useEffect, useState } from "react";
import { Icon } from "./Icon";
import { Eyebrow } from "./Eyebrow";
import { useInView, usePrefersReducedMotion } from "@/hooks/useInView";
import { processSteps } from "@/lib/process";

function ProcessStepItem({
  index,
  isEven,
  onReveal,
}: {
  index: number;
  isEven: boolean;
  onReveal: (index: number) => void;
}) {
  const step = processSteps[index];
  const { ref, isInView } = useInView<HTMLDivElement>(0.5);
  const reducedMotion = usePrefersReducedMotion();
  const revealed = reducedMotion || isInView;

  useEffect(() => {
    if (isInView) onReveal(index);
  }, [isInView, index, onReveal]);

  return (
    <div
      ref={ref}
      className="relative grid grid-cols-[auto_1fr] items-start gap-x-6 py-6 lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-x-10 lg:py-10"
    >
      <div className="relative z-10 flex w-12 justify-center lg:col-start-2 lg:w-auto lg:justify-self-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border-4 border-white bg-dark">
          <Icon name={step.icon} className="h-5 w-5 text-white" />
        </div>
      </div>

      <div
        className={`transition-all duration-500 ease-out lg:row-start-1 ${
          revealed ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
        } ${isEven ? "lg:col-start-1 lg:text-right" : "lg:col-start-3 lg:text-left"}`}
      >
        <h3 className="text-h3 text-dark">{step.title}</h3>
        <p className="mt-2 text-base leading-relaxed text-gray-body">{step.description}</p>
      </div>
    </div>
  );
}

export function ProcessSection() {
  const [revealedSteps, setRevealedSteps] = useState<Set<number>>(new Set());
  const reducedMotion = usePrefersReducedMotion();

  const handleReveal = useCallback((index: number) => {
    setRevealedSteps((prev) => {
      if (prev.has(index)) return prev;
      const next = new Set(prev);
      next.add(index);
      return next;
    });
  }, []);

  const filledPercent = reducedMotion ? 100 : (revealedSteps.size / processSteps.length) * 100;

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-content px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow index={3} label="Så går det till" rule={false} className="justify-center" />
          <h2 className="mt-5 text-h2-mobile text-dark lg:text-h2">Så går det till</h2>
          <p className="mt-4 text-base leading-relaxed text-gray-body">
            Fyra tydliga steg från första kontakt till färdig renovering.
          </p>
        </div>

        <div className="relative mt-16">
          <div className="absolute bottom-0 left-6 top-0 w-0.5 -translate-x-1/2 bg-gray-body/25 lg:left-1/2" aria-hidden="true" />
          <div
            className="absolute left-6 top-0 w-0.5 -translate-x-1/2 bg-accent transition-[height] duration-500 ease-out lg:left-1/2"
            style={{ height: `${filledPercent}%` }}
            aria-hidden="true"
          />

          {processSteps.map((step, index) => (
            <ProcessStepItem key={step.title} index={index} isEven={index % 2 === 0} onReveal={handleReveal} />
          ))}
        </div>
      </div>
    </section>
  );
}
