import { useEffect, useState } from "react";
const BASE_API_URL = "https://hacker-news.firebaseio.com/v0";

export default function useFetchItems(section) {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("loading");
  useEffect(() => {
    const fetchData = async () => {
      setStatus("success");
      const data = await getItemsFromSection(section);
      setData(data);
    };
    if (status !== "success") {
      fetchData();
    }
  }, [data, status, section]);
  return [data, status];
}

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
