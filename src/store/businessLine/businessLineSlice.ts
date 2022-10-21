import { createSlice } from "@reduxjs/toolkit";

export const businessLineSlice = createSlice({
  name: "businessLine",
  initialState: {
    status: "checking",
    businessLine: [],
    errorMessage: undefined,
  },
  reducers: {
    onCheckingbusiness: (state) => {
      state.status = "checking";
      state.businessLine = [];
      state.errorMessage = undefined;
    },
    onGetbusinessSuccess: (state, action) => {
      state.status = "success";
      state.businessLine = action.payload;
      state.errorMessage = undefined;
    },
    onGetbusinessError: (state, action) => {
      state.status = "error";
      state.businessLine = [];
      state.errorMessage = action.payload;
    },
    clearErrorMessagebusiness: (state) => {
      state.errorMessage = undefined;
    },
  },
});

export const {
  onCheckingbusiness,
  onGetbusinessSuccess,
  onGetbusinessError,
  clearErrorMessagebusiness,
} = businessLineSlice.actions;
