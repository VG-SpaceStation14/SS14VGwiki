import { useLocation } from "react-router-dom";
import { getPageByPath } from "@/lib/pages";

export function SiteFooter() {
  const location = useLocation();
  const page = getPageByPath(location.pathname);

  return (
    <footer className="border-t border-white/10 bg-[linear-gradient(180deg,rgba(0,0,0,0.12),rgba(0,0,0,0.28))]">
      <div className="mx-auto flex w-full max-w-[1520px] flex-col gap-2 px-4 py-6 text-sm text-steel sm:px-6 lg:px-8">
        <p>VanGuard Wiki на React с единым визуальным слоем, навигацией и генерацией контента.</p>
        {page?.footerNote ? <p>{page.footerNote}</p> : null}
      </div>
    </footer>
  );
}
