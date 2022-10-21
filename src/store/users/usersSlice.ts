import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    status: "checking",
    user: [],
    errorMessage: undefined,
  },
  reducers: {
    onCheckingUsers: (state) => {
      state.status = "checking";
      state.user = [];
      state.errorMessage = undefined;
    },
    onGetUsersSuccess: (state, action) => {
      state.status = "success";
      state.user = action.payload;
      state.errorMessage = undefined;
    },
    onGetUsersError: (state, action) => {
      state.status = "error";
      state.user = [];
      state.errorMessage = action.payload;
    },
    clearErrorMessageUsers: (state) => {
      state.errorMessage = undefined;
    },
  },
});

export const {
  onCheckingUsers,
  onGetUsersSuccess,
  onGetUsersError,
  clearErrorMessageUsers,
} = usersSlice.actions;
