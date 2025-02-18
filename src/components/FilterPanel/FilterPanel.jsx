import { useState } from "react";
import { FiFilter } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import {
  SortByAlpha as SortByAlphaIcon,
  AttachMoney as AttachMoneyIcon,
} from "@mui/icons-material";
import {
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Modal,
  Button,
  Box,
  Checkbox,
  Slider,
} from "@mui/material";
import styles from "./FilterPanel.module.css";

const FilterPanel = ({
  sortBy,
  setSortBy,
  selectedCountries = [],
  setSelectedCountries = () => {},
  selectedBreeds = [],
  setSelectedBreeds = () => {},
  selectedBreeders = [],
  setSelectedBreeders = () => {},
  minPrice = 0,
  setMinPrice = () => {},
  maxPrice = 10000,
  setMaxPrice = () => {},
  minRating = 0,
  setMinRating = () => {},
  countries = [],
  breeds = [],
  breeders = [],
  showPriceFilter = false,
  showRatingFilter = false,
  t,
}) => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [tempMinPrice, setTempMinPrice] = useState(minPrice);
  const [tempMaxPrice, setTempMaxPrice] = useState(maxPrice);

  const handleOpenFilters = () => {
    setTempMinPrice(minPrice);
    setTempMaxPrice(maxPrice);
    setIsFiltersOpen(true);
  };

  const handleCloseFilters = () => {
    setMinPrice(tempMinPrice);
    setMaxPrice(tempMaxPrice);
    setIsFiltersOpen(false);
  };

  const handleResetFilters = () => {
    setSelectedCountries([]);
    setSelectedBreeds([]);
    setSelectedBreeders([]);
    if (showPriceFilter) {
      setTempMinPrice(0);
      setTempMaxPrice(10000);
      setMinPrice(0);
      setMaxPrice(10000);
    }
    if (showRatingFilter) {
      setMinRating(0);
    }
    setSortBy("nameAsc");
  };

  const handleSortByName = () => {
    setSortBy(sortBy === "nameAsc" ? "nameDesc" : "nameAsc");
  };

  const handleSortByPrice = () => {
    setSortBy(sortBy === "priceAsc" ? "priceDesc" : "priceAsc");
  };

  const handlePriceChange = (event, newValue) => {
    setTempMinPrice(newValue[0]);
    setTempMaxPrice(newValue[1]);
  };

  const activeFiltersCount =
    selectedCountries.length +
    selectedBreeds.length +
    selectedBreeders.length +
    (showPriceFilter && (minPrice > 0 || maxPrice < 10000) ? 1 : 0) +
    (showRatingFilter && minRating > 0 ? 1 : 0);

  const showBreedersFilter =
    typeof setSelectedBreeders === "function" && breeders.length > 0;

  return (
    <>
      <div className={styles.viewControls}>
        <div className={styles.controlsLeft}>
          <Button
            variant="contained"
            startIcon={<FiFilter />}
            onClick={handleOpenFilters}
            className={styles.filterButton}
          >
            {t("breeders.filters.button")}
            {activeFiltersCount > 0 && (
              <span className={styles.filterBadge}>{activeFiltersCount}</span>
            )}
          </Button>

          <IconButton
            className={`${styles.viewButton} ${
              sortBy === "nameAsc" || sortBy === "nameDesc" ? styles.active : ""
            }`}
            onClick={handleSortByName}
            title={t(
              `breeders.filters.${
                sortBy === "nameAsc" ? "nameAsc" : "nameDesc"
              }`
            )}
          >
            <SortByAlphaIcon fontSize="small" />
          </IconButton>

          <IconButton
            className={`${styles.viewButton} ${styles.priceSort} ${
              sortBy === "priceAsc" || sortBy === "priceDesc"
                ? styles.active
                : ""
            }`}
            onClick={handleSortByPrice}
            title={t(
              `breeders.filters.${
                sortBy === "priceAsc" ? "priceAsc" : "priceDesc"
              }`
            )}
          >
            <span
              className={`${styles.triangle} ${
                sortBy === "priceDesc" ? styles.down : ""
              }`}
            />
          </IconButton>
        </div>
      </div>

      <Modal
        open={isFiltersOpen}
        onClose={handleCloseFilters}
        className={styles.filtersModal}
      >
        <Box className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <h2>{t("breeders.filters.title")}</h2>
            <IconButton
              onClick={handleCloseFilters}
              className={styles.closeButton}
              aria-label="close"
            >
              <IoClose />
            </IconButton>
          </div>

          <div className={styles.filterControls}>
            {countries.length > 0 && (
              <FormControl className={styles.filterControl}>
                <InputLabel>{t("breeders.filters.countries")}</InputLabel>
                <Select
                  multiple
                  value={selectedCountries}
                  onChange={(e) => setSelectedCountries(e.target.value)}
                  label={t("breeders.filters.countries")}
                  renderValue={(selected) =>
                    selected
                      .map((code) => {
                        const country = countries.find((c) => c.code === code);
                        return country ? country.name : code;
                      })
                      .join(", ")
                  }
                >
                  {countries.map((country) => (
                    <MenuItem key={country.code} value={country.code}>
                      <Checkbox
                        checked={selectedCountries.includes(country.code)}
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
            )}

            {breeds.length > 0 && (
              <FormControl className={styles.filterControl}>
                <InputLabel>{t("breeders.filters.breeds")}</InputLabel>
                <Select
                  multiple
                  value={selectedBreeds}
                  onChange={(e) => setSelectedBreeds(e.target.value)}
                  label={t("breeders.filters.breeds")}
                  renderValue={(selected) =>
                    selected.map((breed) => t(breed)).join(", ")
                  }
                >
                  {breeds.map((breed) => (
                    <MenuItem key={breed} value={breed}>
                      <Checkbox checked={selectedBreeds.includes(breed)} />
                      {t(breed)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            {showBreedersFilter && (
              <FormControl className={styles.filterControl}>
                <InputLabel>{t("breeders.filters.breeders")}</InputLabel>
                <Select
                  multiple
                  value={selectedBreeders}
                  onChange={(e) => setSelectedBreeders(e.target.value)}
                  label={t("breeders.filters.breeders")}
                  renderValue={(selected) =>
                    selected
                      .map((id) => {
                        const breeder = breeders.find((b) => b.id === id);
                        return breeder ? breeder.name : id;
                      })
                      .join(", ")
                  }
                >
                  {breeders.map((breeder) => (
                    <MenuItem key={breeder.id} value={breeder.id}>
                      <Checkbox
                        checked={selectedBreeders.includes(breeder.id)}
                      />
                      {breeder.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            {showRatingFilter && (
              <FormControl className={styles.filterControl}>
                <InputLabel>{t("breeders.filters.minRating")}</InputLabel>
                <Select
                  value={minRating}
                  onChange={(e) => setMinRating(Number(e.target.value))}
                  label={t("breeders.filters.minRating")}
                >
                  <MenuItem value={0}>{t("breeders.filters.any")}</MenuItem>
                  <MenuItem value={3}>3+</MenuItem>
                  <MenuItem value={4}>4+</MenuItem>
                  <MenuItem value={4.5}>4.5+</MenuItem>
                </Select>
              </FormControl>
            )}

            {showPriceFilter && (
              <div className={styles.priceRangeControl}>
                <p className={styles.priceRangeLabel}>
                  {t("breeders.filters.priceRange")}:{" "}
                  {t("pets.price", { price: tempMinPrice })} -{" "}
                  {t("pets.price", { price: tempMaxPrice })}
                </p>
                <Slider
                  value={[tempMinPrice, tempMaxPrice]}
                  onChange={handlePriceChange}
                  min={0}
                  max={10000}
                  step={100}
                  valueLabelDisplay="auto"
                  valueLabelFormat={(value) =>
                    t("pets.price", { price: value })
                  }
                />
              </div>
            )}
          </div>

          <div className={styles.modalActions}>
            <Button
              variant="outlined"
              onClick={handleResetFilters}
              className={styles.resetButton}
              disabled={activeFiltersCount === 0}
            >
              {t("breeders.filters.reset")}
            </Button>
            <Button variant="contained" onClick={handleCloseFilters}>
              {t("breeders.filters.apply")}
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default FilterPanel;
