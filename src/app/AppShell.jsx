import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getPageByPath } from "@/lib/pages";

function ScrollManager() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const elementId = decodeURIComponent(location.hash.slice(1));
      requestAnimationFrame(() => {
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const page = getPageByPath(location.pathname);
    document.title = page ? `${page.title} · VanGuard Wiki` : "VanGuard Wiki";
  }, [location.pathname]);

  return null;
}

export function AppShell({ children }) {
  return (
    <div className="app-shell relative min-h-screen overflow-x-hidden">
      <div className="app-backdrop pointer-events-none absolute inset-0 -z-20" />
      <div className="app-grid pointer-events-none absolute inset-0 -z-20" />
      <div className="app-noise pointer-events-none absolute inset-0 -z-20" />
      <div className="app-orb app-orb-left pointer-events-none absolute -left-[12rem] top-24 -z-10" />
      <div className="app-orb app-orb-right pointer-events-none absolute -right-[8rem] top-16 -z-10" />
      <div className="app-orb app-orb-bottom pointer-events-none absolute bottom-[-12rem] left-1/2 -z-10 -translate-x-1/2" />
      <div className="app-beam app-beam-left pointer-events-none absolute inset-y-0 left-0 -z-10 w-[30vw]" />
      <div className="app-beam app-beam-right pointer-events-none absolute inset-y-0 right-0 -z-10 w-[24vw]" />
      <ScrollManager />
      <SiteHeader />
      <main className="site-main mx-auto flex min-w-0 w-full max-w-[1520px] flex-1 flex-col px-4 pb-20 pt-8 sm:px-6 lg:px-8">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
