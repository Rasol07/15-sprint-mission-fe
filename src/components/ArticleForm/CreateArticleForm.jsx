"use client";

import { useRouter } from "next/navigation";
import { postArticles } from "../../api/articles.js";
import ArticleForm from "./ArticleForm";

export default function CreateArticleForm() {
  const router = useRouter();

  const handleCreate = async (values) => {
    await postArticles(values);
    router.push("/boards");
  };

  return (
    <ArticleForm
      heading="게시글 쓰기"
      submitLabel="등록"
      onSubmit={handleCreate}
    />
  );
}
