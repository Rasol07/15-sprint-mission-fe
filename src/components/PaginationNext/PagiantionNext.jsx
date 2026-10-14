"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function PaginationNext({ currentPage, totalPage, limit }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 일단 버튼 누르면 page 값이 바뀌고 그걸 전달해주는 과정이 필요
  // 근데 버튼의 총 갯수도 필요하잖아.
  const buttonCount = Math.ceil(totalPage / limit);
  const buttonArr = Array.from({ length: buttonCount }, (_, i) => i);

  const handleClick = (number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(number));
    router.push(`/boards?${params.toString()}`);
  };
  return (
    <div>
      {buttonArr.map((number) => (
        <button key={number} onClick={() => handleClick(number + 1)}>
          {number + 1}
        </button>
      ))}
      <p>{currentPage}</p>
    </div>
  );
}
