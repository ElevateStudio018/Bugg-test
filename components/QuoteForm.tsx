"use client";

import { FormEvent, useId, useState, type CSSProperties } from "react";
import { Icon } from "./Icon";
import { buttonClasses } from "./Button";
import { useQuoteModal } from "@/contexts/QuoteModalContext";

interface FormValues {
  namn: string;
  telefon: string;
  epost: string;
  typAvArbete: string;
  beskrivning: string;
}

const initialValues: FormValues = {
  namn: "",
  telefon: "",
  epost: "",
  typAvArbete: "",
  beskrivning: "",
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const arbetsTyper = [
  { value: "schaktning-markarbeten", label: "Schaktning & markarbeten" },
  { value: "dranering", label: "Dränering" },
  { value: "grundlaggning", label: "Grundläggning" },
  { value: "va-arbeten", label: "VA-arbeten" },
  { value: "anlaggning-vagar-planer", label: "Anläggning av vägar & planer" },
  { value: "stenlaggning", label: "Stenläggning & plattsättning" },
  { value: "annat", label: "Annat" },
];

const fieldBaseClass =
  "w-full border border-ink/15 bg-white py-3.5 pl-12 pr-4 text-[17px] text-ink placeholder:text-ash transition-colors duration-150 focus:border-olive focus:outline focus:outline-2 focus:outline-olive/25";

const labelClass = "mb-2 block text-[15px] font-semibold text-ink";

const fieldIds: Record<keyof FormValues, string> = {
  namn: "namn",
  telefon: "telefon",
  epost: "epost",
  typAvArbete: "typ",
  beskrivning: "beskrivning",
};

export function QuoteForm({ variant = "inline" }: { variant?: "inline" | "modal" }) {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const idPrefix = useId();
  const { showConfirmation, close } = useQuoteModal();

  // In the quote window the fields rise into place one after another as it opens, like the rows of the menu.
  function entrance(order: number): { className?: string; style?: CSSProperties } {
    if (variant !== "modal") return {};
    return { className: "animate-rise-fast", style: { animationDelay: `${80 + order * 45}ms` } };
  }

  // Each time the form is sent with mistakes, the fields in question give a short, gentle shake. Web Animations
  // ignore the reduced-motion rule in globals.css, hence the check.
  function shake(keys: (keyof FormValues)[]) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    for (const key of keys) {
      document.getElementById(`${idPrefix}-${fieldIds[key]}`)?.parentElement?.animate(
        [
          { transform: "translateX(0)" },
          { transform: "translateX(-5px)" },
          { transform: "translateX(4px)" },
          { transform: "translateX(-2px)" },
          { transform: "translateX(0)" },
        ],
        { duration: 340, easing: "ease-out" }
      );
    }
  }

  function validate(): FormErrors {
    const next: FormErrors = {};
    if (!values.namn.trim()) next.namn = "Ange ditt namn.";
    if (!values.telefon.trim()) {
      next.telefon = "Ange ditt telefonnummer.";
    } else if (!/^[\d\s()+-]{6,}$/.test(values.telefon.trim())) {
      next.telefon = "Ange ett giltigt telefonnummer.";
    }
    if (!values.epost.trim()) {
      next.epost = "Ange din e-postadress.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.epost.trim())) {
      next.epost = "Ange en giltig e-postadress.";
    }
    if (!values.typAvArbete) next.typAvArbete = "Välj typ av arbete.";
    return next;
  }

  function handleChange<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      shake(Object.keys(nextErrors) as (keyof FormValues)[]);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setValues(initialValues);
      showConfirmation();
    }, 1000);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div {...entrance(0)}>
        <label htmlFor={`${idPrefix}-namn`} className={labelClass}>
          Namn
        </label>
        <div className="group/field relative">
          <Icon name="User" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ash transition-colors duration-200 group-focus-within/field:text-olive" />
          <input
            id={`${idPrefix}-namn`}
            type="text"
            autoComplete="name"
            value={values.namn}
            onChange={(e) => handleChange("namn", e.target.value)}
            className={fieldBaseClass}
            aria-invalid={Boolean(errors.namn)}
            aria-describedby={errors.namn ? `${idPrefix}-namn-error` : undefined}
          />
        </div>
        {errors.namn && (
          <p id={`${idPrefix}-namn-error`} className="mt-1.5 animate-error-in text-[14px] text-red-700">
            {errors.namn}
          </p>
        )}
      </div>

      <div {...entrance(1)}>
        <label htmlFor={`${idPrefix}-telefon`} className={labelClass}>
          Telefon
        </label>
        <div className="group/field relative">
          <Icon name="Phone" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ash transition-colors duration-200 group-focus-within/field:text-olive" />
          <input
            id={`${idPrefix}-telefon`}
            type="tel"
            autoComplete="tel"
            value={values.telefon}
            onChange={(e) => handleChange("telefon", e.target.value)}
            className={fieldBaseClass}
            aria-invalid={Boolean(errors.telefon)}
            aria-describedby={errors.telefon ? `${idPrefix}-telefon-error` : undefined}
          />
        </div>
        {errors.telefon && (
          <p id={`${idPrefix}-telefon-error`} className="mt-1.5 animate-error-in text-[14px] text-red-700">
            {errors.telefon}
          </p>
        )}
      </div>

      <div {...entrance(2)}>
        <label htmlFor={`${idPrefix}-epost`} className={labelClass}>
          E-post
        </label>
        <div className="group/field relative">
          <Icon name="Mail" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ash transition-colors duration-200 group-focus-within/field:text-olive" />
          <input
            id={`${idPrefix}-epost`}
            type="email"
            autoComplete="email"
            value={values.epost}
            onChange={(e) => handleChange("epost", e.target.value)}
            className={fieldBaseClass}
            aria-invalid={Boolean(errors.epost)}
            aria-describedby={errors.epost ? `${idPrefix}-epost-error` : undefined}
          />
        </div>
        {errors.epost && (
          <p id={`${idPrefix}-epost-error`} className="mt-1.5 animate-error-in text-[14px] text-red-700">
            {errors.epost}
          </p>
        )}
      </div>

      <div {...entrance(3)}>
        <label htmlFor={`${idPrefix}-typ`} className={labelClass}>
          Typ av arbete
        </label>
        <div className="group/field relative">
          <Icon name="Wrench" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ash transition-colors duration-200 group-focus-within/field:text-olive" />
          <select
            id={`${idPrefix}-typ`}
            value={values.typAvArbete}
            onChange={(e) => handleChange("typAvArbete", e.target.value)}
            className={`${fieldBaseClass} appearance-none pr-11`}
            aria-invalid={Boolean(errors.typAvArbete)}
            aria-describedby={errors.typAvArbete ? `${idPrefix}-typ-error` : undefined}
          >
            <option value="" disabled>
              Välj typ av arbete
            </option>
            {arbetsTyper.map((typ) => (
              <option key={typ.value} value={typ.value}>
                {typ.label}
              </option>
            ))}
          </select>
          <Icon name="ChevronDown" className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ash transition-colors duration-200 group-focus-within/field:text-olive" />
        </div>
        {errors.typAvArbete && (
          <p id={`${idPrefix}-typ-error`} className="mt-1.5 animate-error-in text-[14px] text-red-700">
            {errors.typAvArbete}
          </p>
        )}
      </div>

      <div {...entrance(4)}>
        <label htmlFor={`${idPrefix}-beskrivning`} className={labelClass}>
          Kort beskrivning
        </label>
        <div className="group/field relative">
          <Icon name="MessageSquare" className="pointer-events-none absolute left-4 top-4 h-5 w-5 text-ash transition-colors duration-200 group-focus-within/field:text-olive" />
          <textarea
            id={`${idPrefix}-beskrivning`}
            rows={3}
            value={values.beskrivning}
            onChange={(e) => handleChange("beskrivning", e.target.value)}
            placeholder="Berätta kort om ditt projekt..."
            className={`${fieldBaseClass} resize-none`}
          />
        </div>
      </div>

      {/* Wrapped, so the entrance doesn't hold the button's own press-in transform. */}
      <div {...entrance(5)}>
        <button type="submit" disabled={isSubmitting} className={buttonClasses("olive", "w-full disabled:opacity-70")}>
          {isSubmitting ? (
            <>
              <Icon name="Loader2" className="mr-2 h-5 w-5 animate-spin" />
              Skickar...
            </>
          ) : (
            "Skicka förfrågan"
          )}
        </button>
      </div>

      {variant === "modal" && (
        <p className={`text-center text-[14px] text-ash ${entrance(6).className}`} style={entrance(6).style}>
          Du kan stänga rutan när som helst genom att klicka utanför eller på{" "}
          <button type="button" onClick={close} className="underline underline-offset-2">
            X
          </button>
          .
        </p>
      )}
    </form>
  );
}
