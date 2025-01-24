import { useState, useEffect } from "react";
import { useTranslatedContent } from "./useTranslatedContent";

export const useCountries = (kennels) => {
  const [countries, setCountries] = useState([]);
  const { t } = useTranslatedContent();

  useEffect(() => {
    if (!kennels?.length) return;

    // Получаем уникальные ключи стран из списка питомников
    const uniqueCountries = [
      ...new Set(kennels.map((kennel) => kennel.countryKey)),
    ];

    // Формируем массив объектов стран с дополнительной информацией
    const countriesData = uniqueCountries.map((countryKey) => ({
      key: countryKey,
      code: getCountryCode(countryKey),
      name: t(countryKey),
      flag: `https://flagcdn.com/w20/${getCountryCode(countryKey)}.png`,
    }));

    // Сортируем страны по имени
    const sortedCountries = countriesData.sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    setCountries(sortedCountries);
  }, [kennels, t]);

  return countries;
};

// Функция для получения кода страны из ключа перевода
const getCountryCode = (countryKey) => {
  const countryCodesMap = {
    "kennels.list.countries.us": "us",
    "kennels.list.countries.gb": "gb",
    "kennels.list.countries.de": "de",
    "kennels.list.countries.ru": "ru",
    "kennels.list.countries.ir": "ir",
    "kennels.list.countries.th": "th",
  };

  return countryCodesMap[countryKey] || countryKey.toLowerCase();
};
