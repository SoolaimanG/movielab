import { configureStore } from "@reduxjs/toolkit";
import allSlice from "./allSlice";

export const store = configureStore({
  reducer: {
    all: allSlice,
  },
});
