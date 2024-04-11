import axios from "axios";
import Cookies from "js-cookie";

export const BASE_URL = "https://travel-journal-api-bootcamp.do.dibimbing.id/";
export const API_KEY = "24405e01-fbc1-45a5-9f5a-be13afcd757c";

// export async function fetchUserLogged(token) {
//   try {
//     const res = await axios.get(`${BASE_URL}api/v1/user`, {
//       headers: {
//         apiKey: API_KEY,
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return res?.data?.data || [];
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     return [];
//   }
// }

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

export async function fetchPromo() {
  try {
    const res = await axios.get(`${BASE_URL}api/v1/promos`, {
      headers: {
        apiKey: API_KEY,
      },
    });
    return res?.data?.data || [];
  } catch (error) {
    console.error("Error fetching promos:", error);
    return [];
  }
}

export async function fetchCategory() {
  try {
    const res = await axios.get(`${BASE_URL}api/v1/categories`, {
      headers: {
        apiKey: API_KEY,
      },
    });
    return res?.data?.data || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export async function fetchActivity() {
  try {
    const res = await axios.get(`${BASE_URL}api/v1/activities`, {
      headers: {
        apiKey: API_KEY,
      },
    });
    return res?.data?.data || [];
  } catch (error) {
    console.error("Error fetching activities:", error);
    return [];
  }
}

export const handleLogin = async (email, password) => {
  try {
    const response = await axios.post(
      `${BASE_URL}api/v1/login`,
      { email, password },
      {
        headers: {
          apiKey: API_KEY,
        },
      }
    );
    return response?.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Login failed");
  }
};

// export const handleLogout = async () => {
//   try {
//     const response = await axios.get(`${BASE_URL}api/v1/logout`, {
//       headers: {
//         apiKey: API_KEY,
//         Authorization: `Bearer ${Cookies.get("token")}`,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     throw new Error(
//       error.response?.data?.message || "Logout failed: Unexpected error"
//     );
//   }
// };
