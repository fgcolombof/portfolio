import { create } from "zustand";

export const useFavoriteStore = create((set) => ({
  favorites: [],
  products: [],

  // Carga inicial de productos desde la API
  getProducts: async () => {
    try {
      // API base URL - always use /api which works with Netlify Dev and production
      const API_BASE_URL = "/api";
      const response = await fetch(`${API_BASE_URL}/products`);
      if (!response.ok) {
        throw new Error(
          `There was a problem fetching products: ${response.status} - ${response.statusText}`,
        );
      }
      const data = await response.json();
      set({ products: data });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  },

  // Agrega o quita de favoritos de forma limpia
  toggleFavorite: (product) =>
    set((state) => {
      const exists = state.favorites.some((fav) => fav.id === product.id);

      if (exists) {
        // Si ya está, lo quitamos
        return {
          favorites: state.favorites.filter((fav) => fav.id !== product.id),
        };
      } else {
        // Si no está, lo agregamos
        return {
          favorites: [...state.favorites, product],
        };
      }
    }),
}));
