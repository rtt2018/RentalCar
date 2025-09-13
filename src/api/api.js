import axios from "axios";

axios.defaults.baseURL = "https://car-rental-api.goit.global/";

export async function getCarsInfo(patch, searchParams) {
  console.log("🚀 ~ getCarsInfo ~ searchParams:", searchParams);
  console.log("🚀 ~ getCarsInfo ~ patch:", patch);
  try {
    const response = await axios.get(patch, {
      params: searchParams,
    });
    return response.data;
  } catch (error) {
    return error;
  }
}
