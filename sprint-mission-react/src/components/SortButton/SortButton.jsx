import { useState } from "react";

export function SortButton({ standard, onChange }) {
  // 열려있음 : 누가 어떤 버튼을 눌렀다. -> 그 버튼 값으로 standard를 변화해야함.
  // 그러고 이제 닫힘 상태로 바꿔야 한다.
  // 닫혀있음 : 버튼을 눌렀다. -> 그럼 이제 열림상태 보여주고, 열심상태로 바꿔야한다.

  const SORT_OPTION = [
    { value: "recent", label: "최신순" },
    { value: "favorite", label: "인기순" },
  ];
  const [isOpen, setIsOpen] = useState(false);

  // 만약에 어떤 버튼을 눌렀을 때 행해야 할 함수

  return (
    <div>
      <button onClick={() => setIsOpen((prev) => !prev)}>
        {SORT_OPTION.find((option) => option.value === standard)?.label ??
          "정렬"}
      </button>
      {isOpen && (
        <ul>
          {SORT_OPTION.map((option) => (
            <li key={option.value}>
              <button
                onClick={() => {
                  setIsOpen((prev) => !prev);
                  onChange(option.value);
                }}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
