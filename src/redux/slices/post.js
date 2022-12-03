import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchPosts = createAsyncThunk("post/fetchPosts", async () => {
  const { data } = await axios.get("/post");
  return data;
});
export const fetUserPosts = createAsyncThunk(
  "post/fetUserPosts",
  async (userId) => {
    const { data } = await axios.get(`/post/${userId}/posts`);
    return data;
  }
);
const initialState = {
  data: null,
  status: "loading",
};
const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPost: (state, action) => {
      const updatedPost = state.data.map((post) => {
        if (post._id === action.payload._id) {
          return action.payload;
        }
        return post;
      });
      state.data = updatedPost;
    },
  },
  extraReducers: {
    [fetchPosts.pending]: (state, action) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    },
    [fetchPosts.rejected]: (state, action) => {
      state.status = "error";
      state.data = null;
    },
    [fetUserPosts.pending]: (state, action) => {
      state.status = "loading";
      state.data = null;
    },
    [fetUserPosts.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    },
    [fetUserPosts.rejected]: (state, action) => {
      state.status = "error";
      state.data = null;
    },
  },
});
export const { setPost } = postSlice.actions;
export const postReducer = postSlice.reducer;
export const selectPosts = (state) => state.post.data;
export const { logout } = postSlice.actions;
