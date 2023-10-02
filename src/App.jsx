import "./App.css";
import Nav from "./componant/Nav";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { API } from "./lib/index";
import Home from "./componant/Home";
import { Postpage } from "./componant/Postpage";

function App() {
  const [user, setUser] = useState({});
  const [token, setToken] = useState("");
  const [posts, setPosts] = useState([]);

  const [subreddits, setSubreddits] = useState([]);

  async function fetchUser() {
    const localToken = localStorage.getItem("token");

    if (localToken) {
      setToken(localToken);
    }
    if (!token) {
      return;
    }
    const res = await fetch(`${API}/users/token`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const info = await res.json();

    if (info.success) {
      setUser(info.user);
    }
  }
  async function fetchPosts() {
    const res = await fetch(`${API}/posts`);
    const info = await res.json();
    if (info.success) {
      console.log(info);
      setPosts(info.posts);
    }
  }
  async function fetchSubreddit() {
    const res = await fetch(`${API}/subreddits`);
    const info = await res.json();

    if (info.success) {
      setSubreddits(info.subreddits);
    }
  }

  useEffect(() => {
    fetchUser();
    fetchPosts();
    fetchSubreddit();
  }, [token]);
  return (
    <div>
      <Nav setUser={setUser} user={user} />

      <Outlet
        context={{
          user,
          setUser,
          setToken,
          fetchPosts,
          posts,
          setPosts,
          fetchSubreddit,
          subreddits,
          token,
        }}
      />
    </div>
  );
}

export default App;
