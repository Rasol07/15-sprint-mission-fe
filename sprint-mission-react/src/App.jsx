import { useEffect, useState } from "react";
import { getProducts } from "./api/products";
import "./App.css";

function App() {
  // product 값 저장
  const [products, setProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const productDataLoad = async () => {
      try {
        const { list, totalCount } = await getProducts({
          page: 1,
          pageSize: 4,
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
  }, []);

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
    </div>
  );
}

export default App;
