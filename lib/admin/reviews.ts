// Reading reviews out of text copied from Google (the company's reviews in Google Maps or Search, selected and
// copied). Each review there is a name, a line about the reviewer ("Local Guide · 30 recensioner"), when it was
// written ("för 6 år sedan"), what they wrote (if anything) and buttons ("Gilla", "Dela"). The stars come along as
// Google's icon characters, one per filled star; a review whose stars cannot be read gets none, and the admin picks.

export interface ImportedReview {
  name: string;
  quote: string;
  /** 1–5, or 0 when the text did not say. */
  rating: number;
}

// When the review was written: "för 6 år sedan", "för en månad sedan", "a year ago", "2 weeks ago", "igår", "Ny".
const WHEN = /(^|\s)(för\s+\S+(\s+\S+)?\s+sedan|\S+\s+\S+\s+ago|i\s?går|i\s?dag|yesterday|today)\s*$/i;
// The line about the reviewer.
const ABOUT = /(local guide|lokal guide|recension|review|\bfoto\b|\bfoton\b|\bphotos?\b|\bbilder\b)/i;
// Buttons and labels around a review that are not part of it.
const NOISE =
  /^(gilla|dela|like|share|mer|more|läs mer|read more|översätt.*|translate.*|visa original.*|see original.*|ny|new|svara|reply|rapportera.*|report.*|\d+|[·•|.\s]*)$/i;
// Where the company's answer starts: not the reviewer's words.
const OWNER = /^(svar från ägaren|response from the owner|ägarens svar)/i;
const STARS = /([1-5])(?:[,.]0)?\s*(?:av\s*5|\/\s*5|stjärn|star)/i;

// Google's icon characters for a filled star and a half star.
const STAR_ICON = "\ue838";
const HALF_ICON = "\ue839";

function starsIn(line: string): number {
  const filled = (line.match(/★/g) ?? []).length;
  if (filled >= 1 && filled <= 5) return filled;
  const match = line.match(STARS);
  return match ? Number(match[1]) : 0;
}

/** The reviews found in the text, in the order they come; an empty list when none could be made out. */
export function parseGoogleReviews(text: string): ImportedReview[] {
  // Google's icons (stars, buttons) come along as private characters, and some lines carry invisible marks: the stars
  // are counted line by line first, then both go.
  const raw = text.split(/\r?\n/);
  const icons = raw.map((line) => line.split(STAR_ICON).length - 1 + (line.includes(HALF_ICON) ? 0.5 : 0));
  const lines = raw.map((line) =>
    line
      .replace(/[\u200b-\u200f\u202a-\u202e\u2060-\u2064\ufeff\ue000-\uf8ff]/g, "")
      .replace(/\s+/g, " ")
      .trim(),
  );
  const isWhen = (line: string) => line.length <= 60 && WHEN.test(line);
  const isName = (line: string) => line !== "" && !isWhen(line) && !NOISE.test(line) && !ABOUT.test(line) && !starsIn(line) && line.length <= 80;

  // Each review hangs on its "when" line; its name is the nearest line above that is a name.
  const blocks: { name: number; when: number }[] = [];
  lines.forEach((line, index) => {
    if (!isWhen(line)) return;
    let name = index - 1;
    while (name >= 0 && !isName(lines[name])) name--;
    if (name >= 0 && (blocks.length === 0 || name > blocks[blocks.length - 1].when)) blocks.push({ name, when: index });
  });

  return blocks.map((block, index) => {
    const end = index + 1 < blocks.length ? blocks[index + 1].name : lines.length;
    const words: string[] = [];
    let rating = 0;
    let starIcons = 0;
    for (let at = block.name + 1; at < end; at++) {
      const line = lines[at];
      if (OWNER.test(line)) break;
      rating ||= starsIn(line);
      if (at <= block.when) starIcons += icons[at];
      if (at <= block.when || NOISE.test(line) || line === "") continue;
      // Ends with "… Mer"/"… More" when Google had cut the text short.
      words.push(line.replace(/\s*(…|\.\.\.)\s*(mer|more)$/i, "…"));
    }
    if (!rating && starIcons >= 1 && starIcons <= 5) rating = Math.round(starIcons);
    return { name: lines[block.name], quote: words.join(" ").trim(), rating };
  });
}

/** For finding a review that is already on the site: the name without case, accents or extra spaces. */
export function sameName(a: string, b: string): boolean {
  const plain = (name: string) => name.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/\s+/g, " ").trim();
  return plain(a) === plain(b);
}
