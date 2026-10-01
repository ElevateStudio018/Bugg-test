// Free-license Pexels stock photos, hotlinked from their CDN by photo ID.
// None of these show Markmontage BEAB AB's own work — they illustrate the
// type of service, so copy around them must not present them as such.
export function pexelsPhoto(id: number, width = 1200): string {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;
}
