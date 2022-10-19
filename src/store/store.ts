import { configureStore } from "@reduxjs/toolkit";
import {
  authSlice,
  businessLineSlice,
  typeAdSlice,
  strategySlice,
  channelTypeSlice,
  sourceMediaSlice,
  mediumSlice,
} from "./";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    businessLine: businessLineSlice.reducer,
    typeAd: typeAdSlice.reducer,
    strategy: strategySlice.reducer,
    channelType: channelTypeSlice.reducer,
    sourceMedia: sourceMediaSlice.reducer,
    medium: mediumSlice.reducer,
  },
});
