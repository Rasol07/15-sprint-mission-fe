import styles from "./BestProductCard.module.css";

export function BestProductCard({ product }) {
  return (
    <div className={styles.bestProductCardContainer}>
      <img src={product.images[0]} />
      <div className={styles.bestProductCardContent}>
        <h3>{product.name}</h3>
        <h2>{product.price}원</h2>
        <p>{product.favoriteCount}</p>
      </div>
    </div>
  );
}
