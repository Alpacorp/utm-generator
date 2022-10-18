import { createSlice } from "@reduxjs/toolkit";

export const strategySlice = createSlice({
  name: "strategy",
  initialState: {
    status: "checking",
    strategy: [],
    errorMessage: undefined,
  },
  reducers: {
    onCheckingStrategy: (state) => {
      state.status = "checking";
      state.strategy = [];
      state.errorMessage = undefined;
    },
    onGetStrategySuccess: (state, action) => {
      state.status = "success";
      state.strategy = action.payload;
      state.errorMessage = undefined;
    },
    onGetStrategyError: (state, action) => {
      state.status = "error";
      state.strategy = [];
      state.errorMessage = action.payload;
    },
    clearErrorMessageStrategy: (state) => {
      state.errorMessage = undefined;
    },
  },
});

export const {
  onCheckingStrategy,
  onGetStrategySuccess,
  onGetStrategyError,
  clearErrorMessageStrategy,
} = strategySlice.actions;
