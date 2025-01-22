import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setLanguage,
  selectCurrentLanguage,
} from "../../redux/language/languageSlice";
import { useTranslatedContent } from "../../redux/hooks/useTranslatedContent";
import styles from "./LanguageSwitcher.module.css";

const languages = [
  {
    code: "rus",
    label: "RU",
    flag: "https://flagcdn.com/w40/ru.png",
    flagAlt: "Флаг России",
  },
  {
    code: "en",
    label: "EN",
    flag: "https://flagcdn.com/w40/gb.png",
    flagAlt: "Флаг Великобритании",
  },
  {
    code: "ukr",
    label: "UA",
    flag: "https://flagcdn.com/w40/ua.png",
    flagAlt: "Флаг Украины",
  },
  {
    code: "deu",
    label: "DE",
    flag: "https://flagcdn.com/w40/de.png",
    flagAlt: "Флаг Германии",
  },
  {
    code: "fr",
    label: "FR",
    flag: "https://flagcdn.com/w40/fr.png",
    flagAlt: "Флаг Франции",
  },
];

const LanguageSwitcher = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const reduxLanguage = useSelector(selectCurrentLanguage);
  const { t } = useTranslatedContent();

  const handleLanguageChange = (langCode) => {
    dispatch(setLanguage(langCode));
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentLanguage =
    languages.find((lang) => lang.code === reduxLanguage) || languages[0];

  return (
    <div className={styles.languageSwitcher} ref={dropdownRef}>
      <button
        className={styles.currentLanguage}
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        <img
          src={currentLanguage.flag}
          alt={currentLanguage.flagAlt}
          className={styles.flag}
        />
        <span className={styles.label}>{currentLanguage.label}</span>
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`${styles.option} ${
                lang.code === currentLanguage.code ? styles.active : ""
              }`}
              onClick={() => handleLanguageChange(lang.code)}
              type="button"
            >
              <img src={lang.flag} alt={lang.flagAlt} className={styles.flag} />
              <span className={styles.label}>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
