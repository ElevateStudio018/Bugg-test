import Link from "next/link";
import type { ReactNode } from "react";
import { QuoteTrigger } from "./QuoteTrigger";
import { ApplicationTrigger } from "./ApplicationForm";
import { isApplicationHref, isExternalHref, isQuoteHref } from "@/lib/site/links.ts";

/**
 * A link from the content: the quote form and the application form open in their windows, pages on the site go through Next's Link (which adds the
 * base path), parts of the current page and mail/phone addresses are plain links, and other sites open in a new tab.
 * `k` is the link's place in the content (lib/site/edit.ts).
 */
export function SiteLink({ href, className, children, k }: { href: string; className?: string; children: ReactNode; k?: string }) {
  if (isQuoteHref(href))
    return (
      <QuoteTrigger className={className ?? ""} k={k}>
        {children}
      </QuoteTrigger>
    );
  if (isApplicationHref(href))
    return (
      <ApplicationTrigger className={className ?? ""} k={k}>
        {children}
      </ApplicationTrigger>
    );
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className} data-k={k}>
        {children}
      </Link>
    );
  }
  if (isExternalHref(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className} data-k={k}>
        {children}
      </a>
    );
  }
  return (
    <a href={href} className={className} data-k={k}>
      {children}
    </a>
  );
}
