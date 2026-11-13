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
// grey, the sleeve orange and the name black. On a dark bar (`onDark`, the footer) the mark sits on a white tile so
// the hand stays white, and the name is white. An uploaded logo replaces it at the same height.
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
      {onDark ? (
        <span aria-hidden="true" className="flex h-10 w-11 shrink-0 items-center justify-center rounded-md bg-white sm:h-12 sm:w-[52px]">
          <LogoMark className="h-8 w-auto sm:h-10" />
        </span>
      ) : (
        <LogoMark className="h-10 w-auto shrink-0 sm:h-12" />
      )}
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

function LogoMark({ className }: { className: string }) {
  return (
    <svg aria-hidden="true" viewBox={logoIcon.viewBox} className={className}>
      <path d={logoIcon.sleeve} fillRule="evenodd" fill={LOGO.sleeve} />
      <path d={logoIcon.ground} fillRule="evenodd" fill={LOGO.ground} />
      <path d={logoIcon.pit} fillRule="evenodd" fill={LOGO.pit} />
    </svg>
  );
}
