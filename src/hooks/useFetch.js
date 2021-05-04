// move hooks to here

import { useState } from 'react';

export default function useFetchItems(section) {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState('loading');
  return [data, setData];
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
