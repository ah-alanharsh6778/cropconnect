import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";

import FarmerProductList from "../components/FarmerProductList";
import BuyerProductList from "../components/BuyerProductList";

function Dashboard() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const fetchUserData = async () => {
      try {
        const res = await axios.get("http://localhost:8082/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(res.data);
      } catch (error) {
        console.error(error);
        alert("Session expired. Please login again.");
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    fetchUserData();
  }, [navigate]);

  return (
    <div className="dashboard-wrapper">


      <div className="dashboard-left">
        <h1>Welcome, {userData?.name || "User"}!</h1>

        <div className="info-card">
          <h3>Profile</h3>
          <p>Email: {userData?.email}</p>
          <p>Role: {userData?.userType}</p>
        </div>

        <div className="info-card">
          <h3>Orders</h3>
          <p>Total Orders: 12</p>
        </div>
      </div>

      <div className="dashboard-right">
        {userData?.userType === "FARMER" && (
          <>
            {/* SHOW ONLY THIS FARMER'S PRODUCTS */}
            <FarmerProductList farmerId={userData.id} />
          </>
        )}

        {userData?.userType === "BUYER" && (
          <BuyerProductList />
        )}

      </div>

    </div>
  );
}

export default Dashboard;
