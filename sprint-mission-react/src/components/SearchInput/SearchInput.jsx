import { useRef } from "react";
import searchIcon from "../../assets/ic_search.svg";
import styles from "./SearchInput.module.css";

export function SearchInput({ onChange }) {
  // useRef : 왜냐하면 그 react state로 매 글자 글자 추적을 안함.
  const inputRef = useRef(null);

  const handleSearch = () => {
    onChange(inputRef.current.value);
  };

  return (
    <div className={styles.searchHeader}>
      <div className={styles.searchBox}>
        <img src={searchIcon} alt="검색" />
        <input
          ref={inputRef}
          type="text"
          placeholder="검색할 상품을 입력해주세요"
        />
      </div>
      <button onClick={handleSearch}>상품 등록하기</button>
    </div>
  );
}
