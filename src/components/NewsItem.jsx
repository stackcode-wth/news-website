import { Link } from "react-router-dom";
import { formatDate } from "../api/newsApi";

const FALLBACK_IMAGE =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 9"><rect width="16" height="9" fill="#e2e8f0"/></svg>`
  );

export default function NewsItem({ article }) {
  const { id, title, summary, image, source, publishedAt, category } = article;

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:border-slate-300 hover:shadow-sm">
      <Link to={`/article/${encodeURIComponent(id)}`} state={{ article }} className="flex flex-1 flex-col">
        <img
          src={image || FALLBACK_IMAGE}
          onError={(event) => {
            event.currentTarget.src = FALLBACK_IMAGE;
          }}
          alt=""
          loading="lazy"
          className="aspect-video w-full bg-slate-100 object-cover"
        />

        <div className="flex flex-1 flex-col p-4">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>NewsItem</span>
            <span className="rounded-full bg-blue-50 px-2 py-0.5 capitalize text-blue-700">
              {category}
            </span>
          </div>

          <h3 className="mt-2.5 line-clamp-2 font-semibold leading-snug text-slate-900 group-hover:text-blue-700">
            {title}
          </h3>

          {summary && (
            <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600">{summary}</p>
          )}
        </div>
      </Link>

      <footer className="border-t border-slate-200 px-4 py-2.5 text-xs text-slate-500">
        By {source} • {formatDate(publishedAt)}
      </footer>
    </article>
  );
}