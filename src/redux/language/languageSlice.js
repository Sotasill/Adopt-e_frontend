import { createSlice } from "@reduxjs/toolkit";
import enTranslation from "./translation/en";
import rusTranslation from "./translation/rus";
import ukrTranslation from "./translation/ukr";
import deuTranslation from "./translation/deu";
import frTranslation from "./translation/fr";

const translations = {
  rus: rusTranslation,
  en: enTranslation,
  ukr: ukrTranslation,
  deu: deuTranslation,
  fr: frTranslation,
};

const initialState = {
  currentLanguage: localStorage.getItem("language") || "rus",
  translations,
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.currentLanguage = action.payload;
      localStorage.setItem("language", action.payload);
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export const selectCurrentLanguage = (state) => state.language.currentLanguage;
export const selectTranslations = (state) => state.language.translations;

export default languageSlice.reducer;
