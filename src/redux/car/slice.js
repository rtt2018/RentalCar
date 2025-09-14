import { createSlice } from "@reduxjs/toolkit";
import { getCarItems } from "./operations";

const initialState = {
  car: [],
  isLoading: false,
  isError: false,
};

const carSlice = createSlice({
  name: "car",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCarItems.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getCarItems.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getCarItems.fulfilled, (state, action) => {
        state.car = action.payload;
        state.isLoading = false;
        state.isError = false;
      });
  },
});

export const carReducer = carSlice.reducer;
