import axios from "axios";

const API_KEY = import.meta.env.VITE_NEWSDATA_KEY;

const client = axios.create({
  baseURL: "https://newsdata.io/api/1",
  timeout: 15000,
});

// Tab label 
export const CATEGORIES = [
  { label: "Top Headlines", value: "top" },
  { label: "Business", value: "business" },
  { label: "Technology", value: "technology" },
  { label: "Sports", value: "sports" },
];

//only this file changes during news api
function normalize(item) {
  return {
    id: item.article_id,
    title: item.title,
    summary: item.description,
    content: item.content,
    image: item.image_url,
    source: item.source_name || item.source_id,
    sourceUrl: item.link,
    publishedAt: item.pubDate,
    category: item.category?.[0] ?? "top",
    country: item.country?.[0] ?? "",
  };
}

export async function fetchNews({
  category = "top",
  country = "in",
  query = "",
  page = null,
  signal,
} = {}) {
  if (!API_KEY) {
    throw new Error("Missing VITE_NEWSDATA_KEY. Add it to your .env file and restart the dev server.");
  }

  const params = {
    apikey: API_KEY,
    language: "en",
    image: 1,
    removeduplicate: 1,
  };

  if (country) params.country = country;      
  if (category) params.category = category;
  if (query.trim()) params.q = query.trim();
  if (page) params.page = page;                

  const { data } = await client.get("/latest", { params, signal });

  if (data.status !== "success") {
    throw new Error(data?.results?.message || "Could not load news right now.");
  }

  return {
    articles: (data.results || []).map(normalize).filter((a) => a.id && a.title),
    nextPage: data.nextPage ?? null,
  };
}

export function formatDate(value) {
  if (!value) return "";
  const date = new Date(value.replace(" ", "T"));
  if (Number.isNaN(date.getTime())) return value;

  const minutes = Math.round((Date.now() - date.getTime()) / 60000);
  if (minutes < 60) return `${Math.max(minutes, 1)}m ago`;
  if (minutes < 1440) return `${Math.round(minutes / 60)}h ago`;

  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}