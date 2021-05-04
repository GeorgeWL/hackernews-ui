export default function Comment({ comment }) {
  return (
    <li key={`comment-${comment.id}`} id={`comment-${comment.id}`}>
      <a href={`#comment-${comment.id}`}>
        {comment.by} @ {new Date(comment.date).toLocaleString()}
      </a>
      <p>{comment?.text}</p>
    </li>
  );
}
