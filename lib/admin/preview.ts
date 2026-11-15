// What the editor tells the preview window: the draft, which page (or service) to show and which section to bring
// into view, and in the visual editor which element is chosen. Same-origin postMessage; the preview ignores anything
// else. In the visual editor the preview answers with the element clicked and with text typed straight into the page.
import type { SiteData } from "@/lib/site/schema.ts";

export type PreviewTarget =
  | { kind: "page"; pageId: string; sectionId?: string }
  | { kind: "service"; serviceId: string }
  | { kind: "chrome"; part: "navigation" | "footer" | "form" }
  | { kind: "notFound" }
  | { kind: "maintenance" };

export interface PreviewMessage {
  type: "markmontage-preview";
  draft: SiteData;
  target: PreviewTarget;
  /** Set in the visual editor: clicks choose elements instead of following links, and the chosen one is outlined. */
  edit?: { selected: string | null };
}

export const PREVIEW_READY = "markmontage-preview-ready";

/** From the preview: the element at this address was clicked. */
export interface PreviewSelect {
  type: "markmontage-preview-select";
  k: string;
}

/** From the preview: the text typed straight into the element at this address. */
export interface PreviewText {
  type: "markmontage-preview-text";
  k: string;
  value: string;
}

export type PreviewReply = PreviewSelect | PreviewText;
