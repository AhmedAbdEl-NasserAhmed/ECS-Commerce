import axios from "axios";

const axiosInstance = axios.create({
  //   baseURL: BASE_URL,
  headers: {
    contentType: "application/json",
  },
});

axiosInstance.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axiosInstance.defaults.headers.common["Cache-Control"] = "max-age=31536000";

axiosInstance.interceptors.request.use(
  (config) => {
    // config.headers["x-rapidapi-host"] = "famous-quotes4.p.rapidapi.com"; // ADD HEADER EVERY REQUEST EXAMPLE
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
