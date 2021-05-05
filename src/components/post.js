import Comments from "./comments";

export default function Post({ post }) {
  return (
    <li className="post">
      <h3>{post.title.trim()}</h3>
      {post?.url && (
        <a href={post.url} target="_blank" rel="noopener noreferrer">
          {post.url}
        </a>
      )}
      <div>{post?.score}</div>
      {post?.kids && <Comments comments={post.kids} />}
    </li>
  );
}
