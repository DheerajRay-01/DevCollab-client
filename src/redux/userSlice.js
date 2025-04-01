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
    addUserPost :(state, action) => {
      const newPost = action.payload
      console.log(newPost);
      
      state.userPosts.push(newPost) 
      // console.log(state.userPosts);
    },
    deleteUserPost :(state, action) => {
      const idToDelete = action.payload; 
      state.userPosts = state.userPosts.filter((post)=>post._id !== idToDelete )
    },

    changePostVisibility:(state, action)=>{
      const idToEdit = action.payload; 
      state.userPosts = state.userPosts.map((item)=> item._id === idToEdit ? {...item,isPublic:!item.isPublic} : item)
    }

  },
});

export const { setUser, clearUser,setUserPost,deleteUserPost ,addUserPost,changePostVisibility} = userSlice.actions;

export default userSlice.reducer;
