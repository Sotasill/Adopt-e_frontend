import { useEffect } from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import UserRegistrationForm from "../UserRegistrationForm/UserRegistrationForm";
import BreederRegistrationForm from "../BreederRegistrationForm/BreederRegistrationForm";
import SpecialistRegistrationForm from "../SpecialistRegistrationForm/SpecialistRegistrationForm";
import Aurora from "../Aurora/Aurora";
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

  const renderRegistrationForm = () => {
    switch (selectedRole.id) {
      case "breeder":
        return <BreederRegistrationForm />;
      case "specialist":
        return <SpecialistRegistrationForm />;
      case "user":
        return <UserRegistrationForm selectedRole={selectedRole} />;
      default:
        return <UserRegistrationForm selectedRole={selectedRole} />;
    }
  };

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
        <div className={styles.auroraContainer}>
          <Aurora
            colorStops={selectedRole.colors}
            amplitude={1.2}
            speed={0.5}
            className={styles.aurora}
          />
        </div>
        <div className={styles.modalContent}>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
          <div className={styles.formContainer}>{renderRegistrationForm()}</div>
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
