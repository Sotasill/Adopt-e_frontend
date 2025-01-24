import { useEffect, useState, useMemo } from "react";
import { useTranslatedContent } from "../../redux/hooks/useTranslatedContent";
import { useCountries } from "../../redux/hooks/useCountries";
import { FaDog, FaCat } from "react-icons/fa6";
import { BsFillGridFill, BsListUl } from "react-icons/bs";
import { FiFilter } from "react-icons/fi";
import {
  FormControlLabel,
  IconButton,
  Tooltip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Modal,
  Button,
  Box,
  Checkbox,
} from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setPetType, selectPetType } from "../../redux/petType/petTypeSlice";
import KennelCard from "../../components/KennelsSlider/KennelCard";
import KennelStringCard from "../../components/KennelsSlider/KennelStringCard";
import styles from "./BreedersPage.module.css";
import CustomSwitch from "../../components/CustomSwitch/CustomSwitch";

// Используем те же моковые данные, что и в слайдере
const MOCK_KENNELS = {
  dogs: [
    {
      id: 1,
      name: "Golden Paradise",
      logo: "/images/dogbreeder/1737585129219.jpg",
      breedKey: "kennels.list.goldenParadise.breed",
      countryKey: "kennels.list.countries.us",
      rating: 4.8,
      socials: {
        facebook: true,
        instagram: true,
        youtube: true,
        twitter: true,
      },
    },
    {
      id: 2,
      name: "Royal Paws",
      logo: "/images/dogbreeder/1737585125838.jpg",
      breedKey: "kennels.list.royalPaws.breed",
      countryKey: "kennels.list.countries.gb",
      rating: 4.5,
      socials: {
        facebook: true,
        instagram: true,
        youtube: false,
        twitter: true,
      },
    },
    {
      id: 3,
      name: "Elite German Shepherds",
      logo: "/images/dogbreeder/1737585098223.jpg",
      breedKey: "kennels.list.eliteGermanShepherds.breed",
      countryKey: "kennels.list.countries.de",
      rating: 4.9,
      socials: {
        facebook: true,
        instagram: true,
        youtube: true,
        twitter: false,
      },
    },
    {
      id: 4,
      name: "Siberian Stars",
      logo: "/images/dogbreeder/1737585094922.jpg",
      breedKey: "kennels.list.siberianStars.breed",
      countryKey: "kennels.list.countries.ru",
      rating: 4.7,
      socials: {
        facebook: true,
        instagram: true,
        youtube: false,
        twitter: false,
      },
    },
    {
      id: 5,
      name: "Majestic Paws",
      logo: "/images/dogbreeder/1737585055764.jpg",
      breedKey: "kennels.list.goldenParadise.breed",
      countryKey: "kennels.list.countries.us",
      rating: 4.6,
      socials: {
        facebook: true,
        instagram: true,
        youtube: true,
        twitter: true,
      },
    },
    {
      id: 6,
      name: "Noble Canines",
      logo: "/images/dogbreeder/1737585046034.jpg",
      breedKey: "kennels.list.royalPaws.breed",
      countryKey: "kennels.list.countries.gb",
      rating: 4.8,
      socials: {
        facebook: true,
        instagram: true,
        youtube: false,
        twitter: true,
      },
    },
  ],
  cats: [
    {
      id: 1,
      name: "Persian Palace",
      logo: "/images/catbreeder/1737585215040.jpg",
      breedKey: "kennels.list.persianPalace.breed",
      countryKey: "kennels.list.countries.ir",
      rating: 4.6,
      socials: {
        facebook: true,
        instagram: true,
        youtube: false,
        twitter: true,
      },
    },
    {
      id: 2,
      name: "British Charm",
      logo: "/images/catbreeder/1737585211710.jpg",
      breedKey: "kennels.list.britishCharm.breed",
      countryKey: "kennels.list.countries.gb",
      rating: 4.9,
      socials: {
        facebook: true,
        instagram: true,
        youtube: true,
        twitter: true,
      },
    },
    {
      id: 3,
      name: "Maine Coon Magic",
      logo: "/images/catbreeder/1737585186942.jpg",
      breedKey: "kennels.list.maineCoonMagic.breed",
      countryKey: "kennels.list.countries.us",
      rating: 4.7,
      socials: {
        facebook: true,
        instagram: true,
        youtube: true,
        twitter: false,
      },
    },
    {
      id: 4,
      name: "Siamese Secrets",
      logo: "/images/catbreeder/1737585183526.jpg",
      breedKey: "kennels.list.siameseSecrets.breed",
      countryKey: "kennels.list.countries.th",
      rating: 4.8,
      socials: {
        facebook: true,
        instagram: true,
        youtube: false,
        twitter: true,
      },
    },
    {
      id: 5,
      name: "Royal Felines",
      logo: "/images/catbreeder/1737585157355.jpg",
      breedKey: "kennels.list.persianPalace.breed",
      countryKey: "kennels.list.countries.ir",
      rating: 4.5,
      socials: {
        facebook: true,
        instagram: true,
        youtube: true,
        twitter: false,
      },
    },
    {
      id: 6,
      name: "Elite Cats",
      logo: "/images/catbreeder/1737585154227.jpg",
      breedKey: "kennels.list.britishCharm.breed",
      countryKey: "kennels.list.countries.gb",
      rating: 4.7,
      socials: {
        facebook: true,
        instagram: true,
        youtube: false,
        twitter: true,
      },
    },
  ],
};

const BreedersPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState("grid");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 320);
  const [isTablet, setIsTablet] = useState(window.innerWidth <= 760);
  const [sortBy, setSortBy] = useState("nameAsc");
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedBreeds, setSelectedBreeds] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [expandedCardId, setExpandedCardId] = useState(null);

  const dispatch = useDispatch();
  const petType = useSelector(selectPetType);
  const { t } = useTranslatedContent();

  // Получаем список стран из хука
  const countries = useCountries(MOCK_KENNELS[petType]);

  // Получаем уникальные породы для текущего типа животных
  const uniqueBreeds = useMemo(() => {
    return [...new Set(MOCK_KENNELS[petType].map((kennel) => kennel.breedKey))];
  }, [petType]);

  // Фильтрация и сортировка питомников
  const filteredAndSortedKennels = useMemo(() => {
    let filtered = MOCK_KENNELS[petType] || [];

    // Применяем фильтры
    if (selectedCountries.length > 0) {
      filtered = filtered.filter((kennel) =>
        selectedCountries.includes(kennel.countryKey)
      );
    }
    if (selectedBreeds.length > 0) {
      filtered = filtered.filter((kennel) =>
        selectedBreeds.includes(kennel.breedKey)
      );
    }
    if (minRating > 0) {
      filtered = filtered.filter((kennel) => kennel.rating >= minRating);
    }

    // Применяем сортировку
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "nameAsc":
          return a.name.localeCompare(b.name);
        case "nameDesc":
          return b.name.localeCompare(a.name);
        case "ratingDesc":
          return b.rating - a.rating;
        case "ratingAsc":
          return a.rating - b.rating;
        default:
          return 0;
      }
    });
  }, [petType, selectedCountries, selectedBreeds, minRating, sortBy]);

  // Синхронизация с URL параметрами при монтировании
  useEffect(() => {
    const typeFromUrl = searchParams.get("type");
    if (typeFromUrl && ["dogs", "cats"].includes(typeFromUrl)) {
      dispatch(setPetType(typeFromUrl));
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 320);
      setIsTablet(window.innerWidth <= 760);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        expandedCardId !== null &&
        !event.target.closest(`.${styles.kennelString}`)
      ) {
        setExpandedCardId(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [expandedCardId]);

  const handlePetTypeChange = () => {
    const newType = petType === "dogs" ? "cats" : "dogs";
    dispatch(setPetType(newType));
    setSearchParams({ type: newType }, { replace: true });
  };

  const handleOpenFilters = () => setIsFiltersOpen(true);
  const handleCloseFilters = () => setIsFiltersOpen(false);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (selectedCountries.length > 0) count++;
    if (selectedBreeds.length > 0) count++;
    if (minRating > 0) count++;
    return count;
  }, [selectedCountries, selectedBreeds, minRating]);

  const handleCardExpand = (cardId) => {
    setExpandedCardId(expandedCardId === cardId ? null : cardId);
  };

  return (
    <div className={styles.breedersPage}>
      <div className={styles.header}>
        <h1 className={styles.title}>{t("kennels.title")}</h1>
      </div>

      <div className={styles.content}>
        <main className={styles.main}>
          <div className={styles.viewControls}>
            <Button
              variant="contained"
              startIcon={<FiFilter />}
              onClick={handleOpenFilters}
              className={styles.filterButton}
            >
              {t("kennels.filters.button")}
              {activeFiltersCount > 0 && (
                <span className={styles.filterBadge}>{activeFiltersCount}</span>
              )}
            </Button>

            <div className={styles.controlsRight}>
              <div className={styles.petTypeSwitch}>
                <div className={styles.switchContainer}>
                  <div className={styles.petTypeOption}>
                    <FaDog
                      className={`${styles.petIcon} ${
                        petType === "dogs" ? styles.active : ""
                      }`}
                    />
                    <span
                      className={`${styles.petLabel} ${
                        petType === "dogs" ? styles.active : ""
                      }`}
                    >
                      {t("kennels.petTypes.dogs")}
                    </span>
                  </div>
                  <FormControlLabel
                    control={
                      <CustomSwitch
                        checked={petType === "cats"}
                        onChange={handlePetTypeChange}
                        name="petType"
                      />
                    }
                    label=""
                  />
                  <div className={styles.petTypeOption}>
                    <FaCat
                      className={`${styles.petIcon} ${
                        petType === "cats" ? styles.active : ""
                      }`}
                    />
                    <span
                      className={`${styles.petLabel} ${
                        petType === "cats" ? styles.active : ""
                      }`}
                    >
                      {t("kennels.petTypes.cats")}
                    </span>
                  </div>
                </div>
              </div>

              {!isTablet && (
                <div className={styles.viewToggle}>
                  <Tooltip title="Сетка">
                    <IconButton
                      onClick={() => setViewMode("grid")}
                      className={`${styles.viewButton} ${
                        viewMode === "grid" ? styles.active : ""
                      }`}
                    >
                      <BsFillGridFill />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Список">
                    <IconButton
                      onClick={() => setViewMode("list")}
                      className={`${styles.viewButton} ${
                        viewMode === "list" ? styles.active : ""
                      }`}
                    >
                      <BsListUl />
                    </IconButton>
                  </Tooltip>
                </div>
              )}
            </div>
          </div>

          <div
            className={`${styles.breedersList} ${!isMobile ? viewMode : ""}`}
          >
            {filteredAndSortedKennels.map((kennel) =>
              !isMobile ? (
                viewMode === "grid" ? (
                  <KennelCard key={kennel.id} kennel={kennel} />
                ) : (
                  <KennelStringCard
                    key={kennel.id}
                    kennel={kennel}
                    isExpanded={expandedCardId === kennel.id}
                    onExpand={() => handleCardExpand(kennel.id)}
                  />
                )
              ) : (
                <KennelCard key={kennel.id} kennel={kennel} />
              )
            )}
          </div>
        </main>
      </div>

      <Modal
        open={isFiltersOpen}
        onClose={handleCloseFilters}
        className={styles.filtersModal}
      >
        <Box className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <h2>{t("kennels.filters.title")}</h2>
            <div className={styles.modalActions}>
              <Button
                variant="outlined"
                onClick={() => {
                  setSortBy("nameAsc");
                  setSelectedCountries([]);
                  setSelectedBreeds([]);
                  setMinRating(0);
                }}
                className={styles.resetButton}
              >
                {t("kennels.filters.reset")}
              </Button>
              <Button variant="contained" onClick={handleCloseFilters}>
                {t("kennels.filters.apply")}
              </Button>
            </div>
          </div>

          <div className={styles.filterControls}>
            <FormControl size="small" className={styles.filterControl}>
              <InputLabel>{t("kennels.filters.sort.label")}</InputLabel>
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                label={t("kennels.filters.sort.label")}
              >
                <MenuItem value="nameAsc">
                  {t("kennels.filters.sort.nameAsc")}
                </MenuItem>
                <MenuItem value="nameDesc">
                  {t("kennels.filters.sort.nameDesc")}
                </MenuItem>
                <MenuItem value="ratingDesc">
                  {t("kennels.filters.sort.ratingDesc")}
                </MenuItem>
                <MenuItem value="ratingAsc">
                  {t("kennels.filters.sort.ratingAsc")}
                </MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" className={styles.filterControl}>
              <InputLabel>{t("kennels.filters.country.label")}</InputLabel>
              <Select
                multiple
                value={selectedCountries}
                onChange={(e) => setSelectedCountries(e.target.value)}
                label={t("kennels.filters.country.label")}
                renderValue={(selected) =>
                  selected.map((value) => t(value)).join(", ")
                }
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 300,
                    },
                  },
                }}
              >
                {countries.map((country) => (
                  <MenuItem key={country.key} value={country.key}>
                    <Checkbox
                      checked={selectedCountries.includes(country.key)}
                    />
                    <img
                      src={country.flag}
                      alt={country.name}
                      style={{ width: 20, marginRight: 8 }}
                    />
                    {country.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" className={styles.filterControl}>
              <InputLabel>{t("kennels.filters.breed.label")}</InputLabel>
              <Select
                multiple
                value={selectedBreeds}
                onChange={(e) => setSelectedBreeds(e.target.value)}
                label={t("kennels.filters.breed.label")}
                renderValue={(selected) =>
                  selected.map((value) => t(value)).join(", ")
                }
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 300,
                    },
                  },
                }}
              >
                {uniqueBreeds.map((breed) => (
                  <MenuItem key={breed} value={breed}>
                    <Checkbox checked={selectedBreeds.includes(breed)} />
                    {t(breed)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" className={styles.filterControl}>
              <InputLabel>{t("kennels.filters.rating.label")}</InputLabel>
              <Select
                value={minRating}
                onChange={(e) => setMinRating(Number(e.target.value))}
                label={t("kennels.filters.rating.label")}
              >
                <MenuItem value={0}>{t("kennels.filters.rating.all")}</MenuItem>
                <MenuItem value={4}>4.0+</MenuItem>
                <MenuItem value={4.5}>4.5+</MenuItem>
                <MenuItem value={4.8}>4.8+</MenuItem>
              </Select>
            </FormControl>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default BreedersPage;
