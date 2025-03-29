import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: null, 
  userPosts:[],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
    setUserPost :(state, action) => {
      state.userPosts = action.payload; 
      // console.log(state.userPosts);
      
    },
    
  },
});

export const { setUser, clearUser,setUserPost } = userSlice.actions;

export default userSlice.reducer;
