import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/auth/authActions";
import styles from "./HeaderBar.module.css";
import Navigation from "../Navigation/Navigation";

const HeaderBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleLogout = () => {
    // Сначала очищаем localStorage
    localStorage.removeItem("token");

    // Затем диспатчим экшен логаута
    dispatch(logout());

    // И только потом делаем редирект
    navigate("/");
  };

  return (
    <>
      <Navigation />
      <div className={styles.headerBar}>
        <div className={styles.logo}>
          
        </div>
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
