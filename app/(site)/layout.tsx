import { LiveSite } from "@/components/site/LiveSite";
import { SiteShell } from "@/components/site/SiteShell";
import { getSite } from "@/lib/site/data.ts";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <LiveSite>
      <SiteShell site={getSite()}>{children}</SiteShell>
    </LiveSite>
  );
}
