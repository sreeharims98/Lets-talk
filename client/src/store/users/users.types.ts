import { userState } from "../../types/common.types";

export type userSliceState = {
  users: userState[];
  onlineUsers: userState[];
  loading: boolean;
  error: string | null;
};
