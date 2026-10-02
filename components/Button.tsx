import { Icon } from "./Icon";

export type ButtonVariant = "olive" | "olive-outline" | "light-outline";

// Pressing a button squeezes it in a touch.
const pillBase =
  "inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-center text-label uppercase transition duration-200 active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

const pillVariants: Record<ButtonVariant, string> = {
  olive: "bg-olive text-white hover:bg-olive-dark focus-visible:outline-olive",
  "olive-outline": "border-[1.5px] border-olive text-olive hover:bg-olive hover:text-white focus-visible:outline-olive",
  "light-outline": "border-[1.5px] border-white text-white hover:bg-white hover:text-olive focus-visible:outline-white",
};

export function buttonClasses(variant: ButtonVariant = "olive", className = ""): string {
  return `${pillBase} ${pillVariants[variant]} ${className}`;
}

/** An invisible margin around a small link, making it a full-size tap target without moving anything. */
export const tapTarget = "relative before:absolute before:-inset-x-2 before:-inset-y-3";

/** Uppercase, letter-spaced text link with a chevron — the site's secondary call to action. */
export function arrowLinkClasses(tone: "ink" | "white" = "ink", className = ""): string {
  const color = tone === "white" ? "text-white hover:text-white/70" : "text-ink hover:text-olive";
  return `${tapTarget} group/arrow inline-block text-left text-label uppercase transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current ${color} ${className}`;
}

/**
 * Label + chevron for arrow links. The last word and the chevron share a no-wrap span,
 * so a label that breaks over several lines still ends with "word >" instead of the
 * chevron drifting off on its own.
 */
export function ArrowLabel({ children, spaced = false }: { children: string; spaced?: boolean }) {
  const splitAt = children.lastIndexOf(" ") + 1;
  return (
    <>
      {children.slice(0, splitAt)}
      <span className="whitespace-nowrap">
        {children.slice(splitAt)}
        <Icon
          name="ChevronRight"
          strokeWidth={1.5}
          aria-hidden="true"
          className={`inline-block h-6 w-6 align-[-0.36em] transition-transform duration-200 group-hover/arrow:translate-x-1 ${
            spaced ? "ml-1.5" : ""
          }`}
        />
      </span>
    </>
  );
}
