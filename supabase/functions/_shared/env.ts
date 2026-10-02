// Configuration from the function's environment (Supabase secrets), read in one place.

export function env(name: string, fallback?: string): string {
  const value = Deno.env.get(name) ?? fallback;
  if (value === undefined || value === "") throw new Error(`Missing setting ${name}`);
  return value;
}

export function optionalEnv(name: string): string | undefined {
  const value = Deno.env.get(name);
  return value === undefined || value === "" ? undefined : value;
}

export const config = {
  supabaseUrl: () => env("SUPABASE_URL"),
  anonKey: () => env("SUPABASE_ANON_KEY"),
  serviceRoleKey: () => env("SUPABASE_SERVICE_ROLE_KEY"),
  /** The public site, for links in e-mails. */
  siteUrl: () => env("SITE_URL", "https://elevatestudio018.github.io/Bugg-test"),
  /** The admin panel, for links in e-mails. */
  adminUrl: () => env("ADMIN_URL", `${env("SITE_URL", "https://elevatestudio018.github.io/Bugg-test")}/admin`),
  /** Elevate Studio, who approve resets and receive credit orders. */
  agencyEmail: () => env("AGENCY_EMAIL", "elevate.studio018@gmail.com"),
  /** Browsers allowed to call the functions (the site and admin's origins), comma-separated. */
  allowedOrigins: () =>
    env("ALLOWED_ORIGINS", "https://elevatestudio018.github.io,http://localhost:3000,http://localhost:3130,http://localhost:3132,http://127.0.0.1:3000")
      .split(",")
      .map((origin) => origin.trim()),
};
