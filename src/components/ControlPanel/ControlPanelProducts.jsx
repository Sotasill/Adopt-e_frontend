import { memo } from "react";
import PropTypes from "prop-types";
import { useTranslatedContent } from "../../redux/hooks/useTranslatedContent";
import FilterPanel from "../FilterPanel/FilterPanel";
import ViewControlsProducts from "../ViewControlsProducts/ViewControls";
import ViewModeToggle from "../ViewModeToggle/ViewModeToggle";
import styles from "./ControlPanel.module.css";

const ControlPanelProducts = ({
  // FilterPanel props
  sortBy,
  setSortBy,
  selectedCategories,
  setSelectedCategories,
  selectedCountries,
  setSelectedCountries,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  categories,
  countries,
  showPriceFilter = true,
  productType,
  // ViewControls props
  searchValue,
  onSearchChange,
  onProductTypeChange,
  // ViewModeToggle props
  viewMode,
  setViewMode,
}) => {
  const { t } = useTranslatedContent();

  return (
    <div className={styles.controlPanel}>
      <div className={styles.controlsContainer}>
        <div className={styles.controlsLeft}>
          <FilterPanel
            sortBy={sortBy}
            setSortBy={setSortBy}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            selectedCountries={selectedCountries}
            setSelectedCountries={setSelectedCountries}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            categories={categories}
            countries={countries}
            showPriceFilter={showPriceFilter}
            productType={productType}
            t={t}
          />
        </div>
        <div className={styles.controlsCenter}>
          <ViewControlsProducts
            searchValue={searchValue}
            onSearchChange={onSearchChange}
            productType={productType}
            onProductTypeChange={onProductTypeChange}
            showSort={false}
            showProductSwitch={true}
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

ControlPanelProducts.propTypes = {
  sortBy: PropTypes.string.isRequired,
  setSortBy: PropTypes.func.isRequired,
  selectedCategories: PropTypes.arrayOf(PropTypes.string).isRequired,
  setSelectedCategories: PropTypes.func.isRequired,
  selectedCountries: PropTypes.arrayOf(PropTypes.string).isRequired,
  setSelectedCountries: PropTypes.func.isRequired,
  minPrice: PropTypes.number.isRequired,
  setMinPrice: PropTypes.func.isRequired,
  maxPrice: PropTypes.number.isRequired,
  setMaxPrice: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  countries: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      flag: PropTypes.string.isRequired,
    })
  ).isRequired,
  showPriceFilter: PropTypes.bool,
  productType: PropTypes.oneOf(["products", "services", "veterinary"])
    .isRequired,
  searchValue: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  onProductTypeChange: PropTypes.func.isRequired,
  viewMode: PropTypes.oneOf(["grid", "list"]).isRequired,
  setViewMode: PropTypes.func.isRequired,
};

export default memo(ControlPanelProducts);
