import React, { useEffect, useState } from "react";
import axios from "axios";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  const buyerId = localStorage.getItem("userId"); // Buyer ka ID
  const token = localStorage.getItem("token");   // JWT agar use ho raha ho

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/orders/my/${buyerId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // agar JWT use ho raha ho
        },
      })
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.log("Error fetching orders:", err);
      });
  }, [buyerId]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "10px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            <h3>Order ID: {order.id}</h3>
            <p>
              <b>Order Date:</b>{" "}
              {new Date(order.orderDate).toLocaleString()}
            </p>
            <p>
              <b>Total Amount:</b> ₹{order.totalAmount}
            </p>

            <h4>Products:</h4>
            {order.products.map((product) => (
              <div
                key={product.id}
                style={{
                  marginLeft: "15px",
                  padding: "8px",
                  borderBottom: "1px solid #eee",
                }}
              >
                <p><b>Name:</b> {product.name}</p>
                <p><b>Price:</b> ₹{product.price}</p>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;
