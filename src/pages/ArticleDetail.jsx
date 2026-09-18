import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { fetchNews, formatDate } from "../api/newsApi";
import { useNewsCache } from "../context/NewsContext";

export default function ArticleDetail() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { getArticle, remember } = useNewsCache();

  // Three ways to get the article, cheapest first:
  // 1. router state (passed when you click a card)
  // 2. the in-memory cache
  // 3. refetch the feed — only needed if someone opens/refreshes this URL directly
  const [article, setArticle] = useState(
    () => location.state?.article ?? getArticle(id) ?? null
  );
  const [loading, setLoading] = useState(!article);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (article) return;

    let active = true;
    setLoading(true);

    fetchNews({ category: "top", country: "in" })
      .then((result) => {
        if (!active) return;
        remember(result.articles);
        const match = result.articles.find((item) => item.id === id);
        match ? setArticle(match) : setNotFound(true);
      })
      .catch(() => active && setNotFound(true))
      .finally(() => active && setLoading(false));

    return () => {
      active = false;
    };
  }, [article, id, remember]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl space-y-4">
        <div className="h-8 w-3/4 animate-pulse rounded bg-slate-200" />
        <div className="aspect-video w-full animate-pulse rounded-xl bg-slate-200" />
        <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
        <div className="h-4 w-5/6 animate-pulse rounded bg-slate-200" />
      </div>
    );
  }

  if (notFound || !article) {
    return (
      <div className="mx-auto max-w-lg py-16 text-center">
        <h1 className="text-xl font-semibold">This story isn't in the current feed</h1>
        <p className="mt-2 text-slate-600">
          News articles roll off the feed after a while. Head back to see what's live now.
        </p>
        <Link
          to="/"
          className="mt-5 inline-block rounded-full bg-blue-700 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-800"
        >
          Back to headlines
        </Link>
      </div>
    );
  }

  const { title, image, summary, content, source, sourceUrl, publishedAt, category } = article;

  // NewsData's free tier returns this exact string instead of real content —
  // fall back to the description whenever we see it.
  const usableContent = content && !content.includes("ONLY AVAILABLE IN PAID PLANS") ? content : summary;
  const paragraphs = (usableContent || "").split(/\n+/).filter(Boolean);
  const isPreviewOnly = usableContent === summary;

  return (
    <article className="mx-auto max-w-3xl">
      <button
        onClick={() => navigate(-1)}
        className="text-sm font-medium text-blue-700 transition hover:text-blue-900"
      >
        ← Back to headlines
      </button>

      <p className="mt-6 text-sm capitalize text-slate-500">{category}</p>
      <h1 className="mt-1 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">{title}</h1>

      <p className="mt-3 text-sm text-slate-500">
        By {source} • {formatDate(publishedAt)}
      </p>

      {image && (
        <img
          src={image}
          alt=""
          onError={(event) => event.currentTarget.remove()}
          className="mt-6 w-full rounded-xl bg-slate-100 object-cover"
        />
      )}

      <div className="mt-7 space-y-4 text-[17px] leading-8 text-slate-700">
        {paragraphs.length > 0 ? (
          paragraphs.map((text, index) => <p key={index}>{text}</p>)
        ) : (
          <p className="text-slate-500">No preview available for this story.</p>
        )}

        {isPreviewOnly && (
          <p className="rounded-lg bg-slate-100 px-4 py-3 text-sm text-slate-600">
            This is a preview. Read the rest at {source} using the link below.
          </p>
        )}
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-slate-200 pt-5 text-sm">
        <a
          href={sourceUrl}
          target="_blank"
          rel="noreferrer"
          className="font-medium text-blue-700 transition hover:text-blue-900"
        >
          Read the full story at {source}
        </a>
        <button
          onClick={() => navigator.clipboard?.writeText(window.location.href)}
          className="text-slate-600 transition hover:text-slate-900"
        >
          Copy link
        </button>
      </div>
    </article>
  );
}