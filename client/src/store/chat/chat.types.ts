import { userState } from "../auth/auth.types";

export type chatSliceState = {
  selectedUser: userState | null;
};
