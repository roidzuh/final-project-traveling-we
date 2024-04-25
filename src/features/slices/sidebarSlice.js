import { createSlice } from "@reduxjs/toolkit";

// Reducer
const initialState = {
  isFull: false,
};

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    // Actions
    toggleFull: (state) => {
      state.isFull = !state.isFull;
    },
  },
});

export const { toggleFull } = sidebarSlice.actions;

export default sidebarSlice.reducer;
