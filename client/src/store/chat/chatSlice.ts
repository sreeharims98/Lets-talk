import { createSlice } from "@reduxjs/toolkit";
import { chatSliceState } from "./chat.types";

const initialState: chatSliceState = {
  selectedUser: null,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSelectedUser } = chatSlice.actions;

export default chatSlice.reducer;
