import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favorites: [],
  isLoading: false,
  isError: false,
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorites(state, action) {
      if (state.favorites.includes(action.payload)) {
        state.favorites = state.favorites.filter(
          (item) => item !== action.payload
        );
      } else {
        state.favorites.push(action.payload);
      }
    },
    addToFavorites(state, action) {
      state.favorites.push(action.payload);
    },
    removeFromFavorites(state, action) {
      state.favorites = state.favorites.filter(
        (item) => item !== action.payload
      );
    },
  },
});

export const favoritesReducer = favoritesSlice.reducer;

export const { toggleFavorites, addToFavorites, removeFromFavorites } =
  favoritesSlice.actions;
