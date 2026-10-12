import BoardSearch from "../../components/BoardSearch/BoardSearch";
import BoardList from "../../components/BoardList/BoardList";

export default async function BoardsPage({ searchParams }) {
  const { q = "", orderBy } = await searchParams;
  const keyword = typeof q === "string" ? q : "";
  const trimmed = keyword.trim();
  const sort = orderBy === "asc" ? "asc" : "desc";
  const query = new URLSearchParams({ keyword: trimmed, orderBy: sort });
  const response = await fetch(
    `http://localhost:5001/articles?${query.toString()}`,
    { cache: "no-store" },
  );

  if (!response.ok) {
    throw new Error("게시글 조회 실패");
  }

  const { data } = await response.json();

  return (
    <div>
      <p>안녕하세요</p>
      <BoardSearch />
      <BoardList articles={data} />
      <p>{trimmed}</p>
    </div>
  );
}
