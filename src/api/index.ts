import axiosInstance from "@/config/axios.config";

interface AxiosProps {
  url?: string;
  method?: string;
  data?: any;
  params?: any;
  body?: object;
}

const axiosBaseQuery = ({ baseUrl } = { baseUrl: "" }) => {
  return async ({ url, method, body, params }: AxiosProps) => {
    console.log("BODY", body);
    try {
      const result = await axiosInstance({
        url: baseUrl + url,
        method,
        data: body,
        params,
      });
      return { data: result.data };
    } catch (err) {
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
};

export default axiosBaseQuery;
