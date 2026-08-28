import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
// import { BestProductsList } from "./pages/BestProductList/BestProductsList";
import { ProductList } from "./pages/productList/ProductList";
import { ProductRegistration } from "./pages/ProductRegistration/ProductRegistration";

function App() {
  // product 값 저장

  return (
    <div>
      <Header />
      <div className="mainContainer">
        <Routes>
          {/* 차후에 경로 변경해야함 */}
          <Route path="/" element={<ProductList />}></Route>
          <Route path="/registration" element={<ProductRegistration />}></Route>
        </Routes>
        {/* <div>
          <BestProductsList />
        </div> */}
      </div>
      <Footer />
    </div>
  );
}

export default App;
