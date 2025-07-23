import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        setProducts(data.products || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <header
        className="App-header"
        style={{
          background: "#fff",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          padding: "18px 0 10px 0",
          marginBottom: 16,
        }}
      >
        <h1
          style={{
            fontSize: "1.4rem",
            fontWeight: 700,
            color: "#222",
            margin: 0,
            letterSpacing: "-1px",
          }}
        >
          Beauty Product List
        </h1>
        <p
          style={{
            color: "#888",
            fontSize: "0.98rem",
            marginTop: 6,
            marginBottom: 0,
          }}
        >
          다양한 뷰티 제품을 한눈에 확인하세요
          <br />
          https://dummyjson.com/products API 사용 예제
        </p>
      </header>
      <main style={{ padding: 20 }}>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>Error: {error}</p>}
        {!loading && !error && (
          <ul className="product-list">
            {products.map((product) => (
              <li key={product.id} className="product-item">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="product-thumb"
                />
                <div className="product-info">
                  <div className="product-title">{product.title}</div>
                  <div className="product-price">${product.price}</div>
                  <div className="product-desc">{product.description}</div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}

export default App;
