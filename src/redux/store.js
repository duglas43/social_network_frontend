import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/auth";
import { postReducer } from "./slices/post";
import { userReducer } from "./slices/user";
const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
    user: userReducer,
  },
});
export default store;
