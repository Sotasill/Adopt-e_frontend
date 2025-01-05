import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate} from 'react-router-dom';
import ProfileOverview from "../ProfileOverviewBCS/ProfileOverviewBCS";
import QuickLinks from "../QuickLinksBCS/QuickLinks";
import Navigation from "../../components/NavigationBCS/NavigationBCS";
import AvatarEditorComponent from "../../components/AvatarEditor/AvatarEditor";
import { logout } from '../../redux/auth/authActions';
import { Button, Container, Modal, Typography } from '@mui/material';
import { updateAvatar, updateProfileBackground } from '../../redux/auth/authActions';
import { setAuthenticated } from '../../redux/auth/authActions';
import styles from './MainBCS.module.css';

const MainBCSPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isBackgroundEditing, setIsBackgroundEditing] = useState(false);
  const [selectedBackground, setSelectedBackground] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = JSON.parse(localStorage.getItem('user'));
    
    if (token && !isAuthenticated) {
      dispatch(setAuthenticated(true));
      if (savedUser) {
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: savedUser
        });
      }
    } else if (!token && !isAuthenticated) {
      navigate('/login');
    }
  }, [dispatch, isAuthenticated, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch(logout());
    navigate('/');
  };

  const handleImageSelect = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (file.size > maxSize) {
        alert('Файл слишком большой. Максимальный размер 5MB');
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
      console.error('Ошибка при сохранении аватара:', error);
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
      console.error('Ошибка при сохранении фона:', error);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className={styles.mainContainer}>
      <aside className={styles.sidebar}>
        <Navigation />
        <Button 
          onClick={handleLogout} 
          variant="contained" 
          color="primary" 
          className={styles.logoutButton}
        >
          Выйти
        </Button>
      
      </aside>

      <main className={styles.mainContent}>
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
          <QuickLinks />
          <div className={styles.welcomeBlock}>
            <Typography 
              variant="h4" 
              className={styles.welcomeTitle}
            >
              Welcome to Breeder Control System,{' '}
              <span className={styles.userName}>
                {user?.name || 'User'}
              </span>
            </Typography>
            <Typography 
              variant="h5" 
              className={styles.welcomeSubtitle}
            >
              Manage your breeding program efficiently
            </Typography>
          </div>
          <ProfileOverview onAvatarClick={() => document.getElementById('avatar-input').click()} />
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
