import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rent: {},
};

const rentSlice = createSlice({
  name: "rent",
  initialState,
  reducers: {
    createRent(state, actions) {
      state.rent = actions.payload;
    },
  },
});

export const rentReducer = rentSlice.reducer;

export const { createRent } = rentSlice.actions;
