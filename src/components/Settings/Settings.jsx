import { useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import styles from "./Settings.module.css";

const Settings = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={styles.settings}>
      <IconButton
        color="inherit"
        onClick={handleClick}
        className={styles.settingsButton}
      >
        <SettingsIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className={styles.settingsMenu}
      >
        <MenuItem onClick={handleClose}>Профиль</MenuItem>
        <MenuItem onClick={handleClose}>Настройки аккаунта</MenuItem>
        <MenuItem onClick={handleClose}>Настройки уведомлений</MenuItem>
        <MenuItem onClick={handleClose}>Выйти</MenuItem>
      </Menu>
    </div>
  );
};

export default Settings;
