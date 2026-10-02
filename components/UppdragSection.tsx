import Link from "next/link";
import { Reveal } from "./Reveal";
import { UppdragCarousel } from "./UppdragCarousel";
import { ArrowLabel, arrowLinkClasses } from "./Button";
import { uppdragItems } from "@/lib/uppdrag";

export function UppdragSection() {
  return (
    <section className="pb-10 pt-16 sm:pb-14 sm:pt-20 lg:pb-20 lg:pt-28">
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-3xl">
          <h2 className="text-h2 text-ink lg:text-h2-lg">Uppdrag vi utför</h2>
          <p className="mt-5 text-copy text-coal lg:text-lead">
            Från första spadtaget till färdig yta – schakt och massförflyttning, grundläggning, dränering och anläggning
            av vägar, planer och stenlagda ytor.
          </p>
          <Link href="/projekt" className={arrowLinkClasses("ink", "mt-6")}>
            <ArrowLabel>Se alla uppdrag</ArrowLabel>
          </Link>
        </Reveal>
      </div>

      {/* No side padding on mobile: the carousel centres the current card itself, with its neighbours peeking in. */}
      <div className="mx-auto mt-10 max-w-content sm:px-6 lg:px-8">
        <UppdragCarousel items={uppdragItems} />
      </div>
    </section>
  );
}
