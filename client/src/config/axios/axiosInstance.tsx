import axios from "axios";
import { BASE_URL_API } from "../";
import { interceptors } from "./interceptors";

const defaultOptions = {
  baseURL: BASE_URL_API,
  headers: {
    "Content-Type": "application/json",
  },
};

// Create axios instance
let axiosInstance = axios.create(defaultOptions);

axiosInstance.interceptors.request.use(
  async (config) => interceptors.requestHandler(config),
  async (error) => interceptors.requestErrorHandler(error)
);

axiosInstance.interceptors.response.use(
  async (response) => interceptors.responseHandler(response),
  async (error) => interceptors.responseErrorHandler(error)
);

export default axiosInstance;
