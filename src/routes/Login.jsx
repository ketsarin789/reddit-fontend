import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { API } from "../lib/index.js";

export default function Login() {
  const { user, setUser } = useOutletContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLogin, setLogin] = useState(false);

  const { setToken } = useOutletContext();

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setUser("");
    const res = await fetch(`${API}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const info = await res.json();
    if (!info.success) {
      return setError(info.error);
    }
    setToken(info.token);
    localStorage.setItem("token", info.token);
    navigate("/");
    setLogin(true);
  }

  return (
    <div>
      {isLogin ? (
        <div>
          <h5>Login Successful</h5>
        </div>
      ) : (
        <form
          onSubmit={handleLogin}
          className="form-container"
          style={{ backgroundColor: "white" }}
        >
          <h1>Login</h1>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="username"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
          <button>Login</button>
        </form>
      )}
      <p>{error}</p>
    </div>
  );
}
