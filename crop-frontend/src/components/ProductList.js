import React, { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "./ProductCard";
import "./ProductList.css";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("default");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        setLoading(true);

        const res = await api.get("/api/products", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setProducts(res.data);
        setFiltered(res.data);
        setLoading(false);
      } catch (err) {
        alert("Error fetching products");
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let list = [...products];

    if (search.trim()) {
      list = list.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== "all") {
      list = list.filter((p) => p.category === category);
    }

    if (sort === "low-high") list.sort((a, b) => a.price - b.price);
    if (sort === "high-low") list.sort((a, b) => b.price - a.price);
    if (sort === "name") list.sort((a, b) => a.name.localeCompare(b.name));

    setFiltered(list);
  }, [search, category, sort, products]);

  return (
    <div className="product-page">
      {/* Top Bar: Products Heading + Filters */}
      <div className="product-top-bar">
        <h2 className="title">Products</h2>

        <div className="top-filters">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="all">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="grocery">Grocery</option>
            <option value="clothes">Clothes</option>
          </select>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="default">Sort By</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
            <option value="name">Name (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Loader */}
      {loading && (
        <div className="loader-container">
          <div className="skeleton"></div>
          <div className="skeleton"></div>
          <div className="skeleton"></div>
        </div>
      )}

      {/* Empty State */}
      {!loading && filtered.length === 0 && (
        <p className="empty-msg">No products found 😔</p>
      )}

      {/* Product Grid */}
      <div className="product-list">
        {!loading &&
          filtered.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}

export default ProductList;
