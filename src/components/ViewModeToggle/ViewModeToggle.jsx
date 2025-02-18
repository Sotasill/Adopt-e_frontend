import { memo } from "react";
import { IconButton, Tooltip } from "@mui/material";
import { BsFillGridFill, BsListUl } from "react-icons/bs";
import styles from "./ViewModeToggle.module.css";

const ViewModeToggle = ({ viewMode, setViewMode, t }) => {
  return (
    <div className={styles.viewToggle}>
      <Tooltip title={t("breeders.viewModes.grid")}>
        <IconButton
          className={`${styles.viewButton} ${
            viewMode === "grid" ? styles.active : ""
          }`}
          onClick={() => setViewMode("grid")}
        >
          <BsFillGridFill />
        </IconButton>
      </Tooltip>
      <Tooltip title={t("breeders.viewModes.list")}>
        <IconButton
          className={`${styles.viewButton} ${
            viewMode === "list" ? styles.active : ""
          }`}
          onClick={() => setViewMode("list")}
        >
          <BsListUl />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default memo(ViewModeToggle);
