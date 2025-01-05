import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./AvatarEditor.module.css";

const AvatarEditor = ({ onSave }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (selectedImage && onSave) {
      onSave(selectedImage);
    }
  };

  return (
    <div className={styles.avatarEditor}>
      <div className={styles.previewContainer}>
        {selectedImage ? (
          <img src={selectedImage} alt="Preview" className={styles.preview} />
        ) : (
          <div className={styles.placeholder}>Выберите изображение</div>
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className={styles.fileInput}
      />
      <button
        onClick={handleSave}
        disabled={!selectedImage}
        className={styles.saveButton}
      >
        Сохранить
      </button>
    </div>
  );
};

AvatarEditor.propTypes = {
  onSave: PropTypes.func,
};

export default AvatarEditor;
