import { configureStore } from "@reduxjs/toolkit";
import { carsReducer } from "./cars/slice.js";
import { brandsReducer } from "./brands/slice.js";

export const store = configureStore({
  reducer: {
    cars: carsReducer,
    brands: brandsReducer,
  },
});
