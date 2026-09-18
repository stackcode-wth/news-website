import { createContext, useCallback, useContext, useMemo, useRef } from "react";

const NewsContext = createContext(null);


export function NewsProvider({ children }) {
  const cache = useRef(new Map());

  const remember = useCallback((articles) => {
    articles.forEach((article) => cache.current.set(article.id, article));
  }, []);

  const getArticle = useCallback((id) => cache.current.get(id) ?? null, []);

  const value = useMemo(() => ({ remember, getArticle }), [remember, getArticle]);

  return <NewsContext.Provider value={value}>{children}</NewsContext.Provider>;
}

export function useNewsCache() {
  const context = useContext(NewsContext);
  if (!context) throw new Error("useNewsCache must be used inside <NewsProvider>");
  return context;
}