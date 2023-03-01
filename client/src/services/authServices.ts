import axiosInstance from "../config/axios/axiosInstance";
import { loginData } from "../store/auth/auth.types";

const login = (data: loginData) => {
  return axiosInstance.post("/user/login", data);
};
const register = (data: loginData) => {
  return axiosInstance.post("/user", data);
};
const authService = {
  login,
  register,
};

export default authService;
