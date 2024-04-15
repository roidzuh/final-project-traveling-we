import { configureStore } from "@reduxjs/toolkit";
import navbarReducer from "./slices/navbarSlice";
import userReducer from "./slices/userSlice";

const store = configureStore({
  reducer: {
    navbar: navbarReducer,
    user: userReducer,
  },
});

export default store;
