import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  saved: [], // ✅ Ensures `feed` is always an array
};

export const savedSlice = createSlice({
  name: "saved",
  initialState,
  reducers: {
    setSavedData: (state, action) => {
      state.saved = action.payload;
    },
    deleteSavedData: (state, action) => {
      const idToDelete = action.payload; // ✅ Extracts `id` directly from payload
      state.saved = state.saved.filter((item) => item._id !== idToDelete); // ✅ Removes matching item
    },
    AddSavedData: (state, action) => {
      const newSave = action.payload; // ✅ Extracts `id` directly from payload
      
      // Check if the item already exists before adding
      const exists = state.saved.some(item => item._id === newSave._id);
      
      if (!exists) {
        state.saved.push(newSave); // ✅ Add only if it doesn't already exist
      }
    },
  },
});

export const { setSavedData, deleteSavedData ,AddSavedData} = savedSlice.actions;

export default savedSlice.reducer;
