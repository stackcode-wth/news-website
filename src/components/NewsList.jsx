import NewsItem from "./NewsItem";

function Skeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200">
      <div className="aspect-video w-full animate-pulse bg-slate-200" />
      <div className="space-y-3 p-4">
        <div className="h-3 w-20 animate-pulse rounded bg-slate-200" />
        <div className="h-4 w-4/5 animate-pulse rounded bg-slate-200" />
        <div className="h-3 w-full animate-pulse rounded bg-slate-200" />
        <div className="h-3 w-2/3 animate-pulse rounded bg-slate-200" />
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
  return (
    <section>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">NewsList</h1>
          <p className="mt-1 text-slate-500">Latest {region === "india" ? "India" : "World"} Headlines</p>
        </div>

        <div role="group" aria-label="Region" className="flex overflow-hidden rounded-lg border border-slate-300">
          {[
            { label: "India", value: "india" },
            { label: "World", value: "world" },
          ].map(({ label, value }) => (
            <button
              key={label}
              type="button"
              onClick={() => onRegionChange(value)}
              className={`px-4 py-1.5 text-sm transition ${
                region === value ? "bg-slate-100 font-semibold text-slate-900" : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          <p>{error}</p>
          <button onClick={onRetry} className="mt-2 font-semibold underline underline-offset-2">
            Try again
          </button>
        </div>
      )}

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {loading
          ? Array.from({ length: 6 }, (_, i) => <Skeleton key={i} />)
          : articles.map((article) => <NewsItem key={article.id} article={article} />)}
      </div>

      {!loading && !error && articles.length === 0 && (
        <p className="mt-10 text-center text-slate-500">
          No stories match this search. Try a different keyword or category.
        </p>
      )}

      {!loading && hasMore && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={onLoadMore}
            disabled={loadingMore}
            className="rounded-full border border-slate-300 px-6 py-2 text-sm font-medium transition hover:bg-slate-50 disabled:opacity-60"
          >
            {loadingMore ? "Loading…" : "Load more stories"}
          </button>
        </div>
      )}
    </section>
  );
}