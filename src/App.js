import "./styles.scss";
import Comment from "./components/comment";
import useFetchItems from "./hooks/useFetch";

export default function App() {
  const [data, status] = useFetchItems("topstories");
  const posts = data.sort((a, b) => (a.score <= b.score ? 1 : -1));
  return (
    <div className="App">
      <h1 className="glitch">HackerNews</h1>
      <h2>Top Stories</h2>
      <ul className="posts">
        {status !== "success"
          ? status
          : posts?.length > 0
          ? posts.map((post) => (
              <li className="post" key={`post-${post.id}`}>
                <h3>{post.title.trim()}</h3>
                {post?.url && (
                  <a href={post.url} target="_blank" rel="noopener noreferrer">
                    {post.url}
                  </a>
                )}
                <div>{post?.score}</div>
                {post?.kids && (
                  <details className="comments">
                    <summary>Comments</summary>
                    <ul>
                      {post.kids.map((kid) => (
                        <Comment comment={kid} />
                      ))}
                    </ul>
                  </details>
                )}
              </li>
            ))
          : "No Posts loaded"}
      </ul>
    </div>
  );
}
