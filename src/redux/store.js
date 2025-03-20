import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authReducer";
import notificationsReducer from "./notifications/notificationsSlice";
import languageReducer from "./language/languageSlice";
import petTypeReducer from "./petType/petTypeSlice";
import productTypeReducer from "./productType/productTypeSlice";
import favoritesReducer from "./reducers/favoritesReducer";
import { searchSlice } from "./search/searchSlice";
import { registrationSlice } from "./registration/registrationSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    notifications: notificationsReducer,
    language: languageReducer,
    petType: petTypeReducer,
    productType: productTypeReducer,
    favorites: favoritesReducer,
    search: searchSlice.reducer,
    registration: registrationSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
