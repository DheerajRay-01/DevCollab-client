import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import createPostReducer from './createPostSlice.js'
import feedReducer from './feedSlice.js'

export const store = configureStore({
  reducer: {
    user: userReducer,
    createPost:createPostReducer,
    feed:feedReducer,
  },
});
