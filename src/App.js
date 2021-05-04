import './styles.scss';
import { useEffect, useState } from 'react';
import Comment from './components/comment';
const BASE_API_URL = 'https://hacker-news.firebaseio.com/v0';
async function getItemsFromSection(section) {
  const url = `${BASE_API_URL}/${section}.json`;
  const topStoryIDs = (await (await fetch(url)).json()).slice(0, 10);
  const topStoriesWithDetailsPromises = topStoryIDs.map((storyID) =>
    getItemById(storyID)
  );
  return Promise.all(topStoriesWithDetailsPromises);
}
async function getItemById(postID) {
  const url = `${BASE_API_URL}/item/${postID}.json`;
  const data = await (await fetch(url)).json();
  return data;
}
export default function App() {
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState('loading');
  useEffect(() => {
    const fetchData = async () => {
      setStatus('success');
      const data = await getItemsFromSection('topstories');
      setPosts(data);
    };
    if (status !== 'success') {
      fetchData();
    }
  }, [posts, status]);
  return (
    <div className="App">
      <h1 className="glitch">HackerNews</h1>
      <h2>Top Stories</h2>
      <ul className="posts">
        {status !== 'success'
          ? status
          : posts?.length > 0
          ? posts
              .sort((a, b) => (a.score <= b.score ? 1 : -1))
              .map((post) => (
                <li className="post" key={`post-${post.id}`}>
                  <h3>{post.title.trim()}</h3>
                  {post?.url && (
                    <a
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
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
          : 'No Posts loaded'}
      </ul>
    </div>
  );
}
