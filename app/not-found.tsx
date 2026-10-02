import type { Metadata } from "next";
import Link from "next/link";
import { buttonClasses } from "@/components/Button";

export const metadata: Metadata = {
  title: "Sidan hittades inte",
};

export default function NotFound() {
  return (
    <div className="mx-auto max-w-content px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
      <p className="text-tag uppercase text-ash">Fel 404</p>
      <h1 className="mt-4 text-display text-ink lg:text-[56px] lg:leading-[1.08]">Sidan hittades inte</h1>
      <p className="mt-4 max-w-prose text-copy text-coal lg:text-lead">
        Sidan du letar efter finns inte längre, eller så har adressen ändrats.
      </p>
      <Link href="/" className={buttonClasses("olive", "mt-8")}>
        Till startsidan
      </Link>
    </div>
  );
}
