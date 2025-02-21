import { useEffect } from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import UserRegistrationForm from "../UserRegistrationForm/UserRegistrationForm";
import styles from "./RegistrationModal.module.css";

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

const RegistrationModal = ({ onClose, selectedRole }) => {
  useEffect(() => {
    // Сохраняем текущую позицию прокрутки
    const scrollY = window.scrollY;

    // Блокируем прокрутку и фиксируем страницу
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    // Восстанавливаем прокрутку при закрытии
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY);
    };
  }, []);

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscKey);
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [onClose]);

  return (
    <motion.div
      className={styles.backdrop}
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        className={styles.modal}
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className={styles.modalContent}>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
          <div className={styles.formContainer}>
            <UserRegistrationForm selectedRole={selectedRole} />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

RegistrationModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  selectedRole: PropTypes.shape({
    id: PropTypes.string.isRequired,
    colors: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default RegistrationModal;
