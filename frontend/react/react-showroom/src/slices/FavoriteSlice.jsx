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
        // If it exists, remove it with filter
        state.items = state.items.filter((item) => item.id !== product.id);
      } else {
        // In RTK we can use push() directly thanks to Immer.js behind the scenes
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
