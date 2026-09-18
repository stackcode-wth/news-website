import { Link } from "react-router-dom";
import { formatDate } from "../api/newsApi";

const FALLBACK_IMAGE =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 9"><rect width="16" height="9" fill="#e2e8f0"/></svg>`
  );

/**
 * Pass `featured` for the large hero card at the top of the grid (see NewsList).
 * Everything else renders the compact amber-accent card.
 */
export default function NewsItem({ article, featured = false }) {
  const { id, title, summary, image, source, publishedAt, category } = article;

  if (featured) {
    return (
      <article className="group relative overflow-hidden rounded-lg bg-[#14161A] shadow-xl">
        <Link to={`/article/${encodeURIComponent(id)}`} state={{ article }} className="block">
          <img
            src={image || FALLBACK_IMAGE}
            onError={(e) => (e.currentTarget.src = FALLBACK_IMAGE)}
            alt=""
            className="aspect-[16/9] w-full object-cover opacity-95 transition duration-500 group-hover:scale-105 sm:aspect-[21/9]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#14161A] via-[#14161A]/50 to-transparent" />

          {/* corner ribbon */}
          <div className="absolute right-4 top-4 z-10 -rotate-2 bg-[#F5A623] px-4 py-1.5 text-xs font-black uppercase tracking-wide text-[#14161A] shadow-lg">
            Top Story
          </div>

          <div className="absolute inset-x-0 bottom-0 z-0 p-5 sm:p-8">
            <h2 className="max-w-3xl text-2xl font-black leading-[1.05] text-white sm:text-4xl">
              {title}
            </h2>
            {summary && (
              <p className="mt-3 line-clamp-2 max-w-2xl text-sm text-slate-300 sm:text-base">{summary}</p>
            )}
            <p className="mt-4 text-xs font-bold uppercase tracking-widest text-[#F5A623]">
              {source} • {formatDate(publishedAt)}
            </p>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border-t-4 border-[#F5A623] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <Link to={`/article/${encodeURIComponent(id)}`} state={{ article }} className="flex flex-1 flex-col">
        <div className="relative overflow-hidden">
          <img
            src={image || FALLBACK_IMAGE}
            onError={(e) => (e.currentTarget.src = FALLBACK_IMAGE)}
            alt=""
            loading="lazy"
            className="aspect-video w-full bg-slate-100 object-cover transition duration-500 group-hover:scale-105"
          />
        </div>

        <div className="flex flex-1 flex-col p-4">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#d38a13]">{category}</span>
          <h3 className="mt-1.5 line-clamp-2 font-bold leading-snug text-[#14161A] transition group-hover:text-[#d38a13]">
            {title}
          </h3>
          {summary && (
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-500">{summary}</p>
          )}
        </div>
      </Link>

      <footer className="flex items-center justify-between border-t border-slate-100 px-4 py-3 text-xs text-slate-400">
        <span className="font-semibold text-slate-500">{source}</span>
        <span>{formatDate(publishedAt)}</span>
      </footer>
    </article>
  );
}