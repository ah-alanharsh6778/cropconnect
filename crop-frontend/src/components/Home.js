/*
import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      <div className="overlay"></div>

      <div className="home-content">
        <h1>Welcome to <span>FarmConnect</span></h1>
        <p>
          Connecting Farmers and Buyers with Trust, Transparency & Technology.
        </p>

        <div className="home-buttons">
          <Link to="/products" className="btn explore-btn">Explore Products</Link>
          <Link to="/register" className="btn register-btn">Join Now</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
*/

import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";


function Home() {
  return (
    <div className="home-container">
      <div className="overlay"></div>

      <div className="home-content">
        <h1>
          Welcome to <span> FarmConnect</span>
        </h1>
        <p>
          Connecting Farmers and Buyers with Trust, Transparency & Technology.
        </p>

        <div className="button-box">
          <Link to="/products" className="btn explore-btn">
            Explore Products
          </Link>

          <Link to="/register" className="btn join-btn">
            Join Now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;

