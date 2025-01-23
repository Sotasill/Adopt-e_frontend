import { useSelector } from "react-redux";
import dogs from "../language/dictionaries/dogs.json";
import cats from "../language/dictionaries/cats.json";
import countries from "../language/dictionaries/countries.json";

export const useTranslations = () => {
  const language = useSelector((state) => state.language.currentLanguage);

  // Объединяем все словари
  const dictionaries = {
    dogs,
    cats,
    countries,
  };

  const translate = (dictionary, key) => {
    if (!key) return "";

    // Проверяем существование словаря и ключа
    if (!dictionaries[dictionary] || !dictionaries[dictionary][key]) {
      console.warn(`Translation not found for ${dictionary}.${key}`);
      return key;
    }

    // Возвращаем перевод для текущего языка или ключ, если перевод не найден
    return dictionaries[dictionary][key][language] || key;
  };

  return { translate, language };
};
