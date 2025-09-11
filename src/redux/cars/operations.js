import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://car-rental-api.goit.global/";

export const getCarsItems = createAsyncThunk(
  "cars/getCarsItems",
  async (searchParams, thunkAPI) => {
    try {
      const response = await axios.get("cars", {
        params: searchParams,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
