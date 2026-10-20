import ArticleDetail from "../../../components/ArticleDetail/ArticleDetail";
import { getArticle } from "../../../api/articles";
import CommentForm from "../../../components/CommentForm/CommentForm";
import CommentList from "../../../components/CommentList/CommentList";
import * as styles from "./page.css.js";
import BackButton from "../../../components/BackButton/BackButton.jsx";

export default async function ArticlePage({ params }) {
  const { id } = await params;
  const { data: article } = await getArticle(id);
  const commentResponse = await fetch(
    `http://localhost:5001/articles/${id}/comments`,
    { cache: "no-store" },
  );
  if (!commentResponse.ok) {
    throw new Error("댓글을 불러오지 못했습니다.");
  }

  const { data: comments } = await commentResponse.json();

  return (
    <div className={styles.container}>
      <ArticleDetail article={article} />
      <div>
        <CommentForm id={id} />
        <CommentList comments={comments} />
      </div>
      <BackButton />
    </div>
  );
}
