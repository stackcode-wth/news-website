import { Link } from "react-router-dom";
import { CATEGORIES } from "../api/newsApi";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 sm:px-6">
        <div>
          <p className="font-bold">Global News</p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-500">
            Headlines from across India and the world, refreshed through the day.
          </p>
        </div>

        <nav aria-label="Footer" className="sm:justify-self-end">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600">
            {CATEGORIES.map(({ label, value }) => (
              <li key={value}>
                <Link to={`/?category=${value}`} className="transition hover:text-slate-900">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-slate-200 px-4 py-4 text-center text-xs text-slate-500 sm:px-6">
        © {new Date().getFullYear()} Global News · Articles belong to their original publishers
      </div>
    </footer>
  );
}