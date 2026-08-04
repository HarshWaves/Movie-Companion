import React, { useState } from "react";
import "./Login.css";

const Signup = ({ setActiveTab }) => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: name,   // ⚠️ backend me username hai
          email,
          password
        })
      });

      const data = await res.json();

      if (res.ok) {
        alert("Signup Successful 🎉");

        // 👉 Auto switch to login
        setActiveTab("login");

      } else {
        alert(data.message);
      }

    } catch (err) {
      console.error(err);
      alert("Server error ❌");
    }
  };

  return (
    <div className="login-container">

      <div className="login-card">

        <div className="logo">
          🎬 Movie<span>Companion</span>
        </div>

        <h2>Create Account</h2>

        <p className="subtitle">
          Join us and start your movie journey
        </p>

        <form onSubmit={handleSignup}>

          <div className="input-group">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="Create Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit">
            Create Account
          </button>

        </form>

        <p className="signup-text">
          Already have an account?

          <span
            className="link-btn"
            onClick={() => setActiveTab("login")}
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
};

export default Signup;
