import { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { userState } from "../store/features/auth/auth.types";
import { storage } from "../utils/storage-utils";

//request handler
const requestHandler = (config: InternalAxiosRequestConfig<any>) => {
  try {
    const user = storage.getItem("user") as userState;
    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  } catch (error) {
    throw error;
  }
};

//request error handler
const requestErrorHandler = (error: any) => {
  return Promise.reject({ ...error });
};

//response handler
const responseHandler = (response: AxiosResponse<any, any>) => {
  return response;
};

//response error handler
const responseErrorHandler = (error: any) => {
  return Promise.reject({ ...error });
};

//export
export const interceptors = { requestHandler, requestErrorHandler, responseHandler, responseErrorHandler };
