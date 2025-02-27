import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useTranslatedContent } from "../../redux/hooks/useTranslatedContent";
import styles from "./AuthModal.module.css";
import { FaHeart, FaUser, FaTimes } from "react-icons/fa";

const AuthModal = ({ isOpen, onClose }) => {
  const { t } = useTranslatedContent();
  const modalRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
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
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent} ref={modalRef}>
        <button className={styles.closeButton} onClick={onClose}>
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
        </div>
      </div>
    </div>
  );
};

AuthModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AuthModal;
