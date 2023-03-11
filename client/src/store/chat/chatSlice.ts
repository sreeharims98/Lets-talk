import { createSlice } from "@reduxjs/toolkit";
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
    setChats: (state, action) => {
      state.chats = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSelectedUser, setChats } = chatSlice.actions;

export default chatSlice.reducer;
