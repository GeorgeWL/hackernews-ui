import { Loader } from "./components/loader";
import Post from "./components/post";
import useFetchItems from "./functional/useFetch";
import "./styles.css";
import "./normalize.css";

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
        </a>
      </div>
      <h1>HackerNews</h1>
      <h2>Top Stories</h2>
      <ul className="posts">
        {status !== "success"
          ? status === "loading" && <Loader />
          : posts?.length > 0
          ? posts.map((post) => <Post post={post} key={post.id} />)
          : "No Posts loaded"}
      </ul>
    </div>
  );
}
