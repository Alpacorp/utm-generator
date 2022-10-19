import { createSlice } from "@reduxjs/toolkit";

export const channelTypeSlice = createSlice({
  name: "channelType",
  initialState: {
    status: "checking",
    channelType: [],
    errorMessage: undefined,
  },
  reducers: {
    onCheckingChannelType: (state) => {
      state.status = "checking";
      state.channelType = [];
      state.errorMessage = undefined;
    },
    onGetChannelTypeSuccess: (state, action) => {
      state.status = "success";
      state.channelType = action.payload;
      state.errorMessage = undefined;
    },
    onGetChannelTypeError: (state, action) => {
      state.status = "error";
      state.channelType = [];
      state.errorMessage = action.payload;
    },
    clearErrorMessageChannelType: (state) => {
      state.errorMessage = undefined;
    },
  },
});

export const {
  onCheckingChannelType,
  onGetChannelTypeSuccess,
  onGetChannelTypeError,
  clearErrorMessageChannelType,
} = channelTypeSlice.actions;
