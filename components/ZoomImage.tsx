"use client";

import type { CSSProperties } from "react";
import { useInView } from "@/hooks/useInView";

interface ZoomImageProps {
  src: string;
  alt?: string;
  className?: string;
  style?: CSSProperties;
  loading?: "lazy" | "eager";
}

/**
 * A photo that slowly eases from a slight zoom to its normal size the first time it comes into view; one at the top
 * of a page does so as the page loads. Its frame must clip overflow.
 */
export function ZoomImage({ src, alt = "", className = "", style, loading }: ZoomImageProps) {
  const { ref, isInView } = useInView<HTMLImageElement>();

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      src={src}
      alt={alt}
      loading={loading}
      style={style}
      className={`transition-transform duration-[1800ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isInView ? "scale-100" : "scale-[1.08]"
      } ${className}`}
    />
  );
}
