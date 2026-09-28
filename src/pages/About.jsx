import { useEffect } from "react";
import { Link } from "react-router-dom";
import { CATEGORIES } from "../api/newsApi";

// Change the name here once and the whole page updates.
const SITE_NAME = "INSIGHT Daily";
const REPO_URL = "https://github.com/stackcode-wth/news-website";

const FEATURES = [
  {
    title: "Live headlines",
    text: "Stories are pulled from a live news feed, so what you read is what is happening right now.",
  },
  {
    title: "A section for every interest",
    text: `${CATEGORIES.length} sections, from Business and Technology to Fashion, Weather and Cricket.`,
  },
  {
    title: "India and the world",
    text: "Switch between top stories from India and the rest of the world with one tap.",
  },
  {
    title: "Search that keeps up",
    text: "Search any topic and get matching stories instantly, without the page reloading.",
  },
];

const STEPS = [
  {
    title: "We fetch",
    text: "Headlines are requested live from the NewsData.io news API.",
  },
  {
    title: "You browse",
    text: "Pick a section or search a topic. The link updates too, so any view can be shared or bookmarked.",
  },
  {
    title: "You read",
    text: "Open a story for its summary, then continue to the original publisher for the full article.",
  },
];

const STACK = ["React", "Vite", "Tailwind CSS", "React Router", "Axios", "NewsData.io API"];

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="mx-auto max-w-5xl">
      {/* Hero */}
      <section className="rounded-lg bg-[#14161A] px-6 py-12 sm:px-12 sm:py-16">
        <span className="inline-block bg-[#F5A623] px-3 py-1 text-xs font-black uppercase tracking-wide text-[#14161A]">
          About us
        </span>
        <h1 className="mt-5 max-w-3xl text-3xl font-black leading-[1.05] text-white sm:text-5xl">
          {SITE_NAME}: the news that matters, in one place.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
          {SITE_NAME} brings together headlines from across India and the world, organised by
          topic, so you can stay informed without jumping between a dozen websites.
        </p>
      </section>

      {/* Stats */}
      <section aria-label="At a glance" className="mt-6 grid gap-4 sm:grid-cols-3">
        {[
          { value: `${CATEGORIES.length}`, label: "News sections" },
          { value: "2", label: "Regions: India and World" },
          { value: "Live", label: "Headlines, always fresh" },
        ].map((item) => (
          <div key={item.label} className="rounded-xl border-t-4 border-[#F5A623] bg-white p-5 shadow-sm">
            <p className="text-3xl font-black text-[#14161A]">{item.value}</p>
            <p className="mt-1 text-sm text-slate-500">{item.label}</p>
          </div>
        ))}
      </section>

      {/* Mission */}
      <section className="mt-14">
        <h2 className="text-2xl font-black uppercase tracking-tight text-[#14161A]">Our mission</h2>
        <p className="mt-3 max-w-3xl text-lg leading-8 text-slate-700">
          News should be quick to find and easy to read. We keep the design simple and the
          headlines front and centre, and we always link back to the original publisher, so
          you can go deeper on the stories you care about.
        </p>
      </section>

      {/* Features */}
      <section className="mt-14">
        <h2 className="text-2xl font-black uppercase tracking-tight text-[#14161A]">What you get</h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          {FEATURES.map((feature) => (
            <article
              key={feature.title}
              className="rounded-xl border-t-4 border-[#F5A623] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <h3 className="font-bold text-[#14161A]">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">{feature.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="mt-14">
        <h2 className="text-2xl font-black uppercase tracking-tight text-[#14161A]">How it works</h2>
        <ol className="mt-5 grid gap-5 sm:grid-cols-3">
          {STEPS.map((step, index) => (
            <li key={step.title} className="rounded-xl bg-white p-6 shadow-sm">
              <span className="grid h-9 w-9 place-items-center rounded-md bg-[#F5A623] font-black text-[#14161A]">
                {index + 1}
              </span>
              <h3 className="mt-4 font-bold text-[#14161A]">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Built with */}
      <section className="mt-14">
        <h2 className="text-2xl font-black uppercase tracking-tight text-[#14161A]">Built with</h2>
        <ul className="mt-5 flex flex-wrap gap-3">
          {STACK.map((tool) => (
            <li
              key={tool}
              className="rounded-md border border-[#14161A]/15 bg-white px-4 py-2 text-sm font-bold text-[#14161A]"
            >
              {tool}
            </li>
          ))}
        </ul>
      </section>

      {/* Content note */}
      <section className="mt-14 border-l-4 border-[#F5A623] bg-[#faf0da] px-5 py-4 text-[15px] leading-6 text-slate-700">
        <p className="font-bold text-[#14161A]">A note on content</p>
        <p className="mt-1">
          Every article, headline and image belongs to its original publisher. {SITE_NAME} shows
          short summaries and always links to the source for the full story.
        </p>
      </section>

      {/* Call to action */}
      <section className="mt-14 flex flex-wrap items-center gap-4">
        <Link
          to="/"
          className="inline-flex items-center rounded-md bg-[#14161A] px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-[#F5A623] hover:text-[#14161A]"
        >
          Start reading
        </Link>
        <a
          href={REPO_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center rounded-md border-2 border-[#14161A] px-6 py-2.5 text-sm font-bold uppercase tracking-wide text-[#14161A] transition hover:bg-[#14161A] hover:text-white"
        >
          View source on GitHub ↗
        </a>
      </section>
    </div>
  );
}