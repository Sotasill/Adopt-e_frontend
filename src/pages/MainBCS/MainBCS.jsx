import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileOverview from "../ProfileOverviewBCS/ProfileOverviewBCS";
import QuickLinks from "../QuickLinksBCS/QuickLinks";
import Navigation from "../../components/NavigationBCS/NavigationBCS";
import AvatarEditorComponent from "../../components/AvatarEditor/AvatarEditor";
import { Container, Modal, Typography, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {
  updateAvatar,
  updateProfileBackground,
} from "../../redux/auth/authActions";
import styles from "./MainBCS.module.css";

const MainBCSPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isBackgroundEditing, setIsBackgroundEditing] = useState(false);
  const [selectedBackground, setSelectedBackground] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Закрываем сайдбар при клике вне его на мобильных устройствах
  const handleClickOutside = useCallback((event) => {
    const sidebar = document.querySelector(`.${styles.sidebar}`);
    const menuButton = document.querySelector(`.${styles.menuButton}`);

    if (
      window.innerWidth <= 760 &&
      sidebar &&
      !sidebar.contains(event.target) &&
      menuButton &&
      !menuButton.contains(event.target)
    ) {
      setIsSidebarOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  // Обработчики для изображений
  const handleImageSelect = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (file.size > maxSize) {
        alert("Файл слишком большой. Максимальный размер 5MB");
        return;
      }

      setSelectedImage(file);
      setIsEditing(true);
    }
  };

  const handleSaveAvatar = async (blob) => {
    try {
      await dispatch(updateAvatar(blob));
      setIsEditing(false);
    } catch (error) {
      console.error("Ошибка при сохранении аватара:", error);
    }
  };

  const handleBackgroundSelect = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedBackground(event.target.files[0]);
      setIsBackgroundEditing(true);
    }
  };

  const handleSaveBackground = async (blob) => {
    try {
      await dispatch(updateProfileBackground(blob));
      setIsBackgroundEditing(false);
    } catch (error) {
      console.error("Ошибка при сохранении фона:", error);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <aside
        className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ""}`}
        onMouseEnter={() => window.innerWidth > 760 && setIsSidebarOpen(true)}
        onMouseLeave={() => window.innerWidth > 760 && setIsSidebarOpen(false)}
      >
        <Navigation />
      </aside>

      <main className={styles.mainContent}>
        <IconButton
          className={styles.menuButton}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <MenuIcon />
        </IconButton>

        <Modal
          open={isEditing}
          onClose={() => setIsEditing(false)}
          className={styles.modal}
        >
          <div className={styles.modalContent}>
            {selectedImage && (
              <AvatarEditorComponent
                image={selectedImage}
                onSave={handleSaveAvatar}
                onCancel={() => setIsEditing(false)}
              />
            )}
          </div>
        </Modal>

        <Modal
          open={isBackgroundEditing}
          onClose={() => setIsBackgroundEditing(false)}
          className={styles.modal}
        >
          <div className={styles.modalContent}>
            {selectedBackground && (
              <AvatarEditorComponent
                image={selectedBackground}
                onSave={handleSaveBackground}
                onCancel={() => setIsBackgroundEditing(false)}
              />
            )}
          </div>
        </Modal>

        <Container>
          <div className={styles.welcomeBlock}>
            <Typography variant="h4" className={styles.welcomeTitle}>
              Welcome to Breeder Control System,{" "}
              <span className={styles.userName}>
                {user?.username || "User"} (ID: {user?.userId || "N/A"})
              </span>
            </Typography>
            <Typography variant="h5" className={styles.welcomeSubtitle}>
              Manage your breeding program efficiently
            </Typography>
            <QuickLinks />
          </div>
          <ProfileOverview
            onAvatarClick={() =>
              document.getElementById("avatar-input").click()
            }
          />
          <input
            type="file"
            id="avatar-input"
            hidden
            accept="image/*"
            onChange={handleImageSelect}
          />
          <input
            type="file"
            id="background-input"
            hidden
            accept="image/*"
            onChange={handleBackgroundSelect}
          />
        </Container>
      </main>
    </div>
  );
};

export default MainBCSPage;
