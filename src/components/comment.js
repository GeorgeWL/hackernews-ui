export default function Comment({ comment }) {
  return (
    <li id={`comment-${comment.id}`}>
      <p>
        <a href={`#comment-${comment.id}`}>#{comment.id}</a>
        &nbsp; {comment.by} - {new Date(comment.time).toLocaleString()}
      </p>
      <div dangerouslySetInnerHTML={{ __html: comment?.text }} />
    </li>
  );
}
