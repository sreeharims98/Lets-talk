import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userSliceState } from "./users.types";
import usersService from "../../services/usersServices";
import { userState } from "../auth/auth.types";

const initialState: userSliceState = {
  users: [],
  onlineUsers: [],
  loading: false,
  error: null,
};
export const getAllUsers = createAsyncThunk<userState[], any, { rejectValue: string }>(
  "users/getAllUsers",
  async (_, thunkApi) => {
    try {
      const { data } = await usersService.getAllUsers();
      return data as userState[];
    } catch (error: any) {
      const err: string = error?.response?.data?.message || "Failed to get all users!";
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
    setError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        console.log(action);
        state.error = action.payload as string;
      });
  },
});

// Action creators are generated for each case reducer function
export const { setError, setOnlineUsers, setUsers } = usersSlice.actions;
// Define your selector
// export const selectAuth = (state: userSliceState) => state;
// export const authUser = createSelector(selectAuth, (state) => state.user);
// export const authLoading = createSelector(selectAuth, (state) => state.loading);
// export const authError = createSelector(selectAuth, (state) => state.error);

export default usersSlice.reducer;
