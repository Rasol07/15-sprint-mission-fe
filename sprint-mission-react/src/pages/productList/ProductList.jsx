import { Pagination } from "../../components/Pagination/Pagination";
import { SearchInput } from "../../components/SearchInput/SearchInput";
import { SortButton } from "../../components/SortButton/SortButton";
import { usePagination } from "../../hooks/usePagination";
import { useProducts } from "../../hooks/useProducts";
import { useState } from "react";
export function ProductList() {
  const [standard, setStandard] = useState("recent");
  const [keyword, setKeyword] = useState("");

  const { currentPage, totalPages, goToPage, setTotalCount } = usePagination(
    1,
    10,
  );
  const { products, isLoading } = useProducts({
    page: currentPage,
    pageSize: 10,
    standard,
    keyword,
    setTotalCount, // ← usePagination의 setTotalCount를 그대로 넘김
  });

  return (
    <div>
      <div>
        <h2>판매 중인 상품</h2>
        <SortButton standard={standard} onChange={setStandard} />
        <SearchInput onChange={setKeyword} />
      </div>
      {isLoading
        ? "로딩 중..."
        : products.map((p) => <div key={p.id}>{p.name}</div>)}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={goToPage}
      />
    </div>
  );
}
