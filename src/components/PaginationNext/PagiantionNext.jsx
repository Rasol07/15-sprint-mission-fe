"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function PaginationNext({ currentPage, totalCount, limit }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const totalPage = Math.ceil(totalCount / limit);
  const pageNumbers = Array.from(
    { length: totalPage },
    (_, index) => index + 1,
  );

  const handlePageChange = (number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(number));
    router.push(`/boards?${params.toString()}`);
  };

  return (
    <div>
      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          aria-current={page === currentPage ? "page" : undefined}
        >
          {page}
        </button>
      ))}
      <p>{currentPage}</p>
    </div>
  );
}
