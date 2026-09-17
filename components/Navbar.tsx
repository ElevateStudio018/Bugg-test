"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import { buttonClasses } from "./Button";
import { services } from "@/lib/services";
import { useHeroTopBar } from "@/hooks/useHeroTopBar";
import { useQuoteModal } from "@/contexts/QuoteModalContext";

export function Navbar() {
  const topBarVisible = useHeroTopBar();
  const pathname = usePathname();
  const { open } = useQuoteModal();

  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMobileServicesOpen(false);
    setIsServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isServicesOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setIsServicesOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isServicesOpen]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={`fixed inset-x-0 z-40 bg-dark transition-[top] duration-300 ease-out ${
        topBarVisible ? "top-10" : "top-0"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-content items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-8">
        <Link href="/" className="whitespace-nowrap text-base font-bold text-white sm:text-lg lg:text-xl">
          Flottsunds Bygg <span className="text-accent">AB</span>
        </Link>

        <nav aria-label="Huvudmeny" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            <li>
              <Link href="/" className="text-xs font-semibold uppercase tracking-widest text-white/80 transition-colors hover:text-white">
                Hem
              </Link>
            </li>
            <li
              ref={servicesRef}
              className="relative"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={isServicesOpen}
                onClick={() => setIsServicesOpen(true)}
                className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-white/80 transition-colors hover:text-white"
              >
                Tjänster
                <Icon name="ChevronDown" className={`h-3.5 w-3.5 transition-transform ${isServicesOpen ? "rotate-180" : ""}`} />
              </button>
              {isServicesOpen && (
                <div className="absolute left-1/2 top-full w-72 -translate-x-1/2 pt-3">
                  <ul className="animate-fade-up divide-y divide-white/10 border border-white/10 bg-dark py-1 shadow-2xl">
                    {services.map((service) => (
                      <li key={service.slug}>
                        <Link
                          href={`/tjanster/${service.slug}`}
                          onClick={() => setIsServicesOpen(false)}
                          className="block px-5 py-3 text-[13px] text-white/80 transition-colors hover:bg-white/5 hover:text-white"
                        >
                          {service.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
            <li>
              <Link href="/projekt" className="text-xs font-semibold uppercase tracking-widest text-white/80 transition-colors hover:text-white">
                Projekt
              </Link>
            </li>
            <li>
              <Link href="/#om-oss" className="text-xs font-semibold uppercase tracking-widest text-white/80 transition-colors hover:text-white">
                Om oss
              </Link>
            </li>
            <li>
              <Link href="/#kontakt" className="text-xs font-semibold uppercase tracking-widest text-white/80 transition-colors hover:text-white">
                Kontakt
              </Link>
            </li>
          </ul>
        </nav>

        <button type="button" onClick={open} className={`${buttonClasses("primary-inverse")} hidden lg:inline-flex`}>
          Få gratis offert
        </button>

        <button
          type="button"
          aria-label={isMobileMenuOpen ? "Stäng meny" : "Öppna meny"}
          aria-expanded={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          className="flex h-11 w-11 items-center justify-center text-white lg:hidden"
        >
          <Icon name={isMobileMenuOpen ? "X" : "Menu"} className="h-7 w-7" />
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="border-t border-white/10 bg-dark lg:hidden">
          <nav aria-label="Mobilmeny" className="max-h-[calc(100dvh-4rem)] overflow-y-auto px-4 py-4 sm:px-6">
            <ul className="flex flex-col">
              <li>
                <Link href="/" className="block py-3 text-sm font-bold uppercase tracking-widest text-white">
                  Hem
                </Link>
              </li>
              <li className="border-b border-white/10">
                <button
                  type="button"
                  aria-expanded={isMobileServicesOpen}
                  onClick={() => setIsMobileServicesOpen((prev) => !prev)}
                  className="flex w-full items-center justify-between py-3 text-sm font-bold uppercase tracking-widest text-white"
                >
                  Tjänster
                  <Icon name="ChevronDown" className={`h-5 w-5 transition-transform ${isMobileServicesOpen ? "rotate-180" : ""}`} />
                </button>
                {isMobileServicesOpen && (
                  <ul className="pb-2 pl-4">
                    {services.map((service) => (
                      <li key={service.slug}>
                        <Link href={`/tjanster/${service.slug}`} className="block py-2.5 text-sm text-white/80 hover:text-white">
                          {service.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
              <li>
                <Link href="/projekt" className="block border-b border-white/10 py-3 text-sm font-bold uppercase tracking-widest text-white">
                  Projekt
                </Link>
              </li>
              <li>
                <Link href="/#om-oss" className="block border-b border-white/10 py-3 text-sm font-bold uppercase tracking-widest text-white">
                  Om oss
                </Link>
              </li>
              <li>
                <Link href="/#kontakt" className="block py-3 text-sm font-bold uppercase tracking-widest text-white">
                  Kontakt
                </Link>
              </li>
            </ul>
            <button type="button" onClick={open} className={`${buttonClasses("primary-inverse")} mt-4 w-full`}>
              Få gratis offert
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
