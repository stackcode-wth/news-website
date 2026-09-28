import NewsItem from "./NewsItem";

function Skeleton({ big = false }) {
  return (
    <div className={`overflow-hidden rounded-xl border-t-4 border-slate-200 ${big ? "sm:col-span-2 lg:col-span-3" : ""}`}>
      <div className={`w-full animate-pulse bg-slate-200 ${big ? "aspect-[21/9]" : "aspect-video"}`} />
      <div className="space-y-3 p-4">
        <div className="h-3 w-20 animate-pulse rounded bg-slate-200" />
        <div className="h-4 w-4/5 animate-pulse rounded bg-slate-200" />
        <div className="h-3 w-full animate-pulse rounded bg-slate-200" />
      </div>
    </div>
  );
}

export default function NewsList({
  articles,
  region,
  onRegionChange,
  loading,
  error,
  onRetry,
  hasMore,
  onLoadMore,
  loadingMore,
}) {
  const [featuredArticle, ...restArticles] = articles;

  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight text-[#14161A] sm:text-4xl">
            {region === "india" ? "Top Headlines" : "World News"}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Latest {region === "india" ? "India" : "World"} Headlines
          </p>
        </div>

        <div role="group" aria-label="Region" className="flex rounded-md border-2 border-[#14161A] p-0.5">
          {[
            { label: "India", value: "india" },
            { label: "World", value: "world" },
          ].map(({ label, value }) => (
            <button
              key={label}
              type="button"
              onClick={() => onRegionChange(value)}
              className={`rounded-md px-4 py-1.5 text-sm font-bold uppercase transition ${
                region === value ? "bg-[#14161A] text-white" : "text-[#14161A] hover:bg-slate-100"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          <p>{error}</p>
          <button onClick={onRetry} className="mt-2 font-semibold underline underline-offset-2">
            Try again
          </button>
        </div>
      )}

      <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <>
            <Skeleton big />
            {Array.from({ length: 5 }, (_, i) => <Skeleton key={i} />)}
          </>
        ) : (
          <>
            {featuredArticle && (
              <div className="sm:col-span-2 lg:col-span-3">
                <NewsItem article={featuredArticle} featured />
              </div>
            )}
            {restArticles.map((article) => (
              <NewsItem key={article.id} article={article} />
            ))}
          </>
        )}
      </div>

      {!loading && !error && articles.length === 0 && (
        <p className="mt-10 text-center text-slate-500">
          No stories match this search. Try a different keyword or category.
        </p>
      )}

      {!loading && hasMore && (
        <div className="mt-10 flex justify-center">
          <button
            onClick={onLoadMore}
            disabled={loadingMore}
            className="rounded-md bg-[#14161A] px-8 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-[#F5A623] hover:text-[#14161A] disabled:opacity-60"
          >
            {loadingMore ? "Loading…" : "Load more stories"}
          </button>
        </div>
      )}
    </section>
  );
}