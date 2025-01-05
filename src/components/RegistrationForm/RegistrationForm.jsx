import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  registerUser,
  registerBreeder,
} from "../../redux/registration/registrationThunks";
import {
  selectRegistrationLoading,
  selectRegistrationError,
  selectRegistrationSuccess,
} from "../../redux/registration/registrationSlice";
import styles from "./RegistrationForm.module.css";

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector(selectRegistrationLoading);
  const error = useSelector(selectRegistrationError);
  const success = useSelector(selectRegistrationSuccess);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user", // или "breeder"
    // Дополнительные поля для заводчика
    companyName: "",
    address: "",
    country: "",
    specialization: "dog",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formData.role === "breeder") {
        await dispatch(registerBreeder(formData));
      } else {
        await dispatch(registerUser(formData));
      }

      if (success) {
        navigate("/login");
      }
    } catch (err) {
      console.error("Ошибка при регистрации:", err);
    }
  };

  const isBreeder = formData.role === "breeder";

  return (
    <div className={styles.registrationContainer}>
      <form onSubmit={handleSubmit} className={styles.registrationForm}>
        <h2>Регистрация</h2>
        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.formGroup}>
          <label htmlFor="role">Тип пользователя:</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="user">Пользователь</option>
            <option value="breeder">Заводчик</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="username">Имя пользователя:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            minLength={3}
            maxLength={30}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password">Пароль:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {isBreeder && (
          <>
            <div className={styles.formGroup}>
              <label htmlFor="companyName">Название компании:</label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required={isBreeder}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="address">Адрес:</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required={isBreeder}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="country">Страна:</label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required={isBreeder}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="specialization">Специализация:</label>
              <select
                id="specialization"
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                required={isBreeder}
              >
                <option value="dog">Собаки</option>
                <option value="cat">Кошки</option>
              </select>
            </div>
          </>
        )}

        <button
          type="submit"
          className={styles.submitButton}
          disabled={loading}
        >
          {loading ? "Регистрация..." : "Зарегистрироваться"}
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
