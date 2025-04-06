import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  feed:{
    feed:[],
    currentPage:0,
    limit:3
  }  // ✅ Ensures `feed` is always an array
};

export const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    setFeedData: (state, action) => {
      const newFeed = action.payload
      if(newFeed.length < 1) return
      state.feed.feed = [...state.feed.feed,...newFeed];
      state.feed.currentPage += 1;
    },
    deleteFeedData: (state, action) => {
      const idToDelete = action.payload; // ✅ Extracts `id` directly from payload
      state.feed.feed = state.feed.feed.filter((item) => item._id !== idToDelete); // ✅ Removes matching item
    },
    addFeedData: (state, action) => {
      const newFeed = action.payload; // ✅ Extracts `id` directly from payload
      state.feed.feed.unshift(newFeed);

    },

    deleteUsersSelfFeedData: (state, action) => {
      const userId = action.payload; 
      state.feed.feed = state.feed.feed.filter((item) => item.login !== userId);
    },
  },
});

export const { setFeedData, deleteFeedData,addFeedData ,deleteUsersSelfFeedData} = feedSlice.actions;

export default feedSlice.reducer;
