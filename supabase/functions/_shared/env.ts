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
  /** Elevate Studio, who approve resets. */
  agencyEmail: () => env("AGENCY_EMAIL", "elevate.studio018@gmail.com"),
  /** The company's inbox: quote requests, the staff's improvement suggestions and interest in working there. */
  companyEmail: () => env("COMPANY_EMAIL", "info@markmontage.se"),
  /** Where interest in working at the company goes (Jobba hos oss); the company's inbox unless set. */
  applicationEmail: () => env("APPLICATION_EMAIL", env("COMPANY_EMAIL", "info@markmontage.se")),
  /** A secret for one purpose: its own setting when there is one, otherwise derived from the service role key, so a new
   * project needs no extra random strings made up for it. */
  secret: (name: string, purpose: string) => optionalEnv(name) ?? `${purpose}:${env("SUPABASE_SERVICE_ROLE_KEY")}`,
  /** Browsers allowed to call the functions (the site and admin's origins), comma-separated. */
  allowedOrigins: () =>
    env("ALLOWED_ORIGINS", "https://elevatestudio018.github.io,https://raw.githack.com,https://www.markmontage.se,https://markmontage.se,http://localhost:3000,http://localhost:3130,http://localhost:3132,http://127.0.0.1:3000")
      .split(",")
      .map((origin) => origin.trim()),
};
