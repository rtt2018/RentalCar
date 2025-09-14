import axios from "axios";

axios.defaults.baseURL = "https://car-rental-api.goit.global/";

export async function getCarsInfo(patch, searchParams) {
  try {
    const response = await axios.get(patch, {
      params: searchParams,
    });
    return response.data;
  } catch (error) {
    return error;
  }
}
