"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { isConnected, supabaseAnonKey, supabaseUrl } from "@/lib/connection";

// Loaded only when there is newer content to draw, so visitors to an up-to-date site download nothing extra.
const LiveView = dynamic(() => import("./LiveView").then((module) => module.LiveView), { ssr: false });

async function publishedSnapshot(select: string): Promise<{ version: number; data?: unknown } | null> {
  const response = await fetch(`${supabaseUrl}/rest/v1/site_snapshot?select=${select}&id=eq.1`, {
    headers: { apikey: supabaseAnonKey, Authorization: `Bearer ${supabaseAnonKey}` },
    cache: "no-store",
  });
  if (!response.ok) return null;
  const rows = (await response.json()) as { version: number; data?: unknown }[];
  return rows[0] ?? null;
}

/**
 * Shows what the admin has published straight away. The pages are built ahead of time from the version published then;
 * when Supabase has a newer one, the browser draws the page from it with the same components, until the next build
 * catches up. Search engines and visitors without JavaScript keep the built page.
 */
export function LiveSite({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [fresh, setFresh] = useState<unknown>(null);

  useEffect(() => {
    if (!isConnected) return;
    let cancelled = false;
    (async () => {
      try {
        const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
        const [built, published] = await Promise.all([
          fetch(`${base}/site-version.json`, { cache: "no-store" }).then((response) =>
            response.ok ? (response.json() as Promise<{ version: number }>) : null,
          ),
          publishedSnapshot("version"),
        ]);
        if (!built || !published || published.version <= built.version) return;
        const latest = await publishedSnapshot("version,data");
        if (!cancelled && latest?.data) setFresh(latest.data);
      } catch {
        // No connection: the built page stays.
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return fresh ? (
    <LiveView data={fresh} pathname={pathname}>
      {children}
    </LiveView>
  ) : (
    <>{children}</>
  );
}
