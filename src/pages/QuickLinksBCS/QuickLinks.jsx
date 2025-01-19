import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Modal, Box } from "@mui/material";
import SearchbarBCS from "../../components/SearchbarBCS/SearchbarBCS";
import Notifications from "../../components/Notifications/Notifications";
import Settings from "../../components/Settings/Settings";
import AnimalRegistration from "../../components/AnimalRegistration/AnimalRegistration";
import AnimalsList from "../../components/AnimalsList/AnimalsList";
import Calendar from "../../components/Calendar/Calendar";
import Notes from "../../components/Notes/Notes";
import { animalService } from "../../services/animalService";
import styles from "./QuickLinks.module.css";

const QuickLinks = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openAnimalsListModal, setOpenAnimalsListModal] = useState(false);
  const [openCalendarModal, setOpenCalendarModal] = useState(false);
  const [openNotesModal, setOpenNotesModal] = useState(false);
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const modalParam = searchParams.get("modal");

    if (modalParam === "registration") {
      setOpenModal(true);
    } else if (modalParam === "animals-list") {
      setOpenAnimalsListModal(true);
    } else if (modalParam === "calendar") {
      setOpenCalendarModal(true);
    } else if (modalParam === "notes") {
      setOpenNotesModal(true);
    }
  }, [location.search]);

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const response = await animalService.getAllAnimals();
        console.log("Полный ответ от getAllAnimals:", response);

        // Преобразуем данные, чтобы правильно обработать изображения
        const processedAnimals = Array.isArray(response)
          ? response.map((animal) => ({
              ...animal,
              images: animal.images?.map((img) => ({
                ...img,
                // Используем url изображения, если public_id отсутствует
                src: img.url,
                original: img.url,
                thumbnail: img.url,
              })),
            }))
          : [];

        console.log("Обработанные данные животных:", processedAnimals);
        setAnimals(processedAnimals);
      } catch (err) {
        console.error("Error fetching animals:", err);
      }
    };

    fetchAnimals();
  }, []);

  const handleSearchToggle = () => {
    setIsSearchExpanded(!isSearchExpanded);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
    navigate(`${location.pathname}?modal=registration`, { replace: true });
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    navigate(-1);
  };

  const handleOpenAnimalsListModal = () => {
    setOpenAnimalsListModal(true);
    navigate(`${location.pathname}?modal=animals-list`, { replace: true });
  };

  const handleCloseAnimalsListModal = () => {
    setOpenAnimalsListModal(false);
    navigate(-1);
  };

  const handleOpenCalendarModal = () => {
    setOpenCalendarModal(true);
    navigate(`${location.pathname}?modal=calendar`, { replace: true });
  };

  const handleCloseCalendarModal = () => {
    setOpenCalendarModal(false);
    navigate(-1);
  };

  const handleOpenNotesModal = () => {
    setOpenNotesModal(true);
    navigate(`${location.pathname}?modal=notes`, { replace: true });
  };

  const handleCloseNotesModal = () => {
    setOpenNotesModal(false);
    navigate(-1);
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
              onClick={handleOpenModal}
            >
              Добавить животное
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={styles.quickLinkButton}
              size="small"
              onClick={handleOpenAnimalsListModal}
            >
              Просмотр животных
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={styles.quickLinkButton}
              size="small"
              onClick={handleOpenCalendarModal}
            >
              Календарь
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={styles.quickLinkButton}
              size="small"
              onClick={handleOpenNotesModal}
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

      <Modal
        open={openAnimalsListModal}
        onClose={handleCloseAnimalsListModal}
        aria-labelledby="modal-animals-list"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={{ width: "100%", height: "100%" }}>
          <AnimalsList onClose={handleCloseAnimalsListModal} />
        </Box>
      </Modal>

      <Modal
        open={openCalendarModal}
        onClose={handleCloseCalendarModal}
        aria-labelledby="modal-calendar"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{ width: "100%", height: "100%", bgcolor: "background.paper" }}
        >
          <Calendar animals={animals} />
        </Box>
      </Modal>

      <Modal
        open={openNotesModal}
        onClose={handleCloseNotesModal}
        aria-labelledby="modal-notes"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{ width: "100%", height: "100%", bgcolor: "background.paper" }}
        >
          <Notes animals={animals} />
        </Box>
      </Modal>
    </div>
  );
};

export default QuickLinks;
