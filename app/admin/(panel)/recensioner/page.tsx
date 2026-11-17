"use client";

import { useMemo, useState } from "react";
import { ClipboardPaste, Plus, Star, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { AdminButton } from "@/components/admin/ui/Button";
import { Card, CardHeader } from "@/components/admin/ui/Card";
import { EmptyState } from "@/components/admin/ui/EmptyState";
import { TextArea, controlClasses } from "@/components/admin/ui/Field";
import { SkeletonLines } from "@/components/admin/ui/Skeleton";
import { useToast } from "@/components/admin/ui/Toast";
import { useDraft } from "@/contexts/admin/AdminDataContext";
import { parseGoogleReviews, sameName } from "@/lib/admin/reviews";
import { list, newId } from "@/lib/site/collection.ts";
import type { SiteData } from "@/lib/site/schema.ts";

const DETAIL = "Recension på Google";
const MAX = 40;

interface Candidate {
  key: string;
  name: string;
  quote: string;
  rating: number;
  chosen: boolean;
  exists: boolean;
}

type Testimonials = Extract<SiteData["pages"]["items"][string]["sections"]["items"][string], { type: "testimonials" }>;

/** Every reviews section on the site, with where it is in the content and which page it is on. */
function reviewSections(draft: SiteData) {
  return list(draft.pages).flatMap((page) =>
    list(page.sections)
      .filter((section): section is Testimonials & { id: string } => section.type === "testimonials")
      .map((section) => ({
        path: ["pages", "items", page.id, "sections", "items", section.id],
        label: `${page.slug ? page.title : "Startsidan"} – ${section.heading || "Omdömen"}`,
        section,
      })),
  );
}

/** Stars to click: one to five. */
function StarPicker({ value, onChange, label }: { value: number; onChange: (value: number) => void; label: string }) {
  return (
    <div role="radiogroup" aria-label={label} className="flex">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          role="radio"
          aria-checked={value === n}
          aria-label={`${n} av 5 stjärnor`}
          onClick={() => onChange(n)}
          className="flex h-9 w-8 items-center justify-center rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-admin"
        >
          <Star aria-hidden="true" className={`h-5 w-5 ${n <= value ? "fill-[#FBBC04] text-[#FBBC04]" : "text-stone-300"}`} />
        </button>
      ))}
    </div>
  );
}

/**
 * The reviews on the site: the ones there, with their stars, and bringing in new ones by pasting what is copied from
 * the company's reviews on Google. Like every change, they show on the site once published.
 */
export default function ReviewsPage() {
  const { draft, status, store } = useDraft();
  const toast = useToast();
  const sections = useMemo(() => (draft ? reviewSections(draft) : []), [draft]);
  const [chosenPath, setChosenPath] = useState<string | null>(null);
  const target = sections.find((entry) => entry.path.join(".") === chosenPath) ?? sections[0];
  const reviews = target ? list(target.section.items) : [];
  const [pasted, setPasted] = useState("");
  const [candidates, setCandidates] = useState<Candidate[] | null>(null);

  if (status !== "ready" || !draft) {
    return (
      <>
        <PageHeader title="Recensioner" />
        <Card>
          <SkeletonLines lines={5} />
        </Card>
      </>
    );
  }

  function read() {
    const found = parseGoogleReviews(pasted);
    if (found.length === 0) {
      toast.error("Hittade inga recensioner i texten. Kopiera hela recensionerna, med namn och datum, eller lägg till för hand.");
      setCandidates([]);
      return;
    }
    setCandidates(
      found.map((review, index) => {
        const exists = reviews.some((other) => sameName(other.name, review.name));
        return { key: `${index}-${review.name}`, ...review, rating: review.rating || 5, chosen: !exists, exists };
      }),
    );
  }

  function change(key: string, patch: Partial<Candidate>) {
    setCandidates((current) => current?.map((candidate) => (candidate.key === key ? { ...candidate, ...patch } : candidate)) ?? null);
  }

  function addByHand() {
    setCandidates((current) => [...(current ?? []), { key: `hand-${Date.now()}`, name: "", quote: "", rating: 5, chosen: true, exists: false }]);
  }

  function addChosen() {
    if (!target || !candidates) return;
    const chosen = candidates.filter((candidate) => candidate.chosen && candidate.name.trim());
    if (chosen.length === 0) return toast.error("Välj minst en recension med ett namn.");
    const room = MAX - target.section.items.order.length;
    if (chosen.length > room) return toast.error(`Det får plats ${room} till. Ta bort några först.`);
    const items = { ...target.section.items.items };
    const order = [...target.section.items.order];
    for (const candidate of chosen) {
      const id = newId({ order, items }, candidate.name);
      items[id] = { name: candidate.name.trim(), quote: candidate.quote.trim(), detail: DETAIL, rating: candidate.rating, image: null };
      order.push(id);
    }
    store.editMany([
      { path: [...target.path, "items", "items"], op: "set", value: items },
      { path: [...target.path, "items", "order"], op: "set", value: order },
    ]);
    toast.success(
      chosen.length === 1 ? "1 recension tillagd. Publicera för att visa den." : `${chosen.length} recensioner tillagda. Publicera för att visa dem.`,
    );
    setCandidates(null);
    setPasted("");
  }

  function setRating(id: string, rating: number) {
    if (target) store.edit([...target.path, "items", "items", id, "rating"], rating);
  }

  function remove(id: string) {
    if (!target) return;
    store.editMany([
      { path: [...target.path, "items", "items", id], op: "delete" },
      { path: [...target.path, "items", "order"], op: "set", value: target.section.items.order.filter((other) => other !== id) },
    ]);
  }

  const chosenCount = candidates?.filter((candidate) => candidate.chosen && candidate.name.trim()).length ?? 0;

  return (
    <>
      <PageHeader
        title="Recensioner"
        description="Omdömena som rullar på hemsidan. Hämta nya från Google genom att kopiera och klistra in dem här. Ändringarna syns när du publicerar."
      />
      {!target ? (
        <Card>
          <EmptyState icon={Star} title="Ingen omdömessektion" text="Lägg till en sektion med omdömen på en sida under Hemsidan först." />
        </Card>
      ) : (
        <div className="grid max-w-[1200px] gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start">
          <Card>
            <CardHeader title="Importera från Google" description="Så här gör du:" />
            <ol className="mb-4 list-decimal space-y-1.5 pl-5 text-[14px] leading-snug text-admin-muted">
              <li>Sök på Markmontage på Google och öppna Recensioner.</li>
              <li>Markera recensionerna du vill ha, från första namnet till sista, och kopiera.</li>
              <li>Klistra in här och tryck på Läs in. Stjärnorna följer med; du kan ändra dem innan du lägger till.</li>
            </ol>
            <TextArea
              label="Text från Google"
              value={pasted}
              onChange={setPasted}
              rows={7}
              placeholder={"Christian Haglund\nLocal Guide · 30 recensioner\nför 6 år sedan\nMycket bra företag …"}
            />
            <div className="mt-3 flex flex-wrap gap-2">
              <AdminButton variant="primary" icon={ClipboardPaste} onClick={read} disabled={!pasted.trim()}>
                Läs in
              </AdminButton>
              <AdminButton variant="ghost" icon={Plus} onClick={addByHand}>
                Lägg till för hand
              </AdminButton>
            </div>

            {candidates && candidates.length > 0 && (
              <div className="mt-6 border-t border-admin-line pt-5">
                <h3 className="text-[15px] font-semibold text-admin-ink">
                  Hittade {candidates.length === 1 ? "1 recension" : `${candidates.length} recensioner`}
                </h3>
                <ul className="mt-3 space-y-3">
                  {candidates.map((candidate) => (
                    <li
                      key={candidate.key}
                      className={`rounded-xl p-3 ring-1 ${candidate.chosen ? "bg-white ring-admin/40" : "bg-stone-50 ring-admin-line"}`}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={candidate.chosen}
                          onChange={(event) => change(candidate.key, { chosen: event.target.checked })}
                          aria-label={`Ta med ${candidate.name || "recensionen"}`}
                          className="mt-2.5 h-5 w-5 shrink-0 accent-admin"
                        />
                        <div className="min-w-0 flex-1 space-y-2">
                          <input
                            value={candidate.name}
                            onChange={(event) => change(candidate.key, { name: event.target.value })}
                            aria-label="Namn"
                            placeholder="Namn"
                            maxLength={300}
                            className={controlClasses}
                          />
                          <StarPicker
                            value={candidate.rating}
                            onChange={(rating) => change(candidate.key, { rating })}
                            label={`Stjärnor för ${candidate.name || "recensionen"}`}
                          />
                          <textarea
                            value={candidate.quote}
                            onChange={(event) => change(candidate.key, { quote: event.target.value })}
                            aria-label="Vad de skrev"
                            placeholder="Vad de skrev (kan lämnas tomt, då visas bara stjärnorna)"
                            rows={2}
                            maxLength={4000}
                            className={`${controlClasses} resize-y leading-relaxed`}
                          />
                          {candidate.exists && (
                            <p className="text-[13px] text-amber-800">Det finns redan en recension från {candidate.name} på hemsidan.</p>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <AdminButton variant="primary" icon={Plus} className="mt-4 w-full" onClick={addChosen} disabled={chosenCount === 0}>
                  {chosenCount === 1 ? "Lägg till 1 recension" : `Lägg till ${chosenCount} recensioner`}
                </AdminButton>
              </div>
            )}
          </Card>

          <Card>
            <CardHeader
              title={`På hemsidan (${reviews.length})`}
              description="Tryck på stjärnorna för att ändra dem. Texterna ändrar du under Hemsidan."
            />
            {sections.length > 1 && (
              <label className="mb-4 block text-[13px] font-semibold text-admin-muted">
                Sektion
                <select value={target.path.join(".")} onChange={(event) => setChosenPath(event.target.value)} className={`${controlClasses} mt-1`}>
                  {sections.map((entry) => (
                    <option key={entry.path.join(".")} value={entry.path.join(".")}>
                      {entry.label}
                    </option>
                  ))}
                </select>
              </label>
            )}
            {reviews.length === 0 ? (
              <EmptyState icon={Star} title="Inga recensioner än" text="Importera dem från Google till vänster." />
            ) : (
              <ul className="-mx-2 divide-y divide-admin-line">
                {reviews.map((review) => (
                  <li key={review.id} className="flex items-start gap-3 px-2 py-3">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[15px] font-semibold text-admin-ink">{review.name}</p>
                      <StarPicker value={review.rating} onChange={(rating) => setRating(review.id, rating)} label={`Stjärnor för ${review.name}`} />
                      {review.quote ? (
                        <p className="mt-0.5 line-clamp-2 text-[14px] leading-snug text-admin-muted">{review.quote}</p>
                      ) : (
                        <p className="mt-0.5 text-[13px] italic text-admin-subtle">Bara stjärnor</p>
                      )}
                    </div>
                    <AdminButton size="sm" variant="ghost" icon={Trash2} onClick={() => remove(review.id)} className="text-red-700 hover:bg-red-50">
                      Ta bort
                    </AdminButton>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>
      )}
    </>
  );
}
