import styles from "./SearchButton.module.css";

export function SearchButton({ onClick }) {
  return (
    <button className={styles.searchButton} onClick={onClick}>
      상품 등록하기
    </button>
  );
}
