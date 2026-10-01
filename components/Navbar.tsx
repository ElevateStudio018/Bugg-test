"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NavOverlay } from "./NavOverlay";
import { Wordmark } from "./Wordmark";

export function Navbar() {
  const pathname = usePathname();
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
      <header className="fixed inset-x-0 top-0 z-40 bg-olive">
        <div className="mx-auto flex h-16 max-w-content items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">
          <Link href="/" aria-label="Markmontage BEAB AB – startsida">
            <Wordmark />
          </Link>

          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            aria-expanded={isMenuOpen}
            aria-label="Öppna meny"
            className="-mr-1 flex h-12 w-12 flex-col items-end justify-center gap-[9px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
          >
            <span className="block h-[2.5px] w-10 rounded-full bg-white" />
            <span className="block h-[2.5px] w-10 rounded-full bg-white" />
            <span className="block h-[2.5px] w-10 rounded-full bg-white" />
          </button>
        </div>
      </header>

      {isMenuOpen && <NavOverlay onClose={() => setIsMenuOpen(false)} />}
    </>
  );
}
