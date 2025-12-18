/*
import React, { useEffect, useState, useCallback } from "react";
import api from "../services/api";
import "./FarmerProductList.css";

function FarmerProductList({ farmerId }) {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  // -----------------------
  // Fetch Farmer Products
  // -----------------------
  const loadProducts = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get(`/api/products/farmer/${farmerId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProducts(res.data);
    } catch (err) {
      console.error("Error loading farmer products:", err);
      alert("Error loading your products!");
    }
  }, [farmerId]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]); // ✔ Warning removed properly

  // -----------------------
  // Delete Product
  // -----------------------
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      const token = localStorage.getItem("token");

      await api.delete(`/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      loadProducts();
    } catch (err) {
      console.error(err);
      alert("Error deleting product");
    }
  };

  // -----------------------
  // Update Product
  // -----------------------
  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");

      await api.put(
        `/api/products/${editingProduct.id}`,
        {
          name: editingProduct.name,
          price: editingProduct.price,
          stock: editingProduct.stock,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setEditingProduct(null);
      loadProducts();
    } catch (err) {
      console.error(err);
      alert("Error updating product");
    }
  };

  return (
    <div className="farmer-product-list">
      <h2>Your Products</h2>

      {products.length === 0 ? (
        <p>No products added yet.</p>
      ) : (
        <div className="product-grid">
          {products.map((p) => (
            <div key={p.id} className="product-card">
              <h3>{p.name}</h3>
              <p>Price: ₹{p.price}</p>
              <p>Stock: {p.stock}</p>

              <div className="product-actions">
                <button className="edit-btn" onClick={() => setEditingProduct(p)}>
                  Edit
                </button>

                <button className="delete-btn" onClick={() => handleDelete(p.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editingProduct && (
        <div className="modal-overlay">
          <div className="modal-box">

            <h2>Edit Product</h2>

            <label>Name</label>
            <input
              type="text"
              value={editingProduct.name}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, name: e.target.value })
              }
            />

            <label>Price</label>
            <input
              type="number"
              value={editingProduct.price}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, price: e.target.value })
              }
            />

            <label>Stock</label>
            <input
              type="number"
              value={editingProduct.stock}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, stock: e.target.value })
              }
            />

            <div className="modal-buttons">
              <button className="save-btn" onClick={handleUpdate}>
                Save
              </button>

              <button className="cancel-btn" onClick={() => setEditingProduct(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default FarmerProductList;
*/
import React, { useEffect, useState, useCallback } from "react";
import api from "../services/api";
import "./FarmerProductList.css";

function FarmerProductList({ farmerId }) {
  const [products, setProducts] = useState([]);

  // Modal States
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  // Add Product State
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    stock: "",
    imageUrl: ""
  });

  // Edit Product State
  const [editProduct, setEditProduct] = useState(null);

  const loadProducts = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.get(`/api/products/farmer/${farmerId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(res.data);
    } catch (err) {
      console.error("Error loading products:", err);
      alert("Error loading your products!");
    }
  }, [farmerId]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);


  // ADD PRODUCT
  const handleAddProduct = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await api.post(`/api/products/${farmerId}`, newProduct, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setShowAddModal(false);
      setNewProduct({ name: "", price: "", stock: "", imageUrl: "" });
      loadProducts();
    } catch (err) {
      console.error(err);
      alert("Error adding product");
    }
  };

  // DELETE PRODUCT
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      const token = localStorage.getItem("token");

      await api.delete(`/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      loadProducts();
    } catch (err) {
      console.error(err);
      alert("Error deleting");
    }
  };

  // UPDATE PRODUCT
  const handleUpdateProduct = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await api.put(`/api/products/${editProduct.id}`, editProduct, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setShowEditModal(false);
      setEditProduct(null);
      loadProducts();
    } catch (err) {
      console.error(err);
      alert("Error updating");
    }
  };

  return (
    <div className="farmer-product-list">
      <div className="header-row">
        <h2>Your Products</h2>
        <button className="add-btn" onClick={() => setShowAddModal(true)}>
          + Add Product
        </button>
      </div>

      {products.length === 0 ? (
        <p>No products yet.</p>
      ) : (
        <div className="product-grid">
          {products.map((p) => (
            <div key={p.id} className="product-card">

              {/* 🔥 IMAGE SHOW */}
              {p.imageUrl && (
                <img
                  src={p.imageUrl}
                  alt={p.name}
                  className="product-image"
                />
              )}

              <h3>{p.name}</h3>
              <p>₹{p.price}</p>
              <p>Stock: {p.stock}</p>

              <div className="card-actions">
                <button
                  className="edit-btn"
                  onClick={() => {
                    setEditProduct(p);
                    setShowEditModal(true);
                  }}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(p.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ADD PRODUCT MODAL */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2>Add Product</h2>

            <form onSubmit={handleAddProduct}>

              <input
                type="text"
                placeholder="Product Name"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
                required
              />

              <input
                type="number"
                placeholder="Price"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
                required
              />

              <input
                type="number"
                placeholder="Stock"
                value={newProduct.stock}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, stock: e.target.value })
                }
                required
              />

              {/* IMAGE URL INPUT */}
              <input
                type="text"
                placeholder="Image URL"
                value={newProduct.imageUrl}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, imageUrl: e.target.value })
                }
                required
              />

              <div className="modal-actions">
                <button type="submit" className="save-btn">
                  Add
                </button>
                <button
                  type="button"
                  className="close-btn"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT PRODUCT MODAL */}
      {showEditModal && editProduct && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2>Edit Product</h2>

            <form onSubmit={handleUpdateProduct}>
              <input
                type="text"
                value={editProduct.name}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, name: e.target.value })
                }
              />

              <input
                type="number"
                value={editProduct.price}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, price: e.target.value })
                }
              />

              <input
                type="number"
                value={editProduct.stock}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, stock: e.target.value })
                }
              />

              <input
                type="text"
                value={editProduct.imageUrl || ""}
                placeholder="Image URL"
                onChange={(e) =>
                  setEditProduct({ ...editProduct, imageUrl: e.target.value })
                }
              />

              <div className="modal-actions">
                <button type="submit" className="save-btn">
                  Update
                </button>
                <button
                  type="button"
                  className="close-btn"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default FarmerProductList;
