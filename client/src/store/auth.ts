import { createSlice } from "@reduxjs/toolkit";
import { storage } from "../utils/storage-utils";

const user = storage.getItem("user");

const initialState = {
  user: user ? user : null,
  loading: "idle",
  errorMsg: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {},
});
export default authSlice.reducer;
