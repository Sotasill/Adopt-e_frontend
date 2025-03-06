import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useTranslatedContent } from "../../redux/hooks/useTranslatedContent";
import styles from "./AuthModal.module.css";
import {
  FaHeart,
  FaUser,
  FaTimes,
  FaSignInAlt,
  FaUserPlus,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const AuthModal = ({ isOpen, onClose, onLoginClick }) => {
  const { t } = useTranslatedContent();
  const modalRef = useRef(null);
  const [isClosing, setIsClosing] = useState(false);
  const [isClosingToLogin, setIsClosingToLogin] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300);
  };

  const handleLoginClick = () => {
    setIsClosingToLogin(true);
    setTimeout(() => {
      setIsClosingToLogin(false);
      onClose();
      onLoginClick();
    }, 400);
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        handleClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEsc);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEsc);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={`${styles.modalOverlay} ${isClosing ? styles.closing : ""} ${
        isClosingToLogin ? styles.closingToLogin : ""
      }`}
    >
      <div
        className={`${styles.modalContent} ${isClosing ? styles.closing : ""} ${
          isClosingToLogin ? styles.closingToLogin : ""
        }`}
        ref={modalRef}
      >
        <button className={styles.closeButton} onClick={handleClose}>
          <FaTimes />
        </button>

        <div className={styles.modalBody}>
          <p>{t("auth.registerToUse")}</p>
          <p>{t("auth.benefitsDescription")}</p>

          <div className={styles.benefitsList}>
            <div className={styles.benefitItem}>
              <FaHeart className={styles.benefitIcon} />
              <span>{t("auth.benefits.favorites")}</span>
            </div>
            <div className={styles.benefitItem}>
              <FaUser className={styles.benefitIcon} />
              <span>{t("auth.benefits.personalAccount")}</span>
            </div>
          </div>

          <div className={styles.authButtons}>
            <Link
              to="/register"
              className={styles.authButton}
              onClick={handleClose}
              title={t("auth.register")}
            >
              <div className={styles.buttonIcon}>
                <FaUserPlus size={24} />
              </div>
              <span className={styles.buttonLabel}>{t("auth.register")}</span>
            </Link>
            <button
              className={styles.authButton}
              onClick={handleLoginClick}
              title={t("auth.login")}
            >
              <div className={styles.buttonIcon}>
                <FaSignInAlt size={24} />
              </div>
              <span className={styles.buttonLabel}>{t("auth.login")}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

AuthModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onLoginClick: PropTypes.func.isRequired,
};

export default AuthModal;
