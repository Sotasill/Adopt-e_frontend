import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/authReducer";
import { searchSlice } from "./search/searchSlice";
import { registrationSlice } from "./registration/registrationSlice";
import notificationsReducer from "./notifications/notificationsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    search: searchSlice.reducer,
    registration: registrationSlice.reducer,
    notifications: notificationsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
