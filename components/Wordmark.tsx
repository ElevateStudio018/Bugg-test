import { logoBeab, logoIcon, logoName } from "./logoPaths";

// The client's logo (BEAB Markmontage) as a horizontal lockup for the header, menu and footer: the mark on the
// left, "BEAB" over "MARKMONTAGE" on the right, both sitting on the same baseline as in the original artwork.
// It is drawn in the current text colour, so on the dark green bars the black ground turns white, the pit and the
// sleeve become lighter tints of it, and the hand stays the background colour, just as it is white-on-white in
// the original.
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-end gap-2.5 text-white sm:gap-3 ${className}`}>
      <svg aria-hidden="true" viewBox={logoIcon.viewBox} className="h-10 w-auto shrink-0 fill-current sm:h-12">
        <path d={logoIcon.sleeve} fillRule="evenodd" opacity={0.7} />
        <path d={logoIcon.ground} fillRule="evenodd" />
        <path d={logoIcon.pit} fillRule="evenodd" opacity={0.42} />
      </svg>
      <span aria-hidden="true" className="flex flex-col items-start gap-[3px] sm:gap-1">
        <svg viewBox={logoBeab.viewBox} className="h-[11px] w-auto fill-current sm:h-[13px]">
          <path d={logoBeab.d} fillRule="evenodd" />
        </svg>
        <svg viewBox={logoName.viewBox} className="h-5 w-auto fill-current sm:h-6">
          <path d={logoName.d} fillRule="evenodd" />
        </svg>
      </span>
      <span className="sr-only">Markmontage BEAB</span>
    </span>
  );
}
