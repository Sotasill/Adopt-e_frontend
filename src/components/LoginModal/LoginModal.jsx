import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaUser, FaUserTie, FaPaw, FaStethoscope } from "react-icons/fa";
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
  <button type="button" className={styles.socialButton} onClick={onClick}>
    <img src={icon} alt={label} className={styles.socialIcon} />
    <span>Войти через {label}</span>
  </button>
);

const LoginModal = ({
  isOpen,
  onClose,
  initialType = null,
  initialSubtype = null,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedType, setSelectedType] = useState(initialType);
  const [specialistSubtype, setSpecialistSubtype] = useState(initialSubtype);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    navigate("/forgot-password");
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
        <div className={styles.modalInner}>
          <div className={styles.modalContent}>
            <button className={styles.closeButton} onClick={onClose}>
              ×
            </button>

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
                  <h2>Выберите тип пользователя</h2>
                  <div className={styles.userTypeButtons}>
                    <button
                      className={`${styles.userTypeButton} ${styles.userButton}`}
                      onClick={() => setSelectedType("user")}
                    >
                      <div className={styles.iconWrapper}>
                        <FaUser className={styles.userIcon} />
                      </div>
                      <span>Пользователь</span>
                    </button>
                    <button
                      className={`${styles.userTypeButton} ${styles.sellerButton}`}
                      onClick={() => setSelectedType("seller")}
                    >
                      <div className={styles.iconWrapper}>
                        <FaUserTie className={styles.userIcon} />
                      </div>
                      <span>Заводчик/Специалист</span>
                    </button>
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
                  <button
                    className={styles.backButton}
                    onClick={handleBackToTypes}
                  >
                    ← Назад
                  </button>
                  <h2>Выберите тип входа</h2>
                  <div className={styles.userTypeButtons}>
                    <button
                      className={`${styles.userTypeButton} ${styles.bcsButton}`}
                      onClick={() => setSpecialistSubtype("bcs")}
                    >
                      <div className={styles.iconWrapper}>
                        <FaPaw className={styles.userIcon} />
                      </div>
                      <span>Login to BCS</span>
                    </button>
                    <button
                      className={`${styles.userTypeButton} ${styles.specialistButton}`}
                      onClick={() => setSpecialistSubtype("specialist")}
                    >
                      <div className={styles.iconWrapper}>
                        <FaStethoscope className={styles.userIcon} />
                      </div>
                      <span>Login as Pet Specialist</span>
                    </button>
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
                  <button
                    className={styles.backButton}
                    onClick={
                      selectedType === "seller"
                        ? handleBackToSpecialistTypes
                        : handleBackToTypes
                    }
                  >
                    ← Назад
                  </button>
                  <h2>
                    {selectedType === "user"
                      ? "Вход в аккаунт"
                      : specialistSubtype === "bcs"
                      ? "Вход в BCS систему"
                      : "Вход для специалиста"}
                  </h2>
                  <form onSubmit={handleLogin}>
                    <div className={styles.formGroup}>
                      <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <input
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <button type="submit" className={styles.loginButton}>
                      Войти
                    </button>
                    {selectedType === "user" && (
                      <>
                        <div className={styles.divider}>
                          <span>или</span>
                        </div>
                        <div className={styles.socialButtons}>
                          <SocialButton
                            icon="/icons/google.svg"
                            label="Google"
                            onClick={() => handleSocialLogin("google")}
                          />
                          <SocialButton
                            icon="/icons/facebook.svg"
                            label="Facebook"
                            onClick={() => handleSocialLogin("facebook")}
                          />
                          <SocialButton
                            icon="/icons/apple.svg"
                            label="Apple"
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
                      Забыли пароль?
                    </button>
                    {selectedType === "seller" && (
                      <p className={styles.sellerNote}>
                        Для получения доступа как{" "}
                        {specialistSubtype === "bcs"
                          ? "заводчик"
                          : "специалист"}
                        , пожалуйста,
                        <a
                          href="mailto:support@example.com"
                          className={styles.supportLink}
                        >
                          {" "}
                          свяжитесь с поддержкой
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
  );
};

export default LoginModal;
