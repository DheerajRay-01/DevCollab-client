import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import createPostReducer from './createPostSlice.js'
import feedReducer from './feedSlice.js'
import savedReducer from './savedSlice.js'

export const store = configureStore({
  reducer: {
    user: userReducer,
    createPost:createPostReducer,
    feed:feedReducer,
    saved:savedReducer,
  },
});
