import { createSlice } from "@reduxjs/toolkit";

// Reducer
const initialState = {
  isEditModalOpen: false,
  isCreateModalOpen: false,
  isDeleteModalOpen: false,
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
    toggleDeleteModal: (state) => {
      // Reducer untuk toggle modal konfirmasi
      state.isDeleteModalOpen = !state.isDeleteModalOpen;
    },
  },
});

export const { toggleEditModal, toggleCreateModal, toggleDeleteModal } =
  modalSlice.actions;

export default modalSlice.reducer;
