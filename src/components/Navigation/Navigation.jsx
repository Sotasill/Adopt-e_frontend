import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./Navigation.module.css";

const Navigation = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <nav className={styles.navigation}>
      <div className={styles.leftSide}>
        <Link to="/" className={styles.homeLink}>
          <h2>Adopt-e</h2>
        </Link>
      </div>
      <div className={styles.rightSide}>
        {!isAuthenticated && (
          <>
            <Link to="/register" className={styles.navButton}>
              Registration
            </Link>
            <Link to="/login" className={styles.navButton}>
              Login
            </Link>
          </>
        )}
        {isAuthenticated && (
          <Link to="/MainBCS" className={styles.navButton}>
            MainBCS
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
