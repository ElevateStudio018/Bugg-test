"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BurgerIcon, burgerButtonClasses } from "./BurgerIcon";
import { Icon } from "./Icon";
import { NavOverlay } from "./NavOverlay";
import { Wordmark } from "./Wordmark";
import { company } from "@/lib/content";
import { toTelHref } from "@/lib/format";

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

    // Hiding the overflow takes away a space-taking scrollbar (as on Windows). The menu pads its right side by that
    // width, so its close button lands exactly on the menu button instead of jumping sideways.
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.setProperty("--scrollbar-width", `${scrollbarWidth}px`);
    document.body.style.overflow = "hidden";

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setIsMenuOpen(false);
    }

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.removeProperty("--scrollbar-width");
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className="header-shadow fixed inset-x-0 top-0 z-40 bg-olive">
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

            <div className="flex items-center gap-1 sm:gap-3">
              {/* The phone number, always a tap away: just the icon on smaller screens. */}
              <a
                href={toTelHref(company.phoneNational)}
                aria-label={`Ring ${company.phoneNational}`}
                className="flex h-12 w-12 items-center justify-center gap-2.5 rounded-xl text-white transition-colors hover:text-white/75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white xl:w-auto xl:px-2"
              >
                <Icon name="Phone" className="h-6 w-6 shrink-0" />
                <span className="hidden text-[16px] font-semibold xl:inline">{company.phoneNational}</span>
              </a>

              <button
                type="button"
                onClick={() => setIsMenuOpen(true)}
                aria-expanded={isMenuOpen}
                aria-label="Öppna meny"
                className={burgerButtonClasses}
              >
                {/* A cross while the menu is open, so once the menu closes it turns back into bars in view. */}
                <BurgerIcon cross={isMenuOpen} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {isMenuOpen && <NavOverlay onClose={() => setIsMenuOpen(false)} />}
    </>
  );
}
