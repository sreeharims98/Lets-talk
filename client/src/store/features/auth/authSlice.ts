import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AuthSliceState, userState } from "./authSlice.types";
import { storage } from "../../../utils/storage-utils";

const user = storage.getItem("user");

const initialState: AuthSliceState = {
  user: user || null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<userState>) => {
      state.user = action.payload;
      storage.setItem("user", action.payload);
    },
    logout: (state) => {
      state.user = null;
      storage.clearAll();
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
