import { createSlice } from "@reduxjs/toolkit";
import { CommonSliceState } from "./common.types";

const initialState: CommonSliceState = {
  loading: false,
  error: null,
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLoading, setError } = commonSlice.actions;
// Define your selector
// export const selectAuth = (state: CommonSliceState) => state;
// export const authError = createSelector(selectAuth, (state) => state.error);

export default commonSlice.reducer;
