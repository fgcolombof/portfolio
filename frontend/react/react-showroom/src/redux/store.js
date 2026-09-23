import { configureStore } from "@reduxjs/toolkit";
import FavoriteReducer from "../slices/FavoriteSlice";

export const store = configureStore({
  reducer: {
    favorites: FavoriteReducer,
  },
});
