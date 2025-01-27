import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslations } from "../../redux/hooks/useTranslations";
import styles from "./Navigation.module.css";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import { useState, useEffect } from "react";

const Navigation = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { translate } = useTranslations();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Блокируем скролл при открытом меню
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  // Компонент для мобильных ссылок
  const MobileLinks = () => (
    <>
      <Link to="/about" className={styles.mobileMenuItem}>
        {translate("common", "navigation.about")}
      </Link>
      <Link to="/breeds" className={styles.mobileMenuItem}>
        {translate("common", "breeds.title")}
      </Link>
      <a href="/#kennels-slider" className={styles.mobileMenuItem}>
        {translate("common", "navigation.findBreeder")}
      </a>
      <Link to="/find-pet" className={styles.mobileMenuItem}>
        {translate("common", "navigation.findYourPet")}
      </Link>
      {!isAuthenticated && (
        <Link to="/register" className={styles.mobileMenuItem}>
          {translate("common", "navigation.register")}
        </Link>
      )}
    </>
  );

  return (
    <>
      <div
        className={`${styles.backdrop} ${
          isMobileMenuOpen ? styles.active : ""
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />
      <nav className={styles.navigation}>
        <div className={styles.navContainer}>
          <div className={styles.leftSide}>
            <Link to="/" className={styles.homeLink}>
              <h2>Adopt-e</h2>
            </Link>
          </div>

          {/* Мобильные элементы (видны только на 320px) */}
          <div className={styles.mobileVisible}>
            <LanguageSwitcher />
            {!isAuthenticated && (
              <Link
                to="/login"
                className={`${styles.navButton} ${styles.loginButton}`}
              >
                {translate("common", "navigation.login")}
              </Link>
            )}
            <div
              className={`${styles.burgerIcon} ${
                isMobileMenuOpen ? styles.active : ""
              }`}
              onClick={toggleMobileMenu}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>

          {/* Десктопные элементы (скрыты на 320px) */}
          <div className={styles.rightSide}>
            <LanguageSwitcher />
            {!isAuthenticated && (
              <>
                <Link
                  to="/login"
                  className={`${styles.navButton} ${styles.loginButton}`}
                >
                  {translate("common", "navigation.login")}
                </Link>
                <Link
                  to="/register"
                  className={`${styles.navButton} ${styles.registerButton}`}
                >
                  {translate("common", "navigation.register")}
                </Link>
              </>
            )}
            {isAuthenticated && (
              <Link to="/MainBCS" className={styles.navButton}>
                MainBCS
              </Link>
            )}
          </div>

          {/* Мобильное меню */}
          <div
            className={`${styles.mobileMenu} ${
              isMobileMenuOpen ? styles.active : ""
            }`}
          >
            <MobileLinks />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
