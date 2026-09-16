export function toTelHref(displayNumber: string): string {
  const national = displayNumber.replace(/[^\d]/g, "").replace(/^0/, "");
  return `tel:+46${national}`;
}

/**
 * Formats a Swedish national number (e.g. "0708-722 192") into international
 * display form (e.g. "+46 70 872 21 92"). Grouping matches Swedish mobile
 * convention (2-3-2-2) for 9-digit subscriber numbers, otherwise falls back
 * to plain pair grouping.
 */
export function toIntlDisplay(nationalNumber: string): string {
  const national = nationalNumber.replace(/[^\d]/g, "").replace(/^0/, "");

  if (national.length === 9) {
    const parts = [national.slice(0, 2), national.slice(2, 5), national.slice(5, 7), national.slice(7, 9)];
    return `+46 ${parts.join(" ")}`;
  }

  const pairs: string[] = [];
  for (let i = 0; i < national.length; i += 2) {
    pairs.push(national.slice(i, i + 2));
  }
  return `+46 ${pairs.join(" ")}`;
}
