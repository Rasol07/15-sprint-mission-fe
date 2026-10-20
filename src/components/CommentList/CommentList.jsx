"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import background from "../../assets/article-detail/f9d63.svg";
import face from "../../assets/article-detail/cb723.svg";
import mask from "../../assets/article-detail/0e894.svg";
import replyEmpty from "../../assets/Img_reply_empty.png";
import kebab from "../../assets/article-detail/00532.svg";
import * as styles from "./CommentList.css.js";
import * as menuStyles from "../ArticleDetail/ArticleDetail.css.js";

const formatter = new Intl.RelativeTimeFormat("ko-KR", {
  numeric: "auto",
});

const formatRelativeTime = (commentTime, now) => {
  const date = new Date(commentTime);
  const elapsed = now - date.getTime();
  // minutes 단위
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (elapsed < minute) {
    return "방금 전";
  }

  if (elapsed < hour) {
    return formatter.format(-Math.floor(elapsed / minute), "minute");
  }

  if (elapsed < day) {
    return formatter.format(-Math.floor(elapsed / hour), "hour");
  }

  if (elapsed < 7 * day) {
    return formatter.format(-Math.floor(elapsed / day), "day");
  }
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

export default function CommentList({ comments }) {
  const [now, setNow] = useState(null);

  useEffect(() => {
    const update = () => setNow(Date.now());
    const initial = setTimeout(update, 0);
    const interval = setInterval(update, 60_000);

    return () => {
      clearTimeout(initial);
      clearInterval(interval);
    };
  }, []);

  if (comments.length === 0) {
    return (
      <div className={styles.empty}>
        <Image src={replyEmpty} alt="비어있는_댓글" width={140} height={140} />
        <p>아직 댓글이 없어요, 지금 댓글을 달아보세요!</p>
      </div>
    );
  }
  return (
    <ul className={styles.list} aria-label="댓글 목록">
      {comments.map((comment) => (
        <li key={comment.id} className={styles.item}>
          <div className={styles.body}>
            <p className={styles.content}>{comment.content}</p>
            <div className={styles.author}>
              <span className={styles.profile} aria-hidden="true">
                <Image
                  src={background}
                  alt=""
                  width={32}
                  height={32}
                  className={styles.layer}
                />
                <Image
                  src={face}
                  alt=""
                  width={22.059}
                  height={20}
                  className={styles.face}
                />
                <Image
                  src={mask}
                  alt=""
                  width={32}
                  height={32}
                  className={styles.layer}
                />
              </span>
              <div className={styles.metadata}>
                <span>{comment.author?.nickname ?? "익명"}</span>
                <time className={styles.date} dateTime={comment.createdAt}>
                  {now === null
                    ? "—"
                    : formatRelativeTime(comment.createdAt, now)}
                </time>
              </div>
            </div>
          </div>
          <details className={menuStyles.menu}>
            <summary
              className={menuStyles.menuTrigger}
              aria-label="댓글 더보기"
            >
              <Image src={kebab} alt="" width={3} height={13} />
            </summary>
            <div className={menuStyles.menuPanel}>
              <button
                className={menuStyles.menuItem}
                type="button"
                disabled
                title="수정 기능 준비 중"
              >
                수정하기
              </button>
              <button
                className={menuStyles.menuItem}
                type="button"
                disabled
                title="삭제 기능 준비 중"
              >
                삭제하기
              </button>
            </div>
          </details>
        </li>
      ))}
    </ul>
  );
}
