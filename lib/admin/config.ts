// Where the admin finds its Supabase project. Both values are public by design (row level security protects the data);
// they are set at build time, so a site built without them shows the admin as not yet connected.
export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
export const isConnected = Boolean(supabaseUrl && supabaseAnonKey);

/** The base path the site is served under (on the GitHub Pages preview: /Bugg-test). */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** The admin's own address, for links that leave the app (password e-mails). */
export function adminUrl(path = ""): string {
  if (typeof window === "undefined") return `${basePath}/admin${path}`;
  return `${window.location.origin}${basePath}/admin${path}`;
}
