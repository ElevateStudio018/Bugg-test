// Where the site's backend (Supabase) is, when the site has one. Both values are public by design (row level security
// protects the data) and set at build time; without them the admin shows itself as not yet connected and the quote
// form sends by e-mail through FormSubmit instead.
export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
export const isConnected = Boolean(supabaseUrl && supabaseAnonKey);
