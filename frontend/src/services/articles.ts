import type { Article } from "../types";

const API_BASE = "http://127.0.0.1:8000/api";

export async function fetchArticles(): Promise<Article[]> {
  const res = await fetch(`${API_BASE}/articles`, {
    headers: {
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  return res.json();
}
