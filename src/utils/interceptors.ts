import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL, 
  timeout: 10000,
  // withCredentials: true
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
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
      // Example: redirect to login
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default apiClient;
