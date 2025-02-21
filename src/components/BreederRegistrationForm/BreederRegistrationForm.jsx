import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaBuilding,
  FaPaw,
  FaArrowRight,
  FaArrowLeft,
} from "react-icons/fa";
import { registerBreeder } from "../../redux/registration/registrationThunks";
import { login } from "../../redux/auth/authActions";
import {
  selectRegistrationLoading,
  selectRegistrationError,
} from "../../redux/registration/registrationSlice";
import styles from "./BreederRegistrationForm.module.css";

const BreederRegistrationForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(1);
  const loading = useSelector(selectRegistrationLoading);
  const registrationError = useSelector(selectRegistrationError);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    companyName: "",
    specialization: "",
    experience: "",
    description: "",
    certificates: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      certificates: files,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const registrationResult = await dispatch(
        registerBreeder(formData)
      ).unwrap();

      toast.success("Регистрация прошла успешно!", {
        duration: 3000,
        position: "top-center",
      });

      // Автоматический вход после регистрации
      if (registrationResult) {
        const loginResult = await dispatch(
          login({
            username: formData.username,
            password: formData.password,
          })
        ).unwrap();

        if (loginResult) {
          navigate("/mainbcs");
        }
      }
    } catch (err) {
      toast.error(err.message || "Произошла ошибка при регистрации");
    }
  };

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className={styles.stepContainer}>
            <h3>Основная информация</h3>
            <div className={styles.formGroup}>
              <div className={styles.inputWrapper}>
                <FaUser className={styles.inputIcon} />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Имя пользователя"
                  required
                  minLength={3}
                  maxLength={30}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <div className={styles.inputWrapper}>
                <FaEnvelope className={styles.inputIcon} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <div className={styles.inputWrapper}>
                <FaLock className={styles.inputIcon} />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Пароль"
                  required
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className={styles.stepContainer}>
            <h3>Информация о питомнике</h3>
            <div className={styles.formGroup}>
              <div className={styles.inputWrapper}>
                <FaBuilding className={styles.inputIcon} />
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Название питомника"
                  required
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <div className={styles.inputWrapper}>
                <FaPaw className={styles.inputIcon} />
                <select
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  required
                >
                  <option value="">Выберите специализацию</option>
                  <option value="dog">Собаки</option>
                  <option value="cat">Кошки</option>
                  <option value="both">Собаки и кошки</option>
                </select>
              </div>
            </div>

            <div className={styles.formGroup}>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Описание питомника"
                rows={4}
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className={styles.stepContainer}>
            <h3>Опыт и сертификаты</h3>
            <div className={styles.formGroup}>
              <input
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="Опыт работы (лет)"
                min="0"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.fileInput}>
                Загрузить сертификаты
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                />
              </label>
              <small>Можно выбрать несколько файлов</small>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={styles.registrationContainer}>
      <form onSubmit={handleSubmit} className={styles.registrationForm}>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${(currentStep / 3) * 100}%` }}
          />
        </div>

        <div className={styles.stepIndicator}>Шаг {currentStep} из 3</div>

        {registrationError && (
          <div className={styles.error}>{registrationError}</div>
        )}

        {renderStep()}

        <div className={styles.navigationButtons}>
          {currentStep > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className={styles.navButton}
              disabled={loading}
            >
              <FaArrowLeft /> Назад
            </button>
          )}

          {currentStep < 3 ? (
            <button
              type="button"
              onClick={nextStep}
              className={styles.navButton}
              disabled={loading}
            >
              Далее <FaArrowRight />
            </button>
          ) : (
            <button
              type="submit"
              className={styles.submitButton}
              disabled={loading}
            >
              {loading ? "Регистрация..." : "Завершить регистрацию"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default BreederRegistrationForm;
