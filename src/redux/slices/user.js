import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchUser = createAsyncThunk("user/fetchUser", async (id) => {
  const { data } = await axios.get(`/users/${id}`);
  const friends = await axios.get(`/users/${id}/friends`);
  return { ...data, expandedFriends: friends.data };
});

const initialState = {
  data: null,
  status: "loading",
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserFriends: (state, action) => {
      state.data.friends = action.payload.userFriends;
      state.data.expandedFriends = action.payload.expandedUserFriends;
    },
  },
  extraReducers: {
    [fetchUser.pending]: (state, action) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchUser.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    },
    [fetchUser.rejected]: (state, action) => {
      state.status = "error";
      state.data = null;
    },
  },
});

export const userReducer = userSlice.reducer;
export const selectUserData = (state) => state.user.data;
export const selectUserStatus = (state) => state.user.status;

export const { setUserFriends } = userSlice.actions;
