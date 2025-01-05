import { Avatar, Typography, IconButton } from '@mui/material';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateProfileBackground } from '../../redux/auth/authActions';
import AvatarEditorComponent from '../../components/AvatarEditor/AvatarEditor';
import Modal from '@mui/material/Modal';
import EditIcon from '@mui/icons-material/Edit';
import styles from './ProfileOverviewBCS.module.css';

const ProfileOverview = ({ onAvatarClick }) => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [isBackgroundEditing, setIsBackgroundEditing] = useState(false);
  const [selectedBackground, setSelectedBackground] = useState(null);

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

  return (
    <div 
      className={styles.profileOverview}
      style={{ 
        backgroundImage: `url(${user?.profileBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
      }}
    >
      <IconButton
        className={styles.editBackgroundButton}
        onClick={() => document.getElementById('profile-background-input').click()}
        size="large"
      >
        <EditIcon />
      </IconButton>
      
      <div className={styles.avatarSection}>
        <Avatar
          src={user?.avatar || '/default-avatar.png'}
          onClick={onAvatarClick}
          className={styles.avatar}
        />
        <Typography variant="h5">
          {user?.name || 'Пользователь'}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          {user?.email}
        </Typography>
      </div>

      <input
        type="file"
        id="profile-background-input"
        hidden
        accept="image/*"
        onChange={handleBackgroundSelect}
      />

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
    </div>
  );
};

ProfileOverview.propTypes = {
  onAvatarClick: PropTypes.func.isRequired,
};

export default ProfileOverview;
