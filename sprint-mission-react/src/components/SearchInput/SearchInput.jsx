import { useRef } from "react";

export function SearchInput({ onChange }) {
  // useRef : 왜냐하면 그 react state로 매 글자 글자 추적을 안함.
  const inputRef = useRef(null);

  const handleSearch = () => {
    onChange(inputRef.current.value);
  };

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={handleSearch}>검색</button>
    </div>
  );
}
