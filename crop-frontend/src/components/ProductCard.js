import React from "react";
import "./ProductCard.css";

function ProductCard({ product }) {
  return (
    <div className="product-card">

      {product.imageUrl ? (
        <img
          src={product.imageUrl}
          alt={product.name}
          className="product-image"
        />
      ) : (
        <div className="no-image-box">
          Image Not Available
        </div>
      )}

      <h3>{product.name}</h3>
      <p>Price: ₹{product.price}</p>
      <p>Stock: {product.stock}</p>
    </div>
  );
}

export default ProductCard;
