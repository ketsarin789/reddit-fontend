import React, { useState } from "react";
import { API } from "../lib/index";
import { useOutletContext } from "react-router-dom";

function Register() {
  const { user, setUser } = useOutletContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isRegister, setRegister] = useState(false);

  const { setToken } = useOutletContext();

  async function handleRegister(e) {
    e.preventDefault();
    setUser(`You are now register ${user}`);

    const res = await fetch(`${API}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const info = await res.json();
    console.log(info);
    if (!info.success) {
      return setError(info.error);
    }
    setToken(info.token);
    localStorage.setItem("token", info.token);
    setRegister(true);
  }

  return (
    <div>
      {isRegister ? (
        <div></div>
      ) : (
        <form onSubmit={handleRegister} className="form-container">
          <h1>Register</h1>
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
          <button>Register</button>
        </form>
      )}
      <p>{error}</p>
    </div>
  );
}

export default Register;
