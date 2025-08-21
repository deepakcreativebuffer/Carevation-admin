import axios from "axios";
import Cookies from "js-cookie";
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL, 
  timeout: 10000,
  // withCredentials: true
});

apiClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized, redirecting to login...");
    }
    return Promise.reject(error);
  }
);

export default apiClient;
