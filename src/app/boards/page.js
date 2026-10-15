import BoardSearch from "../../components/BoardSearch/BoardSearch";
import BoardList from "../../components/BoardList/BoardList";
import PaginationNext from "../../components/PaginationNext/PagiantionNext";
import WriteButton from "../../components/WriteButton/WriterButton";

export default async function BoardsPage({ searchParams }) {
  const { q = "", orderBy, page = 1 } = await searchParams;
  const keyword = typeof q === "string" ? q : "";
  const trimmed = keyword.trim();
  const sort = orderBy === "asc" ? "asc" : "desc";
  const limit = 5;
  console.log("page", page);
  console.log("limit", limit);

  const query = new URLSearchParams({
    keyword: trimmed,
    orderBy: sort,
    page: page,
    limit: limit,
  });
  const response = await fetch(
    `http://localhost:5001/articles?${query.toString()}`,
    { cache: "no-store" },
  );

  if (!response.ok) {
    throw new Error("게시글 조회 실패");
  }

  const { data, count } = await response.json();

  console.log(count);
  return (
    <div>
      <WriteButton />
      <BoardSearch />
      <BoardList articles={data} />
      <p>{trimmed}</p>
      <PaginationNext
        currentPage={Number(page)}
        totalCount={count}
        limit={limit}
      />
    </div>
  );
}
