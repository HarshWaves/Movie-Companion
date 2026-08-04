import React, { useState } from "react";
import "./Login.css";
import { toast } from 'react-toastify';

const Login = ({ setActiveTab, setIsLoggedIn }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {

        toast.success("Login Successful 🎬");

        // save JWT token
        localStorage.setItem("token", data.token);


        // 🔥 save user details also
        localStorage.setItem("user", JSON.stringify(data.user));


        setIsLoggedIn(true);

        setActiveTab("catalog");

      }
      else {
        toast.error(data.message);
      }

    } catch (err) {
      console.error(err);
      toast.error("Server error ❌");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <div className="logo">
          🎬 Movie<span>Companion</span>
        </div>

        <h2>Welcome Back</h2>

        <p className="subtitle">
          Login to continue your movie journey
        </p>

        <form onSubmit={handleLogin}>

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
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="options">
            <label>
              <input type="checkbox" />
              Remember me
            </label>

            <a href="#">Forgot password?</a>
          </div>

          <button type="submit">
            Login
          </button>

        </form>

        <p className="signup-text">
          Don't have an account?

          <span
            className="link-btn"
            onClick={() => setActiveTab("signup")}
          >
            Create Account
          </span>

        </p>

      </div>
    </div>
  );
};

export default Login;
