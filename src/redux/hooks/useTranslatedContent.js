import { useSelector } from "react-redux";

export const useTranslatedContent = () => {
  const currentLanguage = useSelector(
    (state) => state.language.currentLanguage
  );
  const translations = useSelector((state) => state.language.translations);

  const t = (key) => {
    try {
      const keys = key.split(".");
      let result = translations[currentLanguage];

      for (const k of keys) {
        if (result && result[k]) {
          result = result[k];
        } else {
          console.warn(`Translation key not found: ${key}`);
          return key;
        }
      }

      return result;
    } catch (error) {
      console.warn(`Error getting translation for key: ${key}`, error);
      return key;
    }
  };

  return { t };
};
