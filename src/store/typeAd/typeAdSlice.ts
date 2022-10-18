import { createSlice } from "@reduxjs/toolkit";

export const typeAdSlice = createSlice({
  name: "typeAd",
  initialState: {
    status: "checking",
    typeAd: [],
    errorMessage: undefined,
  },
  reducers: {
    onCheckingTypeAd: (state) => {
      state.status = "checking";
      state.typeAd = [];
      state.errorMessage = undefined;
    },
    onGetTypeAdSuccess: (state, action) => {
      state.status = "success";
      state.typeAd = action.payload;
      state.errorMessage = undefined;
    },
    onGetTypeAdError: (state, action) => {
      state.status = "error";
      state.typeAd = [];
      state.errorMessage = action.payload;
    },
    clearErrorMessageTypeAd: (state) => {
      state.errorMessage = undefined;
    },
  },
});

export const {
  onCheckingTypeAd,
  onGetTypeAdSuccess,
  onGetTypeAdError,
  clearErrorMessageTypeAd,
} = typeAdSlice.actions;
