"use client";

export default function BoardList({ articles }) {
  return (
    <div>
      {articles.length > 0 ? (
        articles.map((article) => <p key={article.id}>{article.title}</p>)
      ) : (
        <p>게시글이 없습니다.</p>
      )}
    </div>
  );
}
