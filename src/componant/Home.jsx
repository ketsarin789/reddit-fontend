import React from "react";
import media from "../images/socia.jpeg";
import link from "../images/link-icon.jpeg";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className="form-container1">
        <form>
          <Link to="./ClearPostpage">
            <input
              type="text"
              placeholder="Create Post"
              className="input-container1"
            />
          </Link>
          <Link to="">
            <img className="media" src={media} />
          </Link>
          <Link>
            <img className="media" src={link} />
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Home;
