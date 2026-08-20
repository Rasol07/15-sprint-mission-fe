import "./App.css";
import { BestProductsList } from "./pages/BestProductList/BestProductsList";
import { ProductList } from "./pages/productList/ProductList";

function App() {
  // product 값 저장

  return (
    <div className="mainContainer">
      <div>
        <h2 className="bestProductTitle">배스트 상품</h2>
        <BestProductsList />
      </div>

      <ProductList />
    </div>
  );
}

export default App;
