import { configureStore } from "@reduxjs/toolkit";
import navbarReducer from "./slices/navbarSlice";
import modalReducer from "./slices/modalSlice";
import sidebarReducer from "./slices/sidebarSlice";

const store = configureStore({
  reducer: {
    navbar: navbarReducer,
    modal: modalReducer,
    sidebar: sidebarReducer,
  },
});

export default store;
