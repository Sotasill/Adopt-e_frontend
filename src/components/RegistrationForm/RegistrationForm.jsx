import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslatedContent } from "../../redux/hooks/useTranslatedContent";
import { FaUser, FaPaw, FaStethoscope, FaArrowsAltH } from "react-icons/fa";
import Aurora from "../Aurora/Aurora";
import RegistrationModal from "../RegistrationModal/RegistrationModal";
import styles from "./RegistrationForm.module.css";

const roleTypes = [
  {
    id: "user",
    icon: FaUser,
    colors: ["#FF6B6B", "#4ECDC4", "#45B7D1"],
    image: "/images/registration/user_default.jpg",
  },
  {
    id: "breeder",
    icon: FaPaw,
    colors: ["#96E6A1", "#D4FC79", "#96E6A1"],
    image: "/images/registration/breeder.jpg",
  },
  {
    id: "specialist",
    icon: FaStethoscope,
    colors: ["#A9C9FF", "#FFBBEC", "#A9C9FF"],
    image: "/images/registration/specialist.jpg",
  },
];

const cardVariants = {
  hidden: {
    y: 50,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
};

const RegistrationForm = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const cardContainerRef = useRef(null);
  const { t } = useTranslatedContent();

  useEffect(() => {
    const handleScroll = () => {
      if (cardContainerRef.current) {
        const scrollPosition = cardContainerRef.current.scrollLeft;
        const cardWidth = cardContainerRef.current.offsetWidth;
        const newSlide = Math.round(scrollPosition / cardWidth);
        setCurrentSlide(newSlide);
      }
    };

    const container = cardContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const scrollToSlide = (index) => {
    if (cardContainerRef.current) {
      const cardWidth = cardContainerRef.current.offsetWidth;
      cardContainerRef.current.scrollTo({
        left: cardWidth * index,
        behavior: "smooth",
      });
    }
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Aurora colorStops={roleTypes[0].colors} amplitude={1.2} speed={0.5} />
      <div className={styles.registrationContainer}>
        <div className={styles.swipeHintContainer}>
          <div className={styles.swipeHint}>
            <FaArrowsAltH className={styles.swipeIcon} />
            <span>Листайте для выбора типа регистрации</span>
          </div>
        </div>
        <div className={styles.cardContainer} ref={cardContainerRef}>
          {roleTypes.map((role) => (
            <motion.div
              key={role.id}
              variants={cardVariants}
              whileHover={{
                scale: 1.05,
                transition: { type: "spring", stiffness: 300 },
              }}
              whileTap={{ scale: 0.95 }}
              className={`${styles.roleCard} ${
                selectedRole?.id === role.id ? styles.selected : ""
              }`}
              onClick={() => handleRoleSelect(role)}
            >
              <img
                src={role.image}
                alt={t(`registration.roles.${role.id}.title`)}
                className={styles.roleCardImage}
              />
              <role.icon size={40} className={styles.roleIcon} />
              <h3 className={styles.roleTitle}>
                {t(`registration.roles.${role.id}.title`)}
              </h3>
              <p className={styles.roleDescription}>
                {t(`registration.roles.${role.id}.description`)}
              </p>
            </motion.div>
          ))}
        </div>
        <div className={styles.slideIndicators}>
          {roleTypes.map((_, index) => (
            <div
              key={index}
              className={`${styles.indicator} ${
                currentSlide === index ? styles.active : ""
              }`}
              onClick={() => scrollToSlide(index)}
            />
          ))}
        </div>
      </div>
      <AnimatePresence>
        {isModalOpen && selectedRole && (
          <RegistrationModal
            onClose={handleCloseModal}
            selectedRole={selectedRole}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default RegistrationForm;
