import article from "./ArticleService.mjs";
import product from "./ProductService.mjs";

try {
  // getArticleList 실습
  const articleDatas = await article.getArticleList({
    page: 1,
    pageSize: 10,
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

try {
  const productList = await product.getProuductList({
    page: 1,
    pageSize: 10,
    keyword: "제품",
  });
  console.log(productList);
  const productData = await product.getProduct(4029);
  console.log(productData);

  const createProduct = await product.createProduct({
    images: ["https://example.com/..."],
    tags: ["생활용품"],
    price: 0,
    description: "string",
    name: "테스트용",
  });
  console.log(createProduct);

  const fetchProduct = await product.patchProduct(createProduct.id, {
    images: ["https://example.com/..."],
    tags: ["전자제품"],
    price: 0,
    description: "string",
    name: "수정 상품 이름",
  });
  console.log(fetchProduct);

  const deleteProduct = await product.deleteProduct(createProduct.id);
  console.log(deleteProduct);
} catch (err) {
  console.log(err.message);
}
