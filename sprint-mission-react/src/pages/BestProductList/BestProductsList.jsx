import { useProducts } from "../../hooks/useProducts";
import { BestProductCard } from "../BestProductCard/BestProductCard";
import styles from "./BestProductList.module.css";

export function BestProductsList() {
  const { products } = useProducts({ standard: "favorite", pageSize: 4 });

  return (
    <div className={styles.bestProductListContainer}>
      <ul>
        {products.map((product) => (
          <BestProductCard key={product.id} product={product} />
        ))}
      </ul>
    </div>
  );
}
