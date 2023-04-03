import { userState } from "../../types/common.types";

export type AuthSliceState = {
  user: userState | null;
  loading: boolean;
  error: string | null;
};

export type loginData = {
  email: string;
  password: string;
};
export type registerData = {
  username: string;
  email: string;
  password: string;
};
