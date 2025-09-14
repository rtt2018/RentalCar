import { getCarsInfo } from "../../api/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getCarItems = createAsyncThunk(
  "cars/getCarItems",
  async (id, thunkAPI) => {
    try {
      const response = await getCarsInfo(`cars/${id}`, {});
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
