import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  brand: "",
  rentalPrice: "",
  minMileage: "",
  maxMileage: "",
  page: 1,
  limit: 12,
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setBrand(state, action) {
      state.brand = action.payload;
    },
    setRentalPrice(state, action) {
      state.rentalPrice = action.payload;
    },
    setMinMileage(state, action) {
      state.minMileage = action.payload;
    },
    setMaxMileage(state, action) {
      state.maxMileage = action.payload;
    },
    setAllFilters(state, action) {
      console.log("🚀 ~ setAllFilters ~ action:", action);
      state.brand = action.payload.brand ?? "";
      state.rentalPrice = action.payload.rentalPrice ?? "";
      state.minMileage = action.payload.minMileage ?? "";
      state.maxMileage = action.payload.maxMileage ?? "";
      state.page = action.payload.page;
      state.limit = action.payload.limit;
    },
    resetFilters(state) {
      state.selectedCategory = "";
      state.selectedIngredients = "";
      state.searchPhrase = "";
      state.page = 1;
      state.perPage = 12;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    setPerPage(state, action) {
      state.perPage = action.payload;
    },
    setPaginationParams(state, action) {
      state.page = action.payload;
      state.perPage = action.payload;
    },
  },
});

export const filtersReducer = filtersSlice.reducer;
export const {
  setSearchPhrase,
  setSelectedCategory,
  setSelectedIngredients,
  resetFilters,
  setAllFilters,
  setPage,
  setPerPage,
  setPaginationParams,
} = filtersSlice.actions;
