import { createSlice } from "@reduxjs/toolkit";
import { getCarsItems } from "./operations";

const initialState = {
  cars: [],
  totalCars: 0,
  page: 1,
  totalPages: 0,
  limit: 12,
  brand: "",
  rentalPrice: "",
  minMileage: "",
  maxMileage: "",
  hasPreviousPage: false,
  hasNextPage: false,
  isLoading: false,
  isError: false,
};

const carsSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    setPaginationParams(state, action) {
      state.page = action.payload.page;
      state.limit = action.payload.limit;
    },
    setMinMileage(state, action) {
      state.minMileage = action.payload.minMileage;
    },
    setMaxMileage(state, action) {
      state.maxMileage = action.payload.maxMileage;
    },
    setRentalPrice(state, action) {
      state.rentalPrice = action.payload.rentalPrice;
    },
    setBrand(state, action) {
      state.brand = action.payload.brand;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCarsItems.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getCarsItems.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getCarsItems.fulfilled, (state, action) => {
        const { cars, totalCars, page, totalPages } = action.payload;

        if (page > 1) {
          state.cars = [...(state.cars || []), ...(cars || [])];
          const map = new Map(state.cars.map((item) => [item.id, item]));
          cars.forEach((item) => {
            map.set(item.id, item);
          });
          state.cars = Array.from(map.values());
        } else {
          state.cars = cars || [];
        }
        state.totalCars = totalCars;
        state.totalPages = totalPages;
        state.hasPreviousPage = page > 1;
        state.hasNextPage = page < totalPages;
        state.isLoading = false;
        state.isError = false;
      });
  },
});

export const carsReducer = carsSlice.reducer;
export const {
  setPaginationParams,
  setMinMileage,
  setMaxMileage,
  setRentalPrice,
  setBrand,
} = carsSlice.actions;
