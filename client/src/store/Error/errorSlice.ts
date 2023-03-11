import { createSlice } from "@reduxjs/toolkit";
import { ErrorSliceState } from "./error.types";

const initialState: ErrorSliceState = {
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setError: (state) => {
      state.error = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setError } = authSlice.actions;
// Define your selector
// export const selectAuth = (state: ErrorSliceState) => state;
// export const authError = createSelector(selectAuth, (state) => state.error);

export default authSlice.reducer;
