import { useState } from "react";
import { getItemById } from "../functional/getItems";
import Comment from "./comment";

export default function Comments({ comments }) {
  const [commentMap, setCommentMap] = useState([]);
  async function getCommentsRecursive() {
    const currentDepth = comments.map((commentId) => getItemById(commentId));
    const currentDepthData = Promise.all(currentDepth);
    const currentDepthComponents = (await currentDepthData).map((item) => (
      <>
        <Comment comment={item} key={item.id} />
        {item.kids && <Comments comments={item.kids} />}
      </>
    ));
    setCommentMap(currentDepthComponents);
  }
  return (
    <details className="comments" onClick={getCommentsRecursive}>
      <summary onClick={getCommentsRecursive}>Comments</summary>
      <ul>{commentMap}</ul>
    </details>
  );
}
