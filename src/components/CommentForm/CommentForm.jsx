"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CommentForm({ id }) {
  const [content, setContent] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim()) {
      alert("댓글을 입력해주세요.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5001/articles/${id}/comments`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            content: content.trim(),
          }),
        },
      );

      if (!response.ok) {
        throw new Error("댓글");
      }
      setContent("");
      router.refresh();
    } catch {
      alert("댓글 등록에 실패했습니다.");
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="댓글을 입력해주세요/"
        />
        <button type="submit">확인</button>
      </form>
    </div>
  );
}
