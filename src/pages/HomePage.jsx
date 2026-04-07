import { useEffect, useRef } from "react";
import { QuickDock } from "@/components/QuickDock";
import { RichContent } from "@/components/RichContent";
import { usePageContent } from "@/lib/usePageContent";

export function HomePage() {
  const { page, content, error, isLoading } = usePageContent("/");
  const containerRef = useRef(null);

  useEffect(() => {
    if (!content || !containerRef.current) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const counters = Array.from(containerRef.current.querySelectorAll(".metric-value[data-count]"));

    counters.forEach((counter) => {
      const target = Number.parseInt(counter.getAttribute("data-count") || "0", 10);
      if (!Number.isFinite(target)) {
        return;
      }

      if (prefersReducedMotion) {
        counter.textContent = String(target);
        return;
      }

      const startTime = performance.now();
      const duration = 900;

      const tick = (now) => {
        const progress = Math.min(1, (now - startTime) / duration);
        const eased = 1 - (1 - progress) ** 3;
        counter.textContent = String(Math.round(target * eased));

        if (progress < 1) {
          requestAnimationFrame(tick);
        }
      };

      requestAnimationFrame(tick);
    });
  }, [content]);

  if (!page) {
    return null;
  }

  return (
    <>
      <section ref={containerRef} className="relative min-w-0">
        {error ? (
          <div className="mb-5 rounded-3xl border border-rose-400/20 bg-rose-400/10 px-5 py-4 text-sm text-rose-200">
            Главная страница не загрузилась. Проверь генерацию `npm run sync:content`.
          </div>
        ) : null}
        {isLoading ? (
          <div className="grid gap-4">
            <div className="h-6 w-36 animate-pulse rounded-full bg-white/10" />
            <div className="h-16 animate-pulse rounded-[1.5rem] bg-white/5" />
            <div className="h-56 animate-pulse rounded-[2rem] bg-white/5" />
          </div>
        ) : (
          <RichContent className="content-home" html={content?.contentHtml ?? ""} />
        )}
      </section>
      <QuickDock items={content?.quickDock ?? []} />
    </>
  );
}
