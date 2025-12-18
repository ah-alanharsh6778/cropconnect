/*import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useCart();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="project-name">🌾FarmConnect</Link>
      </div>

      <div className="navbar-right">
        {!token ? (
          <>
            <Link to="/" className="nav-link">
                  🏠Home</Link>
            <Link to="/register" className="nav-link">👤⁺Register</Link>
            <Link to="/login" className="nav-link">Login</Link>
          </>
        ) : (
          <>
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/products" className="nav-link">Products</Link>
            <Link to="/my-orders" className="nav-link">My Orders</Link>

            <Link to="/cart" className="cart-btn">
              🛒 Cart
            </Link>
            <button className="nav-link logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
export default Navbar;


import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");  // ← added

  useCart();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username"); // ← added
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="project-name">🌾FarmConnect</Link>
      </div>

      <div className="navbar-right">
        {!token ? (
          <>
            <Link to="/" className="nav-link">🏠Home</Link>
            <Link to="/register" className="nav-link">👤⁺Register</Link>
            <Link to="/login" className="nav-link">Login</Link>
          </>
        ) : (
          <>
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/products" className="nav-link">Products</Link>
            <Link to="/my-orders" className="nav-link">My Orders</Link>

            <span className="nav-link username">
              👤 {username}
            </span>

            <Link to="/cart" className="cart-btn">🛒 Cart</Link>

            <button className="nav-link logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
*/
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");  // USERNAME GET

  useCart();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");  // REMOVE NAME ALSO
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="project-name">🌾FarmConnect</Link>
      </div>

      <div className="navbar-right">
        {!token ? (
          <>
            <Link to="/" className="nav-link">🏠Home</Link>
            <Link to="/register" className="nav-link">👤⁺Register</Link>
            <Link to="/login" className="nav-link">Login</Link>
          </>
        ) : (
          <>
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/products" className="nav-link">Products</Link>
            <Link to="/my-orders" className="nav-link">My Orders</Link>

            <Link to="/cart" className="cart-btn">🛒 Cart</Link>

            {/* USERNAME SHOW & CLICKABLE → Dashboard */}
            <span
              className="nav-link"
              style={{ fontWeight: "bold", cursor: "pointer" }}
              onClick={() => navigate("/dashboard")}
            >
              👤 {username || "User"}
            </span>

            <button className="nav-link logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
