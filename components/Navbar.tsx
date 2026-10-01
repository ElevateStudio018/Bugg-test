"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NavOverlay } from "./NavOverlay";
import { Wordmark } from "./Wordmark";

// Shown in the bar on desktop; the menu (hamburger) keeps the full list, including every service.
const barLinks = [
  { label: "Tjänster", href: "/#tjanster" },
  { label: "Uppdrag", href: "/projekt" },
  { label: "Om oss", href: "/om-oss" },
  { label: "Certifikat", href: "/certifikat" },
  { label: "Kontakt", href: "/#kontakt" },
];

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

          <div className="flex items-center gap-8">
            <nav aria-label="Snabblänkar" className="hidden lg:block">
              <ul className="flex items-center gap-8">
                {barLinks.map((link) => {
                  const isActive =
                    !link.href.includes("#") && pathname.startsWith(link.href);
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        aria-current={isActive ? "page" : undefined}
                        className={`relative py-2 text-[16px] font-semibold transition-colors duration-200 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:bg-white after:transition-transform after:duration-200 hover:text-white hover:after:scale-x-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${
                          isActive
                            ? "text-white after:scale-x-100"
                            : "text-white/75 after:scale-x-0"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              aria-expanded={isMenuOpen}
              aria-label="Öppna meny"
              className="group -mr-1.5 flex h-12 w-12 flex-col items-end justify-center gap-[7px] rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
            >
              {/* Thick, rounded bars; the shorter middle bar stretches on hover. */}
              <span className="block h-1 w-8 rounded-full bg-white" />
              <span className="block h-1 w-6 rounded-full bg-white transition-all duration-200 group-hover:w-8" />
              <span className="block h-1 w-8 rounded-full bg-white" />
            </button>
          </div>
        </div>
      </header>

      {isMenuOpen && <NavOverlay onClose={() => setIsMenuOpen(false)} />}
    </>
  );
}
