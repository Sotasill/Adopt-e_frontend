import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileOverview from "../ProfileOverviewBCS/ProfileOverviewBCS";
import QuickLinks from "../QuickLinksUser/QuickLinksUser";
import AvatarEditorComponent from "../../components/AvatarEditor/AvatarEditor";
import { Container, Modal, Typography, Box, Paper } from "@mui/material";
import {
  updateAvatar,
  updateProfileBackground,
} from "../../redux/auth/authActions";
import styles from "./MainUserSysytem.module.css";

const MainUserSystem = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isBackgroundEditing, setIsBackgroundEditing] = useState(false);
  const [selectedBackground, setSelectedBackground] = useState(null);

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
    <Box className={styles.mainContainer}>
      <Container maxWidth="lg">
        <Box className={styles.contentWrapper}>
          <Paper elevation={3} className={styles.profileSection}>
            <ProfileOverview
              user={user}
              onImageSelect={handleImageSelect}
              onBackgroundSelect={handleBackgroundSelect}
            />
          </Paper>

          <Paper elevation={3} className={styles.quickLinksSection}>
            <QuickLinks />
          </Paper>
        </Box>
      </Container>

      <Modal
        open={isEditing}
        onClose={() => setIsEditing(false)}
        className={styles.modal}
      >
        <Paper className={styles.modalContent}>
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
        </Paper>
      </Modal>

      <Modal
        open={isBackgroundEditing}
        onClose={() => setIsBackgroundEditing(false)}
        className={styles.modal}
      >
        <Paper className={styles.modalContent}>
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
        </Paper>
      </Modal>
    </Box>
  );
};

export default MainUserSystem;
