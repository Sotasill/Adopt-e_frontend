import { useState } from "react";
import { Button, Modal, Box } from "@mui/material";
import SearchbarBCS from "../../components/SearchbarBCS/SearchbarBCS";
import Notifications from "../../components/Notifications/Notifications";
import Settings from "../../components/Settings/Settings";
import AnimalRegistration from "../../components/AnimalRegistration/AnimalRegistration";
import styles from "./QuickLinks.module.css";

const QuickLinks = () => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleSearchToggle = () => {
    setIsSearchExpanded(!isSearchExpanded);
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

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
              onClick={handleOpenModal}
            >
              Добавить животное
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={styles.quickLinkButton}
              size="small"
            >
              Просмотр животных
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

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-animal-registration"
      >
        <Box className={styles.modalBox}>
          <AnimalRegistration userType="breeder" onClose={handleCloseModal} />
        </Box>
      </Modal>
    </div>
  );
};

export default QuickLinks;
