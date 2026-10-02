"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Check, ChevronRight } from "lucide-react";
import { Card } from "../ui/Card";
import { useDraft } from "@/contexts/admin/AdminDataContext";
import { doneFromContent, itemForSave, loadOnboarding, onboardingItems, saveOnboarding, type OnboardingState } from "@/lib/admin/onboarding";
import { supabase } from "@/lib/admin/supabase";

/** "Kom igång": shown from the first login until every item is done, then never again. */
export function Onboarding() {
  const { draft, store } = useDraft();
  const [state, setState] = useState<OnboardingState | null>(null);
  const [conversations, setConversations] = useState(0);

  useEffect(() => {
    void loadOnboarding().then(setState);
    void supabase()
      .from("ai_conversations")
      .select("id", { count: "exact", head: true })
      .then(({ count }) => setConversations(count ?? 0));
  }, []);

  // Saves tick items off as they happen.
  useEffect(
    () =>
      store.onSaved((entry) => {
        const item = itemForSave(entry, store.getState().draft);
        if (!item) return;
        setState((current) => {
          if (!current || current.done.includes(item)) return current;
          const next = { ...current, done: [...current.done, item] };
          void saveOnboarding(next);
          return next;
        });
      }),
    [store]
  );

  const done = useMemo(() => new Set([...(state?.done ?? []), ...doneFromContent(draft, conversations)]), [state, draft, conversations]);
  const allDone = onboardingItems.every((item) => done.has(item.id));

  useEffect(() => {
    if (state && allDone && !state.completed) {
      const next = { ...state, done: Array.from(done), completed: true };
      setState(next);
      void saveOnboarding(next);
    }
  }, [allDone, state, done]);

  if (!state || state.completed || allDone) return null;
  const count = onboardingItems.filter((item) => done.has(item.id)).length;

  return (
    <Card className="mb-6">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-[17px] font-semibold text-admin-ink">Kom igång</h2>
          <p className="mt-1 text-[14px] text-admin-muted">Fem saker som gör hemsidan till er egen. Listan försvinner när allt är klart.</p>
        </div>
        <p className="text-[13px] font-semibold text-admin-muted">
          {count} av {onboardingItems.length} klara
        </p>
      </div>
      <div className="mb-4 h-1.5 overflow-hidden rounded-full bg-admin/10" aria-hidden="true">
        <div className="h-full rounded-full bg-admin transition-[width] duration-500" style={{ width: `${(count / onboardingItems.length) * 100}%` }} />
      </div>
      <ul className="grid gap-2 md:grid-cols-2 xl:grid-cols-5">
        {onboardingItems.map((item) => {
          const isDone = done.has(item.id);
          return (
            <li key={item.id}>
              <Link
                href={item.href}
                className={`group flex h-full min-h-[64px] items-start gap-3 rounded-xl p-3 ring-1 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-admin ${
                  isDone ? "bg-stone-50 ring-transparent" : "bg-white ring-admin-line hover:ring-admin/40"
                }`}
              >
                <span
                  className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${isDone ? "bg-admin text-admin-contrast" : "ring-2 ring-inset ring-stone-300"}`}
                >
                  {isDone && <Check aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={3} />}
                </span>
                <span className="min-w-0 flex-1">
                  <span className={`block text-[14px] font-semibold ${isDone ? "text-admin-muted line-through decoration-stone-300" : "text-admin-ink"}`}>
                    {item.label}
                    <span className="sr-only">{isDone ? " – klart" : " – inte klart"}</span>
                  </span>
                  <span className="block text-[13px] text-admin-muted">{item.hint}</span>
                </span>
                {!isDone && <ChevronRight aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-admin-muted transition group-hover:translate-x-0.5" />}
              </Link>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
