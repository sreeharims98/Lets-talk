import { userState } from "../auth/auth.types";

export type userSocketState = {
  sid: string;
  _id: string;
  username: string;
  email: string;
  token: string;
};

export type userSliceState = {
  users: userState[];
  onlineUsers: userState[];
  loading: boolean;
  error: string | null;
};
