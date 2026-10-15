"use client";

export default function CommentList({ comments }) {
  // 이거 다 쓰고 밥먹으러 간다 진짜로 .
  console.log(comments);
  return (
    <div>
      {comments.length > 0 ? (
        comments.map((comment) => <p key={comment.id}>{comment.content}</p>)
      ) : (
        <p>댓글이 없습니다.</p>
      )}
    </div>
  );
}
