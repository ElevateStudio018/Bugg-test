import { Icon, type IconKey } from "./Icon";

interface PlaceholderArtProps {
  icon: IconKey;
  className?: string;
  tag?: boolean;
  alt?: string;
}

/**
 * On-brand stand-in artwork used everywhere a real photo hasn't been
 * supplied yet (about photo, service pages, project gallery). Built from
 * the site's own SVG/icon system rather than stock or hotlinked photography,
 * so it never breaks and never drifts off the mandated color palette.
 * Every spot this renders is meant to be swapped for real photography
 * before launch — the small corner tag says so on-page.
 */
export function PlaceholderArt({ icon, className = "", tag = true, alt }: PlaceholderArtProps) {
  return (
    <div
      className={`relative overflow-hidden bg-white ${className}`}
      role={alt ? "img" : undefined}
      aria-label={alt}
      aria-hidden={alt ? undefined : true}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <pattern id={`grid-${icon}`} width="28" height="28" patternUnits="userSpaceOnUse">
            <path d="M 28 0 L 0 0 0 28" fill="none" stroke="#030F27" strokeWidth="1" opacity="0.07" />
          </pattern>
        </defs>
        <rect width="400" height="300" fill="#FFFFFF" />
        <rect width="400" height="300" fill={`url(#grid-${icon})`} />
        <circle cx="200" cy="150" r="92" fill="none" stroke="#030F27" strokeWidth="1" opacity="0.12" />
        <path
          d="M 200 58 A 92 92 0 0 1 292 150"
          fill="none"
          stroke="rgb(253, 190, 51)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="200" cy="150" r="60" fill="#030F27" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
        <Icon name={icon} className="h-12 w-12 text-white" strokeWidth={1.5} />
      </div>
      {tag && (
        <span className="absolute bottom-3 left-3 rounded-sm border border-dark/10 bg-white/90 px-2 py-1 text-[11px] font-medium text-gray-body">
          Platshållarbild
        </span>
      )}
    </div>
  );
}
