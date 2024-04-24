import { createSlice } from "@reduxjs/toolkit";

// Reducer
const initialState = {
  isEditModalOpen: false,
  isCreateModalOpen: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    // Actions
    toggleEditModal: (state) => {
      state.isEditModalOpen = !state.isEditModalOpen;
    },
    toggleCreateModal: (state) => {
      state.isCreateModalOpen = !state.isCreateModalOpen;
    },
  },
});

export const { toggleEditModal, toggleCreateModal } = modalSlice.actions;

export default modalSlice.reducer;
