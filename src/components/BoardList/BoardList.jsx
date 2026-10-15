"use client";

import { useRouter } from "next/navigation";

export default function BoardList({ articles }) {
  const router = useRouter();

  const handleClick = async (id) => {
    router.push(`/boards/${id}`);
  };
  return (
    <div>
      {articles.length > 0 ? (
        articles.map((article) => (
          <p key={article.id} onClick={() => handleClick(article.id)}>
            {article.title}
          </p>
        ))
      ) : (
        <p>게시글이 없습니다.</p>
      )}
    </div>
  );
}
