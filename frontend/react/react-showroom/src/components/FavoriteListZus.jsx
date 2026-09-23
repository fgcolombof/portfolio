import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useFavoriteStore } from "../stores/ProductsStore"; // Ajustá la ruta a tu store

export const FavoriteListZus = () => {
  const products = useFavoriteStore((state) => state.products);
  const favorites = useFavoriteStore((state) => state.favorites);
  const toggleFavorite = useFavoriteStore((state) => state.toggleFavorite);
  const getProducts = useFavoriteStore((state) => state.getProducts);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <div className="showroom-container">
      {/* HEADER */}
      <header className="showroom-header">
        <h1 className="showroom-title">Zustand Favorites Dashboard</h1>
        <p className="showroom-subtitle">
          Atomic state management with automatic UI synchronization and zero
          boilerplate.
        </p>
      </header>

      {/* GRID DE 2 COLUMNAS (Catálogo vs Favoritos) */}
      <div className="dashboard-grid">
        {/* COLUMNA 1: CATÁLOGO */}
        <section className="dashboard-section">
          <h2 className="dashboard-section-title">All Products</h2>
          <div className="dashboard-list">
            {products.length === 0 ? (
              <p className="empty-text">Loading catalog...</p>
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
                      onClick={() => toggleFavorite(product)}
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
                    onClick={() => toggleFavorite(item)}
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

export default FavoriteListZus;
