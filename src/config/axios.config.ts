import axios from "axios";

const axiosInstance = axios.create({
  headers: {
    contentType: "application/json",
  },
});

axiosInstance.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

axiosInstance.defaults.headers.common["Cache-Control"] = "max-age=31536000";

axiosInstance.interceptors.request.use(
  (config) => {
    let token = null;
    if (typeof localStorage !== undefined) {
      token = localStorage.getItem("userToken");
    }
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
