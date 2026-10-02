"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { DraftStore, type DraftState } from "@/lib/admin/draftStore";
import { supabase } from "@/lib/admin/supabase";
import { applyPrime } from "@/lib/admin/prime";

export interface PendingReset {
  id: string;
  created_at: string;
  expires_at: string;
  reason: string;
}

interface AdminData {
  store: DraftStore;
  credits: number | null;
  refreshCredits: () => Promise<void>;
  newQuotes: number;
  refreshQuotes: () => Promise<void>;
  /** A "Rensa alla ändringar" request waiting for Elevate Studio, if any. */
  pendingReset: PendingReset | null;
  refreshReset: () => Promise<void>;
}

const AdminDataContext = createContext<AdminData | null>(null);

/** One draft store, credit balance and quote counter for the whole panel, kept while moving between its pages. */
export function AdminDataProvider({ children }: { children: ReactNode }) {
  const storeRef = useRef<DraftStore | null>(null);
  storeRef.current ??= new DraftStore();
  const store = storeRef.current;
  const [credits, setCredits] = useState<number | null>(null);
  const [newQuotes, setNewQuotes] = useState(0);
  const [pendingReset, setPendingReset] = useState<PendingReset | null>(null);

  const refreshReset = useCallback(async () => {
    const { data } = await supabase()
      .from("reset_requests")
      .select("id, created_at, expires_at, reason")
      .eq("status", "pending")
      .gt("expires_at", new Date().toISOString())
      .maybeSingle();
    setPendingReset((data as PendingReset) ?? null);
  }, []);

  const refreshCredits = useCallback(async () => {
    const { data } = await supabase().from("credit_balance").select("balance").eq("account_id", "site").maybeSingle();
    setCredits(data?.balance ?? 0);
  }, []);

  const refreshQuotes = useCallback(async () => {
    const { count } = await supabase().from("quote_requests").select("id", { count: "exact", head: true }).eq("status", "new").is("deleted_at", null);
    setNewQuotes(count ?? 0);
  }, []);

  useEffect(() => {
    void store.start();
    void refreshCredits();
    void refreshQuotes();
    void refreshReset();
    const channel = supabase()
      .channel("quote-requests")
      .on("postgres_changes", { event: "*", schema: "public", table: "quote_requests" }, () => void refreshQuotes())
      .subscribe();
    // Without Realtime, a gentle poll keeps the counter fresh.
    const poll = setInterval(() => void refreshQuotes(), 60_000);
    return () => {
      clearInterval(poll);
      void supabase().removeChannel(channel);
    };
  }, [store, refreshCredits, refreshQuotes, refreshReset]);

  // The prime colour follows the saved setting.
  const adminPrime = useSyncExternalStore(store.subscribe, () => store.getState().adminColors.primary, () => undefined);
  useEffect(() => {
    // Until it has loaded, the colour remembered in this browser (applied before the first paint) stays.
    if (adminPrime) applyPrime(adminPrime);
  }, [adminPrime]);

  const value = useMemo(
    () => ({ store, credits, refreshCredits, newQuotes, refreshQuotes, pendingReset, refreshReset }),
    [store, credits, refreshCredits, newQuotes, refreshQuotes, pendingReset, refreshReset]
  );
  return <AdminDataContext.Provider value={value}>{children}</AdminDataContext.Provider>;
}

export function useAdminData(): AdminData {
  const value = useContext(AdminDataContext);
  if (!value) throw new Error("useAdminData must be used inside AdminDataProvider");
  return value;
}

/** The draft store's state; re-renders when it changes. */
export function useDraft(): DraftState & { store: DraftStore } {
  const { store } = useAdminData();
  const state = useSyncExternalStore(store.subscribe, store.getState, store.getState);
  return { ...state, store };
}
