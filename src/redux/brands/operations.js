import { getCarsInfo } from "../../api/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getBrandsList = createAsyncThunk(
  "brands/getBrandsList",
  async (_, thunkAPI) => {
    try {
      const response = await getCarsInfo("brands", {});
      console.log("🚀 ~ response:", response);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
