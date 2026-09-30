"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon } from "./Icon";
import { NavOverlay } from "./NavOverlay";
import { buttonClasses } from "./Button";
import { useHeroTopBar } from "@/hooks/useHeroTopBar";
import { useQuoteModal } from "@/contexts/QuoteModalContext";

export function Navbar() {
  const topBarVisible = useHeroTopBar();
  const pathname = usePathname();
  const { open } = useQuoteModal();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMenuOpen) return;

    document.body.style.overflow = "hidden";

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setIsMenuOpen(false);
    }

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isMenuOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 z-40 bg-dark transition-[top] duration-300 ease-out ${
          topBarVisible ? "top-10" : "top-0"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-content items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-8">
          <Link href="/" className="whitespace-nowrap text-base font-bold text-white sm:text-lg lg:text-xl">
            Markmontage <span className="text-accent">BEAB</span>
          </Link>

          <div className="flex items-center gap-5">
            <button type="button" onClick={open} className={`${buttonClasses("primary-inverse")} hidden sm:inline-flex`}>
              Få gratis offert
            </button>
            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              aria-expanded={isMenuOpen}
              aria-label="Öppna meny"
              className="flex items-center gap-2 text-white"
            >
              <span className="hidden text-xs font-semibold uppercase tracking-widest sm:inline">Meny</span>
              <Icon name="Menu" className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {isMenuOpen && <NavOverlay onClose={() => setIsMenuOpen(false)} />}
    </>
  );
}
