import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  postData: null, // ✅ FIX: Initialize `user` as null instead of undefined
};

export const createPostSlice = createSlice({
  name: "CreatePostData",
  initialState,
  reducers: {
    setCreatingPostData: (state, action) => {
      state.postData = action.payload;
    },
    clearCreatingPostData: (state) => {
      state.postData = null;
    },
  },
});

export const { setCreatingPostData, clearCreatingPostData } = createPostSlice.actions;

export default createPostSlice.reducer;
