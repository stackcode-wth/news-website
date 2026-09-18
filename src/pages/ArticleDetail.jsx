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
        <div className="aspect-video w-full animate-pulse rounded-lg bg-slate-200" />
        <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
        <div className="h-4 w-5/6 animate-pulse rounded bg-slate-200" />
      </div>
    );
  }

  if (notFound || !article) {
    return (
      <div className="mx-auto max-w-lg py-16 text-center">
        <h1 className="text-xl font-black uppercase text-[#14161A]">This story isn't in the current feed</h1>
        <p className="mt-2 text-slate-600">
          News articles roll off the feed after a while. Head back to see what's live now.
        </p>
        <Link
          to="/"
          className="mt-5 inline-block rounded-full bg-[#14161A] px-6 py-2.5 text-sm font-bold uppercase text-white transition hover:bg-[#F5A623] hover:text-[#14161A]"
        >
          Back to headlines
        </Link>
      </div>
    );
  }

  const { title, image, summary, content, source, sourceUrl, publishedAt, category } = article;

  
  const usableContent = content && !content.includes("ONLY AVAILABLE IN PAID PLANS") ? content : summary;
  const paragraphs = (usableContent || "").split(/\n+/).filter(Boolean);
  const isPreviewOnly = usableContent === summary;

  return (
    <article className="mx-auto max-w-3xl">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-sm font-bold uppercase text-slate-500 transition hover:text-[#14161A]"
      >
        ← Back to headlines
      </button>

      <span className="mt-6 inline-block bg-[#F5A623] px-3 py-1 text-xs font-black uppercase tracking-wide text-[#14161A]">
        {category}
      </span>
      <h1 className="mt-3 text-3xl font-black leading-[1.1] text-[#14161A] sm:text-[2.5rem]">
        {title}
      </h1>

      <p className="mt-4 flex items-center gap-2 text-sm text-slate-500">
        <span className="font-bold text-[#14161A]">{source}</span>
        <span aria-hidden="true">•</span>
        <span>{formatDate(publishedAt)}</span>
      </p>

      {image && (
        <img
          src={image}
          alt=""
          onError={(event) => event.currentTarget.remove()}
          className="mt-7 w-full rounded-lg bg-slate-100 object-cover shadow-md"
        />
      )}

      <div className="mt-8 space-y-4 text-[18px] leading-8 text-slate-700">
        {paragraphs.length > 0 ? (
          paragraphs.map((text, index) => <p key={index}>{text}</p>)
        ) : (
          <p className="text-slate-500">No preview available for this story.</p>
        )}

        {isPreviewOnly && (
          <div className="flex gap-3 border-l-4 border-[#F5A623] bg-[#faf0da] px-4 py-3.5 text-[15px] leading-6 text-slate-700">
            <span className="font-bold text-[#d38a13]">ⓘ</span>
            <p>This is a preview. Read the full story at {source} using the link below.</p>
          </div>
        )}
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-5 border-t border-slate-200 pt-6 text-sm">
        <a
          href={sourceUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full bg-[#14161A] px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-[#F5A623] hover:text-[#14161A]"
        >
          Read full story ↗
        </a>
        <button
          onClick={() => navigator.clipboard?.writeText(window.location.href)}
          className="font-bold uppercase text-slate-500 transition hover:text-[#14161A]"
        >
          Copy link
        </button>
      </div>
    </article>
  );
}