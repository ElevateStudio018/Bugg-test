"use client";

import { AlignCenter, AlignLeft, AlignRight, RotateCcw } from "lucide-react";
import { AdminButton } from "../ui/Button";
import { controlClasses } from "../ui/Field";
import { fontCategoryLabels, fontOptions } from "@/lib/site/fonts.ts";
import type { StyleProps } from "@/lib/admin/visual";
import type { FontChoice, SiteData } from "@/lib/site/schema.ts";

const weights = [
  { value: 400, label: "Normal" },
  { value: 500, label: "Medium" },
  { value: 600, label: "Halvfet" },
  { value: 700, label: "Fet" },
  { value: 800, label: "Extra fet" },
];

const aligns = [
  { value: "left", label: "Vänster", icon: AlignLeft },
  { value: "center", label: "Mitten", icon: AlignCenter },
  { value: "right", label: "Höger", icon: AlignRight },
] as const;

function Row({ label, onReset, set, children }: { label: string; onReset: () => void; set: boolean; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-1.5 flex min-h-6 items-center justify-between gap-2">
        <p className="text-[13px] font-semibold text-admin-ink">{label}</p>
        {set && (
          <button
            type="button"
            onClick={onReset}
            className="rounded-md px-1.5 text-[12px] font-semibold text-admin-muted hover:text-admin-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-admin"
          >
            Standard
          </button>
        )}
      </div>
      {children}
    </div>
  );
}

/** A colour: the site's own colours as swatches, any other from the picker, or the standard look. */
function ColorRow({ label, value, swatches, onChange }: { label: string; value?: string; swatches: string[]; onChange: (value?: string) => void }) {
  return (
    <Row label={label} set={Boolean(value)} onReset={() => onChange(undefined)}>
      <div className="flex flex-wrap items-center gap-1.5">
        {swatches.map((swatch) => (
          <button
            key={swatch}
            type="button"
            aria-label={`${label}: ${swatch}`}
            aria-pressed={value?.toUpperCase() === swatch}
            onClick={() => onChange(swatch)}
            className={`h-8 w-8 rounded-lg ring-1 ring-black/15 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-admin ${
              value?.toUpperCase() === swatch ? "outline outline-2 outline-offset-2 outline-admin" : ""
            }`}
            style={{ background: swatch }}
          />
        ))}
        <label
          className="relative flex h-8 min-w-8 cursor-pointer items-center justify-center overflow-hidden rounded-lg px-2 text-[12px] font-semibold text-admin-muted ring-1 ring-admin-line hover:bg-stone-50 focus-within:outline focus-within:outline-2 focus-within:outline-admin"
          title="Välj vilken färg som helst"
        >
          <span aria-hidden="true">Annan…</span>
          <span className="sr-only">{label}: välj vilken färg som helst</span>
          <input
            type="color"
            value={(value ?? "#000000").toLowerCase()}
            onChange={(event) => onChange(event.target.value.toUpperCase())}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          />
        </label>
      </div>
    </Row>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  unit,
  placeholder,
  onChange,
}: {
  label: string;
  value?: number;
  min: number;
  max: number;
  unit: string;
  placeholder: number;
  onChange: (value?: number) => void;
}) {
  return (
    <Row label={label} set={value !== undefined} onReset={() => onChange(undefined)}>
      <div className="flex items-center gap-3">
        <input
          type="range"
          min={min}
          max={max}
          value={value ?? placeholder}
          onChange={(event) => onChange(Number(event.target.value))}
          aria-label={label}
          className={`h-2 min-w-0 flex-1 accent-admin ${value === undefined ? "opacity-50" : ""}`}
        />
        <span className="w-16 shrink-0 text-right text-[13px] tabular-nums text-admin-muted">
          {value === undefined ? "Standard" : `${value} ${unit}`}
        </span>
      </div>
    </Row>
  );
}

/** How the chosen element looks, on top of the site's colours and fonts: each setting can go back to the standard. */
export function StyleControls({
  draft,
  style,
  text,
  onChange,
  onReset,
}: {
  draft: SiteData;
  style: StyleProps;
  /** Whether the element shows text (the text settings are left out for a photo). */
  text: boolean;
  onChange: (style: StyleProps) => void;
  onReset: () => void;
}) {
  const swatches = Array.from(new Set([...Object.values(draft.theme.colors).map((color) => color.toUpperCase()), "#FFFFFF", "#000000"]));
  const set = (patch: Partial<StyleProps>) => {
    const next: StyleProps = { ...style, ...patch };
    for (const key of Object.keys(next) as (keyof StyleProps)[]) if (next[key] === undefined) delete next[key];
    onChange(next);
  };
  const customised = Object.keys(style).length > 0;

  return (
    <div className="space-y-5">
      {text && <ColorRow label="Textfärg" value={style.color} swatches={swatches} onChange={(color) => set({ color })} />}
      <ColorRow label="Bakgrundsfärg" value={style.background} swatches={swatches} onChange={(background) => set({ background })} />

      {text && (
        <>
          <Row label="Typsnitt" set={Boolean(style.font)} onReset={() => set({ font: undefined })}>
            <select
              value={style.font?.family ?? ""}
              onChange={(event) => {
                const option = fontOptions.find((font) => font.family === event.target.value);
                set({ font: option ? ({ family: option.family, category: option.category } as FontChoice) : undefined });
              }}
              className={`${controlClasses} min-h-11`}
              aria-label="Typsnitt"
            >
              <option value="">Standard (hemsidans typsnitt)</option>
              {(Object.keys(fontCategoryLabels) as FontChoice["category"][]).map((category) => {
                const options = fontOptions.filter((font) => font.category === category);
                return options.length > 0 ? (
                  <optgroup key={category} label={fontCategoryLabels[category]}>
                    {options.map((font) => (
                      <option key={font.family} value={font.family}>
                        {font.family}
                      </option>
                    ))}
                  </optgroup>
                ) : null;
              })}
            </select>
          </Row>

          <Slider label="Textstorlek" value={style.size} min={10} max={120} unit="px" placeholder={18} onChange={(size) => set({ size })} />

          <Row label="Tjocklek" set={style.weight !== undefined} onReset={() => set({ weight: undefined })}>
            <div className="flex flex-wrap gap-1.5" role="group" aria-label="Tjocklek">
              {weights.map((weight) => (
                <button
                  key={weight.value}
                  type="button"
                  aria-pressed={style.weight === weight.value}
                  onClick={() => set({ weight: weight.value })}
                  style={{ fontWeight: weight.value }}
                  className={`min-h-9 rounded-lg px-2.5 text-[13px] ring-1 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-admin ${
                    style.weight === weight.value
                      ? "bg-admin text-admin-contrast ring-admin"
                      : "bg-white text-admin-ink ring-admin-line hover:bg-stone-50"
                  }`}
                >
                  {weight.label}
                </button>
              ))}
            </div>
          </Row>

          <Row label="Justering" set={Boolean(style.align)} onReset={() => set({ align: undefined })}>
            <div className="flex gap-1.5" role="group" aria-label="Justering">
              {aligns.map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={style.align === value}
                  aria-label={label}
                  title={label}
                  onClick={() => set({ align: value })}
                  className={`flex h-9 w-11 items-center justify-center rounded-lg ring-1 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-admin ${
                    style.align === value ? "bg-admin text-admin-contrast ring-admin" : "bg-white text-admin-ink ring-admin-line hover:bg-stone-50"
                  }`}
                >
                  <Icon aria-hidden="true" className="h-4 w-4" />
                </button>
              ))}
            </div>
          </Row>
        </>
      )}

      <Slider label="Rundade hörn" value={style.radius} min={0} max={60} unit="px" placeholder={0} onChange={(radius) => set({ radius })} />

      {customised && (
        <AdminButton size="sm" variant="ghost" icon={RotateCcw} onClick={onReset}>
          Återställ utseendet
        </AdminButton>
      )}
    </div>
  );
}
