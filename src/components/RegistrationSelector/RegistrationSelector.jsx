import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectRegistrationLoading,
  selectRegistrationError,
} from "../../redux/registration/registrationSlice";
import styles from "./RegistrationSelector.module.css";

const RegistrationSelector = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector(selectRegistrationLoading);
  const error = useSelector(selectRegistrationError);

  const handleUserTypeSelect = (type) => {
    if (type === "breeder") {
      navigate("/register/breeder");
    } else {
      navigate("/register/user");
    }
  };

  return (
    <div className={styles.selectorContainer}>
      <h2>Выберите тип регистрации</h2>
      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.optionsContainer}>
        <button
          className={styles.optionButton}
          onClick={() => handleUserTypeSelect("user")}
          disabled={loading}
        >
          <h3>Пользователь</h3>
          <p>Регистрация для поиска и покупки питомцев</p>
        </button>

        <button
          className={styles.optionButton}
          onClick={() => handleUserTypeSelect("breeder")}
          disabled={loading}
        >
          <h3>Заводчик</h3>
          <p>Регистрация для продажи питомцев</p>
        </button>
      </div>
    </div>
  );
};

export default RegistrationSelector;
