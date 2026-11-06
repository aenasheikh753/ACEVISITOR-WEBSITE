import { Kiko, Person } from "@/components/art/Characters";
import type { ApprovalContent, ConsoleContent, ConsoleRow, KioskContent } from "@/lib/types";

const toneChip: Record<ConsoleRow["tone"], string> = {
  onsite: "bg-success text-paper",
  pre: "bg-accent-soft text-ink",
  out: "bg-tint text-ink-soft",
};

const statTint = ["bg-tint", "bg-accent-soft", "bg-pop-soft"];

export function ConsoleScreen({ c }: { c: ConsoleContent }) {
  return (
    <div className="overflow-hidden rounded-[16px] border-2 border-ink bg-white">
      <div className="flex items-center gap-2 border-b-2 border-ink bg-ink px-4 py-2.5 text-paper">
        <span className="size-3 rounded-full bg-pop" aria-hidden="true" />
        <span className="size-3 rounded-full bg-accent" aria-hidden="true" />
        <span className="size-3 rounded-full bg-success" aria-hidden="true" />
        <p className="ml-2 truncate text-sm font-semibold">{c.title}</p>
      </div>
      <div className="p-4 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="rounded-[var(--radius-tag)] border-2 border-ink bg-accent px-2 py-0.5 font-display text-xs font-extrabold uppercase tracking-wider">
              {c.dayLabel}
            </span>
            <h3 className="text-xl font-bold">{c.heading}</h3>
          </div>
          <div className="flex h-10 w-full items-center gap-2 rounded-[10px] border-2 border-ink bg-paper px-3 text-sm text-ink-muted sm:w-60">
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
              <circle cx="10.5" cy="10.5" r="6" fill="none" stroke="var(--ink)" strokeWidth={2.4} />
              <path d="m15 15 5 5" stroke="var(--ink)" strokeWidth={2.4} strokeLinecap="round" />
            </svg>
            {c.searchLabel}
          </div>
        </div>
        <dl className="mt-5 grid grid-cols-3 gap-2 sm:gap-4">
          {c.stats.map((s, i) => (
            <div key={s.label} className={`min-w-0 rounded-[12px] border-2 border-ink p-2.5 sm:p-4 ${statTint[i % 3]}`}>
              <dd className="font-display text-[1.7rem] font-extrabold leading-none sm:text-4xl">{s.value}</dd>
              <dt className="mt-1.5 break-words text-[0.7rem] font-semibold leading-tight text-ink-soft sm:text-sm">{s.label}</dt>
            </div>
          ))}
        </dl>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[480px] text-left text-[0.95rem]">
            <thead>
              <tr className="border-b-2 border-ink font-display text-sm">
                <th scope="col" className="py-2 pr-3 font-bold">{c.columns.visitor}</th>
                <th scope="col" className="py-2 pr-3 font-bold">{c.columns.host}</th>
                <th scope="col" className="py-2 pr-3 font-bold">{c.columns.status}</th>
                <th scope="col" className="py-2 text-right font-bold">{c.columns.time}</th>
              </tr>
            </thead>
            <tbody>
              {c.rows.map((r) => (
                <tr key={r.visitor} className="border-b border-dashed border-paper-line last:border-0">
                  <td className="py-3 pr-3 font-semibold">{r.visitor}</td>
                  <td className="py-3 pr-3 text-ink-soft">{r.host}</td>
                  <td className="py-3 pr-3">
                    <span className={`inline-block rounded-[var(--radius-pill)] border-2 border-ink px-2.5 py-0.5 text-xs font-bold ${toneChip[r.tone]}`}>{r.status}</span>
                  </td>
                  <td className="py-3 text-right font-display font-bold tabular-nums">{r.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function KioskScreen({ k, withKiko = true }: { k: KioskContent; withKiko?: boolean }) {
  return (
    <div className={`grid items-center gap-8 ${withKiko ? "md:grid-cols-[1fr_200px]" : ""}`}>
      <div className="mx-auto w-full max-w-[560px]">
        <div className="rounded-[26px] border-2 border-ink bg-ink p-3 shadow-hard">
          <div className="rounded-[16px] bg-paper p-5 sm:p-7">
            <div className="flex items-center justify-between text-sm font-semibold text-ink-soft">
              <span>{k.site}</span>
              <span className="rounded-[var(--radius-pill)] bg-tint px-2.5 py-0.5">{k.device}</span>
            </div>
            <h3 className="mt-5 text-[1.9rem] font-extrabold">{k.greeting}</h3>
            <p className="mt-1 text-ink-soft">{k.step}</p>
            <div className="mt-3 flex gap-1.5" aria-hidden="true">
              {[0, 1, 2, 3].map((i) => (
                <span key={i} className={`h-2 flex-1 rounded-full border border-ink ${i < 2 ? "bg-primary" : "bg-tint"}`} />
              ))}
            </div>
            <dl className="mt-5 grid gap-3 sm:grid-cols-2">
              {k.fields.map((f) => (
                <div key={f.label} className="rounded-[10px] border-2 border-ink bg-white px-3 py-2">
                  <dt className="text-[0.72rem] font-bold uppercase tracking-wider text-ink-muted">{f.label}</dt>
                  <dd className="font-semibold">{f.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-ink-soft">{k.note}</p>
              <span className="inline-flex h-11 items-center rounded-[10px] border-2 border-ink bg-primary px-5 font-display font-bold text-paper shadow-hard-sm">
                {k.action}
              </span>
            </div>
          </div>
        </div>
        <div className="mx-auto h-10 w-6 border-x-2 border-ink bg-tint" aria-hidden="true" />
        <div className="mx-auto h-3 w-40 rounded-t-[8px] border-2 border-ink bg-ink" aria-hidden="true" />
      </div>
      {withKiko && (
        <svg viewBox="-90 -270 200 280" className="mx-auto hidden w-[200px] md:block" aria-hidden="true">
          <Kiko scale={0.95} />
        </svg>
      )}
    </div>
  );
}

export function ApprovalScreen({ a }: { a: ApprovalContent }) {
  return (
    <div className="grid items-center gap-8 md:grid-cols-[220px_1fr]">
      <svg viewBox="-80 -180 160 190" className="mx-auto hidden w-[220px] md:block" aria-hidden="true">
        <Person pose="phone" hair="short" shirt="fill-pop" skin="fill-skin-mid" prop="lanyard" />
      </svg>
      <div className="mx-auto w-full max-w-[340px] rounded-[38px] border-2 border-ink bg-ink p-3 shadow-hard">
        <div className="rounded-[28px] bg-tint px-4 pb-6 pt-8">
          <div className="mx-auto mb-5 h-1.5 w-16 rounded-full bg-ink/30" aria-hidden="true" />
          <div className="rounded-[18px] border-2 border-ink bg-paper p-4">
            <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-primary">
              <span className="ic-pulse size-2.5 rounded-full bg-pop" aria-hidden="true" />
              {a.label}
            </p>
            <h3 className="mt-2 text-2xl font-extrabold">{a.name}</h3>
            <p className="font-semibold text-ink-soft">{a.company}</p>
            <ul className="mt-3 space-y-1 text-sm">
              <li>{a.location}</li>
              <li>{a.timing}</li>
              <li className="font-semibold text-success">{a.checks}</li>
            </ul>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <span className="grid h-11 place-items-center rounded-[10px] border-2 border-ink bg-success font-display font-bold text-paper">{a.approve}</span>
              <span className="grid h-11 place-items-center rounded-[10px] border-2 border-ink bg-paper font-display font-bold">{a.decline}</span>
            </div>
          </div>
          <p className="mt-4 text-center text-sm font-semibold text-ink-soft">{a.host}</p>
        </div>
      </div>
    </div>
  );
}
