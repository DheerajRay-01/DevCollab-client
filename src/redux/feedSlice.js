import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  feed: [], // ✅ Ensures `feed` is always an array
};

export const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    setFeedData: (state, action) => {
      state.feed = action.payload;
    },
    deleteFeedData: (state, action) => {
      const idToDelete = action.payload; // ✅ Extracts `id` directly from payload
      state.feed = state.feed.filter((item) => item._id !== idToDelete); // ✅ Removes matching item
    },
    addFeedData: (state, action) => {
      const newFeed = action.payload; // ✅ Extracts `id` directly from payload
      state.feed.push(newFeed)
    },
  },
});

export const { setFeedData, deleteFeedData,addFeedData } = feedSlice.actions;

export default feedSlice.reducer;
