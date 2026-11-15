"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Image as ImageIcon, MousePointerClick, Palette, Type } from "lucide-react";
import { PreviewPane } from "../editor/PreviewPane";
import { ElementInspector } from "./ElementInspector";
import { useDraft } from "@/contexts/admin/AdminDataContext";
import { changeAt } from "@/lib/admin/visual";
import { list } from "@/lib/site/collection.ts";
import type { PreviewTarget } from "@/lib/admin/preview";
import type { SiteData } from "@/lib/site/schema.ts";

function useWide(): boolean {
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const update = () => setWide(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return wide;
}

function targetFor(value: string): PreviewTarget {
  const [kind, id] = value.split(":");
  if (kind === "tjanst") return { kind: "service", serviceId: id };
  if (kind === "saknas") return { kind: "notFound" };
  return { kind: "page", pageId: id };
}

function Intro() {
  const tips = [
    { icon: MousePointerClick, text: "Klicka på en text, knapp eller bild på hemsidan för att välja den." },
    { icon: Type, text: "Texter skriver du direkt i sidan. Tryck Enter när du är klar." },
    { icon: ImageIcon, text: "Klicka på en bild för att ladda upp en ny." },
    { icon: Palette, text: "Färger, typsnitt, storlek och rundade hörn ändrar du här när något är valt." },
  ];
  return (
    <div className="p-5">
      <h2 className="text-[17px] font-semibold text-admin-ink">Klicka på det du vill ändra</h2>
      <ul className="mt-4 space-y-3.5">
        {tips.map(({ icon: Icon, text }) => (
          <li key={text} className="flex gap-3 text-[14px] leading-snug text-admin-muted">
            <Icon aria-hidden="true" className="mt-0.5 h-[18px] w-[18px] shrink-0 text-admin" />
            {text}
          </li>
        ))}
      </ul>
      <p className="mt-5 text-[13px] leading-snug text-admin-subtle">Allt sparas medan du arbetar. Ändringarna syns på hemsidan när du publicerar.</p>
    </div>
  );
}

/**
 * Hemsidan as it looks, to click on: whatever is clicked can be changed beside it (on phones in a panel from the
 * bottom) – its text straight in the page, its link, its photo and its look.
 */
export function VisualEditor({ draft, initialPage }: { draft: SiteData; initialPage?: string | null }) {
  const { store } = useDraft();
  const wide = useWide();
  const pages = useMemo(() => list(draft.pages), [draft.pages]);
  const services = useMemo(() => list(draft.services), [draft.services]);
  const home = pages.find((page) => page.slug === "") ?? pages[0];
  const [where, setWhere] = useState(() => `sida:${pages.some((page) => page.id === initialPage) ? initialPage : home?.id}`);
  const [selected, setSelected] = useState<string | null>(null);
  // Counts clicks on the page, so a photo clicked opens the picker even when it was already chosen.
  const [clicks, setClicks] = useState(0);
  const latest = useRef(draft);
  latest.current = draft;


  const onSelect = useCallback((k: string) => {
    setSelected(k);
    setClicks((count) => count + 1);
  }, []);

  const onText = useCallback(
    (k: string, value: string) => {
      const change = changeAt(latest.current, k.split("."), value);
      store.edit(change.path, change.value);
    },
    [store],
  );

  const edit = useMemo(() => ({ selected, onSelect, onText }), [selected, onSelect, onText]);
  const target = useMemo(() => targetFor(where), [where]);

  const picker = (
    <label className="flex min-w-0 items-center gap-2 text-[13px] font-semibold text-admin-muted">
      <span className="sr-only sm:not-sr-only">Sida</span>
      <select
        value={where}
        onChange={(event) => {
          setWhere(event.target.value);
          setSelected(null);
        }}
        className="min-h-9 min-w-0 max-w-[13rem] rounded-lg border-0 bg-stone-100 py-1 pl-2.5 pr-8 text-[14px] font-semibold text-admin-ink focus:outline-none focus:ring-2 focus:ring-admin"
      >
        <optgroup label="Sidor">
          {pages.map((page) => (
            <option key={page.id} value={`sida:${page.id}`}>
              {page.slug ? page.title : "Startsidan"}
            </option>
          ))}
        </optgroup>
        <optgroup label="Tjänstesidor">
          {services.map((service) => (
            <option key={service.id} value={`tjanst:${service.id}`}>
              {service.name}
            </option>
          ))}
        </optgroup>
        <optgroup label="Övrigt">
          <option value="saknas:">Sidan som inte finns (404)</option>
        </optgroup>
      </select>
    </label>
  );

  const inspector = selected && <ElementInspector key={selected} draft={draft} k={selected} clicks={clicks} onClose={() => setSelected(null)} />;

  return (
    <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px] xl:grid-cols-[minmax(0,1fr)_400px]">
      {/* On a phone, while something is chosen, the page stays in view between the top bar and the panel below. */}
      <div className={selected && !wide ? "fixed inset-x-0 top-16 z-40 bg-[#F6F5F2] px-2 pt-2" : "min-w-0"}>
        <PreviewPane
          draft={draft}
          target={target}
          edit={edit}
          toolbar={picker}
          className={selected && !wide ? "h-[calc(50svh-72px)]" : "h-[calc(100svh-210px)] min-h-[440px] lg:h-[calc(100svh-200px)]"}
        />
      </div>
      {wide ? (
        <aside
          aria-label="Det valda"
          className="sticky top-[88px] flex h-[calc(100svh-200px)] min-h-[440px] flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-admin-line"
        >
          {inspector || <Intro />}
        </aside>
      ) : (
        selected && (
          <>
            <aside
              aria-label="Det valda"
              className="fixed inset-x-0 bottom-0 z-50 flex max-h-[50svh] flex-col overflow-hidden rounded-t-2xl bg-white shadow-[0_-12px_40px_-12px_rgba(0,0,0,0.35)] ring-1 ring-admin-line"
            >
              {inspector}
            </aside>
          </>
        )
      )}
    </div>
  );
}
