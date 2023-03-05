import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  condition: false,
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
  },
});

export const SelectedAll = (state) => state.all.condition;

export const { login, logout } = allSlice.actions;
export default allSlice.reducer;
