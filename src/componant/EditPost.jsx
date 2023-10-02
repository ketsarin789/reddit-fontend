import React, { useState } from "react";
import { useParams, useOutletContext, useNavigate } from "react-router-dom";
import { API } from "../lib";

function EditPost() {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");

  const [modal, setModa] = useState(false);
  const { token, posts, fetchPosts, user } = useOutletContext();

  const { postId } = useParams();
  console.log(postId);
  const navigate = useNavigate();
  const post = posts.find((post) => post.id === postId);

  async function handleReplySubmit(e) {
    e.preventDefault();
    const res = await fetch(`${API}/posts`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text, title }),
    });
    const info = await res.json();
    console.log(info);
    if (!info.success) {
      // Handle the error here, e.g., display an error message to the user
      console.error("Failed to submit the post.");
    } else {
      // Handle the success case here, e.g., clear the input fields and fetch updated posts
      setText("");
      setTitle("");
      fetchPosts();
      navigate("/");
    }
  }

  return (
    <div>
      {post && (
        <>
          <h5>{post.title}</h5>
          <p> Comment as {user.username}</p>
          <form onSubmit={handleReplySubmit}>
            <textarea
              placeholder="What are you thoughts?"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button type="submit">Comment</button>
          </form>
        </>
      )}
      <p>{text}</p>
    </div>
  );
}
export default EditPost;
