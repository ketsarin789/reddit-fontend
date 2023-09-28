import { Link } from "react-router-dom";
import React from "react";
import redditIcon from "../images/reddit.jpeg";
import home from "../images/home.png";

function Nav({ user, setUser, setToken }) {
  function handleLogout() {
    setToken("");
    setUser({});
    localStorage.removeItem("token");
  }
  return (
    <div className="nav-container">
      <div className="icon-container" style={{ paddingTop: "10px" }}>
        <img src={redditIcon} alt="reddit" />

        <Link>
          <img
            src={home}
            alt="home"
            style={{ width: "20px", paddingTop: "13px" }}
          />
        </Link>

        <span>
          <img />
        </span>
        <input placeholder="search reddit" className="input-container" />
      </div>
      <div style={{ gap: "5px" }}>
        <span>➕</span>
        <Link className="link" to="/createPost">
          Create Post
        </Link>
      </div>
      <div className="link-container">
        {user ? (
          <div>Welcome {user.username}</div>
        ) : (
          <button style={{ borderRadius: "10px" }}>
            <Link className="link" to={"/login"}>
              Login
            </Link>
          </button>
        )}

        {user ? (
          <button style={{ borderRadius: "10px" }}>
            <Link className="link" to={"/"} onClick={() => setUser("")}>
              Logout
            </Link>
          </button>
        ) : (
          <button
            style={{
              backgroundColor: "green",
              borderRadius: "10px",
            }}
          >
            <Link style={{ color: "white" }} className="link" to={"/register"}>
              Register
            </Link>
          </button>
        )}
      </div>
    </div>
  );
}

export default Nav;
