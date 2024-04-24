import { configureStore } from "@reduxjs/toolkit";
import navbarReducer from "./slices/navbarSlice";
import modalReducer from "./slices/modalSlice";

const store = configureStore({
  reducer: {
    navbar: navbarReducer,
    modal: modalReducer,
  },
});

export default store;
