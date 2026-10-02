import { pexelsPhoto } from "./pexels";
import photoWidths from "./photo-sizes.json";

// Photos supplied by the client, in public/photos with smaller copies for phones and small cards, made by
// scripts/photo-sizes.mjs (which also lists their widths in photo-sizes.json). Plain files rather than imports, so none
// of their data ends up in the browser's JavaScript.
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const srcSets: Record<string, string> = {};

/** A photo's address, noting its srcset (its smaller copies and the original) on the way. */
function photo(name: keyof typeof photoWidths): string {
  const widths = photoWidths[name];
  const original = widths[widths.length - 1];
  const url = (width: number) => `${BASE_PATH}/photos/${width === original ? name : `${name}-${width}`}.webp`;
  srcSets[url(original)] = widths.map((width) => `${url(width)} ${width}w`).join(", ");
  return url(original);
}

export const companyPhotos = {
  arbete: photo("markmontage-arbete"),
  gravmaskinRor: photo("markmontage-gravmaskin-ror"),
  heroHamnen: photo("hero-hamnen"),
  kabeltrumma: photo("markmontage-kabeltrumma"),
  konferens: photo("markmontage-konferens"),
  minigravare: photo("markmontage-minigravare"),
  minigravareGrasmatta: photo("markmontage-minigravare-grasmatta"),
  minigravareSlap: photo("markmontage-minigravare-slap"),
  schaktKabel: photo("markmontage-schakt-kabel"),
  stalstomme: photo("markmontage-stalstomme"),
  teamet: photo("markmontage-teamet"),
  vagarbete: photo("markmontage-vagarbete"),
};

// Pexels resizes its stock photos to any width asked for.
const PEXELS_WIDTHS = [480, 800, 1200, 1600];

/** The srcset for one of the site's photos: the company's own with their smaller copies, or a Pexels photo. */
export function srcSetFor(src: string): string | undefined {
  if (srcSets[src]) return srcSets[src];
  const pexelsId = src.match(/^https:\/\/images\.pexels\.com\/photos\/(\d+)\//)?.[1];
  return pexelsId ? PEXELS_WIDTHS.map((w) => `${pexelsPhoto(Number(pexelsId), w)} ${w}w`).join(", ") : undefined;
}

/**
 * The <img> attributes that let the browser load a copy of a photo no bigger than it is shown. `sizes` is how wide
 * the photo is shown, as in the HTML sizes attribute.
 */
export function responsiveImage(src: string, sizes: string): { src: string; srcSet?: string; sizes?: string } {
  const srcSet = srcSetFor(src);
  return srcSet ? { src, srcSet, sizes } : { src };
}
