import "./styles.scss";
import { useEffect, useState } from "react";
const BASE_API_URL = "https://hacker-news.firebaseio.com/v0";
async function getPosts() {
  const url = BASE_API_URL + "/topstories.json";
  const topStoryIDs = (await (await fetch(url)).json()).slice(0, 10);
  const topStoriesWithDetailsPromises = topStoryIDs.map((storyID) =>
    getPostById(storyID)
  );
  return Promise.all(topStoriesWithDetailsPromises);
}
async function getPostById(postID) {
  const url = `${BASE_API_URL}/item/${postID}.json`;
  const data = await (await fetch(url)).json();
  return data;
}
export default function App() {
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState("loading");
  useEffect(() => {
    const fetchData = async () => {
      setStatus("success");
      const data = await getPosts();
      setPosts(data);
      console.log({ data });
    };
    if (status !== "success") {
      fetchData();
    }
  }, [posts, status]);
  return (
    <div className="App">
      <h1>HackerNews</h1>
      <h2>Top 10 Current Posts</h2>
      <ul className="posts">
        {status !== "success"
          ? status
          : posts?.length > 0
          ? posts.map((post) => (
              <li className="post" key={`post-${post.id}`}>
                {post.title.trim()}
              </li>
            ))
          : "No Posts loaded"}
      </ul>
    </div>
  );
}
