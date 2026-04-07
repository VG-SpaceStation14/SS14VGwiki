import { useLocation } from "react-router-dom";
import { getPageByPath } from "@/lib/pages";

export function SiteFooter() {
  const location = useLocation();
  const page = getPageByPath(location.pathname);

  return (
    <footer className="site-footer border-t border-white/10">
      <div className="mx-auto grid w-full max-w-[1520px] gap-5 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:px-8">
        <div className="space-y-2 text-sm text-steel">
          <p className="font-display text-base font-semibold text-white">VanGuard Wiki</p>
          <p>Единый вики-портал проекта VanGuard на React с обновлённым интерфейсом, анимацией и быстрой навигацией.</p>
          {page?.footerNote ? <p>{page.footerNote}</p> : null}
        </div>
        <div className="footer-status">
          <span><i className="fas fa-layer-group" aria-hidden="true" /> Единый визуальный слой</span>
          <span><i className="fas fa-wand-magic-sparkles" aria-hidden="true" /> Полированная подача</span>
          <span><i className="fas fa-compass" aria-hidden="true" /> Быстрые маршруты</span>
        </div>
      </div>
    </footer>
  );
}
