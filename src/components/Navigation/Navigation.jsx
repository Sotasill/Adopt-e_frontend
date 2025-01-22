import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslatedContent } from "../../redux/hooks/useTranslatedContent";
import styles from "./Navigation.module.css";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";

const Navigation = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { t } = useTranslatedContent();

  return (
    <nav className={styles.navigation}>
      <div className={styles.navContainer}>
        <div className={styles.leftSide}>
          <Link to="/" className={styles.homeLink}>
            <h2>Adopt-e</h2>
          </Link>
        </div>
        <div className={styles.rightSide}>
          <LanguageSwitcher />
          {!isAuthenticated && (
            <>
              <Link to="/register" className={styles.navButton}>
                {t("register")}
              </Link>
              <Link to="/login" className={styles.navButton}>
                {t("login")}
              </Link>
            </>
          )}
          {isAuthenticated && (
            <Link to="/MainBCS" className={styles.navButton}>
              MainBCS
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
