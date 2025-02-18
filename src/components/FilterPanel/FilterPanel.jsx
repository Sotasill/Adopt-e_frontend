import { useState } from "react";
import { FiFilter } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { SortByAlpha as SortByAlphaIcon } from "@mui/icons-material";
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
  Tooltip,
} from "@mui/material";
import styles from "./FilterPanel.module.css";

const FilterPanel = ({
  sortBy,
  setSortBy,
  selectedCountries,
  setSelectedCountries,
  selectedBreeds,
  setSelectedBreeds,
  minRating,
  setMinRating,
  countries,
  breeds,
  t,
}) => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const handleOpenFilters = () => setIsFiltersOpen(true);
  const handleCloseFilters = () => setIsFiltersOpen(false);

  const handleResetFilters = () => {
    setSelectedCountries([]);
    setSelectedBreeds([]);
    setMinRating(0);
    setSortBy("nameAsc");
  };

  const handleSortClick = () => {
    setSortBy(sortBy === "nameAsc" ? "nameDesc" : "nameAsc");
  };

  const activeFiltersCount =
    selectedCountries.length + selectedBreeds.length + (minRating > 0 ? 1 : 0);

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
              sortBy === "nameAsc" ? styles.active : ""
            }`}
            onClick={handleSortClick}
            title={t(
              sortBy === "nameAsc"
                ? "breeders.filters.nameAsc"
                : "breeders.filters.nameDesc"
            )}
          >
            <SortByAlphaIcon fontSize="small" />
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
