import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  FaUser,
  FaUserTie,
  FaPaw,
  FaStethoscope,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import Aurora from "../Aurora/Aurora";
import ForgotPasswordModal from "./ForgotPasswordModal";
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

const SocialButton = ({ icon, label, onClick }) => (
  <button
    type="button"
    className={styles.socialButton}
    onClick={onClick}
    aria-label={`Войти через ${label}`}
  >
    <img src={icon} alt={label} className={styles.socialIcon} />
  </button>
);

const UserTypeButton = ({ icon: Icon, label, onClick }) => (
  <button className={styles.userTypeButton} onClick={onClick}>
    <div className={styles.iconWrapper}>
      <Icon className={styles.userIcon} />
    </div>
    <span>{label}</span>
  </button>
);

const colorSchemes = {
  default: ["#e8f4f8", "#f0f4ea", "#fdf1eb"],
  user: ["#e6f3ff", "#e6fff3", "#ffe6f3"], // более заметный голубой к розовому
  seller: ["#e6ffe6", "#f3e6ff", "#e6f3ff"], // более заметный зеленый к голубому
  specialist: ["#ffe6f3", "#e6e6ff", "#e6f3ff"], // более заметный розовый к голубому
  bcs: ["#e6fff3", "#f3ffe6", "#ffe6f3"], // более заметный мятный к розовому
};

const LoginModal = ({
  isOpen,
  onClose,
  initialType = null,
  initialSubtype = null,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const [selectedType, setSelectedType] = useState(initialType);
  const [specialistSubtype, setSpecialistSubtype] = useState(initialSubtype);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [auroraKey, setAuroraKey] = useState(0);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  // Обновляем ключ Aurora при изменении типа
  useEffect(() => {
    setAuroraKey((prev) => prev + 1);
  }, [selectedType, specialistSubtype]);

  // Обновляем состояния при изменении initialType или initialSubtype
  useEffect(() => {
    setSelectedType(initialType);
    setSpecialistSubtype(initialSubtype);
  }, [initialType, initialSubtype]);

  // Закрытие модального окна при изменении маршрута
  useEffect(() => {
    if (isOpen) {
      onClose();
    }
  }, [location.pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  // Блокировка прокрутки при открытом модальном окне
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.documentElement.style.position = "fixed";
      document.documentElement.style.top = `-${scrollY}px`;
      document.documentElement.style.width = "100%";
      document.documentElement.style.height = "100vh";
      document.documentElement.style.overflow = "hidden";

      return () => {
        document.documentElement.style.position = "";
        document.documentElement.style.top = "";
        document.documentElement.style.width = "";
        document.documentElement.style.height = "";
        document.documentElement.style.overflow = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  // Обработка нажатия клавиши ESC
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
    }
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login attempt:", { email, password, userType: selectedType });
  };

  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`);
  };

  const handleBackToTypes = () => {
    setSelectedType(null);
    setSpecialistSubtype(null);
    setEmail("");
    setPassword("");
  };

  const handleBackToSpecialistTypes = () => {
    setSpecialistSubtype(null);
    setEmail("");
    setPassword("");
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setShowForgotPassword(true);
  };

  const renderBackButton = () => {
    if (!selectedType) return null;

    return (
      <button
        className={styles.backButton}
        onClick={
          selectedType === "seller" && !specialistSubtype
            ? handleBackToTypes
            : selectedType === "seller"
            ? handleBackToSpecialistTypes
            : handleBackToTypes
        }
      >
        ← {t("common.back")}
      </button>
    );
  };

  if (!isOpen) return null;

  return (
    <>
      <AnimatePresence>
        {showForgotPassword ? (
          <ForgotPasswordModal
            isOpen={showForgotPassword}
            onClose={onClose}
            onBack={() => setShowForgotPassword(false)}
          />
        ) : (
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
                  key={`aurora-${auroraKey}`}
                  colorStops={
                    !selectedType
                      ? colorSchemes.default
                      : selectedType === "seller" &&
                        specialistSubtype === "specialist"
                      ? colorSchemes.specialist
                      : selectedType === "seller" && specialistSubtype === "bcs"
                      ? colorSchemes.bcs
                      : selectedType === "seller"
                      ? colorSchemes.seller
                      : colorSchemes.user
                  }
                  amplitude={0.7}
                  speed={0.5}
                />
              </div>
              <div className={styles.modalInner}>
                <div className={styles.modalContent}>
                  <button className={styles.closeButton} onClick={onClose}>
                    ×
                  </button>
                  {renderBackButton()}

                  <AnimatePresence mode="wait">
                    {!selectedType ? (
                      <motion.div
                        key="type-selection"
                        variants={contentVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className={styles.typeSelection}
                      >
                        <h2>{t("loginModal.title")}</h2>
                        <div className={styles.userTypeButtons}>
                          <UserTypeButton
                            icon={FaUser}
                            label={t("loginModal.userTypes.individual.title")}
                            onClick={() => setSelectedType("user")}
                          />
                          <UserTypeButton
                            icon={FaUserTie}
                            label={t("loginModal.userTypes.breeder.title")}
                            onClick={() => setSelectedType("seller")}
                          />
                        </div>
                      </motion.div>
                    ) : selectedType === "seller" && !specialistSubtype ? (
                      <motion.div
                        key="specialist-type-selection"
                        variants={contentVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className={styles.typeSelection}
                      >
                        <h2>{t("loginModal.title")}</h2>
                        <div className={styles.userTypeButtons}>
                          <UserTypeButton
                            icon={FaPaw}
                            label={t("loginModal.userTypes.breeder.title")}
                            onClick={() => setSpecialistSubtype("bcs")}
                          />
                          <UserTypeButton
                            icon={FaStethoscope}
                            label={t("loginModal.userTypes.specialist.title")}
                            onClick={() => setSpecialistSubtype("specialist")}
                          />
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="login-form"
                        variants={contentVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className={styles.loginForm}
                      >
                        <h2>{t("loginModal.title")}</h2>
                        <form onSubmit={handleLogin}>
                          <div className={styles.formGroup}>
                            <FaEnvelope className={styles.inputIcon} />
                            <input
                              type="email"
                              placeholder={t("loginModal.form.email")}
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                            />
                          </div>
                          <div className={styles.formGroup}>
                            <FaLock className={styles.inputIcon} />
                            <input
                              type={showPassword ? "text" : "password"}
                              placeholder={t("loginModal.form.password")}
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                            />
                            {showPassword ? (
                              <FaEyeSlash
                                className={styles.passwordToggleIcon}
                                onClick={() => setShowPassword(false)}
                              />
                            ) : (
                              <FaEye
                                className={styles.passwordToggleIcon}
                                onClick={() => setShowPassword(true)}
                              />
                            )}
                          </div>
                          <button type="submit" className={styles.loginButton}>
                            {t("loginModal.form.loginButton")}
                          </button>
                          {selectedType === "user" && (
                            <>
                              <div className={styles.divider}>
                                <span>
                                  {t("loginModal.form.orContinueWith")}
                                </span>
                              </div>
                              <div className={styles.socialButtons}>
                                <SocialButton
                                  icon="/icons/google.svg"
                                  label={t("loginModal.social.google")}
                                  onClick={() => handleSocialLogin("google")}
                                />
                                <SocialButton
                                  icon="/icons/facebook.svg"
                                  label={t("loginModal.social.facebook")}
                                  onClick={() => handleSocialLogin("facebook")}
                                />
                                <SocialButton
                                  icon="/icons/apple.svg"
                                  label={t("loginModal.social.apple")}
                                  onClick={() => handleSocialLogin("apple")}
                                />
                              </div>
                            </>
                          )}
                          <button
                            type="button"
                            className={styles.forgotPasswordButton}
                            onClick={handleForgotPassword}
                          >
                            {t("loginModal.form.forgotPassword")}
                          </button>
                          {selectedType === "seller" && (
                            <p className={styles.sellerNote}>
                              {t("loginModal.form.sellerNote")}{" "}
                              <a
                                href="mailto:support@example.com"
                                className={styles.supportLink}
                              >
                                {t("loginModal.form.supportLink")}
                              </a>
                            </p>
                          )}
                        </form>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LoginModal;
