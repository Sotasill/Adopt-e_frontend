import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";
import styles from "./BreederRegistrationForm.module.css";

const BreederRegistrationForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    companyName: "",
    address: "",
    country: "",
    specialization: "dog", // значение по умолчанию
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
    setError("");

    try {
      await authService.registerBreeder(formData);
      // После успешной регистрации перенаправляем на страницу входа
      navigate("/login");
    } catch (err) {
      setError(err.message || "Ошибка при регистрации. Попробуйте позже.");
    }
  };

  return (
    <div className={styles.registrationContainer}>
      <form onSubmit={handleSubmit} className={styles.registrationForm}>
        <h2>Регистрация заводчика</h2>
        {error && <div className={styles.error}>{error}</div>}

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

        <div className={styles.formGroup}>
          <label htmlFor="companyName">Название компании:</label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
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
            required
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
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="specialization">Специализация:</label>
          <select
            id="specialization"
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            required
          >
            <option value="dog">Собаки</option>
            <option value="cat">Кошки</option>
          </select>
        </div>

        <button type="submit" className={styles.submitButton}>
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
};

export default BreederRegistrationForm;
