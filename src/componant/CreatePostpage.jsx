import React, { useEffect, useState } from "react";

import { Container, Row, Col } from "reactstrap";
import { Link, useOutletContext, useParams } from "react-router-dom";
import socia from "../images/socia.jpeg";
import link from "../images/link-icon.jpeg";
import { useNavigate } from "react-router-dom";
import { API } from "../lib/index.js";

function CreatePostpage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [subredditId, setSubredditId] = useState("");
  const navigate = useNavigate();
  const { fetchPosts, token, fetchSubreddit, subreddits } = useOutletContext();

  useEffect(() => {
    setIsModalOpen(!isModalOpen);
  }, []);

  async function handleSubmit(e) {
    setError("");
    e.preventDefault();
    console.log(text, title, subredditId, token);
    const res = await fetch(`${API}/posts`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text, title, subredditId: subredditId }), //subredditId: subreddit.id
    });
    const info = await res.json();

    if (!info.success) {
      setError(info.error);
    }
    setText("");
    fetchPosts();
    fetchSubreddit();
    navigate("/");
  }

  return (
    <Container
      style={{
        width: "700px",
        height: "500px",
        paddingTop: "10px",
        marginTop: "20px",
        // border: "thick double #32a1ce",
        boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
      }}
    >
      <div className="drafts-div">
        <p>Create a post</p>
        <button className="button-draft">
          DRAFTS <span>0</span>
        </button>
      </div>
      <div>
        <select onChange={(e) => setSubredditId(e.target.value)}>
          {subreddits.map((subreddit) => (
            <option key={subreddit.id} value={subreddit.id}>
              {subreddit.name}
            </option>
          ))}
        </select>
      </div>

      <Row style={{ marginTop: "30px" }}>
        <Col>
          <i>〒</i>
          <Link style={{ paddingLeft: "5px" }} className="link">
            Post
          </Link>
        </Col>
        <Col>
          <img
            src={socia}
            style={{
              width: "25px",
              paddingRight: "5px",
              color: "blue",
            }}
          />
          <Link className="link">Image and Video</Link>
        </Col>
        <Col>
          <img
            src={link}
            style={{
              width: "30px",
              paddingRight: "5px",
              color: "blue",
            }}
          />
          <Link className="link">Link</Link>
        </Col>
        <Col>
          <Link className="link">Poll</Link>
        </Col>
      </Row>

      <form
        style={{ marginTop: "30px" }}
        className="createPost"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          style={{ marginTop: "30px" }}
          value={text}
          placeholder="Text"
          onChange={(e) => setText(e.target.value)}
        />

        <p>{error}</p>
        <div>
          <button className="post-button">Post</button>
          <button outline className="post-button1">
            Save Draft
          </button>
        </div>
      </form>
    </Container>
  );
}

export default CreatePostpage;
