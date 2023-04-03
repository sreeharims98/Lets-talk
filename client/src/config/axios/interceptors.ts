import { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { STORAGE_KEYS } from "../../data/constants";
import { userState } from "../../types/common.types";
import { storage } from "../../utils/storage-utils";

//request handler
const requestHandler = async (config: InternalAxiosRequestConfig<any>) => {
  try {
    const user = storage.getItem(STORAGE_KEYS.AUTH) as userState;
    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  } catch (error) {
    throw error;
  }
};

//request error handler
const requestErrorHandler = async (error: any) => {
  return Promise.reject({ ...error });
};

//response handler
const responseHandler = async (response: AxiosResponse<any, any>) => {
  return response;
};

//response error handler
const responseErrorHandler = async (error: any) => {
  return Promise.reject({ ...error });
};

//export
export const interceptors = { requestHandler, requestErrorHandler, responseHandler, responseErrorHandler };
