import { createSlice } from "@reduxjs/toolkit";

export const sourceMediaSlice = createSlice({
  name: "sourceMedia",
  initialState: {
    status: "checking",
    sourceMedia: [],
    errorMessage: undefined,
  },
  reducers: {
    onCheckingSourceMedia: (state) => {
      state.status = "checking";
      state.sourceMedia = [];
      state.errorMessage = undefined;
    },
    onGetSourceMediaSuccess: (state, action) => {
      state.status = "success";
      state.sourceMedia = action.payload;
      state.errorMessage = undefined;
    },
    onGetSourceMediaError: (state, action) => {
      state.status = "error";
      state.sourceMedia = [];
      state.errorMessage = action.payload;
    },
    clearErrorMessageSourceMedia: (state) => {
      state.errorMessage = undefined;
    },
  },
});

export const {
  onCheckingSourceMedia,
  onGetSourceMediaSuccess,
  onGetSourceMediaError,
  clearErrorMessageSourceMedia,
} = sourceMediaSlice.actions;
