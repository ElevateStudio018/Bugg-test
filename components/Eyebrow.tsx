interface EyebrowProps {
  label: string;
  index?: number;
  light?: boolean;
  rule?: boolean;
  className?: string;
}

/**
 * Small tracked-uppercase section label paired with a hairline rule —
 * the "annual report" device that ties every section heading together.
 * Reuses each section's own heading text; never introduces new copy.
 */
export function Eyebrow({ label, index, light = false, rule = true, className = "" }: EyebrowProps) {
  return (
    <div className={`flex items-center gap-6 ${className}`}>
      <span className={`whitespace-nowrap text-eyebrow uppercase ${light ? "text-white/70" : "text-steel"}`}>
        {index ? `${String(index).padStart(2, "0")} — ` : ""}
        {label}
      </span>
      {rule && <span className={`h-px flex-1 ${light ? "bg-white/20" : "bg-dark/10"}`} aria-hidden="true" />}
    </div>
  );
}
