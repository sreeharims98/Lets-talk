import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { AuthSliceState, loginData, userState } from "./auth.types";
import { storage } from "../../../utils/storage-utils";
import authService from "./authServices";

const user = storage.getItem("user");

const initialState: AuthSliceState = {
  user: user || null,
  loading: false,
  error: null,
};

export const login = createAsyncThunk<userState, loginData, { rejectValue: string }>(
  "user/login",
  async (data: loginData, thunkApi) => {
    try {
      const res = await authService.login(data);
      console.log(res, "res");
      const userData = { ...res.data.user, token: res.data.token };
      storage.setItem("user", userData);
      return userData as userState;
    } catch (error) {
      return thunkApi.rejectWithValue("Failed to fetch user data");
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      storage.clearAll();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        storage.setItem("user", action.payload);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Action creators are generated for each case reducer function
export const { logout } = authSlice.actions;
// Define your selector
const selectUser = (state: AuthSliceState) => state;
export const selectUserData = createSelector(selectUser, (state) => state.user);
export const selectUserLoading = createSelector(selectUser, (state) => state.loading);
export const selectUserError = createSelector(selectUser, (state) => state.error);

export default authSlice.reducer;
