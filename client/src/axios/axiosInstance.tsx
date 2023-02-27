import axios from "axios";
import { BASE_URL } from "../config";
import { interceptors } from "./interceptors";

const defaultOptions = {
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
};

// Create axios instance
let axiosInstance = axios.create(defaultOptions);

axiosInstance.interceptors.request.use(
  (config) => interceptors.requestHandler(config),
  (error) => interceptors.requestErrorHandler(error)
);

axiosInstance.interceptors.response.use(
  (response) => interceptors.responseHandler(response),
  (error) => interceptors.responseErrorHandler(error)
);

console.log(axiosInstance);

export default axiosInstance;
