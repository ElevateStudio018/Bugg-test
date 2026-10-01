"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { Icon } from "./Icon";
import { Wordmark } from "./Wordmark";
import { buttonClasses } from "./Button";
import { services } from "@/lib/services";
import { company } from "@/lib/content";
import { toTelHref } from "@/lib/format";
import { useQuoteModal } from "@/contexts/QuoteModalContext";

const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface NavRow {
  number: string;
  label: string;
  href: string;
}

const rows: NavRow[] = [
  { number: "01", label: "Hem", href: "/" },
  { number: "03", label: "Uppdrag", href: "/projekt" },
  { number: "04", label: "Om oss", href: "/om-oss" },
  { number: "05", label: "Certifikat", href: "/certifikat" },
  { number: "06", label: "Kontakt", href: "/#kontakt" },
];

function RowLink({ row, onClose }: { row: NavRow; onClose: () => void }) {
  return (
    <li className="border-b border-white/15 py-4">
      <Link href={row.href} onClick={onClose} className="group flex items-baseline gap-4">
        <span className="text-sm font-bold text-white/50">{row.number}</span>
        <span className="text-3xl font-semibold text-white transition-colors group-hover:text-white/70 sm:text-4xl lg:text-5xl">
          {row.label}
        </span>
      </Link>
    </li>
  );
}

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
    <div ref={overlayRef} role="dialog" aria-modal="true" aria-label="Meny" className="fixed inset-0 z-[60] flex flex-col bg-olive">
      <div className="mx-auto flex h-16 w-full max-w-content items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">
        <Link href="/" onClick={onClose} aria-label="Markmontage BEAB AB – startsida">
          <Wordmark />
        </Link>
        <button
          type="button"
          onClick={onClose}
          aria-label="Stäng meny"
          className="-mr-1 flex h-12 w-12 items-center justify-center text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
        >
          <Icon name="X" strokeWidth={1.5} className="h-9 w-9" />
        </button>
      </div>

      <nav aria-label="Huvudmeny" className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
        <ul className="mx-auto max-w-content">
          <RowLink row={rows[0]} onClose={onClose} />

          <li className="border-b border-white/15 py-4">
            <div className="flex items-baseline gap-4">
              <span className="text-sm font-bold text-white/50">02</span>
              <span className="text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">Tjänster</span>
            </div>
            <ul className="ml-[2.6rem] mt-4 grid grid-cols-1 gap-x-10 gap-y-1 sm:grid-cols-2 xl:grid-cols-4">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/tjanster/${service.slug}`}
                    onClick={onClose}
                    className="block py-1.5 text-[17px] text-white/75 transition-colors hover:text-white"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>

          {rows.slice(1).map((row) => (
            <RowLink key={row.href} row={row} onClose={onClose} />
          ))}
        </ul>
      </nav>

      <div className="border-t border-white/15 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-content flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <button type="button" onClick={handleCtaClick} className={buttonClasses("moss", "w-full sm:w-auto")}>
            Få gratis offert
          </button>
          <a href={toTelHref(company.phoneNational)} className="flex items-center gap-3 text-[18px] font-semibold text-white hover:text-white/70">
            <Icon name="Phone" className="h-5 w-5 text-white/60" />
            {company.phoneNational}
          </a>
        </div>
      </div>
    </div>
  );
}
