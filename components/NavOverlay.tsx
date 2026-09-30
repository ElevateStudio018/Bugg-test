"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { Icon } from "./Icon";
import { buttonClasses } from "./Button";
import { services } from "@/lib/services";
import { useQuoteModal } from "@/contexts/QuoteModalContext";

const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface NavRow {
  number: string;
  label: string;
  href: string;
}

const rows: NavRow[] = [
  { number: "01", label: "Hem", href: "/" },
  { number: "03", label: "Projekt", href: "/projekt" },
  { number: "04", label: "Om oss", href: "/#om-oss" },
  { number: "05", label: "Kontakt", href: "/#kontakt" },
];

export function NavOverlay({ onClose }: { onClose: () => void }) {
  const { open: openQuoteModal } = useQuoteModal();
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const focusable = overlay?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
    focusable?.[0]?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Tab" || !overlay) return;
      const items = overlay.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  function handleCtaClick() {
    onClose();
    openQuoteModal();
  }

  return (
    <div ref={overlayRef} role="dialog" aria-modal="true" aria-label="Meny" className="fixed inset-0 z-[60] flex flex-col bg-dark">
      <div className="mx-auto flex h-16 w-full max-w-content items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-8">
        <Link href="/" onClick={onClose} className="whitespace-nowrap text-base font-bold text-white sm:text-lg lg:text-xl">
          Markmontage <span className="text-accent">BEAB</span>
        </Link>
        <button
          type="button"
          onClick={onClose}
          aria-label="Stäng meny"
          className="flex h-11 w-11 items-center justify-center text-white"
        >
          <Icon name="X" className="h-7 w-7" />
        </button>
      </div>

      <nav aria-label="Huvudmeny" className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
        <ul className="mx-auto max-w-content">
          {rows.slice(0, 1).map((row) => (
            <li key={row.href} className="border-b border-white/10 py-4">
              <Link href={row.href} onClick={onClose} className="group flex items-baseline gap-4">
                <span className="text-sm font-semibold text-steel">{row.number}</span>
                <span className="text-3xl font-extrabold text-white transition-colors group-hover:text-white/80 sm:text-4xl lg:text-5xl">
                  {row.label}
                </span>
              </Link>
            </li>
          ))}

          <li className="border-b border-white/10 py-4">
            <div className="flex items-baseline gap-4">
              <span className="text-sm font-semibold text-steel">02</span>
              <span className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">Tjänster</span>
            </div>
            <ul className="ml-[3.25rem] mt-4 grid grid-cols-1 gap-x-10 gap-y-2 sm:grid-cols-2">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/tjanster/${service.slug}`}
                    onClick={onClose}
                    className="block py-1.5 text-base text-white/70 transition-colors hover:text-white"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>

          {rows.slice(1).map((row) => (
            <li key={row.href} className="border-b border-white/10 py-4">
              <Link href={row.href} onClick={onClose} className="group flex items-baseline gap-4">
                <span className="text-sm font-semibold text-steel">{row.number}</span>
                <span className="text-3xl font-extrabold text-white transition-colors group-hover:text-white/80 sm:text-4xl lg:text-5xl">
                  {row.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t border-white/10 px-4 py-6 sm:px-6 lg:px-8">
        <button type="button" onClick={handleCtaClick} className={buttonClasses("primary-inverse", "w-full sm:w-auto")}>
          Få gratis offert
        </button>
      </div>
    </div>
  );
}
