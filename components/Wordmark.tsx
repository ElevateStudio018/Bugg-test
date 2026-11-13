import { logoBeab, logoIcon, logoName } from "./logoPaths";
import { withBasePath } from "@/lib/site/images.ts";
import type { Settings } from "@/lib/site/schema.ts";

/** What the logo spots (header, menu, footer) need to draw the logo. */
export interface LogoContent {
  logo: Settings["logo"];
  /** The company's name for screen readers. */
  name: string;
}

// The client's logo (BEAB Markmontage) in its original colours, as a horizontal lockup for the header, menu and
// footer: the mark on the left, "BEAB" over "MARKMONTAGE" on the right, on the same baseline as in the original
// artwork. On a light bar it is the original exactly: the hand is the white background, the ground black, the pit
// grey, the sleeve orange and the name black. On a dark bar (`onDark`, the footer) it is the original's negative:
// the ground and the name are white and the hand is the bar's colour, with the pit and sleeve as they are.
// An uploaded logo replaces it at the same height.
const LOGO = { ground: "#000000", pit: "#C6C6C6", sleeve: "#F39200" };

export function Wordmark({ content, onDark = false, className = "" }: { content: LogoContent; onDark?: boolean; className?: string }) {
  if (content.logo.kind === "image") {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={withBasePath(content.logo.image.src)} alt={content.logo.image.alt || content.name} className={`h-10 w-auto sm:h-12 ${className}`} />
    );
  }

  return (
    <span className={`flex items-end gap-2.5 sm:gap-3 ${className}`}>
      <LogoMark ground={onDark ? "#FFFFFF" : LOGO.ground} className="h-10 w-auto shrink-0 sm:h-12" />
      <span aria-hidden="true" className={`flex flex-col items-start gap-[3px] sm:gap-1 ${onDark ? "fill-white" : "fill-black"}`}>
        <svg viewBox={logoBeab.viewBox} className="h-[11px] w-auto sm:h-[13px]">
          <path d={logoBeab.d} fillRule="evenodd" />
        </svg>
        <svg viewBox={logoName.viewBox} className="h-5 w-auto sm:h-6">
          <path d={logoName.d} fillRule="evenodd" />
        </svg>
      </span>
      <span className="sr-only">{content.name}</span>
    </span>
  );
}

function LogoMark({ ground, className }: { ground: string; className: string }) {
  return (
    <svg aria-hidden="true" viewBox={logoIcon.viewBox} className={className}>
      <path d={logoIcon.sleeve} fillRule="evenodd" fill={LOGO.sleeve} />
      <path d={logoIcon.ground} fillRule="evenodd" fill={ground} />
      <path d={logoIcon.pit} fillRule="evenodd" fill={LOGO.pit} />
    </svg>
  );
}
