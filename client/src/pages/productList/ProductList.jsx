import { Pagination } from "../../components/Pagination/Pagination";
import { SearchInput } from "../../components/SearchInput/SearchInput";
import { SortButton } from "../../components/SortButton/SortButton";
import { usePagination } from "../../hooks/usePagination";
import { useProducts } from "../../hooks/useProducts";
import { useState } from "react";
import styles from "./ProductList.module.css";
import { ProductCard } from "../productCard/productCard";
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
    <div className={styles.productListContainer}>
      <div className={styles.productListHeader}>
        <h2>판매 중인 상품</h2>
        <div className={styles.productListOption}>
          <SearchInput onChange={setKeyword} />
          <SortButton standard={standard} onChange={setStandard} />
        </div>
      </div>
      <div className={styles.productCardsContainer}>
        {isLoading
          ? "로딩 중..."
          : products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={goToPage}
      />
    </div>
  );
}
