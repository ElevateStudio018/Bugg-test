"use client";

import { usePathname } from "next/navigation";
import { company } from "@/lib/content";
import { toIntlDisplay, toTelHref } from "@/lib/format";
import { useHeroTopBar } from "@/hooks/useHeroTopBar";

export function TopBar() {
  const pathname = usePathname();
  const visible = useHeroTopBar();

  if (pathname !== "/") return null;

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 top-0 z-50 flex h-10 items-center justify-center border-b border-accent bg-dark transition-opacity duration-300 ease-out ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <a href={toTelHref(company.phoneNational)} className="text-sm font-semibold tracking-wide text-white">
        {toIntlDisplay(company.phoneNational)}
      </a>
    </div>
  );
}
