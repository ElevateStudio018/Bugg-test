"use client";

import { FormEvent, useId, useState } from "react";
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

export function QuoteForm({ variant = "inline" }: { variant?: "inline" | "modal" }) {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const idPrefix = useId();
  const { showConfirmation, close } = useQuoteModal();

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
    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setValues(initialValues);
      showConfirmation();
      if (variant === "inline") {
        // No modal to keep open behind the toast — nothing further to do.
      }
    }, 1000);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div>
        <label htmlFor={`${idPrefix}-namn`} className={labelClass}>
          Namn
        </label>
        <div className="relative">
          <Icon name="User" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ash" />
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
          <p id={`${idPrefix}-namn-error`} className="mt-1.5 text-[14px] text-red-700">
            {errors.namn}
          </p>
        )}
      </div>

      <div>
        <label htmlFor={`${idPrefix}-telefon`} className={labelClass}>
          Telefon
        </label>
        <div className="relative">
          <Icon name="Phone" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ash" />
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
          <p id={`${idPrefix}-telefon-error`} className="mt-1.5 text-[14px] text-red-700">
            {errors.telefon}
          </p>
        )}
      </div>

      <div>
        <label htmlFor={`${idPrefix}-epost`} className={labelClass}>
          E-post
        </label>
        <div className="relative">
          <Icon name="Mail" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ash" />
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
          <p id={`${idPrefix}-epost-error`} className="mt-1.5 text-[14px] text-red-700">
            {errors.epost}
          </p>
        )}
      </div>

      <div>
        <label htmlFor={`${idPrefix}-typ`} className={labelClass}>
          Typ av arbete
        </label>
        <div className="relative">
          <Icon name="Wrench" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ash" />
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
          <Icon name="ChevronDown" className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ash" />
        </div>
        {errors.typAvArbete && (
          <p id={`${idPrefix}-typ-error`} className="mt-1.5 text-[14px] text-red-700">
            {errors.typAvArbete}
          </p>
        )}
      </div>

      <div>
        <label htmlFor={`${idPrefix}-beskrivning`} className={labelClass}>
          Kort beskrivning
        </label>
        <div className="relative">
          <Icon name="MessageSquare" className="pointer-events-none absolute left-4 top-4 h-5 w-5 text-ash" />
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

      <button type="submit" disabled={isSubmitting} className={buttonClasses("moss", "w-full disabled:opacity-70")}>
        {isSubmitting ? (
          <>
            <Icon name="Loader2" className="mr-2 h-5 w-5 animate-spin" />
            Skickar...
          </>
        ) : (
          "Skicka förfrågan"
        )}
      </button>

      {variant === "modal" && (
        <p className="text-center text-[14px] text-ash">
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
