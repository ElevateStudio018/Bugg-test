import type { CSSProperties } from "react";
import iconMark from "@/assets/logo/logo-icon.png";
import wordMark from "@/assets/logo/logo-wordmark.png";
import beabMark from "@/assets/logo/logo-beab.png";

// The client's logo, split into its icon and lettering and laid out side by side for the header. Each part is
// used as a mask over `currentColor`, so the logo takes the text colour of wherever it sits (white on the dark
// green bars, dark green on light backgrounds).
function maskStyle(image: { src: string; width: number; height: number }): CSSProperties {
  const mask = `url(${image.src}) center / contain no-repeat`;
  return { aspectRatio: `${image.width} / ${image.height}`, mask, WebkitMask: mask };
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 text-white sm:gap-3 ${className}`}>
      <span aria-hidden="true" className="block h-[34px] shrink-0 bg-current sm:h-10" style={maskStyle(iconMark)} />
      <span aria-hidden="true" className="flex items-end gap-1.5 sm:gap-2">
        <span className="block h-[15px] shrink-0 bg-current sm:h-[18px]" style={maskStyle(wordMark)} />
        {/* BEAB a touch softer than the name, as in the original lettering's smaller weight. */}
        <span className="mb-px block h-2 shrink-0 bg-current opacity-70 sm:h-[9.5px]" style={maskStyle(beabMark)} />
      </span>
      <span className="sr-only">Markmontage BEAB</span>
    </span>
  );
}
