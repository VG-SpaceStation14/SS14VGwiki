import { sectionMeta } from "@/content/navigation";

export function PageHero({ page }) {
  const meta = sectionMeta[page.navKey] ?? sectionMeta.home;

  return (
    <div
      className={`relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br ${meta.tone} px-6 py-8 shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_24px_48px_rgba(6,10,20,0.38)] sm:px-8`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_30%),linear-gradient(135deg,rgba(255,255,255,0.02),transparent_55%)]" />
      <div className="pointer-events-none absolute -right-10 top-0 h-40 w-40 rounded-full bg-white/5 blur-3xl" />
      <div className="relative z-10 flex min-w-0 items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.1),rgba(255,255,255,0.03))] text-xl text-ember shadow-[0_12px_30px_rgba(255,138,61,0.14)]">
          <i className={page.iconClass || meta.iconClass} aria-hidden="true" />
        </div>
        <div className="min-w-0 space-y-2">
          <p className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-display text-xs uppercase tracking-[0.3em] text-gold/80">
            {meta.label}
          </p>
          <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">
            {page.heading}
          </h1>
          {page.excerpt ? (
            <p className="max-w-3xl text-sm leading-7 text-steel sm:text-base">
              {page.excerpt}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
