import { useEffect, useState } from "react";
import { Link, NavLink, useSearchParams } from "react-router-dom";
import { CATEGORIES } from "../api/newsApi";

export default function Header() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") ?? "top";
  const urlQuery = searchParams.get("q") ?? "";

  const [text, setText] = useState(urlQuery);

  useEffect(() => setText(urlQuery), [urlQuery]);

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
    <header className="bg-[#14161A]">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-8 gap-y-4 px-4 py-7 sm:px-6">
        <Link to="/" className="flex items-center gap-3 shrink-0">
          
          <span className="text-2xl font-black uppercase tracking-tighter text-white">
            INSIGHT<span className="text-[#F5A623]">Daily</span>
          </span>
        </Link>

        <div className="order-3 flex w-full items-center gap-3 sm:order-none sm:ml-auto sm:w-auto">
          <div className="relative flex-1 sm:w-80 sm:flex-none">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
              ⌕
            </span>
            <input
              id="news-search"
              type="search"
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder="Search India news…"
              className="w-full rounded-md border border-white/10 bg-white/10 py-3 pl-11 pr-4 text-sm text-white placeholder-slate-400 outline-none transition focus:border-[#F5A623] focus:bg-white/15 focus:ring-1 focus:ring-[#F5A623]"
            />
          </div>
        </div>

        {/* <button
          type="button"
          aria-label="Your account"
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/15 text-slate-300 transition hover:bg-white/10"
        >
          ☺
        </button> */}
      </div>

      <nav aria-label="Categories" className="mx-auto max-w-6xl overflow-x-auto border-t border-white/10 px-4 sm:px-6">
        <ul className="flex gap-0.5 whitespace-nowrap">
          {CATEGORIES.map(({ label, value }) => {
            const isActive = value === activeCategory;
            return (
              <li key={value}>
                <NavLink
                  to={categoryHref(value)}
                  className={`block border-b-2 px-3 py-3 text-[13px] font-medium uppercase tracking-wide transition ${
                    isActive
                      ? "border-[#F5A623] font-bold text-white"
                      : "border-transparent text-slate-400 hover:text-yellow-400 hover:underline hover:underline-offset-4"
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