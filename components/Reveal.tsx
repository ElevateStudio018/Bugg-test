"use client";

import { ReactNode } from "react";
import { useInView, usePrefersReducedMotion } from "@/hooks/useInView";

interface RevealProps {
  children: ReactNode;
  /** Or leave it out and pass delay-* classes in className, e.g. to vary it per breakpoint. */
  delayMs?: number;
  className?: string;
  as?: "div" | "li";
}

/** Fades and slides content up ~20px the first time it scrolls into view. */
export function Reveal({ children, delayMs = 0, className = "", as = "div" }: RevealProps) {
  const { ref, isInView } = useInView();
  const reducedMotion = usePrefersReducedMotion();
  const Tag = as;

  if (reducedMotion) {
    return (
      <Tag ref={ref as never} className={className}>
        {children}
      </Tag>
    );
  }

  return (
    <Tag
      ref={ref as never}
      className={`transition-all duration-500 ease-out ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      } ${className}`}
      style={delayMs ? { transitionDelay: isInView ? `${delayMs}ms` : "0ms" } : undefined}
    >
      {children}
    </Tag>
  );
}
