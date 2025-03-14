import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authReducer";
import { searchSlice } from "./search/searchSlice";
import { registrationSlice } from "./registration/registrationSlice";
import notificationsReducer from "./notifications/notificationsSlice";
import languageReducer from "./language/languageSlice";
import petTypeReducer from "./petType/petTypeSlice";
import productTypeReducer from "./productType/productTypeSlice";
import favoritesReducer from "./reducers/favoritesReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    search: searchSlice.reducer,
    registration: registrationSlice.reducer,
    notifications: notificationsReducer,
    language: languageReducer,
    petType: petTypeReducer,
    productType: productTypeReducer,
    favorites: favoritesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
