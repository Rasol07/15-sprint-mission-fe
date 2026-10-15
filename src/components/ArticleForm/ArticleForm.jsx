"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ArticleFrom() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          content: content.trim(),
        }),
      });
      if (!response.ok) {
        throw new Error("게시글 등록 실패");
      }
      router.push("/boards");
    } catch (error) {
      console.log(error);
      alert("게시글 등록에 실패했습니다.");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목을 입력해주세요"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="내용을 입력해주세요"
      ></textarea>
      <button type="submit">제출</button>
    </form>
  );
}
