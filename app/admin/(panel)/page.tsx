"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, Coins, Globe, Inbox, Lightbulb, PanelsTopLeft, Settings, Sparkles, TrendingDown, TrendingUp } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { PublishBar } from "@/components/admin/PublishBar";
import { Onboarding } from "@/components/admin/dashboard/Onboarding";
import { QuoteChart } from "@/components/admin/dashboard/QuoteChart";
import { Card, CardHeader } from "@/components/admin/ui/Card";
import { Badge } from "@/components/admin/ui/Badge";
import { EmptyState } from "@/components/admin/ui/EmptyState";
import { Skeleton, SkeletonLines } from "@/components/admin/ui/Skeleton";
import { useAuth } from "@/contexts/admin/AuthContext";
import { useAdminData, useDraft } from "@/contexts/admin/AdminDataContext";
import { supabase } from "@/lib/admin/supabase";
import { dayKey, formatRelative, lastDays } from "@/lib/admin/dates";

interface QuoteRow {
  id: string;
  name: string;
  work_type: string;
  status: "new" | "read";
  created_at: string;
}

interface Revision {
  created_at: string;
  summary: string;
  source: string;
}

const quickLinks = [
  { href: "/admin/hemsidan", label: "Redigera hemsidan", icon: PanelsTopLeft },
  { href: "/admin/ai", label: "Fråga AI:n", icon: Sparkles },
  { href: "/admin/offertforfragningar", label: "Offertförfrågningar", icon: Inbox },
  { href: "/admin/installningar", label: "Inställningar", icon: Settings },
];

function greeting(): string {
  const hour = Number(new Date().toLocaleTimeString("sv-SE", { hour: "2-digit", timeZone: "Europe/Stockholm" }));
  return hour < 10 ? "God morgon" : hour < 18 ? "Välkommen tillbaka" : "God kväll";
}

export default function DashboardPage() {
  const { profile } = useAuth();
  const { status, publishedAt, pendingChanges, themeChanged } = useDraft();
  const { credits, newSuggestions } = useAdminData();
  const [quotes, setQuotes] = useState<QuoteRow[] | null>(null);
  const [total, setTotal] = useState<number | null>(null);
  const [lastAi, setLastAi] = useState<Revision | null | undefined>(undefined);
  const [lastPublish, setLastPublish] = useState<Revision | null | undefined>(undefined);
  const [spentThisMonth, setSpentThisMonth] = useState<number | null>(null);

  useEffect(() => {
    const client = supabase();
    const since = new Date(Date.now() - 60 * 86_400_000).toISOString();
    void client
      .from("quote_requests")
      .select("id, name, work_type, status, created_at")
      .is("deleted_at", null)
      .gte("created_at", since)
      .order("created_at", { ascending: false })
      .then(({ data }) => setQuotes((data as QuoteRow[]) ?? []));
    void client
      .from("quote_requests")
      .select("id", { count: "exact", head: true })
      .is("deleted_at", null)
      .then(({ count }) => setTotal(count ?? 0));
    void client
      .from("content_revisions")
      .select("created_at, summary, source")
      .eq("source", "ai")
      .order("id", { ascending: false })
      .limit(1)
      .then(({ data }) => setLastAi((data?.[0] as Revision) ?? null));
    void client
      .from("content_revisions")
      .select("created_at, summary, source")
      .order("id", { ascending: false })
      .limit(1)
      .then(({ data }) => setLastPublish((data?.[0] as Revision) ?? null));
    const monthStart = new Date();
    monthStart.setDate(1);
    monthStart.setHours(0, 0, 0, 0);
    void client
      .from("credit_transactions")
      .select("amount")
      .eq("type", "spend")
      .gte("created_at", monthStart.toISOString())
      .then(({ data }) => setSpentThisMonth((data ?? []).reduce((sum, row: { amount: number }) => sum - row.amount, 0)));
  }, []);

  const perDay = useMemo(() => {
    if (!quotes) return null;
    const counts = new Map<string, number>();
    for (const quote of quotes) counts.set(dayKey(quote.created_at), (counts.get(dayKey(quote.created_at)) ?? 0) + 1);
    return lastDays(30).map((day) => ({ day, count: counts.get(day) ?? 0 }));
  }, [quotes]);

  const trend = useMemo(() => {
    if (!quotes) return null;
    const now = Date.now();
    const thisWeek = quotes.filter((q) => now - new Date(q.created_at).getTime() < 7 * 86_400_000).length;
    const lastWeek = quotes.filter((q) => {
      const age = now - new Date(q.created_at).getTime();
      return age >= 7 * 86_400_000 && age < 14 * 86_400_000;
    }).length;
    // Only compare when there is a previous period to compare with.
    const hasHistory = quotes.some((q) => now - new Date(q.created_at).getTime() >= 7 * 86_400_000);
    return { thisWeek, delta: thisWeek - lastWeek, hasHistory };
  }, [quotes]);

  const monthlyTotal = credits !== null && spentThisMonth !== null ? credits + spentThisMonth : null;
  const hasChartData = perDay ? perDay.some((day) => day.count > 0) : false;
  const name = profile?.fullName?.split(" ")[0];

  return (
    <>
      <PageHeader
        title={name ? `${greeting()}, ${name}` : `${greeting()}!`}
        description="Här ser du hur det går för hemsidan och kommer snabbt vidare."
      />

      <nav aria-label="Genvägar" className="mb-6 grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4">
        {quickLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group flex min-h-14 items-center gap-3 rounded-2xl bg-white px-4 text-[15px] font-semibold text-admin-ink shadow-sm ring-1 ring-admin-line transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-admin"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-admin/10 text-admin">
              <link.icon aria-hidden="true" className="h-[18px] w-[18px]" />
            </span>
            <span className="min-w-0 leading-tight">{link.label}</span>
          </Link>
        ))}
      </nav>

      <PublishBar />
      <Onboarding />

      {newSuggestions > 0 && (
        <Link
          href="/admin/hemsidan?flik=forslag"
          className="admin-rise mb-6 flex min-h-14 items-center gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-admin/25 transition hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-admin sm:px-5"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-admin/10 text-admin">
            <Lightbulb aria-hidden="true" className="h-[18px] w-[18px]" />
          </span>
          <span className="min-w-0 flex-1 text-[15px] text-admin-ink">
            <strong className="font-semibold">{newSuggestions === 1 ? "Ett nytt förslag" : `${newSuggestions} nya förslag`}</strong> från medarbetarna på hur hemsidan kan bli bättre
          </span>
          <span className="flex shrink-0 items-center gap-1 text-[14px] font-semibold text-admin">
            Läs <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
          </span>
        </Link>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader title="Hemsidan" />
          {status !== "ready" || lastPublish === undefined ? (
            <SkeletonLines lines={4} />
          ) : (
            <dl className="space-y-4 text-[14px]">
              <div className="flex items-center justify-between gap-3">
                <dt className="text-admin-muted">Status</dt>
                <dd>
                  {pendingChanges > 0 || themeChanged ? <Badge tone="warning">Opublicerade ändringar</Badge> : <Badge tone="success">Publicerad ✓</Badge>}
                </dd>
              </div>
              <div className="flex items-start justify-between gap-3">
                <dt className="text-admin-muted">Senast publicerad</dt>
                <dd className="text-right font-semibold text-admin-ink">{publishedAt ? formatRelative(publishedAt) : "–"}</dd>
              </div>
              {lastPublish && (
                <div className="flex items-start justify-between gap-3">
                  <dt className="shrink-0 text-admin-muted">Senaste ändring</dt>
                  <dd className="text-right text-admin-ink">{lastPublish.summary}</dd>
                </div>
              )}
              <div className="flex items-start justify-between gap-3">
                <dt className="shrink-0 text-admin-muted">Senaste AI-ändring</dt>
                <dd className="text-right text-admin-ink">{lastAi ? `${lastAi.summary} · ${formatRelative(lastAi.created_at)}` : "Ingen än"}</dd>
              </div>
              <div className="pt-1">
                <a
                  href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-1.5 rounded-lg text-[14px] font-semibold text-admin hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-admin"
                >
                  <Globe aria-hidden="true" className="h-4 w-4" /> Visa hemsidan <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                </a>
              </div>
            </dl>
          )}
        </Card>

        <Card>
          <CardHeader title="Offertförfrågningar" />
          {total === null || !trend ? (
            <div className="space-y-3">
              <Skeleton className="h-12 w-24" />
              <Skeleton className="h-4 w-40" />
            </div>
          ) : (
            <>
              <p className="text-[44px] font-semibold leading-none tracking-[-0.02em] text-admin-ink">{total}</p>
              <p className="mt-1 text-[14px] text-admin-muted">totalt</p>
              {trend.hasHistory ? (
                <p className={`mt-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] font-semibold ${trend.delta >= 0 ? "bg-emerald-50 text-emerald-800" : "bg-stone-100 text-stone-700"}`}>
                  {trend.delta >= 0 ? <TrendingUp aria-hidden="true" className="h-4 w-4" /> : <TrendingDown aria-hidden="true" className="h-4 w-4" />}
                  {trend.delta > 0 ? `+${trend.delta}` : trend.delta} den här veckan jämfört med förra
                </p>
              ) : (
                <p className="mt-4 text-[13px] text-admin-muted">{trend.thisWeek} den här veckan</p>
              )}
              <Link
                href="/admin/offertforfragningar"
                className="mt-4 flex min-h-11 items-center gap-1.5 text-[14px] font-semibold text-admin hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-admin"
              >
                Visa alla <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
              </Link>
            </>
          )}
        </Card>

        <Card>
          <CardHeader title="Credits" description="Används när AI-assistenten gör ändringar. Manuella ändringar är alltid gratis." />
          {credits === null || monthlyTotal === null ? (
            <div className="space-y-3">
              <Skeleton className="h-12 w-28" />
              <Skeleton className="h-2 w-full" />
            </div>
          ) : (
            <>
              <p className="flex items-baseline gap-2">
                <span className="text-[44px] font-semibold leading-none tracking-[-0.02em] text-admin-ink">{credits}</span>
                <span className="text-[14px] text-admin-muted">credits kvar</span>
              </p>
              <div className="mt-5">
                <div className="flex justify-between text-[13px] text-admin-muted">
                  <span>Använt i månaden</span>
                  <span className="font-semibold text-admin-ink">{spentThisMonth}</span>
                </div>
                {/* Meter: the used part in the prime colour on a lighter track of the same colour. */}
                <div
                  className="mt-2 h-2 overflow-hidden rounded-full bg-admin/15"
                  role="meter"
                  aria-label="Credits använda den här månaden"
                  aria-valuemin={0}
                  aria-valuemax={monthlyTotal}
                  aria-valuenow={spentThisMonth ?? 0}
                >
                  <div className={`h-full rounded-full ${credits <= 20 ? "bg-amber-600" : "bg-admin"}`} style={{ width: `${monthlyTotal > 0 ? ((spentThisMonth ?? 0) / monthlyTotal) * 100 : 0}%` }} />
                </div>
              </div>
              {credits <= 20 && (
                <p className="mt-3 rounded-xl bg-amber-50 px-3 py-2 text-[13px] text-amber-900">
                  {credits === 0 ? "Slut på credits – AI-assistenten är pausad tills du fyller på." : "Snart slut på credits."}
                </p>
              )}
              <Link
                href="/admin/installningar?flik=credits"
                className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-xl bg-admin px-4 text-[14px] font-semibold text-admin-contrast hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-admin"
              >
                <Coins aria-hidden="true" className="h-4 w-4" /> Fyll på credits
              </Link>
            </>
          )}
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Offertförfrågningar de senaste 30 dagarna" />
          {!perDay ? (
            <Skeleton className="h-56 w-full" />
          ) : hasChartData ? (
            <QuoteChart days={perDay} />
          ) : (
            <EmptyState icon={Inbox} title="Inga förfrågningar de senaste 30 dagarna" text="När någon skickar en offertförfrågan via hemsidan syns den här automatiskt." />
          )}
        </Card>

        <Card>
          <CardHeader title="Senaste förfrågningarna" />
          {!quotes ? (
            <SkeletonLines lines={5} />
          ) : quotes.length === 0 ? (
            <EmptyState icon={Inbox} title="Inga offertförfrågningar än" text="De dyker upp här automatiskt." />
          ) : (
            <ul className="-mx-2 space-y-1">
              {quotes.slice(0, 5).map((quote) => (
                <li key={quote.id}>
                  <Link
                    href={`/admin/offertforfragningar?id=${quote.id}`}
                    className="flex min-h-14 items-center gap-3 rounded-xl px-2 py-2 transition hover:bg-stone-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-admin"
                  >
                    <span className={`h-2 w-2 shrink-0 rounded-full ${quote.status === "new" ? "bg-admin" : "bg-transparent"}`} aria-hidden="true" />
                    <span className="min-w-0 flex-1">
                      <span className={`block truncate text-[14px] ${quote.status === "new" ? "font-semibold text-admin-ink" : "text-admin-ink"}`}>
                        {quote.name}
                        {quote.status === "new" && <span className="sr-only"> (ny)</span>}
                      </span>
                      <span className="block truncate text-[13px] text-admin-muted">{quote.work_type || "Offertförfrågan"}</span>
                    </span>
                    <span className="shrink-0 text-[12px] text-admin-muted">{formatRelative(quote.created_at)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </>
  );
}
