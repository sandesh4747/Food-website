import { configureStore } from "@reduxjs/toolkit";
import { mainApi } from "./mainApi";
import { authSlice } from "./authSlice";
import { cartSlice } from "./cartSlice";

export const store = configureStore({
  reducer: {
    [mainApi.reducerPath]: mainApi.reducer,
    [authSlice.reducerPath]: authSlice.reducer,
    [cartSlice.reducerPath]: cartSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(mainApi.middleware),
});
