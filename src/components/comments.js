import Comment from "./comment";

export default function Comments({ comments }) {
  return (
    <details className="comments">
      <summary>Comments</summary>
      <ul>
        {comments.map((comment) => (
          <Comment comment={comment} />
        ))}
      </ul>
    </details>
  );
}
