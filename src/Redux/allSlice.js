import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  condition: JSON.parse(localStorage.getItem("userLogin")) || false,
  openModal: false,
  userEmail: "",
  userGenre: [],
  openModalGenre: false,
  uid: JSON.parse(localStorage.getItem("uid")) || "",
  key: "",
  movieLabProfile: JSON.parse(localStorage.getItem("movieLabProfile")) || "",
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
    updateGenre: (state, action) => {
      state.userGenre = [...state.userGenre, ...action.payload];
    },
    clearGenre: (state) => {
      state.userGenre = [];
    },
    isModalGenreOpen: (state) => {
      state.openModalGenre = true;
    },
    isModalGenreClose: (state) => {
      state.openModalGenre = false;
    },
    addUID: (state, action) => {
      state.uid = action.payload;
    },
    setKey: (state, action) => {
      state.key = action.payload;
    },
    updateMovieLabProfile: (state, action) => {
      state.movieLabProfile = action.payload;
    },
  },
});

export const SelectedAll = (state) => state.all;

export const {
  login,
  logout,
  isModalOpen,
  isModalClose,
  updateUser,
  updateGenre,
  isModalGenreClose,
  isModalGenreOpen,
  clearGenre,
  addUID,
  isMenuOpen,
  setKey,
  updateWatchList,
  updateMovieLabProfile,
} = allSlice.actions;
export default allSlice.reducer;
