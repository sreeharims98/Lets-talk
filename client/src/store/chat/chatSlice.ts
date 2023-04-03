import { createSlice } from "@reduxjs/toolkit";
import { socketMsg } from "../../types/common.types";
import { chatSliceState } from "./chat.types";

const initialState: chatSliceState = {
  selectedUser: null,
  chats: [],
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    setChats: (state, { payload }: { payload: { data: socketMsg; type: "send" | "recieve" } }) => {
      console.log("payload", payload);

      let newChats = [...state.chats];

      console.log("newChats", newChats);

      const { token, ...user } = payload.data.sender;
      const singleMsg = { user: user, msg: payload.data.msg };

      // send
      if (payload.type === "send") {
        const chatUserIndex = newChats.findIndex((c) => c.user._id === payload.data.reciever._id);
        if (chatUserIndex >= 0) {
          newChats[chatUserIndex] = {
            user: newChats[chatUserIndex].user,
            msgs: [...newChats[chatUserIndex].msgs, singleMsg],
          };
        } else {
          newChats.push({ user: payload.data.reciever, msgs: [singleMsg] });
        }
        // recieve
      } else if (payload.type === "recieve") {
        const chatUserIndex = newChats.findIndex((c) => c.user._id === payload.data.sender._id);
        if (chatUserIndex >= 0) {
          newChats[chatUserIndex] = {
            user: newChats[chatUserIndex].user,
            msgs: [...newChats[chatUserIndex].msgs, singleMsg],
          };
        } else {
          newChats.push({ user: payload.data.sender, msgs: [singleMsg] });
        }
      }

      state.chats = newChats;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSelectedUser, setChats } = chatSlice.actions;

export default chatSlice.reducer;
