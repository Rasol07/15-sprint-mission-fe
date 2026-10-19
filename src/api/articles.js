import { API_BASE_URL } from "../constants/api";

export async function getArticles({
  keyword = "",
  orderBy = "desc",
  page = 1,
  limit = 5,
}) {
  const query = new URLSearchParams({
    keyword,
    orderBy,
    page: String(page),
    limit: String(limit),
  });

  const response = await fetch(`${API_BASE_URL}/articles?${query}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("게시글 조회 실패");
  }

  return response.json();
}
