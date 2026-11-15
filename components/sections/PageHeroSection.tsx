import { ZoomImage } from "../ZoomImage";
import { focusStyle, imageProps } from "@/lib/site/images.ts";
import { key } from "@/lib/site/edit.ts";
import type { SectionProps } from "./types";

const sizes = {
  tall: "aspect-[4/3] sm:aspect-[2/1] lg:aspect-auto lg:h-[min(66vh,700px)]",
  medium: "aspect-[4/3] sm:aspect-[2/1] lg:aspect-auto lg:h-[min(56vh,600px)]",
} as const;

/** The full-width photo at the top of a subpage. */
export function PageHeroSection({ section, ctx }: SectionProps<"pageHero">) {
  return (
    <div id={section.anchor || undefined} data-k={ctx.path} className={`relative w-full overflow-hidden bg-primary/20 ${sizes[section.size]}`}>
      <ZoomImage
        {...imageProps(section.image, "100vw")}
        alt={section.image.alt}
        k={key(ctx.path, "image")}
        priority
        parallax="top"
        style={focusStyle(section.image)}
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
}
