import axiosInstance from "../config/axios/axiosInstance";
import { API_ENDPOINTS } from "../data/constants";

const getAllUsers = () => {
  return axiosInstance.get(API_ENDPOINTS.GET_ALL_USERS);
};
const usersService = {
  getAllUsers,
};

export default usersService;
