import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/auth/authActions";
import styles from "./HeaderBar.module.css";
import Navigation from "../Navigation/Navigation";

const HeaderBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
      navigate("/");
    } catch (error) {
      console.error("Ошибка при выходе:", error);
    }
  };

  return (
    <>
      <Navigation />
      <div className={styles.headerBar}>
        <div className={styles.logo}></div>
        <div className={styles.actions}>
          {isAuthenticated && (
            <button onClick={handleLogout} className={styles.logoutButton}>
              Выйти
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default HeaderBar;
