"use client";

import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { buttonClasses } from "./Button";
import { Icon } from "./Icon";
import { fallbackFormEmail, isConnected, supabaseAnonKey, supabaseUrl } from "@/lib/connection";
import { APPLICATION_HREF } from "@/lib/site/links.ts";

// Interest in working at the company: a window with a short form, opened from "Skicka en intresseanmälan" under
// "Jobba hos oss" (any link to #intresseanmalan). What is sent shows in the admin (Intresseanmälningar) and is e-mailed
// to the company (Edge Function submit-application); while the site has no backend it goes by e-mail instead.

const OPEN_EVENT = "markmontage:application";
const FOCUSABLE = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';
const fieldClass =
  "w-full border border-line/15 bg-field px-4 py-3.5 text-copy text-heading placeholder:text-muted transition-colors duration-150 focus:border-accent focus:outline focus:outline-2 focus:outline-accent/25";
const labelClass = "mb-2 block text-small font-semibold text-heading";

/** Any element that opens the application window; callers decide how it looks. */
export function ApplicationTrigger({ className, children, k }: { className: string; children: ReactNode; k?: string }) {
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))} className={className} data-k={k}>
      {children}
    </button>
  );
}

function Form({ onDone }: { onDone: () => void }) {
  const id = useId();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [experience, setExperience] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [errors, setErrors] = useState<{ name?: string; contact?: string; message?: string }>({});
  const [state, setState] = useState<"idle" | "sending" | "sent" | "failed">("idle");
  const [failure, setFailure] = useState("");
  const [sentBy, setSentBy] = useState("");

  async function submit(event: FormEvent) {
    event.preventDefault();
    const next: typeof errors = {};
    if (!name.trim()) next.name = "Skriv ditt namn.";
    if (!phone.trim() && !email.trim()) next.contact = "Skriv telefonnummer eller e-post, så vi kan nå dig.";
    else if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.contact = "Kontrollera e-postadressen.";
    if (message.trim().length < 3) next.message = "Skriv några rader om dig själv.";
    setErrors(next);
    if (next.name || next.contact || next.message) return;
    setState("sending");
    const form = { name: name.trim(), phone: phone.trim(), email: email.trim(), experience: experience.trim(), message: message.trim() };
    try {
      if (isConnected) {
        const response = await fetch(`${supabaseUrl}/functions/v1/submit-application`, {
          method: "POST",
          headers: { "Content-Type": "application/json", apikey: supabaseAnonKey, Authorization: `Bearer ${supabaseAnonKey}` },
          body: JSON.stringify({ ...form, website }),
        });
        if (!response.ok) {
          // The function explains in Swedish, for example when one person has sent several in a short time.
          const result: { message?: string } | null = await response.json().catch(() => null);
          throw new Error(response.status === 429 && result?.message ? result.message : "Not sent");
        }
      } else {
        const response = await fetch(`https://formsubmit.co/ajax/${fallbackFormEmail}`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            _subject: `Intresseanmälan från ${form.name}`,
            _template: "table",
            _captcha: "false",
            _honey: website,
            Namn: form.name,
            Telefon: form.phone,
            "E-post": form.email,
            Erfarenhet: form.experience,
            "Om sig själv": form.message,
          }),
        });
        const result: { success?: string | boolean } | null = await response.json().catch(() => null);
        if (!response.ok || String(result?.success) !== "true") throw new Error("Not sent");
      }
      setSentBy(form.name.split(" ")[0]);
      setState("sent");
    } catch (error) {
      setFailure(error instanceof Error && /[åäö]/i.test(error.message) ? error.message : "Anmälan kunde inte skickas. Försök igen om en stund.");
      setState("failed");
    }
  }

  if (state === "sent") {
    return (
      <div role="status" className="animate-rise-fast py-4 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center text-accent">
          <Icon name="Check" strokeWidth={2.5} className="h-12 w-12" />
        </span>
        <p className="mt-4 text-h3 text-heading">Tack {sentBy}! Din intresseanmälan är skickad.</p>
        <p className="mt-2 text-copy text-body">Vi hör av oss när vi söker folk.</p>
        <button type="button" onClick={onDone} className={buttonClasses("outline", "mt-7")}>
          Stäng
        </button>
      </div>
    );
  }

  const describe = (key: keyof typeof errors) => (errors[key] ? `${id}-${key}-fel` : undefined);
  return (
    <form onSubmit={submit} noValidate className="relative space-y-5">
      <div>
        <label htmlFor={`${id}-namn`} className={labelClass}>
          Namn
        </label>
        <input
          id={`${id}-namn`}
          autoComplete="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          aria-invalid={Boolean(errors.name) || undefined}
          aria-describedby={describe("name")}
          maxLength={100}
          className={fieldClass}
        />
        {errors.name && (
          <p id={`${id}-name-fel`} className="mt-1.5 text-small text-error">
            {errors.name}
          </p>
        )}
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-telefon`} className={labelClass}>
            Telefon
          </label>
          <input
            id={`${id}-telefon`}
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            aria-invalid={Boolean(errors.contact) || undefined}
            aria-describedby={describe("contact") ?? `${id}-kontakt-hjalp`}
            maxLength={40}
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor={`${id}-epost`} className={labelClass}>
            E-post
          </label>
          <input
            id={`${id}-epost`}
            type="email"
            autoComplete="email"
            inputMode="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            aria-invalid={Boolean(errors.contact) || undefined}
            aria-describedby={describe("contact") ?? `${id}-kontakt-hjalp`}
            maxLength={200}
            className={fieldClass}
          />
        </div>
      </div>
      {errors.contact ? (
        <p id={`${id}-contact-fel`} className="-mt-3 text-small text-error">
          {errors.contact}
        </p>
      ) : (
        <p id={`${id}-kontakt-hjalp`} className="-mt-3 text-small text-muted">
          Fyll i telefon, e-post eller båda.
        </p>
      )}
      <div>
        <label htmlFor={`${id}-erfarenhet`} className={labelClass}>
          Vad vill du jobba med? <span className="font-normal text-muted">(valfritt)</span>
        </label>
        <input
          id={`${id}-erfarenhet`}
          value={experience}
          onChange={(event) => setExperience(event.target.value)}
          placeholder="T.ex. grävmaskinist eller förare"
          maxLength={200}
          className={fieldClass}
        />
      </div>
      <div>
        <label htmlFor={`${id}-om`} className={labelClass}>
          Berätta om dig själv
        </label>
        <textarea
          id={`${id}-om`}
          rows={5}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          aria-invalid={Boolean(errors.message) || undefined}
          aria-describedby={describe("message")}
          placeholder="Erfarenhet, körkort och behörigheter, när du kan börja …"
          maxLength={3000}
          className={`${fieldClass} min-h-[120px] resize-y`}
        />
        {errors.message && (
          <p id={`${id}-message-fel`} className="mt-1.5 text-small text-error">
            {errors.message}
          </p>
        )}
      </div>
      {state === "failed" && (
        <p role="alert" className="text-small text-error">
          {failure}
        </p>
      )}
      <button type="submit" disabled={state === "sending"} className={buttonClasses("solid", "w-full disabled:opacity-70")}>
        {state === "sending" ? (
          <>
            <Icon name="Loader2" className="h-5 w-5 animate-spin" /> Skickar…
          </>
        ) : (
          "Skicka intresseanmälan"
        )}
      </button>
      {/* The trap for bots: out of sight, out of the tab order and named so that autofill leaves it alone. */}
      <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
        <input
          type="text"
          name="kontrollfalt"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
        />
      </div>
    </form>
  );
}

/** The window with the form; it opens from ApplicationTrigger, or when the page is opened at #intresseanmalan. */
export function ApplicationModal({ closeLabel }: { closeLabel: string }) {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  // A fresh form each time the window opens.
  const [round, setRound] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    function show() {
      triggerRef.current = document.activeElement as HTMLElement | null;
      setRound((count) => count + 1);
      setOpen(true);
    }
    window.addEventListener(OPEN_EVENT, show);
    if (window.location.hash === APPLICATION_HREF) show();
    return () => window.removeEventListener(OPEN_EVENT, show);
  }, []);

  function close() {
    setVisible(false);
    setTimeout(() => {
      setOpen(false);
      triggerRef.current?.focus();
    }, 250);
  }

  useEffect(() => {
    if (!open) return;
    const frame = requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;
    const panel = panelRef.current;
    panel?.querySelectorAll<HTMLElement>(FOCUSABLE)[1]?.focus();

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") return close();
      if (event.key !== "Tab" || !panel) return;
      const items = panel.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [open]);

  if (!open) return null;
  return (
    <div
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) close();
      }}
      className={`fixed inset-0 z-[100] flex flex-col overflow-y-auto p-4 transition-opacity duration-200 ${visible ? "opacity-100" : "opacity-0"}`}
    >
      <div className="absolute inset-0 bg-primary/75" aria-hidden="true" />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="application-heading"
        className={`relative m-auto w-full max-w-lg bg-card p-6 shadow-2xl transition-all duration-200 sm:p-8 ${visible ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
      >
        <button
          type="button"
          onClick={close}
          aria-label={closeLabel}
          className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center text-heading transition-colors hover:bg-heading/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
        >
          <Icon name="X" className="h-6 w-6" />
        </button>
        <p className="text-tag uppercase text-muted">Jobba hos oss</p>
        <h2 id="application-heading" className="mt-3 pr-10 text-h2 text-heading">
          Intresseanmälan
        </h2>
        <p className="mb-6 mt-3 text-copy text-body">Berätta lite om dig själv, så hör vi av oss när vi söker folk.</p>
        <Form key={round} onDone={close} />
      </div>
    </div>
  );
}
