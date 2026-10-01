// Slightly irregular nested ellipses that read as growth rings — a decorative texture only.
const RINGS = Array.from({ length: 26 }, (_, index) => {
  const radius = 12 + index * 12 + (index % 3) * 2;
  return {
    cx: (300 + Math.sin(index * 0.8) * 5).toFixed(1),
    cy: (300 + Math.cos(index * 0.55) * 4).toFixed(1),
    rx: (radius * (1.05 + Math.sin(index * 1.7) * 0.03)).toFixed(1),
    ry: (radius * (0.95 + Math.cos(index * 1.3) * 0.03)).toFixed(1),
  };
});

export function TreeRings({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 600"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {RINGS.map((ring) => (
        <ellipse key={ring.rx} cx={ring.cx} cy={ring.cy} rx={ring.rx} ry={ring.ry} />
      ))}
    </svg>
  );
}
