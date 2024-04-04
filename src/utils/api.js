import axios from "axios";

const BASE_URL = "https://travel-journal-api-bootcamp.do.dibimbing.id/";
const API_KEY = "24405e01-fbc1-45a5-9f5a-be13afcd757c";

export async function fetchBanners() {
  try {
    const res = await axios.get(`${BASE_URL}api/v1/banners`, {
      headers: {
        apiKey: API_KEY,
      },
    });
    return res?.data?.data || [];
  } catch (error) {
    console.error("Error fetching banners:", error);
    return [];
  }
}
