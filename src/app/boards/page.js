import BoardSearch from "../../components/BoardSearch/BoardSearch";
import BoardList from "../../components/BoardList/BoardList";
import PaginationNext from "../../components/PaginationNext/PagiantionNext";
import WriteButton from "../../components/WriteButton/WriterButton";
import { getArticles } from "../../api/articles";
import BestBoardList from "../../components/BestBoardList/page";
import * as styles from "./boards.css.js";

export default async function BoardsPage({ searchParams }) {
  const { q = "", orderBy, page = 1 } = await searchParams;
  const keyword = typeof q === "string" ? q : "";
  const trimmed = keyword.trim();
  const sort = orderBy === "asc" ? "asc" : "desc";
  const limit = 5;

  const { data, count } = await getArticles({
    keyword: trimmed,
    orderBy: sort,
    page,
    limit: 5,
  });

  const { data: latestArticles } = await getArticles({
    limit: 3,
  });

  return (
    <div className={styles.container}>
      <h1>베스트 게시글</h1>
      <BestBoardList articles={latestArticles} />
      <h1>게시글</h1>
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
