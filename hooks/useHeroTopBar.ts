"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const TOPBAR_HEIGHT_PX = 40;
export const NAVBAR_HEIGHT_MOBILE_PX = 64;
export const NAVBAR_HEIGHT_DESKTOP_PX = 80;

/**
 * The yellow phone bar only ever shows on the homepage, and only while the
 * visitor is still at the very top of the page (i.e. the Hero is fully in
 * view). It fades out the moment they scroll.
 */
export function useHeroTopBar(): boolean {
  const pathname = usePathname();
  const isHomepage = pathname === "/";
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    if (!isHomepage) return;

    function onScroll() {
      setAtTop(window.scrollY < 8);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHomepage]);

  return isHomepage && atTop;
}
