import axiosInstance from "../../../axios/axiosInstance";
import { loginData } from "./auth.types";

const login = (data: loginData) => {
  return axiosInstance.post("/user/login", data);
};

const authService = {
  login,
};

export default authService;
