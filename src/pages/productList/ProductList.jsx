import { Pagination } from "../../components/Pagination/Pagination";
import { SearchInput } from "../../components/SearchInput/SearchInput";
import { SortButton } from "../../components/SortButton/SortButton";
import { usePagination } from "../../hooks/usePagination";
import { useProducts } from "../../hooks/useProducts";
import { useRef, useState } from "react";
import styles from "./ProductList.module.css";
import { ProductCard } from "../productCard/productCard";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { SearchButton } from "../../components/SearchButton/SearchButton";

export function ProductList() {
  const [standard, setStandard] = useState("recent");
  const [keyword, setKeyword] = useState("");
  const isTablet = useMediaQuery("(max-width: 744px)");
  const isMobile = useMediaQuery("(max-width: 375px)");
  const pageSize = isMobile ? 4 : isTablet ? 6 : 10;
  const searchInputRef = useRef(null);

  const { currentPage, totalPages, goToPage, setTotalCount } = usePagination(
    1,
    pageSize,
  );
  const { products, isLoading } = useProducts({
    page: currentPage,
    pageSize,
    standard,
    keyword,
    setTotalCount, // ← usePagination의 setTotalCount를 그대로 넘김
  });

  const handleSearch = () => {
    setKeyword(searchInputRef.current.value);
  };

  if (isMobile) {
    return (
      <div className={styles.productListContainer}>
        <div className={styles.productListHeader}>
          <h2>판매 중인 상품</h2>
          <SearchButton onClick={handleSearch} />
        </div>
        <div className={styles.mobileSort}>
          <SearchInput inputRef={searchInputRef} />
          <SortButton
            standard={standard}
            onChange={setStandard}
            mobileIcon={isMobile}
          />
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

  return (
    <div className={styles.productListContainer}>
      <div className={styles.productListHeader}>
        <h2>판매 중인 상품</h2>

        <SearchInput inputRef={searchInputRef} />
        <SearchButton onClick={handleSearch} />
        <SortButton
          standard={standard}
          onChange={setStandard}
          mobileIcon={isMobile}
        />
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
