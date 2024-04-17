import axios from "axios";

export const BASE_URL = "https://travel-journal-api-bootcamp.do.dibimbing.id/";
export const API_KEY = "24405e01-fbc1-45a5-9f5a-be13afcd757c";

const apiRequest = async (
  url,
  method = "get",
  data = null,
  token = null,
  headers = {}
) => {
  headers = {
    ...headers,
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
    return { error: true, message: error.response?.data?.message || "Error" };
  }
};

export const fetchBanners = () => apiRequest("api/v1/banners");
export const fetchBannerById = (bannerId) =>
  apiRequest(`api/v1/banner/${bannerId}`);
export const fetchPromo = () => apiRequest("api/v1/promos");
export const fetchCategory = () => apiRequest("api/v1/categories");
export const fetchActivity = () => apiRequest("api/v1/activities");
export const fetchUser = (token) =>
  apiRequest("api/v1/user", "get", null, token);
export const fetchAllUser = (token) =>
  apiRequest("api/v1/all-user", "get", null, token);

export const updateUserRole = (userId, role, token) =>
  apiRequest(`api/v1/update-user-role/${userId}`, "post", { role }, token);

export const updateProfile = (data, token) =>
  apiRequest("api/v1/update-profile", "post", data, token);

export const handleLogin = async (email, password) => {
  try {
    const response = await apiRequest("api/v1/login", "post", {
      email,
      password,
    });
    return response;
  } catch (error) {
    error;
  }
};

export const handleLogout = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await apiRequest("api/v1/logout", "get", null, token);
    localStorage.removeItem("token");
    return response;
  } catch (error) {
    return {
      error: true,
      message: error.response?.data?.message || "Logout failed",
    };
  }
};

export const uploadImage = (file, token) => {
  const formData = new FormData();
  formData.append("image", file);
  return apiRequest("api/v1/upload-image", "post", formData, token, {
    "Content-Type": "multipart/form-data",
  });
};
