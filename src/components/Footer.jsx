import { Link } from "react-router-dom";
import { CATEGORIES } from "../api/newsApi";

export default function Footer() {
  return (
    <footer className="mt-20 bg-[#14161A]">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 sm:px-6">
        <div>
          <div className="flex items-center gap-2.5">
          
            <p className="text-lg font-black uppercase text-white">
              INSIGHT<span className="text-[#F5A623]">Daily</span>
            </p>
          </div>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-400">
            Headlines from across India and the world, refreshed through the day. Stay tuned. Stay updated.
          </p>
        </div>

        <nav aria-label="Footer" className="sm:justify-self-end">
          <p className="text-xs font-bold uppercase tracking-widest text-[#F5A623]">Sections</p>
          <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-300">
            {CATEGORIES.map(({ label, value }) => (
              <li key={value}>
                <Link to={`/?category=${value}`} className="transition hover:text-white">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-slate-500 sm:px-6">
        © {new Date().getFullYear()} INSIGHT Daily · Articles belong to their original publishers 
      <br></br> <span>Made with REACT and TAILWIND CSS</span>
      </div>
      
    </footer>
  );
}