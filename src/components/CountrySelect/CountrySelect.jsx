import React, { useMemo } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import Flag from "react-world-flags";
import { useTranslatedContent } from "../../redux/hooks/useTranslatedContent";
import countries from "../../redux/language/dictionaries/countries.json";
import styles from "./CountrySelect.module.css";

const CountrySelect = ({
  value = "",
  onChange,
  placeholder = "",
  isDisabled = false,
  error = false,
}) => {
  const { t, currentLanguage } = useTranslatedContent();

  console.log("Current Language:", currentLanguage);
  console.log("Countries data:", countries);

  // Преобразуем код языка в формат словаря стран
  const languageCode = useMemo(() => {
    switch (currentLanguage) {
      case "ru":
        return "ru";
      case "uk":
        return "uk";
      case "fr":
        return "fr";
      case "de":
        return "de";
      default:
        return "en";
    }
  }, [currentLanguage]);

  const options = useMemo(() => {
    const mappedOptions = Object.entries(countries).map(([key, country]) => ({
      value: country.iso,
      label: country[languageCode] || country.en, // Используем преобразованный код языка
      code: country.iso,
    }));
    console.log("All options:", mappedOptions);
    return mappedOptions.sort((a, b) => a.label.localeCompare(b.label));
  }, [languageCode]);

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: error ? "#ff5252" : state.isFocused ? "#4a90e2" : "#e0e0e0",
      boxShadow: "none",
      "&:hover": {
        borderColor: error ? "#ff5252" : "#4a90e2",
      },
      minHeight: "40px",
      backgroundColor: "white",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#4a90e2"
        : state.isFocused
        ? "#f5f5f5"
        : "white",
      color: state.isSelected ? "white" : "#333",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: "8px 12px",
      fontSize: "14px",
    }),
    singleValue: (provided) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
      gap: "8px",
      fontSize: "14px",
    }),
    input: (provided) => ({
      ...provided,
      color: "#333",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#999",
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 2,
    }),
  };

  const formatOptionLabel = ({ label, code }) => (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <div className={styles.flagWrapper}>
        <Flag code={code} height="16" />
      </div>
      <span>{label}</span>
    </div>
  );

  const selectedOption = useMemo(() => {
    console.log("Current value:", value);
    if (!value) return null;

    const option = options.find((opt) => opt.value === value);
    console.log("Selected option:", option);
    return option;
  }, [value, options]);

  console.log("Final selected option:", selectedOption);

  return (
    <Select
      value={selectedOption}
      onChange={(option) => {
        console.log("Selected new option:", option);
        onChange(option?.value || "");
      }}
      options={options}
      styles={customStyles}
      placeholder={placeholder}
      isDisabled={isDisabled}
      formatOptionLabel={formatOptionLabel}
      isClearable
      isSearchable
      className={styles.countrySelect}
      classNamePrefix="country-select"
    />
  );
};

CountrySelect.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  isDisabled: PropTypes.bool,
  error: PropTypes.bool,
};

export default CountrySelect;
