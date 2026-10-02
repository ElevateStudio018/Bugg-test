import { logoBeab, logoIcon, logoName } from "./logoPaths";

// The client's logo (BEAB Markmontage) as a horizontal lockup for the header, menu and footer: the mark on the
// left, "BEAB" over "MARKMONTAGE" on the right, both sitting on the same baseline as in the original artwork.
// It is recoloured in greens for the dark olive bars: the black ground and the lettering turn light sage, the pit
// and the sleeve take deeper greens, and the hand stays the background colour, just as it is white-on-white in
// the original.
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-end gap-2.5 sm:gap-3 ${className}`}>
      <svg aria-hidden="true" viewBox={logoIcon.viewBox} className="h-10 w-auto shrink-0 sm:h-12">
        <path d={logoIcon.sleeve} fillRule="evenodd" className="fill-sage-mid" />
        <path d={logoIcon.ground} fillRule="evenodd" className="fill-sage" />
        <path d={logoIcon.pit} fillRule="evenodd" className="fill-sage-deep" />
      </svg>
      <span aria-hidden="true" className="flex flex-col items-start gap-[3px] sm:gap-1">
        <svg viewBox={logoBeab.viewBox} className="h-[11px] w-auto fill-sage sm:h-[13px]">
          <path d={logoBeab.d} fillRule="evenodd" />
        </svg>
        <svg viewBox={logoName.viewBox} className="h-5 w-auto fill-sage sm:h-6">
          <path d={logoName.d} fillRule="evenodd" />
        </svg>
      </span>
      <span className="sr-only">Markmontage BEAB</span>
    </span>
  );
}
