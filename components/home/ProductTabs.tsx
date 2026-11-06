"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import type { ProductTab } from "@/lib/types";

/** Folder-style tabs; panels are server-rendered and passed in. */
export function ProductTabs({ tabs, label, panels }: { tabs: ProductTab[]; label: string; panels: Record<ProductTab["id"], ReactNode> }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const base = useId();

  function onKey(e: KeyboardEvent<HTMLButtonElement>) {
    let next = active;
    if (e.key === "ArrowRight") next = (active + 1) % tabs.length;
    else if (e.key === "ArrowLeft") next = (active - 1 + tabs.length) % tabs.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = tabs.length - 1;
    else return;
    e.preventDefault();
    setActive(next);
    refs.current[next]?.focus();
  }

  return (
    <div>
      <div role="tablist" aria-label={label} className="relative z-10 -mb-[2px] flex gap-1.5 overflow-x-auto px-2 sm:gap-2 sm:px-6">
        {tabs.map((tab, i) => {
          const selected = i === active;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                refs.current[i] = el;
              }}
              role="tab"
              id={`${base}-tab-${tab.id}`}
              aria-selected={selected}
              aria-controls={`${base}-panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={onKey}
              className={`shrink-0 rounded-t-[14px] border-2 border-ink px-4 py-2.5 font-display text-[0.98rem] font-bold transition-colors sm:px-6 ${
                selected ? "border-b-paper bg-paper text-ink" : "bg-tint text-ink-soft hover:bg-accent-soft hover:text-ink"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div className="rounded-[var(--radius-blob)] border-2 border-ink bg-paper p-4 shadow-primary sm:p-8 lg:p-10">
        {tabs.map((tab, i) => (
          <div
            key={tab.id}
            role="tabpanel"
            id={`${base}-panel-${tab.id}`}
            aria-labelledby={`${base}-tab-${tab.id}`}
            hidden={i !== active}
            tabIndex={0}
            className="rounded-[12px]"
            style={i === active ? { animation: "av-pop-in .35s cubic-bezier(.34,1.56,.64,1)" } : undefined}
          >
            {panels[tab.id]}
          </div>
        ))}
      </div>
    </div>
  );
}
