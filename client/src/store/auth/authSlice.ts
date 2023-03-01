import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { AuthSliceState, loginData, registerData, userState } from "./auth.types";
import { storage } from "../../utils/storage-utils";
import authService from "../../services/authServices";
import { STORAGE_KEYS } from "../../data/constants";

const user = storage.getItem(STORAGE_KEYS.AUTH);

const initialState: AuthSliceState = {
  user: user || null,
  loading: false,
  error: null,
};

export const login = createAsyncThunk<userState, loginData, { rejectValue: string }>(
  "auth/login",
  async (data: loginData, thunkApi) => {
    try {
      const res = await authService.login(data);
      const userData = res.data;
      storage.setItem(STORAGE_KEYS.AUTH, userData);
      return userData as userState;
    } catch (error: any) {
      const err: string = error?.response?.data?.message || "Failed to login!";
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const register = createAsyncThunk<userState, registerData, { rejectValue: string }>(
  "auth/register",
  async (data: registerData, thunkApi) => {
    try {
      const res = await authService.register(data);
      const userData = res.data;
      storage.setItem(STORAGE_KEYS.AUTH, userData);
      return userData as userState;
    } catch (error: any) {
      const err: string = error?.response?.data?.message || "Failed to register!";
      return thunkApi.rejectWithValue(err);
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
    setError: (state) => {
      state.error = null;
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
        storage.setItem(STORAGE_KEYS.AUTH, action.payload);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        storage.setItem(STORAGE_KEYS.AUTH, action.payload);
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Action creators are generated for each case reducer function
export const { logout, setError } = authSlice.actions;
// Define your selector
// export const selectAuth = (state: AuthSliceState) => state;
// export const authUser = createSelector(selectAuth, (state) => state.user);
// export const authLoading = createSelector(selectAuth, (state) => state.loading);
// export const authError = createSelector(selectAuth, (state) => state.error);

export default authSlice.reducer;
