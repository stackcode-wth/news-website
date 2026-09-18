# INSIGHT daily

A responsive news application built with React, delivering live headlines from India and around the world with category filtering, search, and a detailed article view.

**Live Demo:** https://stackcode-wth.github.io/news-website/

---

## Overview

 INSIGHT Daily is a single-page application that fetches real-time news articles from a public news API and presents them through a structured, component-based React interface. The application was developed to satisfy the following assignment requirements:

- Componentized architecture (Header, NewsList, NewsItem, Footer)
- API integration using Axios
- Client-side routing using React Router DOM
- A detailed article view accessible from the headlines list
- A fully responsive layout across mobile, tablet, and desktop breakpoints
- Search and category-based filtering as supplementary functionality

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI Library | React 19 |
| Build Tool | Vite |
| Styling | Tailwind CSS v4 |
| Routing | React Router DOM v7 |
| HTTP Client | Axios |
| News Data | NewsData.io API |
| Deployment | GitHub Pages (via `gh-pages`) |

---

## Features

- **Live headlines** — fetched from NewsData.io's `/latest` endpoint, filtered by category and region (India / World)
- **Category filter** — Top Headlines, Business, Technology, and Sports
- **Search** — debounced input that queries the API 500ms after the user stops typing, avoiding redundant requests
- **Pagination** — "Load more stories" fetches the next page using the API's cursor-based pagination
- **Article detail view** — full-page view for each article, reachable via a dedicated route and shareable URL
- **In-memory article cache** — avoids redundant network requests when navigating between the list and an already-fetched article
- **Graceful fallbacks** — handles missing images, missing article content (a known limitation of the API's free tier, see below), and articles that are no longer present in the live feed
- **Responsive design** — a single-column layout on mobile that expands to a multi-column grid on larger screens

---

## Project Structure

```
src/
├── api/
│   └── newsApi.js         # Axios instance, request builder, response normalization
├── context/
│   └── NewsContext.jsx     # In-memory cache shared between the list and detail views
├── components/
│   ├── Header.jsx          # Branding, search bar, category navigation
│   ├── NewsList.jsx        # Headline grid, region toggle, pagination
│   ├── NewsItem.jsx        # Individual article card (standard and featured variants)
│   └── Footer.jsx
├── pages/
│   ├── Home.jsx             # Reads filters from the URL, orchestrates data fetching
│   └── ArticleDetail.jsx    # Full article view
├── App.jsx                  # Route definitions and shared layout
└── main.jsx                 # Application entry point
```

---

## Getting Started

### Prerequisites

- Node.js 18 or later
- A free API key from [NewsData.io](https://newsdata.io)

### Installation

```bash
git clone https://github.com/stackcode-wth/news-website.git
cd news-website
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```
VITE_NEWSDATA_KEY=your_api_key_here
```

This file is excluded from version control via `.gitignore` and must be created locally by each developer.

### Running Locally

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the next available port).

---

## Deployment

The application is deployed to GitHub Pages using the `gh-pages` package.

```bash
npm run deploy
```

This command builds the project and publishes the contents of `dist/` to the `gh-pages` branch, which GitHub Pages serves directly.

Because the application is hosted at a subpath (`/news-website/`) rather than the domain root, the following configuration is required:

- `vite.config.js` sets `base: "/news-website/"`
- `main.jsx` sets `<BrowserRouter basename="/news-website">`

The `.env` file is read at build time on the local machine running the deploy command; the API key itself is not committed to the repository.

---

## API Reference

News data is sourced from the [NewsData.io](https://newsdata.io) `/latest` endpoint.

**Known limitation:** the free tier of the API returns only a short article description; the full `content` field is restricted to paid plans and returns a placeholder string instead. The application detects this placeholder and falls back to displaying the description alongside a link to the original publisher, consistent with standard practice for news aggregators.

---

## License

This project was built as an academic assignment and is not licensed for commercial distribution. Article content, images, and headlines remain the property of their respective publishers.
