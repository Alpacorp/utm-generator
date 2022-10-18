import { configureStore } from "@reduxjs/toolkit";
import { authSlice, businessLineSlice, typeAdSlice, strategySlice } from "./";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    businessLine: businessLineSlice.reducer,
    typeAd: typeAdSlice.reducer,
    strategy: strategySlice.reducer,
  },
});
