import { createSlice } from "@reduxjs/toolkit";
import { getBrandsList } from "./operations";

const initialState = {
  brands: [],
  isLoading: false,
  isError: false,
};

const brandsSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBrandsList.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getBrandsList.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getBrandsList.fulfilled, (state, action) => {
        state.brands = action.payload;
        state.isLoading = false;
        state.isError = false;
      });
  },
});

export const brandsReducer = brandsSlice.reducer;
