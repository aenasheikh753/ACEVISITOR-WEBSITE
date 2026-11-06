"use client";

import Link from "next/link";
import { useId, useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import type { FormContent, FormField } from "@/lib/types";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const inputCls =
  "w-full rounded-[10px] border-2 border-ink bg-white px-3.5 text-[1rem] text-ink placeholder:text-ink-muted transition-shadow focus:shadow-hard-sm focus:outline-none focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-primary aria-[invalid=true]:border-[var(--pop)] aria-[invalid=true]:bg-pop-soft";

/**
 * UI-only form (no network): validates required fields and email,
 * then shows a success state. Field list comes from content.
 */
export function LeadForm({ form, title }: { form: FormContent; title?: string }) {
  const base = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");

  function validate(data: FormData) {
    const next: Record<string, string> = {};
    for (const f of form.fields) {
      const v = String(data.get(f.name) ?? "").trim();
      if (f.required && !v) next[f.name] = form.requiredError;
      else if (f.type === "email" && v && !EMAIL.test(v)) next[f.name] = form.emailError;
    }
    return next;
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (String(data.get("website") ?? "")) return; // honeypot
    const next = validate(data);
    setErrors(next);
    const first = Object.keys(next)[0];
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setState("sending");
    setTimeout(() => setState("done"), 700);
  }

  if (state === "done") {
    return (
      <div role="status" className="py-10 text-center">
        <svg viewBox="0 0 80 80" width="88" height="88" className="mx-auto" aria-hidden="true">
          <circle cx="40" cy="40" r="34" className="fill-accent" stroke="var(--ink)" strokeWidth={3} />
          <path d="m24 41 11 11 22-24" fill="none" stroke="var(--ink)" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <h2 className="mt-6 text-[1.9rem] font-extrabold">{form.successTitle}</h2>
        <p className="mx-auto mt-3 max-w-sm text-ink-soft">{form.successMessage}</p>
        <Button variant="secondary" className="mt-7" onClick={() => setState("idle")}>
          {form.resetLabel}
        </Button>
      </div>
    );
  }

  const renderField = (f: FormField) => {
    const id = `${base}-${f.name}`;
    const err = errors[f.name];
    const common = {
      id,
      name: f.name,
      required: f.required,
      "aria-invalid": err ? true : undefined,
      "aria-describedby": err ? `${id}-err` : undefined,
      onChange: () => err && setErrors((e) => ({ ...e, [f.name]: "" })),
    };
    return (
      <div key={f.name} className={f.half ? "sm:col-span-1" : "sm:col-span-2"}>
        <label htmlFor={id} className="mb-1.5 block font-display text-[0.95rem] font-bold">
          {f.label}
          {f.required && <span className="text-primary"> *</span>}
        </label>
        {f.type === "textarea" ? (
          <textarea {...common} rows={4} placeholder={f.placeholder} className={`${inputCls} min-h-28 py-3`} />
        ) : f.type === "select" ? (
          <div className="relative">
            <select {...common} defaultValue="" className={`${inputCls} h-12 appearance-none pr-10`}>
              <option value="" disabled>
                {f.placeholder}
              </option>
              {f.options?.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
            <svg viewBox="0 0 24 24" width="18" height="18" className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2" aria-hidden="true">
              <path d="m6 9 6 6 6-6" fill="none" stroke="var(--ink)" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        ) : (
          <input {...common} type={f.type} autoComplete={f.autoComplete} placeholder={f.placeholder} className={`${inputCls} h-12`} />
        )}
        {err && (
          <p id={`${id}-err`} className="mt-1.5 text-sm font-semibold text-[var(--ink)]">
            <span aria-hidden="true">↳ </span>
            {err}
          </p>
        )}
      </div>
    );
  };

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} aria-label={title} className="relative">
      {title && <h2 className="mb-6 text-[1.6rem] font-extrabold">{title}</h2>}
      <div className="grid gap-5 sm:grid-cols-2">{form.fields.map(renderField)}</div>
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor={`${base}-website`}>{form.honeypotLabel}</label>
        <input id={`${base}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <Button type="submit" size="lg" className="mt-7 w-full sm:w-auto" disabled={state === "sending"}>
        {state === "sending" ? form.sendingLabel : form.submitLabel}
      </Button>
      <p className="mt-5 text-sm text-ink-soft">
        {form.note}
        {form.noteLink && (
          <>
            {" "}
            <Link href={form.noteLink.href} className="font-semibold text-primary underline underline-offset-4">
              {form.noteLink.label}
            </Link>
          </>
        )}
      </p>
    </form>
  );
}
