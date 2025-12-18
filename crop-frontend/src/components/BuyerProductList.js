/*import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import "./BuyerProductList.css";

function BuyerProductList() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    axios
      .get("http://localhost:8082/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div className="buyer-products-container">
      <h2 className="buyer-title">All Products</h2>

      <div className="buyer-products-grid">
        {products.map((product) => (
          <div key={product.id} className="buyer-product-card">

            <h3>{product.name}</h3>

            <p><strong>Price:</strong> ₹{product.price}</p>
            <p><strong>Stock:</strong> {product.stock}</p>
            <p><strong>Farmer:</strong> {product.farmer?.name}</p>

            <button
              className="buyer-add-btn"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>

          </div>
        ))}
      </div>
    </div>
  );
}

export default BuyerProductList;
*/

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./BuyerProductList.css";

function BuyerProductList() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8082/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div className="buyer-products-container">

      <div className="buyer-header">

        <h2 className="buyer-title">All Products</h2>

        <button
          className="buyer-myorder-btn"
          onClick={() => navigate("/myorders")}
        >
          My Orders
        </button>
      </div>

      <div className="buyer-products-grid">
        {products.map((product) => (
          <div key={product.id} className="buyer-product-card">

            <h3>{product.name}</h3>

            <p><strong>Price:</strong> ₹{product.price}</p>
            <p><strong>Stock:</strong> {product.stock}</p>
            <p><strong>Farmer:</strong> {product.farmer?.name}</p>

            <button
              className="buyer-add-btn"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>

          </div>
        ))}
      </div>
    </div>
  );
}

export default BuyerProductList;
/*
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./BuyerProductList.css";

function BuyerProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8082/api/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setError("Failed to load products");
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p className="buyer-loading">Loading products...</p>;
  if (error) return <p className="buyer-error">{error}</p>;

  return (
    <div className="buyer-products-container">
      <div className="buyer-header">
        <h2 className="buyer-title">All Products</h2>

        <div>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="buyer-search-input"
          />
          <button
            className="buyer-myorder-btn"
            onClick={() => navigate("/myorders")}
          >
            My Orders
          </button>

          <button
            className="buyer-cart-btn"
            onClick={() => navigate("/cart")}
          >
            Cart
          </button>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <p className="buyer-no-products">No products found</p>
      ) : (
        <div className="buyer-products-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="buyer-product-card">
              <h3>{product.name}</h3>
              <p><strong>Price:</strong> ₹{product.price}</p>
              <p><strong>Stock:</strong> {product.stock}</p>
              <p><strong>Farmer:</strong> {product.farmer?.name || "N/A"}</p>

              <button
                className="buyer-add-btn"
                onClick={() => addToCart(product)}
                disabled={product.stock === 0}
              >
                {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BuyerProductList;
*/

