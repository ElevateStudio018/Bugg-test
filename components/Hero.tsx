"use client";

import { PlaceholderArt } from "./PlaceholderArt";
import { Eyebrow } from "./Eyebrow";
import { buttonClasses } from "./Button";
import { company, hero } from "@/lib/content";
import { usePrefersReducedMotion } from "@/hooks/useInView";
import { useQuoteModal } from "@/contexts/QuoteModalContext";

// No real hero footage was supplied in the content object. The video
// element below is fully wired (autoplay/muted/loop/poster/object-cover)
// and ready to go the moment a real 3-part clip — team at work, result/
// environment shot with no visible faces (back-view, distance, or drone),
// then the branded company vehicle — is dropped at this path.
const HERO_VIDEO_SRC: string | null = null;

export function Hero() {
  const { open } = useQuoteModal();
  const reducedMotion = usePrefersReducedMotion();

  return (
    <section className="relative h-[100dvh] w-full overflow-hidden bg-dark">
      <div className="absolute inset-x-0 bottom-0 top-[104px] overflow-hidden lg:top-[120px]">
        <div className="absolute inset-0 z-0">
          {HERO_VIDEO_SRC && !reducedMotion ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              poster="/images/hero-poster.jpg"
              className="h-full w-full object-cover"
            >
              <source src={HERO_VIDEO_SRC} type="video/mp4" />
            </video>
          ) : (
            <PlaceholderArt icon="HardHat" tag={false} className={`h-full w-full ${reducedMotion ? "" : "animate-ken-burns"}`} />
          )}
        </div>

        <div className="absolute inset-0 z-10 bg-gradient-to-t from-dark/90 via-dark/55 to-dark/35" aria-hidden="true" />

        <div className="absolute inset-0 z-20 flex flex-col justify-end px-6 pb-14 sm:px-10 sm:pb-20 lg:px-16 lg:pb-28">
          <Eyebrow label={`${company.legalName} · Sedan ${company.foundedYear}`} light rule={false} className="mb-6" />
          <h1 className="max-w-4xl text-h1-mobile text-white lg:text-h1">{hero.heading}</h1>
          <button type="button" onClick={open} className={`${buttonClasses("primary-inverse")} mt-10 self-start`}>
            Få gratis offert
          </button>
        </div>
      </div>
    </section>
  );
}
