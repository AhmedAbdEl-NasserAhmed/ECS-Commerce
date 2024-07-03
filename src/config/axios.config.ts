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
    const token = localStorage.getItem("userToken");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
