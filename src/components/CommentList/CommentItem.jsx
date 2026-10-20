"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import background from "../../assets/article-detail/f9d63.svg";
import face from "../../assets/article-detail/cb723.svg";
import mask from "../../assets/article-detail/0e894.svg";
import kebab from "../../assets/article-detail/00532.svg";
import { deleteComment, patchComment } from "../../api/comment.js";
import { formatRelativeTime } from "../../utils/formatRelativeTime.js";
import * as styles from "./CommentList.css.js";
import * as menuStyles from "../ArticleDetail/ArticleDetail.css.js";

export default function CommentItem({
  comment,
  targetType,
  targetId,
  now,
  isEditing,
  onStartEdit,
  onCancelEdit,
}) {
  const router = useRouter();
  const [draft, setDraft] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const handleUpdate = async (event, commentId) => {
    event.preventDefault();
    if (isSaving || !draft.trim()) return;

    setIsSaving(true);
    try {
      await patchComment({ targetType, targetId, commentId, content: draft });
      onCancelEdit();
      setDraft("");
      router.refresh();
    } catch {
      alert("댓글 수정에 실패했습니다.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await deleteComment({ targetType, targetId, commentId });
      router.refresh();
    } catch {
      alert("댓글 삭제에 실패했습니다.");
    }
  };

  return (
    <li className={styles.item}>
      <div className={styles.body}>
        {isEditing ? (
          <form
            className={styles.editForm}
            onSubmit={(event) => handleUpdate(event, comment.id)}
            aria-busy={isSaving}
          >
            <textarea
              className={styles.editInput}
              aria-label="댓글 수정"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              disabled={isSaving}
              required
            />
            <div className={styles.editActions}>
              <button
                type="button"
                className={styles.cancelButton}
                disabled={isSaving}
                onClick={() => {
                  onCancelEdit();
                  setDraft("");
                }}
              >
                취소
              </button>
              <button
                type="submit"
                className={styles.saveButton}
                disabled={isSaving || !draft.trim()}
              >
                {isSaving ? "저장 중" : "수정완료"}
              </button>
            </div>
          </form>
        ) : (
          <p className={styles.content}>{comment.content}</p>
        )}
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
              {now === null ? "—" : formatRelativeTime(comment.createdAt, now)}
            </time>
          </div>
        </div>
      </div>
      <details className={menuStyles.menu}>
        <summary className={menuStyles.menuTrigger} aria-label="댓글 더보기">
          <Image src={kebab} alt="" width={3} height={13} />
        </summary>
        <div className={menuStyles.menuPanel}>
          <button
            className={menuStyles.menuItem}
            type="button"
            disabled={isSaving}
            onClick={(event) => {
              setDraft(comment.content);
              onStartEdit();
              event.currentTarget.closest("details").open = false;
            }}
          >
            수정하기
          </button>
          <button
            className={menuStyles.menuItem}
            type="button"
            disabled={isSaving}
            onClick={() => handleDelete(comment.id)}
          >
            삭제하기
          </button>
        </div>
      </details>
    </li>
  );
}
