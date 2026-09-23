import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toggleFavorite } from "../slices/FavoriteSlice"; // Ajustá la ruta a tu slice

export const FavoriteListRedux = () => {
  const dispatch = useDispatch();

  // Estado local para los productos del Mock API (idéntico a cómo los maneja el componente)
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Leemos los favoritos directamente desde tu FavoritesSlice
  const favorites = useSelector((state) => state.favorites?.items || []);

  // Fetch directo a tu Mock API local
  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch("http://localhost:3001/products");
        if (!response.ok) {
          throw new Error(
            `Problem fetching products: ${response.status} - ${response.statusText}`,
          );
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products in Redux component:", error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  return (
    <div className="showroom-container">
      {/* HEADER */}
      <header className="showroom-header">
        <h1 className="showroom-title">Redux Toolkit Favorites Dashboard</h1>
        <p className="showroom-subtitle">
          Global state management driven by Redux Toolkit slices, memoized
          selectors, and immutable updates.
        </p>
      </header>

      {/* GRID DE 2 COLUMNAS (Catálogo vs Favoritos) */}
      <div className="dashboard-grid">
        {/* COLUMNA 1: CATÁLOGO */}
        <section className="dashboard-section">
          <h2 className="dashboard-section-title">All Products</h2>
          <div className="dashboard-list">
            {loading ? (
              <p className="empty-text">Loading catalog...</p>
            ) : products.length === 0 ? (
              <p className="empty-text">No products available.</p>
            ) : (
              products.map((product) => {
                const isFav = favorites.some((fav) => fav.id === product.id);
                return (
                  <div key={product.id} className="dashboard-item-card">
                    <div>
                      <h3 className="item-name">{product.name}</h3>
                      <span className="item-tag">{product.category}</span>
                    </div>
                    <button
                      onClick={() => dispatch(toggleFavorite(product))}
                      className={`btn-fav-toggle ${isFav ? "active" : "inactive"}`}
                    >
                      {isFav ? "❤️ Favorited" : "🤍 Favorite"}
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </section>

        {/* COLUMNA 2: MIS FAVORITOS */}
        <section className="dashboard-section">
          <h2 className="dashboard-section-title">
            My Favorites ({favorites.length})
          </h2>
          <div className="dashboard-list">
            {favorites.length === 0 ? (
              <p className="empty-text">No favorites added yet.</p>
            ) : (
              favorites.map((item) => (
                <div
                  key={item.id}
                  className="dashboard-item-card is-favorite-border"
                >
                  <div>
                    <h3 className="item-name">{item.name}</h3>
                    <span className="item-tag">{item.category}</span>
                  </div>
                  <button
                    onClick={() => dispatch(toggleFavorite(item))}
                    className="btn-danger-outline"
                  >
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>
        </section>
      </div>

      {/* FOOTER / BACK */}
      <div className="back-navigation">
        <Link to="/" className="back-link">
          ← Back to Showroom
        </Link>
      </div>
    </div>
  );
};

export default FavoriteListRedux;
