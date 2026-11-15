"use client";

import { useEffect, useState } from "react";
import { ImageOff, Replace, X } from "lucide-react";
import { AdminButton } from "../ui/Button";
import { TextArea, TextField, controlClasses } from "../ui/Field";
import { HrefField } from "../editor/LinkField";
import { ImagePicker } from "../images/ImagePicker";
import { StyleControls } from "./StyleControls";
import { useDraft } from "@/contexts/admin/AdminDataContext";
import { thumbnail } from "@/lib/admin/images";
import { changeAt, isImage, kindOf, nameOf, readAt, specAt, textFields, type StyleProps } from "@/lib/admin/visual";
import { styleKey } from "@/lib/site/styles.ts";
import type { SiteData, SiteImage } from "@/lib/site/schema.ts";

const fieldNames: Record<string, string> = {
  street: "Gatuadress",
  postalCode: "Postnummer",
  city: "Ort",
  label: "Text",
  heading: "Rubrik",
  text: "Text",
  name: "Namn",
  title: "Rubrik",
  tag: "Kategori",
  question: "Fråga",
  answer: "Svar",
};

/** What can be changed about the element clicked in the visual editor: its text, link, photo and look. */
/** `clicks` counts clicks on the page: each one on a photo opens the picker. */
export function ElementInspector({ draft, k, clicks, onClose }: { draft: SiteData; k: string; clicks: number; onClose: () => void }) {
  const { store } = useDraft();
  const path = k.split(".");
  const value = readAt(draft, path);
  const spec = specAt(draft, path);
  const kind = kindOf(value, spec);
  const { context, label } = nameOf(draft, path);
  const [picking, setPicking] = useState(false);

  // A photo clicked on the page opens the picker straight away.
  useEffect(() => {
    if (clicks > 0 && isImage(value)) setPicking(true);
    // Only for a new click, not when the photo itself changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clicks]);

  const set = (at: string[], next: unknown) => {
    const change = changeAt(draft, at, next);
    store.edit(change.path, change.value);
  };

  const styleId = styleKey(k);
  const { k: _address, ...style } = draft.styles?.[styleId] ?? { k };
  const setStyle = (next: StyleProps) => {
    if (Object.keys(next).length === 0) store.remove(["styles", styleId]);
    else store.edit(["styles", styleId], { k, ...next });
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex items-start gap-3 border-b border-admin-line px-4 py-3 sm:px-5">
        <div className="min-w-0 flex-1">
          {context && <p className="truncate text-[12px] font-medium text-admin-muted">{context}</p>}
          <h2 className="truncate text-[17px] font-semibold text-admin-ink">{label}</h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Stäng"
          className="-mr-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-admin-muted hover:bg-stone-900/[0.05] hover:text-admin-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-admin"
        >
          <X aria-hidden="true" className="h-5 w-5" />
        </button>
      </div>

      <div className="min-h-0 flex-1 space-y-6 overflow-y-auto px-4 py-4 sm:px-5">
        {kind === "text" && (
          <TextField label="Text" value={value as string} onChange={(next) => set(path, next)} recommended={spec?.recommended} autoFocus={false} />
        )}
        {kind === "textarea" && (
          <TextArea label="Text" value={value as string} onChange={(next) => set(path, next)} recommended={spec?.recommended} rows={5} />
        )}
        {kind === "href" && <HrefField label="Leder till" value={value as string} draft={draft} onChange={(next) => set(path, next)} />}
        {kind === "number" && (
          <div>
            <label htmlFor="inspector-number" className="mb-1.5 block text-[14px] font-semibold text-admin-ink">
              Siffra
            </label>
            <input
              id="inspector-number"
              type="number"
              inputMode="numeric"
              value={value as number}
              min={spec?.min}
              max={spec?.max}
              onChange={(event) => event.target.value !== "" && set(path, Math.round(Number(event.target.value)))}
              className={`${controlClasses} min-h-11`}
            />
          </div>
        )}
        {kind === "link" && (
          <div className="space-y-4">
            <TextField
              label="Text på knappen"
              value={(value as { label: string }).label}
              onChange={(next) => set([...path, "label"], next)}
              recommended={30}
            />
            <HrefField label="Leder till" value={(value as { href: string }).href} draft={draft} onChange={(next) => set([...path, "href"], next)} />
          </div>
        )}
        {kind === "image" && <ImagePanel image={value as SiteImage} onAlt={(alt) => set([...path, "alt"], alt)} onPick={() => setPicking(true)} />}
        {kind === "group" &&
          textFields(value).map((field) => (
            <TextField
              key={field}
              label={fieldNames[field] ?? field}
              value={(value as Record<string, string>)[field]}
              onChange={(next) => set([...path, field], next)}
            />
          ))}
        {kind === "none" && value === undefined && null}

        <section aria-labelledby="inspector-look" className="border-t border-admin-line pt-5">
          <h3 id="inspector-look" className="mb-4 text-[13px] font-bold uppercase tracking-[0.06em] text-admin-muted">
            Utseende
          </h3>
          <StyleControls draft={draft} style={style} text={kind !== "image"} onChange={setStyle} onReset={() => store.remove(["styles", styleId])} />
        </section>
      </div>

      {kind === "image" && (
        <ImagePicker
          open={picking}
          onClose={() => setPicking(false)}
          usage={spec?.imageUsage}
          title="Byt bild"
          onSelect={(image) => {
            const before = value as SiteImage;
            // The new photo keeps the old one's description unless it brought its own.
            set(path, { ...image, alt: image.alt || before.alt });
            setPicking(false);
          }}
        />
      )}
    </div>
  );
}

function ImagePanel({ image, onAlt, onPick }: { image: SiteImage; onAlt: (alt: string) => void; onPick: () => void }) {
  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={onPick}
        className="group relative block aspect-[4/3] w-full overflow-hidden rounded-xl bg-stone-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-admin"
      >
        {image.src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={thumbnail(image)} alt="" className="h-full w-full object-cover" style={{ objectPosition: image.focus ?? "50% 50%" }} />
        ) : (
          <ImageOff aria-hidden="true" className="m-auto h-8 w-8 text-stone-500" />
        )}
        <span className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 bg-black/55 py-2.5 text-[14px] font-semibold text-white">
          <Replace aria-hidden="true" className="h-4 w-4" /> Byt bild
        </span>
      </button>
      <AdminButton variant="primary" icon={Replace} onClick={onPick} className="w-full">
        Ladda upp eller välj en ny bild
      </AdminButton>
      <TextField
        label="Bildtext (alt-text)"
        value={image.alt}
        onChange={onAlt}
        recommended={125}
        hint={image.alt ? undefined : "Beskriv kort vad bilden visar – för synskadade och för Google."}
      />
    </div>
  );
}
