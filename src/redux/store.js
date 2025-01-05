import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/authReducer";
import { searchSlice } from "./search/searchSlice";
import { registrationSlice } from "./registration/registrationSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    search: searchSlice.reducer,
    registration: registrationSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
