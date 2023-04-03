import { allChatsState, userState } from "../../types/common.types";

export type chatSliceState = {
  selectedUser: userState | null;
  chats: allChatsState[];
};
