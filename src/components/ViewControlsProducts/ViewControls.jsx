import { memo } from "react";
import { TextField, IconButton, InputAdornment, Tooltip } from "@mui/material";
import {
  Search as SearchIcon,
  SortByAlpha as SortByAlphaIcon,
  ShoppingBag as ShoppingBagIcon,
  ContentCut as ContentCutIcon,
  MedicalServices as MedicalServicesIcon,
} from "@mui/icons-material";
import { useTranslations } from "../../redux/hooks/useTranslations";
import styles from "./ViewControls.module.css";

const ViewControls = ({
  searchValue = "",
  onSearchChange,
  productType = "products",
  onProductTypeChange,
  sortOrder = "asc",
  onSortChange,
  showProductSwitch = true,
  showSort = true,
  hideSearch = false,
}) => {
  const { translate } = useTranslations();

  const handleProductTypeChange = (type) => {
    console.log("Changing product type to:", type); // Для отладки
    onProductTypeChange?.(type);
  };

  return (
    <div className={styles.viewControls}>
      {!hideSearch && (
        <div className={styles.controlsLeft}>
          <TextField
            fullWidth
            placeholder={translate("search.placeholder")}
            value={searchValue}
            onChange={(e) => onSearchChange?.(e.target.value)}
            className={styles.searchField}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>
      )}

      <div className={styles.controlsRight}>
        {showProductSwitch && (
          <div className={styles.productTypeSwitch}>
            <div className={styles.switchContainer}>
              <Tooltip
                title={translate("products.zootovary")}
                placement="top"
                arrow
                enterDelay={200}
                leaveDelay={0}
              >
                <button
                  className={`${styles.productTypeOption} ${
                    productType === "products" ? styles.active : ""
                  }`}
                  onClick={() => handleProductTypeChange("products")}
                  type="button"
                >
                  <ShoppingBagIcon
                    className={`${styles.productIcon} ${
                      productType === "products" ? styles.active : ""
                    }`}
                  />
                  <span
                    className={`${styles.productLabel} ${
                      productType === "products" ? styles.active : ""
                    }`}
                  >
                    {translate("products.zootovary")}
                  </span>
                </button>
              </Tooltip>

              <Tooltip
                title={translate("products.services")}
                placement="top"
                arrow
                enterDelay={200}
                leaveDelay={0}
              >
                <button
                  className={`${styles.productTypeOption} ${
                    productType === "services" ? styles.active : ""
                  }`}
                  onClick={() => handleProductTypeChange("services")}
                  type="button"
                >
                  <ContentCutIcon
                    className={`${styles.productIcon} ${
                      productType === "services" ? styles.active : ""
                    }`}
                  />
                  <span
                    className={`${styles.productLabel} ${
                      productType === "services" ? styles.active : ""
                    }`}
                  >
                    {translate("products.services")}
                  </span>
                </button>
              </Tooltip>

              <Tooltip
                title={translate("products.veterinary")}
                placement="top"
                arrow
                enterDelay={200}
                leaveDelay={0}
              >
                <button
                  className={`${styles.productTypeOption} ${
                    productType === "veterinary" ? styles.active : ""
                  }`}
                  onClick={() => handleProductTypeChange("veterinary")}
                  type="button"
                >
                  <MedicalServicesIcon
                    className={`${styles.productIcon} ${
                      productType === "veterinary" ? styles.active : ""
                    }`}
                  />
                  <span
                    className={`${styles.productLabel} ${
                      productType === "veterinary" ? styles.active : ""
                    }`}
                  >
                    {translate("products.veterinary")}
                  </span>
                </button>
              </Tooltip>
            </div>
          </div>
        )}

        {showSort && (
          <IconButton
            className={`${styles.viewButton} ${
              sortOrder === "asc" ? styles.active : ""
            }`}
            onClick={() => onSortChange?.(sortOrder === "asc" ? "desc" : "asc")}
            title={translate(
              sortOrder === "asc" ? "sort.ascending" : "sort.descending"
            )}
          >
            <SortByAlphaIcon fontSize="small" />
          </IconButton>
        )}
      </div>
    </div>
  );
};

export default memo(ViewControls);
