import { memo } from "react";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import {
  Search as SearchIcon,
  SortByAlpha as SortByAlphaIcon,
} from "@mui/icons-material";
import { FaDog, FaCat } from "react-icons/fa6";
import { useTranslations } from "../../redux/hooks/useTranslations";
import styles from "./ViewControls.module.css";
import petTypeStyles from "../../styles/petTypeSwitch.module.css";

const ViewControls = ({
  searchValue = "",
  onSearchChange,
  petType = "dogs",
  onPetTypeChange,
  sortOrder = "asc",
  onSortChange,
  showPetSwitch = true,
  showSort = true,
  hideSearch = false,
}) => {
  const { translate } = useTranslations();

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
        {showPetSwitch && (
          <div className={petTypeStyles.petTypeSwitch}>
            <div className={petTypeStyles.switchContainer}>
              <button
                className={`${petTypeStyles.petTypeOption} ${
                  petType === "dogs" ? petTypeStyles.active : ""
                }`}
                onClick={() => onPetTypeChange?.("dogs")}
                type="button"
              >
                <FaDog
                  className={`${petTypeStyles.petIcon} ${
                    petType === "dogs" ? petTypeStyles.active : ""
                  }`}
                />
                <span
                  className={`${petTypeStyles.petLabel} ${
                    petType === "dogs" ? petTypeStyles.active : ""
                  }`}
                >
                  {translate("pets.dogs")}
                </span>
              </button>
              <button
                className={`${petTypeStyles.petTypeOption} ${
                  petType === "cats" ? petTypeStyles.active : ""
                }`}
                onClick={() => onPetTypeChange?.("cats")}
                type="button"
              >
                <FaCat
                  className={`${petTypeStyles.petIcon} ${
                    petType === "cats" ? petTypeStyles.active : ""
                  }`}
                />
                <span
                  className={`${petTypeStyles.petLabel} ${
                    petType === "cats" ? petTypeStyles.active : ""
                  }`}
                >
                  {translate("pets.cats")}
                </span>
              </button>
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
