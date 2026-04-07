import { useLocation } from "react-router-dom";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHero } from "@/components/PageHero";
import { RichContent } from "@/components/RichContent";
import { SectionSidebar } from "@/components/SectionSidebar";
import { usePageContent } from "@/lib/usePageContent";
import { NotFoundPage } from "@/pages/NotFoundPage";

export function ContentPage() {
  const location = useLocation();
  const { page, content, error, isLoading } = usePageContent(location.pathname);

  if (!page || page.routeType === "home") {
    return <NotFoundPage />;
  }

  return (
    <div className="grid items-start gap-8 xl:grid-cols-[minmax(0,1fr)_20rem]">
      <div className="min-w-0 space-y-5">
        <Breadcrumbs items={page.breadcrumbs} />
        <PageHero page={page} />
        <section className="min-w-0 overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.03))] p-5 shadow-glow backdrop-blur-sm sm:p-8">
          {error ? (
            <div className="mb-5 rounded-3xl border border-rose-400/20 bg-rose-400/10 px-5 py-4 text-sm text-rose-200">
              Контент страницы не загрузился. Проверь генерацию `npm run sync:content`.
            </div>
          ) : null}
          {isLoading ? (
            <div className="space-y-4">
              <div className="h-6 w-52 animate-pulse rounded-full bg-white/10" />
              <div className="h-6 w-40 animate-pulse rounded-full bg-white/10" />
              <div className="h-32 animate-pulse rounded-[1.5rem] bg-white/5" />
              <div className="h-48 animate-pulse rounded-[1.5rem] bg-white/5" />
            </div>
          ) : (
            <RichContent html={content?.contentHtml ?? ""} />
          )}
        </section>
      </div>
      <SectionSidebar page={page} />
    </div>
  );
}
