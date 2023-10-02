import React, { useEffect, useState } from "react";
import { InputGroup, Button } from "reactstrap";
import { Link, useOutletContext, useParams } from "react-router-dom";
import CreateCommunity from "./CreateCommunity";

import { API } from "../lib";
import reply from "../images/reply.jpeg";

export const Postpage = () => {
  const { posts, token, fetchPosts, user, userId } = useOutletContext();
  console.log(posts);
  const { postId } = useParams();

  const [upVoteCount, setUpvoteCounts] = useState({});
  const [downvoteCounts, setDownvoteCounts] = useState({});

  async function handleUpvotes(postId) {
    // Assuming that you've already fetched 'upvotes' data along with 'posts'
    const post = posts.find((post) => post.id === postId);

    if (!post) {
      console.error(`Post with ID ${postId} not found.`);
      return;
    }

    const upvote = post.upvotes.find((upvote) => upvote.userId === user.id);

    if (!upvote) {
      const res = await fetch(`${API}/votes/upvotes/${postId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          // "Content-Type": "application/json",
        },
      });

      if (res.status === 200) {
        const info = await res.json();
        // Update the local state to reflect the new upvote count
        setUpvoteCounts((prevCounts) => ({
          ...prevCounts,
          [postId]: prevCounts[postId] ? prevCounts[postId] + 1 : 1,
        }));
        fetchPosts(); // Assuming this function fetches updated post data
      } else {
        console.error("Failed to upvote the post.");
      }
    } else {
      console.error("You have already upvoted this post.");
    }
  }
  //downvote
  async function handleDownvote(postId) {
    // Assuming that you've already fetched 'upvotes' data along with 'posts'
    const post = posts.find((post) => post.id === postId);
    if (!post) {
      console.error(`Post with ID ${postId} not found.`);
      return;
    }
    const downvote = post.downvotes.find(
      (downvote) => downvote.userId === user.id
    );

    if (!downvote) {
      const res = await fetch(`${API}/votes/downvotes/${postId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          // "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        const info = await res.json();
        setDownvoteCounts((prevCounts) => ({
          ...prevCounts,
          [postId]: prevCounts[postId] ? prevCounts[postId] + 1 : 1,
        }));
        fetchPosts(); // Assuming this function fetches updated post data
      } else {
        console.error("Failed to downvote the post.");
      }
    } else {
      console.error("You have already downvoted this post.");
    }
  }

  return (
    <div className="post-group">
      <CreateCommunity />
      {posts.map((post) => (
        <div
          key={post.id}
          style={{
            borderRadius: "10px",
            backgroundColor: "white",
            width: "50%",
            display: "flex",
            alignSelf: "center",
            boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
            paddingLeft: "10px",
            marginTop: "10px",
          }}
        >
          <InputGroup style={{ height: "150px", width: "80%" }}>
            <div className="votes-button">
              <Button outline onClick={() => handleUpvotes(post.id)}>
                ⬆
              </Button>
              <span className="votes-span">
                {upVoteCount[post.id] || 0} - {downvoteCounts[post.id] || 0}
              </span>

              <Button outline onClick={() => handleDownvote(post.id)}>
                ⬇
              </Button>
            </div>
            <div style={{ paddingLeft: "10px", marginTop: "20px" }}>
              <p>{post.subreddit.name}</p>
              <p>{post.title}</p>
              <p>{post.text}</p>
              <Link to={`/editPost/${post.id}`}>
                <img style={{ width: "20px" }} src={reply} />
              </Link>
            </div>
          </InputGroup>
        </div>
      ))}
    </div>
  );
};
