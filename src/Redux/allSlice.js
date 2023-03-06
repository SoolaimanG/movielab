import { createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";

const initialState = {
  condition: localStorage.getItem("userLogin") || false,
  openModal: false,
  userEmail: "",
  uid: "",
};

const allSlice = createSlice({
  name: "all",
  initialState,
  reducers: {
    login: (state) => {
      state.condition = true;
    },
    logout: (state) => {
      state.condition = false;
    },
    isModalOpen: (state) => {
      state.openModal = true;
    },
    isModalClose: (state) => {
      state.openModal = false;
    },
    updateUser: (state, action) => {
      const { email, uid } = action.payload;
      state.userEmail = email;
      state.uid = uid;
    },
  },
});

export const SelectedAll = (state) => state.all;

export const { login, logout, isModalOpen, isModalClose, updateUser } =
  allSlice.actions;
export default allSlice.reducer;
