import { useState } from "react";
import { Button } from "@mui/material";
import SearchbarBCS from "../../components/SearchbarBCS/SearchbarBCS";
import Notifications from "../../components/Notifications/Notifications";
import Settings from "../../components/Settings/Settings";
import styles from "./QuickLinksUser.module.css";

const QuickLinks = () => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const handleSearchToggle = () => {
    setIsSearchExpanded(!isSearchExpanded);
  };

  return (
    <div className={styles.quickLinksContainer}>
      <div className={styles.contentWrapper}>
        <div className={styles.topBar}>
          <div className={styles.buttonsContainer}>
            <Button
              variant="contained"
              color="primary"
              className={styles.quickLinkButton}
              size="small"
            >
              Добавить питомца
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={styles.quickLinkButton}
              size="small"
            >
              Мои питомцы
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={styles.quickLinkButton}
              size="small"
            >
              Календарь
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={styles.quickLinkButton}
              size="small"
            >
              Заметки
            </Button>
          </div>
          <div className={styles.rightControls}>
            <Notifications />
            <Settings />
            <div className={styles.searchBox}>
              <SearchbarBCS
                isExpanded={isSearchExpanded}
                onToggle={handleSearchToggle}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickLinks;
