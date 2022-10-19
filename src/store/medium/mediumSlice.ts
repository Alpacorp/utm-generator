import { createSlice } from "@reduxjs/toolkit";

export const mediumSlice = createSlice({
  name: "medium",
  initialState: {
    status: "checking",
    medium: [],
    errorMessage: undefined,
  },
  reducers: {
    onCheckingMedium: (state) => {
      state.status = "checking";
      state.medium = [];
      state.errorMessage = undefined;
    },
    onGetMediumSuccess: (state, action) => {
      state.status = "success";
      state.medium = action.payload;
      state.errorMessage = undefined;
    },
    onGetMediumError: (state, action) => {
      state.status = "error";
      state.medium = [];
      state.errorMessage = action.payload;
    },
    clearErrorMessageMedium: (state) => {
      state.errorMessage = undefined;
    },
  },
});

export const {
  onCheckingMedium,
  onGetMediumSuccess,
  onGetMediumError,
  clearErrorMessageMedium,
} = mediumSlice.actions;
