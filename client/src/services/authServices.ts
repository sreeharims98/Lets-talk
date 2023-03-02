import axiosInstance from "../config/axios/axiosInstance";
import { API_ENDPOINTS } from "../data/constants";
import { loginData } from "../store/auth/auth.types";

const login = (data: loginData) => {
  return axiosInstance.post(API_ENDPOINTS.LOGIN, data);
};
const register = (data: loginData) => {
  return axiosInstance.post(API_ENDPOINTS.REGISTER, data);
};
const authService = {
  login,
  register,
};

export default authService;
