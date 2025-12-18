/*import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8082/api/auth/login", {
        email,
        password,
      });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        alert(res.data.message || "Login Successful!");
        navigate("/dashboard");
      } else {
        alert(res.data.message || "Login failed!");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Invalid Credentials");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <span>🔒 Sign In</span>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <label>Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
          <button type="submit">Sign In</button>
        </form>
        <div className="login-footer">
          Protected FarmerConnect platform
        </div>
      </div>
    </div>
  );
}

export default Login;
*/

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8082/api/auth/login", {
        email,
        password,
      });

      if (res.data.token) {
        // 👇 TOKEN SAVE
        localStorage.setItem("token", res.data.token);
         localStorage.setItem("username", res.data.name);
          navigate("/dashboard");

        // 👇 USERNAME SAVE (backend structure ke hisaab se)
        if (res.data.name) {
          localStorage.setItem("username", res.data.name);
        } else if (res.data.user?.name) {
          localStorage.setItem("username", res.data.user.name);
        }

        alert(res.data.message || "Login Successful!");
        navigate("/dashboard");
      } else {
        alert(res.data.message || "Login failed!");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Invalid Credentials");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <span>🔒 Sign In</span>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <label>Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />

          <button type="submit">Sign In</button>
        </form>
        <div className="login-footer">Protected FarmerConnect platform</div>
      </div>
    </div>
  );
}

export default Login;
