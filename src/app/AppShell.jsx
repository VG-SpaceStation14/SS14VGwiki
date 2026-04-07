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
    <div className="relative min-h-screen overflow-x-hidden">
      <div className="pointer-events-none absolute inset-0 -z-20 bg-hero-grid bg-[size:84px_84px] opacity-[0.05]" />
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_15%_20%,rgba(83,143,255,0.18),transparent_28%),radial-gradient(circle_at_78%_12%,rgba(255,138,61,0.12),transparent_24%),radial-gradient(circle_at_50%_100%,rgba(102,126,234,0.12),transparent_32%)]" />
      <div className="pointer-events-none absolute inset-y-0 left-0 -z-10 w-[28vw] bg-[radial-gradient(circle_at_left,rgba(18,58,122,0.22),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-[24vw] bg-[radial-gradient(circle_at_right,rgba(255,138,61,0.1),transparent_70%)]" />
      <ScrollManager />
      <SiteHeader />
      <main className="mx-auto flex min-w-0 w-full max-w-[1520px] flex-1 flex-col px-4 pb-20 pt-8 sm:px-6 lg:px-8">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
