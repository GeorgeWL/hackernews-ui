const BASE_API_URL = "https://hacker-news.firebaseio.com/v0";

export async function getItemsFromSection(section) {
  const url = `${BASE_API_URL}/${section}.json`;
  const entryIDs = (await (await fetch(url)).json()).slice(0, 10);
  const entryWithDetailsPromises = entryIDs.map((storyID) =>
    getItemById(storyID)
  );
  return Promise.all(entryWithDetailsPromises);
}

export async function getItemById(postID) {
  const url = `${BASE_API_URL}/item/${postID}.json`;
  const data = await (await fetch(url)).json();
  return data;
}
