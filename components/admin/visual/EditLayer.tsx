"use client";

import { useEffect, useRef, useState } from "react";
import type { PreviewReply } from "@/lib/admin/preview";

/** The element under a point that has a place in the content: overlays without one (a dark filter) are looked past. */
function elementAt(x: number, y: number): HTMLElement | null {
  for (const element of document.elementsFromPoint(x, y)) {
    if (element instanceof HTMLElement && element.dataset.k && !element.closest("[data-edit-ui]")) return element;
  }
  return null;
}

/** Text that can be typed straight into the page: an element holding nothing but its one piece of text. */
function typable(element: HTMLElement): Text | null {
  const only = element.childNodes.length === 1 ? element.firstChild : null;
  return only && only.nodeType === Node.TEXT_NODE ? (only as Text) : null;
}

function find(k: string): HTMLElement | null {
  const all = Array.from(document.querySelectorAll<HTMLElement>(`[data-k="${CSS.escape(k)}"]`));
  return all.find((element) => element.getClientRects().length > 0) ?? all[0] ?? null;
}

interface Box {
  top: number;
  left: number;
  width: number;
  height: number;
}

const boxOf = (element: HTMLElement | null): Box | null => {
  if (!element || !element.isConnected) return null;
  const rect = element.getBoundingClientRect();
  return rect.width === 0 && rect.height === 0 ? null : { top: rect.top, left: rect.left, width: rect.width, height: rect.height };
};

/**
 * Inside the preview, in the visual editor: everything with a place in the content is outlined on hover and chosen on
 * click (links and buttons do nothing else), and plain text can be typed into straight away. Tells the editor what was
 * chosen and what was typed; `onTyping` holds back new drafts while a text is being typed, so the page under the caret
 * is not redrawn.
 */
export function EditLayer({ selected, onTyping }: { selected: string | null; onTyping: (typing: boolean) => void }) {
  const [hoverBox, setHoverBox] = useState<Box | null>(null);
  const [selectedBox, setSelectedBox] = useState<Box | null>(null);
  const [typing, setTyping] = useState(false);
  const hovered = useRef<HTMLElement | null>(null);
  const chosen = useRef<HTMLElement | null>(null);
  const editing = useRef<{ element: HTMLElement; node: Text; k: string } | null>(null);
  const selectedRef = useRef(selected);
  selectedRef.current = selected;

  useEffect(() => {
    const post = (message: PreviewReply) => window.parent?.postMessage(message, window.location.origin);

    function finishTyping() {
      const current = editing.current;
      if (!current) return;
      editing.current = null;
      const { element, node, k } = current;
      const value = (element.textContent ?? "").replace(/\s*\n\s*/g, " ");
      element.removeAttribute("contenteditable");
      // Back to the one text node the page drew, holding what was typed, so the next redraw finds what it expects.
      while (element.firstChild) element.removeChild(element.firstChild);
      node.data = value;
      element.appendChild(node);
      post({ type: "markmontage-preview-text", k, value });
      setTyping(false);
      onTyping(false);
    }

    function startTyping(element: HTMLElement, x: number, y: number) {
      const node = typable(element);
      const k = element.dataset.k;
      if (!node || !k) return;
      editing.current = { element, node, k };
      element.setAttribute("contenteditable", "plaintext-only");
      if (element.contentEditable !== "plaintext-only") element.setAttribute("contenteditable", "true");
      element.focus({ preventScroll: true });
      // The caret where the text was clicked.
      const range =
        document.caretRangeFromPoint?.(x, y) ??
        (() => {
          const position = (
            document as Document & { caretPositionFromPoint?: (x: number, y: number) => { offsetNode: Node; offset: number } | null }
          ).caretPositionFromPoint?.(x, y);
          if (!position) return null;
          const made = document.createRange();
          made.setStart(position.offsetNode, position.offset);
          return made;
        })();
      if (range && element.contains(range.startContainer)) {
        const selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);
      }
      setTyping(true);
      onTyping(true);
    }

    function onInput(event: Event) {
      const current = editing.current;
      if (!current || event.target !== current.element) return;
      post({ type: "markmontage-preview-text", k: current.k, value: (current.element.textContent ?? "").replace(/\s*\n\s*/g, " ") });
    }

    function onKeyDown(event: KeyboardEvent) {
      if (!editing.current) return;
      if (event.key === "Enter" || event.key === "Escape") {
        event.preventDefault();
        editing.current.element.blur();
      }
    }

    function onFocusOut(event: FocusEvent) {
      if (editing.current && event.target === editing.current.element) finishTyping();
    }

    function onClick(event: MouseEvent) {
      // Clicks inside the text being typed move the caret, as usual.
      if (editing.current && editing.current.element.contains(event.target as Node)) return;
      event.preventDefault();
      event.stopPropagation();
      if (editing.current) editing.current.element.blur();
      const element = elementAt(event.clientX, event.clientY);
      if (!element?.dataset.k) return;
      chosen.current = element;
      setSelectedBox(boxOf(element));
      post({ type: "markmontage-preview-select", k: element.dataset.k });
      startTyping(element, event.clientX, event.clientY);
    }

    // Nothing else reacts to a press in the editor: no menus opening, no forms sending.
    function swallow(event: Event) {
      if (editing.current && editing.current.element.contains(event.target as Node)) return;
      event.preventDefault();
      event.stopPropagation();
    }

    function onMove(event: PointerEvent) {
      if (event.pointerType !== "mouse") return;
      const element = elementAt(event.clientX, event.clientY);
      hovered.current = element;
      setHoverBox(element && element !== chosen.current ? boxOf(element) : null);
    }

    function onLeave() {
      hovered.current = null;
      setHoverBox(null);
    }

    document.addEventListener("click", onClick, true);
    document.addEventListener("submit", swallow, true);
    document.addEventListener("auxclick", swallow, true);
    document.addEventListener("input", onInput, true);
    document.addEventListener("keydown", onKeyDown, true);
    document.addEventListener("focusout", onFocusOut, true);
    document.addEventListener("pointermove", onMove, true);
    document.documentElement.addEventListener("pointerleave", onLeave);
    document.documentElement.dataset.editing = "";

    // The outlines follow their elements while the page scrolls, moves or is redrawn.
    let frame = 0;
    const follow = () => {
      if (chosen.current && (!chosen.current.isConnected || chosen.current.dataset.k !== selectedRef.current)) {
        chosen.current = selectedRef.current ? find(selectedRef.current) : null;
      }
      if (!chosen.current && selectedRef.current) chosen.current = find(selectedRef.current);
      setSelectedBox((previous) => {
        const next = selectedRef.current ? boxOf(chosen.current) : null;
        return previous &&
          next &&
          previous.top === next.top &&
          previous.left === next.left &&
          previous.width === next.width &&
          previous.height === next.height
          ? previous
          : next;
      });
      if (hovered.current) {
        const next = hovered.current !== chosen.current ? boxOf(hovered.current) : null;
        setHoverBox((previous) =>
          previous &&
          next &&
          previous.top === next.top &&
          previous.left === next.left &&
          previous.width === next.width &&
          previous.height === next.height
            ? previous
            : next,
        );
      }
      frame = requestAnimationFrame(follow);
    };
    frame = requestAnimationFrame(follow);

    return () => {
      cancelAnimationFrame(frame);
      finishTyping();
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("submit", swallow, true);
      document.removeEventListener("auxclick", swallow, true);
      document.removeEventListener("input", onInput, true);
      document.removeEventListener("keydown", onKeyDown, true);
      document.removeEventListener("focusout", onFocusOut, true);
      document.removeEventListener("pointermove", onMove, true);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      delete document.documentElement.dataset.editing;
    };
  }, [onTyping]);

  // Chosen from the editor's side (or redrawn): outline the element at that address and bring it into view.
  useEffect(() => {
    if (!selected) {
      chosen.current = null;
      return;
    }
    if (chosen.current?.dataset.k === selected && chosen.current.isConnected) return;
    const element = find(selected);
    chosen.current = element;
    const box = boxOf(element);
    if (element && box && (box.top < 0 || box.top + box.height > window.innerHeight)) element.scrollIntoView({ block: "center", behavior: "smooth" });
  }, [selected]);

  return (
    <div data-edit-ui aria-hidden="true">
      {/* The page's own styles while editing: every element shows it can be clicked, closed answers stand open. */}
      <style>{`
        html[data-editing] [data-k]{cursor:pointer}
        html[data-editing] [contenteditable]{cursor:text;outline:none}
        html[data-editing] [role=region]{grid-template-rows:1fr!important;opacity:1!important}
      `}</style>
      {hoverBox && (
        <div
          className="pointer-events-none fixed z-[2147483646] rounded-[3px] outline-dashed outline-2 outline-[#2563eb]"
          style={{ top: hoverBox.top, left: hoverBox.left, width: hoverBox.width, height: hoverBox.height }}
        />
      )}
      {selectedBox && (
        <div
          className="pointer-events-none fixed z-[2147483647] rounded-[3px] outline outline-2 outline-offset-2 outline-[#2563eb]"
          style={{ top: selectedBox.top, left: selectedBox.left, width: selectedBox.width, height: selectedBox.height }}
        >
          {typing && (
            <span className="absolute -top-7 left-0 whitespace-nowrap rounded-md bg-[#2563eb] px-2 py-0.5 font-sans text-[12px] font-semibold text-white">
              Skriv – Enter när du är klar
            </span>
          )}
        </div>
      )}
    </div>
  );
}
