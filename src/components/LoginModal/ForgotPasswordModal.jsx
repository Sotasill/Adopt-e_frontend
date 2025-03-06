import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FaEnvelope } from "react-icons/fa";
import Aurora from "../Aurora/Aurora";
import styles from "./LoginModal.module.css";

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 12 },
  },
  exit: { opacity: 0, y: -50 },
};

const contentVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { delay: 0.2 },
  },
  exit: {
    opacity: 0,
    x: 20,
  },
};

const ForgotPasswordModal = ({ isOpen, onClose, onBack }) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("initial"); // initial, loading, success, error
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      // Здесь будет логика отправки запроса на сервер
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(t("forgotPassword.error"));
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className={styles.backdrop}
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={onClose}
    >
      <motion.div
        className={styles.modal}
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.auroraContainer}>
          <Aurora
            colorStops={["#e8f4f8", "#f0f4ea", "#fdf1eb"]}
            amplitude={0.7}
            speed={0.5}
          />
        </div>
        <div className={styles.modalInner}>
          <div className={styles.modalContent}>
            <button className={styles.closeButton} onClick={onClose}>
              ×
            </button>
            <button className={styles.backButton} onClick={onBack}>
              ← {t("common.back")}
            </button>

            <motion.div
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={styles.forgotPasswordForm}
            >
              {status === "success" ? (
                <div className={styles.successMessage}>
                  <div className={styles.successIcon}>✓</div>
                  <h2>{t("forgotPassword.success.title")}</h2>
                  <p>{t("forgotPassword.success.message")}</p>
                  <button className={styles.loginButton} onClick={onClose}>
                    {t("forgotPassword.success.backToLogin")}
                  </button>
                </div>
              ) : (
                <>
                  <h2>{t("forgotPassword.title")}</h2>
                  <p className={styles.description}>
                    {t("forgotPassword.description")}
                  </p>

                  <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                      <FaEnvelope className={styles.inputIcon} />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t("forgotPassword.emailPlaceholder")}
                        required
                        disabled={status === "loading"}
                      />
                    </div>

                    {status === "error" && (
                      <div className={styles.errorMessage}>{errorMessage}</div>
                    )}

                    <button
                      type="submit"
                      className={styles.loginButton}
                      disabled={status === "loading"}
                    >
                      {status === "loading" ? (
                        <span className={styles.loadingSpinner}>⟳</span>
                      ) : (
                        t("forgotPassword.submitButton")
                      )}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ForgotPasswordModal;
