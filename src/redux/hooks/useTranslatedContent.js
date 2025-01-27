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
          return key;
        }
      }

      return result;
    } catch (error) {
      return key;
    }
  };

  return { t };
};
