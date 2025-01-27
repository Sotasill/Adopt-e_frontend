import { useSelector } from "react-redux";
import dogs from "../language/dictionaries/dogs.json";
import cats from "../language/dictionaries/cats.json";
import countries from "../language/dictionaries/countries.json";
import common from "../language/dictionaries/common.json";

export const useTranslations = () => {
  const language = useSelector((state) => state.language.currentLanguage);

  // Объединяем все словари
  const dictionaries = {
    dogs,
    cats,
    countries,
    common,
  };

  const translate = (dictionary, key) => {
    if (!key) return "";

    // Проверяем существование словаря
    if (!dictionaries[dictionary]) {
      console.warn(`Dictionary not found: ${dictionary}`);
      return key;
    }

    // Разбиваем ключ на части для поддержки вложенных объектов
    const keys = key.split(".");
    let result = dictionaries[dictionary];

    // Проходим по всем частям ключа, кроме последней
    for (let i = 0; i < keys.length - 1; i++) {
      const k = keys[i];
      if (result && result[k]) {
        result = result[k];
      } else {
        console.warn(
          `Translation key not found: ${dictionary}.${key} (failed at ${k})`
        );
        return key;
      }
    }

    // Получаем последний ключ
    const lastKey = keys[keys.length - 1];

    // Проверяем, есть ли перевод для текущего языка
    if (result && result[language] && result[language][lastKey]) {
      return result[language][lastKey];
    }

    console.warn(
      `Translation not found for ${dictionary}.${key} in language ${language}`
    );
    return key;
  };

  return { translate, language };
};
