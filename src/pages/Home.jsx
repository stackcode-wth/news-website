import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import NewsList from "../components/NewsList";
import { fetchNews } from "../api/newsApi";
import { useNewsCache } from "../context/NewsContext";

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { remember } = useNewsCache();

  const category = searchParams.get("category") ?? "top";
  const region = searchParams.get("region") === "world" ? "world" : "india";
  const query = searchParams.get("q") ?? "";

  const [articles, setArticles] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  // "india" -> country=in, "world" -> no country filter at all
  const country = region === "india" ? "in" : "";

  // Fresh load whenever a filter changes. AbortController stops an older
  // request from overwriting a newer one when you type fast.
  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    setError("");

    fetchNews({ category, country, query, signal: controller.signal })
      .then((result) => {
        setArticles(result.articles);
        setNextPage(result.nextPage);
        remember(result.articles);
      })
      .catch((err) => {
        if (err.name === "CanceledError" || err.code === "ERR_CANCELED") return;
        setError(err.message || "Could not load news right now.");
        setArticles([]);
        setNextPage(null);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [category, country, query, reloadKey, remember]);

  const handleRegionChange = useCallback(
    (value) => {
      const next = new URLSearchParams(searchParams);
      next.set("region", value);
      setSearchParams(next);
    },
    [searchParams, setSearchParams]
  );

  const handleLoadMore = async () => {
    if (!nextPage) return;
    setLoadingMore(true);
    try {
      const result = await fetchNews({ category, country, query, page: nextPage });
      setArticles((prev) => [...prev, ...result.articles]);
      setNextPage(result.nextPage);
      remember(result.articles);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <NewsList
      articles={articles}
      region={region}
      onRegionChange={handleRegionChange}
      loading={loading}
      error={error}
      onRetry={() => setReloadKey((n) => n + 1)}
      hasMore={Boolean(nextPage)}
      onLoadMore={handleLoadMore}
      loadingMore={loadingMore}
    />
  );
}