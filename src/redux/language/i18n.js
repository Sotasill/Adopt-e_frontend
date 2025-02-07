import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "./translation/en";
import rusTranslation from "./translation/rus";
import ukrTranslation from "./translation/ukr";
import deuTranslation from "./translation/deu";
import frTranslation from "./translation/fr";

const resources = {
  rus: {
    translation: rusTranslation,
  },
  en: {
    translation: enTranslation,
  },
  ukr: {
    translation: ukrTranslation,
  },
  deu: {
    translation: deuTranslation,
  },
  fr: {
    translation: frTranslation,
  },
};

const initI18n = async () => {
  await i18n.use(initReactI18next).init({
    resources,
    lng: localStorage.getItem("language") || "rus",
    fallbackLng: "rus",
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });
  return i18n;
};

initI18n().catch(console.error);

export default i18n;
