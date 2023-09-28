import React, { useEffect, useState } from "react";
import { InputGroup, Input, Button } from "reactstrap";
import { useOutletContext, useParams } from "react-router-dom";

export const Postpage = () => {
  const { posts } = useOutletContext();
  console.log(posts);
  return (
    <div className="post-group">
      {posts.map((post) => (
        <div
          style={{
            borderRadius: "10px",
            backgroundColor: "lightgrey",
            width: "80%",
            boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
            paddingLeft: "10px",
          }}
        >
          <InputGroup style={{ height: "150px", width: "80%" }}>
            <div className="votes-button">
              <Button outline>⬆</Button>
              <span className="post-span">0</span>
              <Button outline>⬇</Button>
            </div>
            <div style={{ paddingLeft: "10px", marginTop: "20px" }}>
              <p>{post.subreddit.name}</p>
              <p>{post.title}</p>
              <p>{post.text}</p>
            </div>
          </InputGroup>
        </div>
      ))}
    </div>
  );
};
