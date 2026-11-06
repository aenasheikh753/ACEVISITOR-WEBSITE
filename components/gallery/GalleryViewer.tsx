"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { PracticeScene, SecurityArt, SitesArt } from "@/components/art/Scenes";
import type { GalleryArt as ArtId, GalleryContent } from "@/lib/types";

function Art({ art, label }: { art: ArtId; label: string }) {
  switch (art) {
    case "lobby":
      return <PracticeScene variant={0} label={label} />;
    case "badges":
      return <PracticeScene variant={1} label={label} />;
    case "approvals":
      return <PracticeScene variant={2} label={label} />;
    case "sites":
      return <SitesArt label={label} />;
    case "console":
      return <SecurityArt label={label} />;
  }
}

/** Framed stage so every illustration sits at the same 4:3 ratio, crisp at any size. */
function Stage({ art, label, rounded = "rounded-[22px]" }: { art: ArtId; label: string; rounded?: string }) {
  const bleed = art === "lobby" || art === "badges" || art === "approvals";
  return (
    <div className={`grid aspect-[4/3] w-full place-items-center overflow-hidden bg-paper ${rounded} ${bleed ? "" : "p-[6%]"}`}>
      <div className={bleed ? "w-full" : "w-[86%]"}>
        <Art art={art} label={label} />
      </div>
    </div>
  );
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <path d={dir === "left" ? "M15 5 8 12l7 7" : "m9 5 7 7-7 7"} fill="none" stroke="currentColor" strokeWidth={2.8} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const ctrl =
  "btn-press grid size-11 place-items-center rounded-[10px] border-2 border-ink bg-paper text-ink shadow-hard-sm hover:bg-accent";

export function GalleryViewer({ c }: { c: GalleryContent }) {
  const items = c.items;
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const enlargeRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const current = items[index];

  const go = (delta: number) => setIndex((i) => (i + delta + items.length) % items.length);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        enlargeRef.current?.focus();
      } else if (e.key === "ArrowRight") setIndex((i) => (i + 1) % items.length);
      else if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, items.length]);

  function onStageKey(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "ArrowRight") go(1);
    if (e.key === "ArrowLeft") go(-1);
  }

  const counter = `${index + 1} ${c.counterSeparator} ${items.length}`;

  return (
    <div>
      <div className="grid items-center gap-8 lg:grid-cols-[280px_1fr] lg:gap-12">
        {/* List */}
        <nav aria-label={c.listLabel}>
          <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
            {items.map((item, i) => {
              const active = i === index;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-current={active ? "true" : undefined}
                    className={`flex w-full items-center gap-4 rounded-[12px] border-2 px-4 py-3 text-left font-display font-bold transition-all ${
                      active ? "border-ink bg-paper shadow-hard" : "border-transparent text-ink-soft hover:border-ink/30 hover:bg-paper/60 hover:text-ink"
                    }`}
                  >
                    <span className={`text-sm ${active ? "text-primary" : "text-ink-muted"}`}>{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-[1.05rem]">{item.title}</span>
                  </button>
                </li>
              );
            })}
          </ol>
        </nav>

        {/* Big image */}
        <figure className="mx-auto w-full max-w-[820px]">
          <div className="relative rounded-[28px] border-2 border-ink bg-paper p-2 shadow-primary" tabIndex={0} onKeyDown={onStageKey} aria-roledescription="carousel">
            <div key={current.id} style={{ animation: "av-pop-in .35s cubic-bezier(.34,1.56,.64,1)" }}>
              <Stage art={current.art} label={current.alt} />
            </div>
            <button
              ref={enlargeRef}
              type="button"
              onClick={() => setOpen(true)}
              aria-label={`${c.enlargeLabel} ${current.title}`}
              className={`${ctrl} absolute right-4 top-4`}
            >
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                <path d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          <figcaption className="mt-6 flex flex-wrap items-center justify-between gap-5">
            <div aria-live="polite">
              <p className="font-display text-[1.5rem] font-extrabold">{current.title}</p>
              <p className="mt-1 text-ink-soft">{current.description}</p>
            </div>
            <div className="flex items-center gap-3">
              <button type="button" onClick={() => go(-1)} aria-label={c.previousLabel} className={ctrl}>
                <Chevron dir="left" />
              </button>
              <span className="min-w-14 text-center font-display font-bold tabular-nums">{counter}</span>
              <button type="button" onClick={() => go(1)} aria-label={c.nextLabel} className={ctrl}>
                <Chevron dir="right" />
              </button>
            </div>
          </figcaption>
        </figure>
      </div>

      {/* Thumbnails */}
      <ul className="mt-10 grid grid-cols-3 gap-3 sm:grid-cols-5 sm:gap-4">
        {items.map((item, i) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`${c.viewLabel} ${item.title}`}
              aria-current={i === index ? "true" : undefined}
              className={`block w-full overflow-hidden rounded-[14px] border-2 transition-all ${
                i === index ? "-translate-y-1 border-ink shadow-hard" : "border-ink/25 opacity-75 hover:border-ink hover:opacity-100"
              }`}
            >
              <div aria-hidden="true">
                <Stage art={item.art} label="" rounded="rounded-none" />
              </div>
            </button>
          </li>
        ))}
      </ul>

      {/* Lightbox */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.title}
          className="fixed inset-0 z-[80] flex flex-col items-center justify-center gap-5 bg-ink/90 p-4 sm:p-8"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setOpen(false);
              enlargeRef.current?.focus();
            }
          }}
        >
          <div className="w-full max-w-[min(1100px,calc((100dvh-10rem)*4/3))] rounded-[24px] border-2 border-ink bg-paper p-2" style={{ animation: "av-pop-in .3s ease-out" }}>
            <Stage art={current.art} label={current.alt} />
          </div>
          <div className="flex w-full max-w-[1100px] flex-wrap items-center justify-between gap-4 text-paper">
            <p className="font-display text-xl font-bold">{current.title}</p>
            <div className="flex items-center gap-3">
              <button type="button" onClick={() => go(-1)} aria-label={c.previousLabel} className={ctrl}>
                <Chevron dir="left" />
              </button>
              <span className="min-w-14 text-center font-display font-bold tabular-nums">{counter}</span>
              <button type="button" onClick={() => go(1)} aria-label={c.nextLabel} className={ctrl}>
                <Chevron dir="right" />
              </button>
              <button
                ref={closeRef}
                type="button"
                onClick={() => {
                  setOpen(false);
                  enlargeRef.current?.focus();
                }}
                aria-label={c.closeLabel}
                className={`${ctrl} ml-2 bg-accent`}
              >
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                  <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth={2.8} strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
