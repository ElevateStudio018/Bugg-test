"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import { buttonClasses } from "../Button";
import { Icon } from "../Icon";
import { SuggestionForm } from "../SuggestionForm";
import { isConnected, supabaseAnonKey, supabaseUrl } from "@/lib/connection";
import { withBasePath } from "@/lib/site/images.ts";

export interface StaffContent {
  documents: { name: string; href: string }[];
  people: { name: string; role: string; phone: string; email: string }[];
}

// The two places to sign in keep their sessions apart: the admin's is the one the admin panel itself reads.
const storageKeys = { admin: "markmontage-admin", staff: "markmontage-personal" } as const;
const fieldClass =
  "w-full border border-line/15 bg-field px-4 py-3.5 text-copy text-heading placeholder:text-muted transition-colors duration-150 focus:border-accent focus:outline focus:outline-2 focus:outline-accent/25";
const labelClass = "mb-2 block text-small font-semibold text-heading";

async function makeClient(area: keyof typeof storageKeys): Promise<SupabaseClient> {
  const { createClient } = await import("@supabase/supabase-js");
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: false, storageKey: storageKeys[area] },
  });
}

/**
 * Signing in on the site itself, in its own look: the admin goes on to the admin panel, the staff stay here and see
 * their page. Accounts are made in the admin (Personal); the login is limited against guessing (Edge Function
 * admin-login).
 */
export function SiteLogin({ area, staff }: { area: "admin" | "staff"; staff?: StaffContent }) {
  const client = useRef<SupabaseClient | null>(null);
  const [state, setState] = useState<"checking" | "signed-out" | "signed-in">("checking");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const adminUrl = withBasePath("/admin/");

  useEffect(() => {
    if (!isConnected) return setState("signed-out");
    let cancelled = false;
    void (async () => {
      client.current = await makeClient(area);
      const { data } = await client.current.auth.getSession();
      if (cancelled) return;
      if (!data.session) return setState("signed-out");
      const { data: profile } = await client.current.from("profiles").select("role, full_name").eq("id", data.session.user.id).maybeSingle();
      if (cancelled) return;
      const allowed = area === "admin" ? profile?.role === "admin" : profile?.role === "staff" || profile?.role === "admin";
      setName(profile?.full_name ?? "");
      setState(allowed ? "signed-in" : "signed-out");
    })();
    return () => {
      cancelled = true;
    };
  }, [area]);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError("");
    if (!email.trim() || !password) return setError("Fyll i både e-postadress och lösenord.");
    if (!isConnected) return setError("Inloggningen är inte kopplad än.");
    setBusy(true);
    try {
      const response = await fetch(`${supabaseUrl}/functions/v1/admin-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json", apikey: supabaseAnonKey, Authorization: `Bearer ${supabaseAnonKey}` },
        body: JSON.stringify({ email: email.trim(), password, area }),
      });
      const result: { session?: { access_token: string; refresh_token: string }; name?: string; message?: string } | null = await response
        .json()
        .catch(() => null);
      if (!response.ok || !result?.session) throw new Error(result?.message ?? "Det gick inte att logga in. Försök igen.");
      client.current ??= await makeClient(area);
      const { error: sessionError } = await client.current.auth.setSession(result.session);
      if (sessionError) throw sessionError;
      if (area === "admin") {
        window.location.assign(adminUrl);
        return;
      }
      setName(result.name ?? "");
      setPassword("");
      setState("signed-in");
    } catch (problem) {
      setError(
        problem instanceof Error && /[åäö]|lösenord|försök/i.test(problem.message) ? problem.message : "Det gick inte att logga in. Försök igen.",
      );
    } finally {
      setBusy(false);
    }
  }

  async function signOut() {
    await client.current?.auth.signOut();
    setName("");
    setState("signed-out");
  }

  if (state === "checking") {
    return (
      <div role="status" className="flex items-center gap-3 py-10 text-body">
        <Icon name="Loader2" className="h-5 w-5 animate-spin" /> Laddar…
      </div>
    );
  }

  if (state === "signed-in" && area === "admin") {
    return (
      <div className="bg-card p-6 sm:p-8">
        <p className="text-h3 text-heading">Du är inloggad{name ? `, ${name.split(" ")[0]}` : ""}.</p>
        <a href={adminUrl} className={buttonClasses("solid", "mt-6")}>
          Öppna adminpanelen
        </a>
      </div>
    );
  }

  if (state === "signed-in" && staff) {
    return <StaffPage name={name} staff={staff} client={client.current} onSignOut={() => void signOut()} />;
  }

  return (
    <form onSubmit={submit} noValidate className="max-w-md space-y-5 bg-card p-6 sm:p-8">
      <div>
        <label htmlFor="login-email" className={labelClass}>
          E-postadress
        </label>
        <input
          id="login-email"
          type="email"
          autoComplete="username"
          inputMode="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className={fieldClass}
        />
      </div>
      <div>
        <label htmlFor="login-password" className={labelClass}>
          Lösenord
        </label>
        <input
          id="login-password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className={fieldClass}
        />
      </div>
      {error && (
        <p role="alert" className="text-small text-error">
          {error}
        </p>
      )}
      <button type="submit" disabled={busy} className={buttonClasses("solid", "w-full disabled:opacity-70")}>
        {busy ? (
          <>
            <Icon name="Loader2" className="h-5 w-5 animate-spin" /> Loggar in…
          </>
        ) : (
          <>
            <Icon name="Lock" className="h-5 w-5" /> Logga in
          </>
        )}
      </button>
      <p className="text-small text-muted">
        {area === "admin" ? (
          <>
            Glömt lösenordet?{" "}
            <a href={withBasePath("/admin/login/")} className="font-semibold text-link underline underline-offset-4 hover:text-accent">
              Återställ det här
            </a>
          </>
        ) : (
          "Har du inget konto eller har glömt lösenordet? Fråga din chef, som lägger upp konton i adminpanelen."
        )}
      </p>
    </form>
  );
}

interface Suggestion {
  id: string;
  name: string;
  area: string;
  message: string;
  status: "new" | "read" | "done";
  created_at: string;
}

const statusLabels: Record<Suggestion["status"], string> = { new: "Nytt", read: "Läst", done: "Genomfört" };
const statusClasses: Record<Suggestion["status"], string> = {
  new: "bg-primary text-on-primary",
  read: "bg-page text-heading ring-1 ring-inset ring-line/20",
  done: "bg-success/15 text-success",
};
const filters = [
  { id: "all", label: "Alla" },
  { id: "new", label: "Nya" },
  { id: "read", label: "Lästa" },
  { id: "done", label: "Genomförda" },
] as const;

/** Every suggestion that has come in, newest first: who sent it, what it is about, when, how far it has come and the text. */
function SuggestionList({ client, version }: { client: SupabaseClient | null; version: number }) {
  const [items, setItems] = useState<Suggestion[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [filter, setFilter] = useState<(typeof filters)[number]["id"]>("all");
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!client) return;
    let cancelled = false;
    void (async () => {
      const { data, error } = await client
        .from("site_suggestions")
        .select("id, name, area, message, status, created_at")
        .order("created_at", { ascending: false })
        .limit(300);
      if (cancelled) return;
      setFailed(Boolean(error));
      setItems((data as Suggestion[] | null) ?? []);
    })();
    return () => {
      cancelled = true;
    };
  }, [client, version]);

  const shown = useMemo(() => {
    const words = query.trim().toLowerCase();
    return (items ?? []).filter(
      (item) => (filter === "all" || item.status === filter) && (!words || `${item.name} ${item.area} ${item.message}`.toLowerCase().includes(words)),
    );
  }, [items, filter, query]);

  if (items === null && !failed) {
    return (
      <p role="status" className="mt-6 flex items-center gap-3 text-copy text-body">
        <Icon name="Loader2" className="h-5 w-5 animate-spin" /> Hämtar förslagen…
      </p>
    );
  }
  if (failed) return <p className="mt-6 text-copy text-error">Förslagen kunde inte hämtas. Ladda om sidan och försök igen.</p>;

  const counts = { all: items!.length, new: 0, read: 0, done: 0 };
  for (const item of items!) counts[item.status]++;
  const dateFormat = new Intl.DateTimeFormat("sv-SE", { day: "numeric", month: "short", year: "numeric" });

  return (
    <div className="mt-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div role="group" aria-label="Visa" className="flex flex-wrap gap-2">
          {filters.map((option) => (
            <button
              key={option.id}
              type="button"
              aria-pressed={filter === option.id}
              onClick={() => setFilter(option.id)}
              className={`min-h-10 rounded-full px-4 text-small font-semibold transition-colors ${
                filter === option.id ? "bg-primary text-on-primary" : "bg-card text-heading hover:bg-primary/10"
              }`}
            >
              {option.label} <span className="opacity-70">{counts[option.id]}</span>
            </button>
          ))}
        </div>
        <label className="relative block sm:w-72">
          <span className="sr-only">Sök bland förslagen</span>
          <Icon name="Search" className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Sök namn, ämne eller text"
            className="w-full border border-line/15 bg-field py-2.5 pl-11 pr-3 text-copy text-heading placeholder:text-muted focus:border-accent focus:outline focus:outline-2 focus:outline-accent/25"
          />
        </label>
      </div>

      {items!.length === 0 ? (
        <p className="mt-6 bg-card px-5 py-6 text-copy text-body">Inga förslag har kommit in än. Bli den första!</p>
      ) : shown.length === 0 ? (
        <p className="mt-6 bg-card px-5 py-6 text-copy text-body">Inga förslag matchar.</p>
      ) : (
        <ul className="mt-5 space-y-3">
          {shown.map((item) => (
            <li key={item.id} className="bg-card p-5 sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                <div className="flex min-w-0 items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-copy font-semibold text-on-primary"
                  >
                    {item.name.trim().charAt(0).toUpperCase()}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-copy font-semibold text-heading">{item.name}</p>
                    <p className="text-small text-muted">
                      <time dateTime={item.created_at}>{dateFormat.format(new Date(item.created_at))}</time>
                      {item.area && <> · {item.area}</>}
                    </p>
                  </div>
                </div>
                <span className={`rounded-full px-3 py-1 text-small font-semibold ${statusClasses[item.status]}`}>{statusLabels[item.status]}</span>
              </div>
              <p className="mt-4 whitespace-pre-line break-words text-copy leading-relaxed text-body">{item.message}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/** What the staff see when signed in: a suggestion box with all suggestions so far, the company's documents and who to call. */
function StaffPage({ name, staff, client, onSignOut }: { name: string; staff: StaffContent; client: SupabaseClient | null; onSignOut: () => void }) {
  // Counts sent suggestions, so the list below fetches again and shows the new one.
  const [sent, setSent] = useState(0);
  return (
    <div className="space-y-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-h3 text-heading">Välkommen{name ? `, ${name.split(" ")[0]}` : ""}!</p>
        <button type="button" onClick={onSignOut} className={buttonClasses("outline")}>
          Logga ut
        </button>
      </div>

      <section aria-labelledby="personal-forslag" className="bg-card p-6 sm:p-8">
        <h2 id="personal-forslag" className="text-h2 text-heading">
          Förbättringsförslag
        </h2>
        <p className="mt-3 max-w-2xl text-copy text-body">
          Har du en idé om hur vi kan bli bättre? Skriv ditt namn, vad det gäller och ditt förslag.
        </p>
        <div className="mt-6 max-w-2xl">
          <SuggestionForm onSent={() => setSent((count) => count + 1)} />
        </div>
      </section>

      <section aria-labelledby="personal-inkomna">
        <h2 id="personal-inkomna" className="text-h2 text-heading">
          Inkomna förslag
        </h2>
        <p className="mt-3 max-w-2xl text-copy text-body">
          Alla förslag som har skickats in, nyast först, och hur långt ledningen har kommit med dem.
        </p>
        <SuggestionList client={client} version={sent} />
      </section>

      {staff.documents.length > 0 && (
        <section aria-labelledby="personal-dokument">
          <h2 id="personal-dokument" className="text-h2 text-heading">
            Policyer och certifikat
          </h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {staff.documents.map((document) => (
              <li key={document.href}>
                <a
                  href={withBasePath(document.href)}
                  target="_blank"
                  rel="noopener"
                  className="flex min-h-14 items-center gap-3 bg-card px-5 py-4 font-semibold text-heading transition-colors hover:text-accent"
                >
                  <Icon name="FileText" className="h-5 w-5 shrink-0 text-accent" />
                  {document.name}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {staff.people.length > 0 && (
        <section aria-labelledby="personal-kontakter">
          <h2 id="personal-kontakter" className="text-h2 text-heading">
            Kontaktpersoner
          </h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {staff.people.map((person) => (
              <li key={person.name} className="bg-card px-5 py-4">
                <p className="font-semibold text-heading">{person.name}</p>
                {person.role && <p className="text-small text-muted">{person.role}</p>}
                {person.phone && (
                  <a
                    href={`tel:${person.phone.replace(/[^\d+]/g, "")}`}
                    className="mt-2 flex items-center gap-2 text-small text-heading hover:text-accent"
                  >
                    <Icon name="Phone" className="h-4 w-4 text-accent" /> {person.phone}
                  </a>
                )}
                {person.email && (
                  <a href={`mailto:${person.email}`} className="mt-1 flex items-center gap-2 break-all text-small text-heading hover:text-accent">
                    <Icon name="Mail" className="h-4 w-4 shrink-0 text-accent" /> {person.email}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
