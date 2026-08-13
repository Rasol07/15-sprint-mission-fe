import { useEffect, useState } from "react";
import { getProducts } from "./api/products";
import "./App.css";
import { usePagination } from "./hooks/usePagination";

const PAGE_PER_PRODUCTS = 5;
const INITAL_PAGE = 1;

function App() {
  // product 값 저장
  const [products, setProducts] = useState([]);
  const { currentPage, totalPages, goToPage, setTotalCount } = usePagination(
    INITAL_PAGE,
    PAGE_PER_PRODUCTS,
  );

  useEffect(() => {
    const productDataLoad = async () => {
      try {
        const { list, totalCount } = await getProducts({
          page: currentPage,
          pageSize: PAGE_PER_PRODUCTS,
          standard: "favorite",
          keyword: "a",
        });
        setProducts(list);
        setTotalCount(totalCount);
      } catch (error) {
        console.log(error.message);
      }
    };

    productDataLoad();
  }, [currentPage, setTotalCount]);

  return (
    <div>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <p>{product.name}</p>
            <p>{product.description}</p>
            <span>{product.favoriteCount}</span>
          </li>
        ))}
      </ul>
      <div>
        <p>
          현재 페이지 : {currentPage} / 전체 페이지 : {totalPages}
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (pageNumber) => (
              <button key={pageNumber} onClick={() => goToPage(pageNumber)}>
                {pageNumber}
              </button>
            ),
          )}
        </p>
      </div>
    </div>
  );
}

export default App;
