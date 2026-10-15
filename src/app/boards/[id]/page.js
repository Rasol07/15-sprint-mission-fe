import CommentList from "../../../components/CommentList/CommentList";

export default async function ArticlePage({ params }) {
  const { id } = await params;
  const articleResponse = await fetch(`http://localhost:5001/articles/${id}`);
  if (!articleResponse.ok) {
    throw new Error("게시글을 불러오지 못했습니다.");
  }

  const { data: article } = await articleResponse.json();

  const commentResponse = await fetch(
    `http://localhost:5001/articles/${id}/comments`,
  );
  if (!commentResponse.ok) {
    throw new Error("댓글을 불러오지 못했습니다.");
  }

  const { data: comments } = await commentResponse.json();

  return (
    <div>
      <section>
        <h1>{article.title}</h1>
        <p>{article.content}</p>
      </section>
      <div> 댓글 부분 </div>
      <CommentList comments={comments} />
    </div>
  );
}
