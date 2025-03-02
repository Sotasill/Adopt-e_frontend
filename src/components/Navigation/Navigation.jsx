import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslations } from "../../redux/hooks/useTranslations";
import styles from "./Navigation.module.css";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import LoginModal from "../LoginModal/LoginModal";
import { useState, useEffect, useRef } from "react";
import { FaUserCircle, FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { MdStorefront } from "react-icons/md";

const Navigation = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { translate } = useTranslations();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isBcsLoginModalOpen, setIsBcsLoginModalOpen] = useState(false);
  const sidebarRef = useRef(null);

  // Обработчик клика вне сайдбара
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const SidebarContent = () => (
    <div className={styles.sidebarContent}>
      <div className={styles.sidebarHeader}>
        <button
          className={styles.closeButton}
          onClick={() => setIsSidebarOpen(false)}
        >
          <IoMdClose size={20} />
        </button>
      </div>

      {!isAuthenticated ? (
        <div className={styles.actionButtons}>
          <button
            onClick={() => {
              setIsLoginModalOpen(true);
              setIsSidebarOpen(false);
            }}
            className={styles.sidebarButton}
            title={translate("common", "navigation.login")}
          >
            <div className={styles.buttonIcon}>
              <FaSignInAlt size={18} />
            </div>
            <span className={styles.buttonLabel}>
              {translate("common", "navigation.login")}
            </span>
          </button>

          <Link
            to="/register"
            className={styles.sidebarButton}
            onClick={() => setIsSidebarOpen(false)}
            title={translate("common", "navigation.register")}
          >
            <div className={styles.buttonIcon}>
              <FaUserPlus size={18} />
            </div>
            <span className={styles.buttonLabel}>
              {translate("common", "navigation.register")}
            </span>
          </Link>

          <button
            onClick={() => {
              setIsLoginModalOpen(true);
              setIsBcsLoginModalOpen(true);
              setIsSidebarOpen(false);
            }}
            className={styles.sidebarButton}
            title="BCS"
          >
            <div className={styles.buttonIcon}>
              <MdStorefront size={18} />
            </div>
            <span className={styles.buttonLabel}>BCS</span>
          </button>
        </div>
      ) : (
        <Link
          to="/MainBCS"
          className={styles.sidebarButton}
          onClick={() => setIsSidebarOpen(false)}
          title="MainBCS"
        >
          <div className={styles.buttonIcon}>
            <MdStorefront size={18} />
          </div>
          <span className={styles.buttonLabel}>MainBCS</span>
        </Link>
      )}

      <div className={styles.sidebarDivider} />

      <Link
        to="/about"
        className={styles.sidebarLink}
        onClick={() => setIsSidebarOpen(false)}
      >
        {translate("common", "navigation.about")}
      </Link>
      <Link
        to="/breeds"
        className={styles.sidebarLink}
        onClick={() => setIsSidebarOpen(false)}
      >
        {translate("common", "breeds.title")}
      </Link>
      <a
        href="/#kennels-slider"
        className={styles.sidebarLink}
        onClick={() => setIsSidebarOpen(false)}
      >
        {translate("common", "navigation.findBreeder")}
      </a>
      <Link
        to="/find-pet"
        className={styles.sidebarLink}
        onClick={() => setIsSidebarOpen(false)}
      >
        {translate("common", "navigation.findYourPet")}
      </Link>
    </div>
  );

  return (
    <>
      <nav className={styles.navigation}>
        <div className={styles.navContainer}>
          <div className={styles.leftSide}>
            <Link to="/" className={styles.homeLink}>
              <h2>Adopt-e</h2>
            </Link>
          </div>

          <div className={styles.rightSide}>
            <LanguageSwitcher />
            <button
              className={styles.profileButton}
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <FaUserCircle size={20} />
            </button>
          </div>
        </div>
      </nav>

      {/* Сайдбар */}
      <div
        ref={sidebarRef}
        className={`${styles.sidebar} ${
          isSidebarOpen ? styles.sidebarOpen : ""
        }`}
      >
        <SidebarContent />
      </div>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => {
          setIsLoginModalOpen(false);
          setIsBcsLoginModalOpen(false);
        }}
        initialType={isBcsLoginModalOpen ? "seller" : null}
        initialSubtype={isBcsLoginModalOpen ? "bcs" : null}
      />
    </>
  );
};

export default Navigation;
