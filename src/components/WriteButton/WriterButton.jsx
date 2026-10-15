"use client";

import { useRouter } from "next/navigation";

export default function WriteButton() {
  const router = useRouter();

  return <button onClick={() => router.push("/boards/write")}>글 쓰기</button>;
}
