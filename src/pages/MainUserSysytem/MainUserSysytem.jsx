import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileOverview from "../ProfileOverviewBCS/ProfileOverviewBCS";
import QuickLinks from "../QuickLinksUser/QuickLinksUser";
import Navigation from "../../components/Navigation/Navigation";
import AvatarEditorComponent from "../../components/AvatarEditor/AvatarEditor";
import {
  Container,
  Modal,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  updateAvatar,
  updateProfileBackground,
  logout,
} from "../../redux/auth/authActions";
import styles from "./MainUserSysytem.module.css";

const MainUserSystem = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isBackgroundEditing, setIsBackgroundEditing] = useState(false);
  const [selectedBackground, setSelectedBackground] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

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
      setSelectedImage(file);
      setIsEditing(true);
    }
  };

  const handleSaveAvatar = async (blob) => {
    try {
      await dispatch(updateAvatar(blob));
      setIsEditing(false);
      setSelectedImage(null);
    } catch (error) {
      console.error("Error updating avatar:", error);
    }
  };

  const handleBackgroundSelect = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedBackground(file);
      setIsBackgroundEditing(true);
    }
  };

  const handleSaveBackground = async (blob) => {
    try {
      await dispatch(updateProfileBackground(blob));
      setIsBackgroundEditing(false);
      setSelectedBackground(null);
    } catch (error) {
      console.error("Error updating background:", error);
    }
  };

  return (
    <div className={styles.container}>
      <IconButton
        className={styles.menuButton}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <MenuIcon />
      </IconButton>

      <div className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ""}`}>
        <div className={styles.sidebarContent}>
          <Navigation />
          <Button
            variant="contained"
            color="error"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            className={styles.logoutButton}
            fullWidth
          >
            Выйти
          </Button>
        </div>
      </div>

      <div className={styles.content}>
        <Container>
          <ProfileOverview
            user={user}
            onImageSelect={handleImageSelect}
            onBackgroundSelect={handleBackgroundSelect}
          />
          <QuickLinks />
        </Container>
      </div>

      <Modal open={isEditing} onClose={() => setIsEditing(false)}>
        <div className={styles.modalContent}>
          <Typography variant="h6" className={styles.modalTitle}>
            Редактировать аватар
          </Typography>
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
      >
        <div className={styles.modalContent}>
          <Typography variant="h6" className={styles.modalTitle}>
            Редактировать фон профиля
          </Typography>
          {selectedBackground && (
            <AvatarEditorComponent
              image={selectedBackground}
              onSave={handleSaveBackground}
              onCancel={() => setIsBackgroundEditing(false)}
            />
          )}
        </div>
      </Modal>
    </div>
  );
};

export default MainUserSystem;
