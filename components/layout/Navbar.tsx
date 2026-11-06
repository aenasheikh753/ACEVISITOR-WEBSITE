"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import type { NavContent } from "@/lib/types";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function Squiggle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 8" preserveAspectRatio="none" className={`pointer-events-none absolute -bottom-1 left-2 right-2 h-2 w-[calc(100%-1rem)] ${className}`} aria-hidden="true">
      <path d="M2 5c7-4 11 3 18 0s10-3 18 0 12 2 20-1" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

export function Navbar({ content }: { content: NavContent }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Close the mobile menu whenever the route changes.
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b-2 border-ink bg-paper">
      <a href="#main" className="sr-only z-[70] rounded-[10px] bg-ink px-4 py-2 font-bold text-paper focus:not-sr-only focus:absolute focus:left-4 focus:top-3">
        {content.skipLink}
      </a>
      <div className="mx-auto grid h-[var(--nav-h)] max-w-[1400px] grid-cols-[auto_1fr_auto] items-center gap-2 px-4 sm:px-6 xl:gap-4 xl:px-8">
        <Link href="/" aria-label={content.homeLabel} className="rounded-[10px]">
          <Logo brand={content.brand} className="[&_svg]:size-9 xl:[&_svg]:size-10" />
        </Link>

        <nav aria-label={content.navigationLabel} className="hidden justify-center lg:flex">
          <ul className="flex items-center xl:gap-1">
            {content.links.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`group relative inline-flex whitespace-nowrap px-1.5 py-2 font-display text-[0.9rem] font-semibold transition-colors xl:px-3 xl:text-[0.98rem] ${
                      active ? "text-primary" : "text-ink hover:text-primary"
                    }`}
                  >
                    {link.label}
                    <Squiggle
                      className={`origin-left transition-transform duration-300 ${
                        active ? "scale-x-100 text-accent" : "scale-x-0 text-pop group-hover:scale-x-100"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center justify-end gap-2 xl:gap-3">
          <Link
            href={content.login.href}
            aria-current={isActive(pathname, content.login.href) ? "page" : undefined}
            className="hidden whitespace-nowrap rounded-[10px] px-2 py-2 font-display text-[0.95rem] font-semibold text-ink underline-offset-4 hover:text-primary hover:underline sm:inline-flex xl:px-3 xl:text-base"
          >
            {content.login.label}
          </Link>
          <span className="hidden sm:block">
            <Button href={content.demo.href} size="sm">
              {content.demo.label}
            </Button>
          </span>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? content.menuClose : content.menuOpen}
            className="btn-press grid size-11 place-items-center rounded-[10px] border-2 border-ink bg-accent shadow-hard-sm lg:hidden"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
              <g stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" className="text-ink">
                {open ? (
                  <path d="M6 6l12 12M18 6 6 18" />
                ) : (
                  <path d="M4 7c5-1 11 1 16 0M4 12h16M4 17c5 1 11-1 16 0" fill="none" />
                )}
              </g>
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" className="fixed inset-x-0 bottom-0 top-[calc(var(--nav-h)+2px)] z-40 overflow-y-auto bg-paper lg:hidden">
          <nav aria-label={content.navigationLabel} className="mx-auto max-w-[640px] px-5 py-8 sm:px-8">
            <ol className="divide-y-2 divide-dashed divide-paper-line">
              {content.links.map((link, i) => {
                const active = isActive(pathname, link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={`flex items-baseline gap-4 py-3.5 font-display text-[1.9rem] font-bold tracking-[-0.03em] ${
                        active ? "text-primary" : "text-ink hover:text-primary"
                      }`}
                    >
                      <span className="w-8 text-base font-semibold text-pop">{String(i + 1).padStart(2, "0")}</span>
                      {link.label}
                      {active && <span className="ml-auto size-3 rounded-full border-2 border-ink bg-accent" aria-hidden="true" />}
                    </Link>
                  </li>
                );
              })}
            </ol>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <Button href={content.login.href} variant="secondary" size="lg">
                {content.login.label}
              </Button>
              <Button href={content.demo.href} size="lg">
                {content.demo.label}
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
