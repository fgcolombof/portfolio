import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const FavoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const product = action.payload;
      const exists = state.items.some((item) => item.id === product.id);

      if (exists) {
        // Si ya está, lo eliminamos con filter
        state.items = state.items.filter((item) => item.id !== product.id);
      } else {
        // En RTK podemos usar push() directo gracias a Immer.js por detrás
        state.items.push(product);
      }
    },
    clearFavorites: (state) => {
      state.items = [];
    },
  },
});

export const { toggleFavorite, clearFavorites } = FavoritesSlice.actions;
export default FavoritesSlice.reducer;
