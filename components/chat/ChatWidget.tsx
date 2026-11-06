"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Icon } from "@/components/icons/Icon";
import type { ChatContent } from "@/lib/types";

interface Message {
  id: number;
  from: "ace" | "you";
  text: string;
}

function KikoFace({ size = 40 }: { size?: number }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} aria-hidden="true" focusable="false">
      <path d="M24 4v5" stroke="var(--ink)" strokeWidth={2.4} strokeLinecap="round" />
      <circle cx="24" cy="4.5" r="3" className="fill-accent stroke-ink" strokeWidth={2} />
      <rect x="4" y="9" width="40" height="32" rx="11" className="fill-ink" />
      <rect x="8.5" y="13.5" width="31" height="23" rx="8" className="fill-tint" />
      <g className="art-blink">
        <rect x="15" y="18" width="5" height="8" rx="2.5" className="fill-ink" />
        <rect x="28" y="18" width="5" height="8" rx="2.5" className="fill-ink" />
      </g>
      <path d="M19.5 29.5c2.6 2.4 6.4 2.4 9 0" fill="none" stroke="var(--ink)" strokeWidth={2.2} strokeLinecap="round" />
    </svg>
  );
}

export function ChatWidget({ content }: { content: ChatContent }) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ id: 0, from: "ace", text: content.greeting }]);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const panelId = useId();
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        launcherRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  function send(text: string) {
    const value = text.trim();
    if (!value || typing) return;
    setMessages((m) => [...m, { id: Date.now(), from: "you", text: value }]);
    setDraft("");
    setTyping(true);
    timer.current = setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { id: Date.now() + 1, from: "ace", text: content.placeholderReply }]);
    }, 1100);
  }

  function close() {
    setOpen(false);
    launcherRef.current?.focus();
  }

  return (
    <div className="fixed bottom-4 right-4 z-[55] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {open && (
        <div
          id={panelId}
          role="dialog"
          aria-modal="false"
          aria-labelledby={titleId}
          className="flex h-[min(560px,calc(100dvh-7rem))] w-[min(380px,calc(100vw-2rem))] origin-bottom-right flex-col overflow-hidden rounded-[var(--radius-card)] border-2 border-ink bg-paper shadow-primary"
          style={{ animation: "av-pop-in .28s cubic-bezier(.34,1.56,.64,1)" }}
        >
          <div className="flex items-center gap-3 border-b-2 border-ink bg-accent px-4 py-3">
            <KikoFace size={42} />
            <div className="min-w-0 flex-1">
              <p id={titleId} className="truncate font-display font-bold leading-tight">
                {content.title}
              </p>
              <p className="truncate text-sm text-ink-soft">{content.subtitle}</p>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label={content.closeLabel}
              className="btn-press grid size-9 shrink-0 place-items-center rounded-[10px] border-2 border-ink bg-paper"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <path d="M6 6l12 12M18 6 6 18" stroke="var(--ink)" strokeWidth={2.8} strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4" aria-live="polite">
            {messages.map((m) => (
              <div key={m.id} className={`flex items-end gap-2 ${m.from === "you" ? "justify-end" : ""}`}>
                {m.from === "ace" && <KikoFace size={28} />}
                <p
                  className={`max-w-[82%] rounded-[14px] border-2 border-ink px-3.5 py-2.5 text-[0.95rem] leading-snug ${
                    m.from === "ace" ? "rounded-bl-[4px] bg-tint" : "rounded-br-[4px] bg-primary text-paper"
                  }`}
                >
                  {m.text}
                </p>
              </div>
            ))}
            {typing && (
              <div className="flex items-end gap-2">
                <KikoFace size={28} />
                <p className="flex items-center gap-1 rounded-[14px] rounded-bl-[4px] border-2 border-ink bg-tint px-3.5 py-3">
                  <span className="sr-only">{content.typingLabel}</span>
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="ic-pulse size-2 rounded-full bg-ink" style={{ animationDelay: `${i * 0.2}s` }} aria-hidden="true" />
                  ))}
                </p>
              </div>
            )}
          </div>

          {messages.length === 1 && (
            <div className="flex flex-wrap gap-2 px-4 pb-3">
              {content.suggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => send(s)}
                  className="btn-press rounded-[var(--radius-pill)] border-2 border-ink bg-paper px-3 py-1 text-sm font-semibold hover:bg-accent-soft"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <form
            className="flex items-center gap-2 border-t-2 border-ink bg-paper p-3"
            onSubmit={(e) => {
              e.preventDefault();
              send(draft);
            }}
          >
            <label htmlFor={`${panelId}-input`} className="sr-only">
              {content.inputLabel}
            </label>
            <input
              id={`${panelId}-input`}
              ref={inputRef}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder={content.inputPlaceholder}
              autoComplete="off"
              className="h-11 min-w-0 flex-1 rounded-[10px] border-2 border-ink bg-white px-3 text-[0.95rem] placeholder:text-ink-muted focus:outline-none focus-visible:outline-3 focus-visible:outline-primary"
            />
            <button
              type="submit"
              aria-label={content.sendLabel}
              disabled={!draft.trim() || typing}
              className="btn-press grid size-11 shrink-0 place-items-center rounded-[10px] border-2 border-ink bg-primary text-paper shadow-hard-sm disabled:opacity-50"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                <path d="M4 12 20 5l-5 15-3-6Z" fill="none" stroke="currentColor" strokeWidth={2.3} strokeLinejoin="round" />
              </svg>
            </button>
          </form>
        </div>
      )}

      <button
        ref={launcherRef}
        type="button"
        onClick={() => (open ? close() : setOpen(true))}
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        aria-label={open ? content.closeLabel : content.openLabel}
        className="btn-press icon-host grid size-16 place-items-center rounded-full border-2 border-ink bg-accent shadow-hard"
      >
        {open ? (
          <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" stroke="var(--ink)" strokeWidth={2.8} strokeLinecap="round" />
          </svg>
        ) : (
          <Icon name="chat" size={40} tint="none" />
        )}
      </button>
    </div>
  );
}
