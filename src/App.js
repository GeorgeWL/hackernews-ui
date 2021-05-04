import "./styles.scss";
import useFetchItems from "./functional/useFetch";
import Comments from "./components/comments";

export default function App() {
  const [data, status] = useFetchItems("topstories");
  const posts = data.sort((a, b) => (a.score <= b.score ? 1 : -1));
  return (
    <div className="App">
      <div className="ie11">
        Your browser is not compatible. <br />
        Upgrade to a faster and more modern browser. <br />
        <a
          href="https://death-to-ie11.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          More Info.
        </a>{" "}
      </div>
      <h1>HackerNews</h1>
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
                {post?.kids && <Comments comments={post.kids} />}
              </li>
            ))
          : "No Posts loaded"}
      </ul>
    </div>
  );
}
