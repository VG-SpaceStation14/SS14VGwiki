import { useEffect, useState } from "react";
import { getPageByPath, loadPageContent } from "@/lib/pages";

export function usePageContent(pathname) {
  const page = getPageByPath(pathname);
  const [content, setContent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    if (!page) {
      setContent(null);
      setError(null);
      return () => {
        isMounted = false;
      };
    }

    setContent(null);
    setError(null);

    loadPageContent(page)
      .then((payload) => {
        if (isMounted) {
          setContent(payload);
        }
      })
      .catch((reason) => {
        console.error(`Failed to load page content for ${page.path}`, reason);
        if (isMounted) {
          setError(reason);
          setContent({ contentHtml: "", quickDock: [] });
        }
      });

    return () => {
      isMounted = false;
    };
  }, [page?.path]);

  return {
    page,
    content,
    error,
    isLoading: Boolean(page) && content === null,
  };
}
