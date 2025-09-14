import { configureStore } from "@reduxjs/toolkit";
import { carsReducer } from "./cars/slice.js";
import { brandsReducer } from "./brands/slice.js";
import { favoritesReducer } from "./favorites/slice.js";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { filtersReducer } from "./filters/slice.js";
import { carReducer } from "./car/slice.js";
import { rentReducer } from "./rent/slice.js";

const favPersistConfig = {
  key: "favorites",
  storage,
  whitelist: ["favorites"],
};

export const store = configureStore({
  reducer: {
    brands: brandsReducer,
    car: carReducer,
    cars: carsReducer,
    favorites: persistReducer(favPersistConfig, favoritesReducer),
    filters: filtersReducer,
    rent: rentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
