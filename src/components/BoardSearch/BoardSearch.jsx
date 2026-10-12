"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BoardSearch() {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const query = keyword.trim();

    router.push(`/boards?q=${encodeURIComponent(query)}`);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          placeholder="검색어를 입력하세요"
        />
      </form>
    </>
  );
}
