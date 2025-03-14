import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { toast } from "sonner";
import { FaUser, FaEnvelope, FaPhone, FaGlobe, FaCamera } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import styles from "./ProfileSettingsModal.module.css";
import {
  updateAvatar,
  updateProfileBackground,
} from "../../redux/auth/authActions";

const ProfileSettingsModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const user = useSelector((state) => state.auth.user);

  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    phone: user?.phone || "",
    language: user?.language || "ru",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      await dispatch(updateAvatar(file));
      toast.success(t("profile.avatarUpdateSuccess"));
    } catch (error) {
      toast.error(t("profile.avatarUpdateError"));
    }
  };

  const handleBackgroundChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      await dispatch(updateProfileBackground(file));
      toast.success(t("profile.backgroundUpdateSuccess"));
    } catch (error) {
      toast.error(t("profile.backgroundUpdateError"));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Добавить обновление профиля через API
    toast.success(t("profile.updateSuccess"));
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          <MdClose size={24} />
        </button>

        <h2 className={styles.title}>{t("profile.settings")}</h2>

        <div className={styles.imageSection}>
          <div className={styles.avatarContainer}>
            <img
              src={user?.avatar || "/default-avatar.png"}
              alt={t("profile.avatar")}
              className={styles.avatar}
            />
            <label className={styles.imageUpload}>
              <FaCamera />
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                hidden
              />
            </label>
          </div>

          <div className={styles.backgroundContainer}>
            <img
              src={user?.backgroundImage || "/default-background.png"}
              alt={t("profile.background")}
              className={styles.background}
            />
            <label className={styles.imageUpload}>
              <FaCamera />
              <input
                type="file"
                accept="image/*"
                onChange={handleBackgroundChange}
                hidden
              />
            </label>
          </div>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <FaUser className={styles.inputIcon} />
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder={t("profile.username")}
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <FaEnvelope className={styles.inputIcon} />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t("profile.email")}
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <FaPhone className={styles.inputIcon} />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder={t("profile.phone")}
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <FaGlobe className={styles.inputIcon} />
            <select
              name="language"
              value={formData.language}
              onChange={handleChange}
              className={styles.select}
            >
              <option value="ru">{t("languages.russian")}</option>
              <option value="uk">{t("languages.ukrainian")}</option>
              <option value="en">{t("languages.english")}</option>
              <option value="de">{t("languages.german")}</option>
              <option value="fr">{t("languages.french")}</option>
            </select>
          </div>

          <button type="submit" className={styles.submitButton}>
            {t("profile.save")}
          </button>
        </form>
      </div>
    </div>
  );
};

ProfileSettingsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ProfileSettingsModal;
