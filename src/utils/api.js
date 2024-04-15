import axios from "axios";

export const BASE_URL = "https://travel-journal-api-bootcamp.do.dibimbing.id/";
export const API_KEY = "24405e01-fbc1-45a5-9f5a-be13afcd757c";

const apiRequest = async (url, method = "get", data = null, token = null) => {
  const headers = {
    apiKey: API_KEY,
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  const config = {
    method: method,
    url: `${BASE_URL}${url}`,
    headers: headers,
  };
  if (data) {
    config.data = data;
  }
  try {
    const response = await axios(config);
    return response.data || [];
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    return { error: true, message: error.message };
  }
};

export const fetchBanners = () => apiRequest("api/v1/banners");
export const fetchPromo = () => apiRequest("api/v1/promos");
export const fetchCategory = () => apiRequest("api/v1/categories");
export const fetchActivity = () => apiRequest("api/v1/activities");
export const fetchUser = (token) =>
  apiRequest("api/v1/user", "get", null, token);

export const handleLogin = async (email, password) => {
  try {
    const response = await apiRequest("api/v1/login", "post", {
      email,
      password,
    });
    return response;
  } catch (error) {
    return {
      error: true,
      message: error.response?.data?.message || "Login failed",
    };
  }
};

export const handleLogout = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await apiRequest("api/v1/logout", "post", null, token);
    localStorage.removeItem("token");
    return response;
  } catch (error) {
    console.error(`Logout failed:`, error);
    return {
      error: true,
      message: error.response?.data?.message || "Logout failed",
    };
  }
};
