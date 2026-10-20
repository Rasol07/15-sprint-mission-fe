"use client";

import Image from "next/image";
import heart from "../../assets/article-detail/da76e.svg";
import profileBackground from "../../assets/article-detail/a1f00.svg";
import profileFace from "../../assets/article-detail/ffaeb.svg";
import profileMask from "../../assets/article-detail/1dcf2.svg";
import kebab from "../../assets/article-detail/00532.svg";
import divider from "../../assets/article-detail/c5ce6.svg";
import verticalDivider from "../../assets/article-detail/1cbff.svg";
import * as styles from "./ArticleDetail.css.js";
import { deleteArticle } from "../../api/articles.js";
import { useRouter } from "next/navigation";

export default function ArticleDetail({ article }) {
  const router = useRouter();
  const date = new Date(article.createdAt)
    .toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      timeZone: "Asia/Seoul",
    })
    .replace(/\.$/, "");

  const onDelete = async () => {
    try {
      console.log(article.id);
      await deleteArticle({ id: article.id });
      router.push("/boards");
    } catch {
      alert("게시글 삭제에 실패했습니다.");
    }
  };
  return (
    <article className={styles.article}>
      <header className={styles.header}>
        <div className={styles.titleRow}>
          <h1 className={styles.title}>{article.title}</h1>
          <details className={styles.menu}>
            <summary className={styles.menuTrigger} aria-label="게시글 더보기">
              <Image src={kebab} alt="" width={3} height={13} />
            </summary>
            <div className={styles.menuPanel}>
              <button
                type="button"
                className={styles.menuItem}
                onClick={() => router.push(`/boards/${article.id}/edit`)}
              >
                수정하기
              </button>
              <button
                type="button"
                className={styles.menuItem}
                onClick={onDelete}
              >
                삭제하기
              </button>
            </div>
          </details>
        </div>
        <div className={styles.metadata}>
          <div className={styles.author}>
            <span className={styles.profile} aria-hidden="true">
              <Image
                src={profileBackground}
                alt=""
                width={40}
                height={40}
                className={styles.profileLayer}
              />
              <Image
                src={profileFace}
                alt=""
                width={27.5741}
                height={25.0001}
                className={styles.profileFace}
              />
              <Image
                src={profileMask}
                alt=""
                width={40}
                height={40}
                className={styles.profileLayer}
              />
            </span>
            <div className={styles.authorText}>
              <span className={styles.name}>
                {article.author?.nickname ?? "익명"}
              </span>
              <time className={styles.date} dateTime={article.createdAt}>
                {date}
              </time>
            </div>
          </div>
          <div className={styles.likesGroup}>
            <Image src={verticalDivider} alt="" width={1} height={34} />
            <span
              className={styles.likes}
              aria-label={`좋아요 ${article.likeCount ?? 0}개`}
            >
              <Image src={heart} alt="" width={32} height={32} />
              {article.likeCount ?? 0}
            </span>
          </div>
        </div>
        <div className={styles.divider} aria-hidden="true">
          <Image
            src={divider}
            alt=""
            width={1200}
            height={1}
            className={styles.dividerImage}
          />
        </div>
      </header>
      <p className={styles.content}>{article.content}</p>
    </article>
  );
}
