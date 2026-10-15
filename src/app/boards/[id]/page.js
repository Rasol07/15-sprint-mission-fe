export default async function ArticlePage({ params }) {
  const { id } = await params;
  const response = await fetch(`http://localhost:5001/articles/${id}`);
  if (!response.ok) {
    throw new Error("게시글을 불러오지 못했습니다.");
  }

  const { data: article } = await response.json();

  return (
    <div>
      <h1>{article.title}</h1>
      <p>{article.content}</p>
    </div>
  );
}
