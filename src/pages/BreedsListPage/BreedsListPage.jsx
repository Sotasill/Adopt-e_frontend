import { useState, useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import GridViewIcon from "@mui/icons-material/GridView";
import ViewListIcon from "@mui/icons-material/ViewList";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { FaDog, FaCat } from "react-icons/fa";
import styles from "./BreedsListPage.module.css";
import commonStyles from "../../styles/common.module.css";
import { useTranslations } from "../../redux/hooks/useTranslations";
import dogsData from "../../redux/language/dictionaries/dogs.json";
import catsData from "../../redux/language/dictionaries/cats.json";
import defaultCatImage from "../../assets/images/Andrew_P_7a3c3671-76fa-4df7-ba76-416cc5a21926.png";
import defaultDogImage from "../../assets/images/Andrew_P_3abdd9bc-68c7-4323-ae31-22248140aed3.png";

const languageMapping = {
  rus: "ru",
  ukr: "uk",
  deu: "de",
  fr: "fr",
  en: "en",
};

const BreedsListPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { translate } = useTranslations();
  const currentLanguage = useSelector(
    (state) => state.language.currentLanguage
  );

  // Получаем тип животного из URL параметров
  const searchParams = new URLSearchParams(location.search);
  const typeFromUrl = searchParams.get("type");

  const [animalType, setAnimalType] = useState(typeFromUrl || "dogs");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [sortDirection, setSortDirection] = useState("asc");
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const breeds = useMemo(() => {
    const data = animalType === "dogs" ? dogsData : catsData;
    const defaultImage =
      animalType === "dogs" ? defaultDogImage : defaultCatImage;

    console.log("Current Language:", currentLanguage);
    console.log("Sample breed data:", Object.entries(data)[0]);

    const mappedBreeds = Object.entries(data)
      .map(([key, translations]) => {
        const languageCode =
          languageMapping[currentLanguage.toLowerCase()] || "en";
        const name = translations[languageCode] || translations["en"] || key;
        console.log(`Breed ${key}:`, {
          availableTranslations: Object.keys(translations),
          currentLanguage: currentLanguage.toLowerCase(),
          selectedName: name,
        });
        return {
          id: key,
          name,
          image: defaultImage,
        };
      })
      .filter((breed) =>
        breed.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return mappedBreeds.sort((a, b) => {
      const compareResult = a.name.localeCompare(b.name);
      return sortDirection === "asc" ? compareResult : -compareResult;
    });
  }, [animalType, currentLanguage, searchQuery, sortDirection]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSortClick = () => {
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  // Обновляем URL при изменении типа животного
  const handleAnimalTypeChange = (type) => {
    setAnimalType(type);
    const newSearchParams = new URLSearchParams(location.search);
    newSearchParams.set("type", type);
    navigate(`/breeds?${newSearchParams.toString()}`);
  };

  return (
    <div className={commonStyles.pageContainer}>
      <div className={commonStyles.pageHeader}>
        <h1 className={commonStyles.pageTitle}>
          {translate("common", "breeds.title")}
        </h1>
      </div>

      <div className={commonStyles.viewControls}>
        <div className={commonStyles.controlsLeft}>
          <TextField
            className={commonStyles.searchField}
            placeholder={translate("common", "breeds.searchPlaceholder")}
            value={searchQuery}
            onChange={handleSearchChange}
            variant="outlined"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>

        <div className={commonStyles.controlsRight}>
          <div className={commonStyles.petTypeSwitch}>
            <div className={commonStyles.switchContainer}>
              <div
                className={`${commonStyles.petTypeOption} ${
                  animalType === "dogs" ? commonStyles.active : ""
                }`}
                onClick={() => handleAnimalTypeChange("dogs")}
              >
                <FaDog
                  className={`${commonStyles.petIcon} ${
                    animalType === "dogs" ? commonStyles.active : ""
                  }`}
                />
                <span
                  className={`${commonStyles.petLabel} ${
                    animalType === "dogs" ? commonStyles.active : ""
                  }`}
                >
                  {translate("common", "breeds.dogs")}
                </span>
              </div>
              <div
                className={`${commonStyles.petTypeOption} ${
                  animalType === "cats" ? commonStyles.active : ""
                }`}
                onClick={() => handleAnimalTypeChange("cats")}
              >
                <FaCat
                  className={`${commonStyles.petIcon} ${
                    animalType === "cats" ? commonStyles.active : ""
                  }`}
                />
                <span
                  className={`${commonStyles.petLabel} ${
                    animalType === "cats" ? commonStyles.active : ""
                  }`}
                >
                  {translate("common", "breeds.cats")}
                </span>
              </div>
            </div>
          </div>

          <IconButton
            className={`${commonStyles.viewButton} ${
              sortDirection === "asc" ? commonStyles.active : ""
            }`}
            onClick={handleSortClick}
            title={translate(
              "common",
              sortDirection === "asc" ? "sort.ascending" : "sort.descending"
            )}
          >
            <SortByAlphaIcon />
          </IconButton>

          <div className={commonStyles.viewToggle}>
            <IconButton
              className={`${commonStyles.viewButton} ${
                viewMode === "grid" ? commonStyles.active : ""
              }`}
              onClick={() => setViewMode("grid")}
            >
              <GridViewIcon />
            </IconButton>
            <IconButton
              className={`${commonStyles.viewButton} ${
                viewMode === "list" ? commonStyles.active : ""
              }`}
              onClick={() => setViewMode("list")}
            >
              <ViewListIcon />
            </IconButton>
          </div>
        </div>
      </div>

      <div
        className={`${styles.breedsList} ${
          viewMode === "list" ? styles.listView : ""
        }`}
      >
        {breeds.map((breed) => (
          <div
            key={breed.id}
            className={styles.breedCard}
            onClick={() => navigate(`/breeds/${animalType}/${breed.id}`)}
            style={{ cursor: "pointer" }}
          >
            <img
              src={breed.image}
              alt={breed.name}
              className={styles.breedImage}
            />
            <h3>{breed.name}</h3>
          </div>
        ))}
      </div>

      <div
        className={`${commonStyles.scrollToTop} ${
          showScrollTop ? commonStyles.visible : ""
        }`}
        onClick={scrollToTop}
        title={translate("common", "scrollToTop")}
      >
        <KeyboardArrowUpIcon />
      </div>
    </div>
  );
};

export default BreedsListPage;
