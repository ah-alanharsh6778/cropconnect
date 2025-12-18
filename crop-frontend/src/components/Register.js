/*import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Register.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("FARMER");
  const navigate = useNavigate();

 const handleSubmit = async (e) => {
   e.preventDefault();
   try {
     const res = await api.post("/api/auth/register", {
       name,
       email,
       password,
       userType: role
     });

      console.log("Response:", res.data);

         if (res.data.token) {
           localStorage.setItem("token", res.data.token);
           navigate("/");
         } else {
           alert("Registration failed: Token missing");
         }
       } catch (err) {
         console.log(err);
         alert("Error: " + (err.response?.data?.message || "Server error"));
       }
     };

  return (
    <div className="register-background">
      <div className="register-container">
        <form className="register-card" onSubmit={handleSubmit}>
          <h2>Create Your Account</h2>

          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label>Select Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)} className="role-select">
            <option value="FARMER">🌾 Farmer</option>
            <option value="BUYER">🛒 Buyer</option>
          </select>

          <button type="submit" className="register-btn">Register</button>

          <p style={{ marginTop: "12px", fontSize: "14px" }}>
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }}
            >
              Login here
            </span>
          </p>

        </form>
      </div>
    </div>
  );
 }

export default Register;
*/

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Register.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("FARMER");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/auth/register", {
        name,
        email,
        password,
        userType: role,
      });

      console.log("Response:", res.data);

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("username", name);

        navigate("/dashboard");
      } else {
        alert("Registration failed: Token missing");
      }
    } catch (err) {
      console.log(err);
      alert("Error: " + (err.response?.data?.message || "Server error"));
    }
  };

  return (
    <div className="register-background">
      <div className="register-container">
        <form className="register-card" onSubmit={handleSubmit}>
          <h2>Create Your Account</h2>

          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label>Select Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="role-select"
          >
            <option value="FARMER">🌾 Farmer</option>
            <option value="BUYER">🛒 Buyer</option>
          </select>

          <button type="submit" className="register-btn">Register</button>

          <p style={{ marginTop: "12px", fontSize: "14px" }}>
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              style={{
                color: "blue",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Login here
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;

