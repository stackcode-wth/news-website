import { useEffect, useState } from "react";
import { Link, NavLink, useSearchParams } from "react-router-dom";
import { CATEGORIES } from "../api/newsApi";

export default function Header() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") ?? "top";
  const urlQuery = searchParams.get("q") ?? "";

  const [text, setText] = useState(urlQuery);

  // Keep the box in sync when the URL changes from somewhere else (back button, logo click).
  useEffect(() => setText(urlQuery), [urlQuery]);

  // Debounce: wait until typing pauses before hitting the API.
  useEffect(() => {
    if (text === urlQuery) return;

    const timer = setTimeout(() => {
      const next = new URLSearchParams(searchParams);
      text.trim() ? next.set("q", text.trim()) : next.delete("q");
      setSearchParams(next, { replace: true });
    }, 500);

    return () => clearTimeout(timer);
  }, [text, urlQuery, searchParams, setSearchParams]);

  const categoryHref = (value) => {
    const next = new URLSearchParams(searchParams);
    next.set("category", value);
    return `/?${next.toString()}`;
  };

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-3 px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-blue-700 text-base text-white">
            ◍
          </span>
          <span className="text-lg font-bold leading-4 tracking-tight">
            Global
            <br />
            News
          </span>
        </Link>

        <div className="order-3 flex w-full items-center gap-3 sm:order-none sm:ml-auto sm:w-auto">
          <label htmlFor="news-search" className="hidden text-sm text-slate-600 md:block">
            Search Bar
          </label>
          <div className="relative flex-1 sm:w-64 sm:flex-none">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              ⌕
            </span>
            <input
              id="news-search"
              type="search"
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder="Search India News..."
              className="w-full rounded-full border border-slate-300 py-2 pl-9 pr-4 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        <button
          type="button"
          aria-label="Your account"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-slate-300 text-slate-500 transition hover:bg-slate-50"
        >
          ☺
        </button>
      </div>

      <nav aria-label="Categories" className="mx-auto max-w-6xl overflow-x-auto px-4 sm:px-6">
        <ul className="flex gap-6 whitespace-nowrap">
          {CATEGORIES.map(({ label, value }) => {
            const isActive = value === activeCategory;
            return (
              <li key={value}>
                <NavLink
                  to={categoryHref(value)}
                  className={`block border-b-2 pb-3 text-sm transition ${
                    isActive
                      ? "border-slate-900 font-semibold text-slate-900"
                      : "border-transparent text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}