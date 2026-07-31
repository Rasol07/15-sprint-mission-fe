import article from "./ArticleService.mjs";

try {
  // getArticleList 실습
  const articleDatas = await article.getArticleList({
    offset: 10,
    limit: 10,
    keyword: "게시글 수정",
  });
  console.log(articleDatas);

  //   // getArticle 실습
  const articleData = await article.getArticle(1667);
  console.log(articleData);

  // createArticle 실습
  const createArticleData = await article.createArticle({
    image: "https://example.com/...",
    content: "게시글 내용입니다.",
    title: "게시글 제목입니다.",
  });
  console.log(createArticleData);

  // patchArticle 실습
  const patchArticleData = await article.patchArticle(createArticleData.id, {
    image: "https://example.com/...",
    content: "게시글 수정입니다.",
    title: "게시글 제목입니다.",
  });
  console.log(patchArticleData);

  // deleteArticle 실습
  const deleteArticleData = await article.deleteArticle(createArticleData.id);
  console.log(deleteArticleData);
} catch (err) {
  console.log(err.message);
}
