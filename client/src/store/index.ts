import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import chatSlice from "./chat/chatSlice";
import usersSlice from "./users/usersSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    users: usersSlice,
    chat: chatSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
