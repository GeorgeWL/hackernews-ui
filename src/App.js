import "./styles.scss";
import { useEffect, useState } from "react";
const BASE_API_URL = "https://hacker-news.firebaseio.com/v0";
async function getPosts() {
  const url = BASE_API_URL + "/topstories.json";
  const topStoryIDs = (await (await fetch(url)).json()).slice(0, 10);
  const topStoriesWithDetails = [];
  topStoryIDs.forEach(async (storyID) => {
    const data = await getPostById(storyID);
    topStoriesWithDetails.push(data);
  });
  return topStoriesWithDetails;
}
async function getPostById(postID) {
  const url = `${BASE_API_URL}/item/${postID}.json`;
  const data = await (await fetch(url)).json();
  return data;
}
const fetchItems = async () => await getPosts();
export default function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  setTimeout(async () => {
    setLoading(false);
    // temp mock before switch to using proper
    const items = fetchItems();
    setPosts(items);
  }, 4000);
  return (
    <div className="App">
      <h1>HackerNews</h1>
      <h2>Top 10 Current Posts</h2>
      <ul className="posts">
        {loading
          ? "Loading"
          : posts?.length > 0
          ? posts.map((post) => <li key={`post-${post.id}`}>{post}</li>)
          : "No Posts loaded"}
      </ul>
    </div>
  );
}
