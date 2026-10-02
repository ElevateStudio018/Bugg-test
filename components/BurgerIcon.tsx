// The menu icon: three thin bars that turn into a cross when `cross` is set. In two steps: the outer bars first slide
// onto the middle one (which fades out under them), then turn into the cross. Turning back runs the same in reverse.
export function BurgerIcon({ cross }: { cross: boolean }) {
  const slide = `block transition-transform duration-150 ease-out ${cross ? "delay-0" : "delay-150"}`;
  const turn = `block h-[2px] w-8 rounded-full bg-white transition-transform duration-150 ease-out ${cross ? "delay-150" : "delay-0"}`;

  return (
    <span aria-hidden="true" className="flex flex-col gap-[8px]">
      <span className={`${slide} ${cross ? "translate-y-[10px]" : ""}`}>
        <span className={`${turn} ${cross ? "rotate-45" : ""}`} />
      </span>
      <span
        className={`block h-[2px] w-8 rounded-full bg-white transition-opacity duration-150 ${cross ? "opacity-0 delay-0" : "delay-150"}`}
      />
      <span className={`${slide} ${cross ? "-translate-y-[10px]" : ""}`}>
        <span className={`${turn} ${cross ? "-rotate-45" : ""}`} />
      </span>
    </span>
  );
}

/** Used by both the bar's menu button and the menu's close button, so the icon sits in exactly the same spot. */
export const burgerButtonClasses =
  "-mr-1.5 flex h-12 w-12 items-center justify-end rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-white";
