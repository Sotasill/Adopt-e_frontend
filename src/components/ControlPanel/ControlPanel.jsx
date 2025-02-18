import { memo } from "react";
import FilterPanel from "../FilterPanel/FilterPanel";
import ViewControls from "../ViewControls/ViewControls";
import ViewModeToggle from "../ViewModeToggle/ViewModeToggle";
import styles from "./ControlPanel.module.css";

const ControlPanel = ({
  // FilterPanel props
  sortBy,
  setSortBy,
  selectedCountries,
  setSelectedCountries,
  selectedBreeds,
  setSelectedBreeds,
  selectedBreeders,
  setSelectedBreeders,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  minRating,
  setMinRating,
  countries,
  breeds,
  breeders,
  showPriceFilter = false,
  showRatingFilter = false,
  // ViewControls props
  searchValue,
  onSearchChange,
  petType,
  onPetTypeChange,
  // ViewModeToggle props
  viewMode,
  setViewMode,
  // Common props
  t,
}) => {
  return (
    <div className={styles.controlPanel}>
      <div className={styles.controlsContainer}>
        <div className={styles.controlsLeft}>
          <FilterPanel
            sortBy={sortBy}
            setSortBy={setSortBy}
            selectedCountries={selectedCountries}
            setSelectedCountries={setSelectedCountries}
            selectedBreeds={selectedBreeds}
            setSelectedBreeds={setSelectedBreeds}
            selectedBreeders={selectedBreeders}
            setSelectedBreeders={setSelectedBreeders}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            minRating={minRating}
            setMinRating={setMinRating}
            countries={countries}
            breeds={breeds}
            breeders={breeders}
            showPriceFilter={showPriceFilter}
            showRatingFilter={showRatingFilter}
            t={t}
          />
        </div>
        <div className={styles.controlsCenter}>
          <ViewControls
            searchValue={searchValue}
            onSearchChange={onSearchChange}
            petType={petType}
            onPetTypeChange={onPetTypeChange}
            showSort={false}
            showPetSwitch={true}
            t={t}
          />
        </div>
        <div className={styles.controlsRight}>
          <ViewModeToggle viewMode={viewMode} setViewMode={setViewMode} t={t} />
        </div>
      </div>
    </div>
  );
};

export default memo(ControlPanel);
