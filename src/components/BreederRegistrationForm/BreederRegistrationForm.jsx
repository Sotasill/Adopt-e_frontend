import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaBuilding,
  FaPaw,
  FaEye,
  FaEyeSlash,
  FaArrowLeft,
  FaArrowRight,
  FaGlobe,
  FaCity,
} from "react-icons/fa";
import { registerBreeder } from "../../redux/registration/registrationThunks";
import { login } from "../../redux/auth/authActions";
import { useTranslatedContent } from "../../redux/hooks/useTranslatedContent";
import {
  selectRegistrationLoading,
  selectRegistrationError,
} from "../../redux/registration/registrationSlice";
import styles from "./BreederRegistrationForm.module.css";
import commonStyles from "../../styles/common.module.css";
import countries from "../../redux/language/dictionaries/countries.json";
import authService from "../../services/authService";
import CountrySelect from "../CountrySelect/CountrySelect";

const formAnimation = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: {
      duration: 0.2,
    },
  },
};

const BreederRegistrationForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslatedContent();
  const loading = useSelector(selectRegistrationLoading);
  const registrationError = useSelector(selectRegistrationError);
  const [showPassword, setShowPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    companyName: "",
    specialization: "",
    country: "",
    city: "",
    acceptTerms: false,
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    companyName: "",
    specialization: "",
    country: "",
    city: "",
  });

  const validateField = (name, value) => {
    switch (name) {
      case "username":
        if (!/^[A-Z]/.test(value)) {
          return t("registration.errors.username");
        }
        if (/(.)\1{2,}/.test(value) || /([A-Za-z])\s+\1/.test(value)) {
          return t("registration.errors.usernameRepeating");
        }
        if (!/^[A-Z][a-zA-Z0-9_-]{2,29}$/.test(value)) {
          return t("registration.errors.username");
        }
        break;
      case "email":
        if (!value.includes("@") || !value.includes(".")) {
          return t("registration.errors.email");
        }
        break;
      case "password":
        if (value.length < 8) {
          return t("registration.errors.minLength", { count: 8 });
        }
        if (!/[a-zA-Z]/.test(value)) {
          return t("registration.errors.passwordLetter");
        }
        if (!/\d/.test(value)) {
          return t("registration.errors.passwordNumber");
        }
        break;
      case "companyName":
        if (!value) {
          return t("registration.errors.required");
        }
        if (!/^[A-Z]/.test(value)) {
          return t("registration.errors.companyName");
        }
        if (!/^[A-Za-z\-_;\s*]+$/.test(value)) {
          return t("registration.errors.companyNameFormat");
        }
        break;
      case "specialization":
        if (!value || value === "") {
          return t("registration.errors.required");
        }
        if (!["dog", "cat"].includes(value)) {
          return t("registration.errors.specialization.breeder");
        }
        break;
      case "country":
        if (!value) {
          return t("registration.errors.required");
        }
        if (!/^[A-Z]/.test(value)) {
          return t("registration.errors.countryFirstLetter");
        }
        break;
      case "city":
        if (value && !/^[A-Z]/.test(value)) {
          return t("registration.errors.cityFirstLetter");
        }
        break;
      default:
        return "";
    }
    return "";
  };

  const handleChange = async (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "companyName") {
      if (value !== "" && !/^[A-Za-z\-_;\s*]*$/.test(value)) {
        return;
      }
    }

    if (name === "city" && value !== "" && !/^[a-zA-Z\s]*$/.test(value)) {
      return;
    }

    const newValue = type === "checkbox" ? checked : value;
    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    if (type !== "checkbox") {
      const error = validateField(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));

      // Проверка доступности email
      if (name === "email" && value && !error) {
        try {
          const { available } = await authService.checkEmail(value);
          if (!available) {
            setErrors((prev) => ({
              ...prev,
              email: t("auth.errors.emailInUse"),
            }));
          }
        } catch (error) {
          console.error("Error checking email:", error);
        }
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Проверяем все поля на наличие ошибок
    const hasErrors = Object.values(errors).some((error) => error !== "");
    if (hasErrors) {
      toast.error(t("registration.errors.validation"));
      return; // Прерываем выполнение если есть ошибки
    }

    if (!formData.acceptTerms) {
      toast.error(t("registration.errors.acceptTerms"));
      return;
    }

    // Повторная проверка email перед отправкой
    try {
      const { available } = await authService.checkEmail(formData.email);
      if (!available) {
        setErrors((prev) => ({
          ...prev,
          email: t("auth.errors.emailInUse"),
        }));
        toast.error(t("auth.errors.emailInUse"));
        return;
      }

      const registrationResult = await dispatch(
        registerBreeder(formData)
      ).unwrap();

      // Если мы дошли до этой точки, значит регистрация успешна
      toast.success(t("registration.success"), {
        duration: 3000,
        position: "top-center",
        style: {
          background: "#4caf50",
          color: "#fff",
          fontSize: "16px",
          padding: "16px",
        },
      });

      // Перенаправление происходит в thunk после показа уведомления
    } catch (error) {
      console.error("Registration error:", error);
      let errorMessage = t("registration.error");

      if (error?.response?.data?.message) {
        const serverMessage = error.response.data.message;
        if (serverMessage.includes("Email already in use")) {
          errorMessage = t("auth.errors.emailInUse");
        } else if (serverMessage.includes("Username already exists")) {
          errorMessage = t("auth.errors.usernameInUse");
        }
      }

      toast.error(errorMessage, {
        duration: 5000,
        position: "top-center",
        style: {
          background: "#ff5252",
          color: "#fff",
        },
      });
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const validateStep = () => {
    switch (currentStep) {
      case 1:
        return (
          formData.username.length >= 3 &&
          formData.email.includes("@") &&
          formData.password.length >= 8 &&
          !errors.username &&
          !errors.email &&
          !errors.password
        );
      case 2:
        return (
          formData.companyName &&
          formData.specialization &&
          formData.specialization !== "" &&
          !errors.companyName &&
          !errors.specialization
        );
      case 3:
        return (
          formData.country && formData.city && !errors.country && !errors.city
        );
      default:
        return false;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            key="step1"
            variants={formAnimation}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ width: "100%" }}
            className={styles.formFields}
          >
            <div className={styles.formGroup}>
              <div className={styles.inputWrapper}>
                <FaUser className={styles.inputIcon} />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder={t("registration.breeder.form.username")}
                  className={`${styles.input} ${
                    errors.username ? styles.inputError : ""
                  }`}
                  required
                  minLength={3}
                  maxLength={30}
                />
              </div>
              {errors.username && (
                <div className={styles.errorText}>{errors.username}</div>
              )}
            </div>

            <div className={styles.formGroup}>
              <div className={styles.inputWrapper}>
                <FaEnvelope className={styles.inputIcon} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t("registration.breeder.form.email")}
                  className={`${styles.input} ${
                    errors.email ? styles.inputError : ""
                  }`}
                  required
                />
              </div>
              {errors.email && (
                <div className={styles.errorText}>{errors.email}</div>
              )}
            </div>

            <div className={styles.formGroup}>
              <div className={styles.inputWrapper}>
                <FaLock className={styles.inputIcon} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder={t("registration.breeder.form.password")}
                  className={`${styles.input} ${
                    errors.password ? styles.inputError : ""
                  }`}
                  required
                />
                <button
                  type="button"
                  className={styles.showPasswordButton}
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && (
                <div className={styles.errorText}>{errors.password}</div>
              )}
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            key="step2"
            variants={formAnimation}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ width: "100%" }}
            className={styles.formFields}
          >
            <div className={styles.formGroup}>
              <div className={styles.inputWrapper}>
                <FaBuilding className={styles.inputIcon} />
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder={t("registration.breeder.form.companyName")}
                  className={`${styles.input} ${
                    errors.companyName ? styles.inputError : ""
                  }`}
                  required
                />
              </div>
              {errors.companyName && (
                <div className={styles.errorText}>{errors.companyName}</div>
              )}
            </div>

            <div className={styles.formGroup}>
              <div className={styles.inputWrapper}>
                <FaPaw className={styles.inputIcon} />
                <select
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  className={`${styles.input} ${
                    errors.specialization ? styles.inputError : ""
                  }`}
                  required
                >
                  <option value="">
                    {t("registration.breeder.form.specialization.placeholder")}
                  </option>
                  <option value="dog">
                    {t("registration.breeder.form.specialization.dog")}
                  </option>
                  <option value="cat">
                    {t("registration.breeder.form.specialization.cat")}
                  </option>
                </select>
              </div>
              {errors.specialization && (
                <div className={styles.errorText}>{errors.specialization}</div>
              )}
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div
            key="step3"
            variants={formAnimation}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ width: "100%" }}
            className={styles.formFields}
          >
            <div className={styles.inputGroup}>
              <div className={styles.inputWrapper}>
                <CountrySelect
                  value={formData.country}
                  onChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      country: value,
                    }))
                  }
                  placeholder={t(
                    "registration.breeder.form.country.placeholder"
                  )}
                  isDisabled={loading}
                  error={errors.country}
                />
              </div>
              {errors.country && (
                <div className={styles.error}>{errors.country}</div>
              )}
            </div>

            <div className={styles.formGroup}>
              <div className={styles.inputWrapper}>
                <FaCity className={styles.inputIcon} />
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder={t("registration.breeder.form.city.placeholder")}
                  className={`${styles.input} ${
                    errors.city ? styles.inputError : ""
                  }`}
                  required
                  pattern="[A-Za-z\s]+"
                />
              </div>
              {errors.city && (
                <div className={styles.errorText}>{errors.city}</div>
              )}
            </div>

            <div className={styles.checkboxGroup}>
              <input
                type="checkbox"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
                className={styles.checkbox}
                id="acceptTerms"
              />
              <label htmlFor="acceptTerms" className={styles.licenseText}>
                {t("registration.license.agree")}{" "}
                <a
                  href="/license"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.licenseLink}
                >
                  {t("registration.license.text")}
                </a>
              </label>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.registrationContainer}>
      <form onSubmit={handleSubmit} className={styles.registrationForm}>
        <h2 className={styles.formTitle}>{t("registration.breeder.title")}</h2>
        <p className={styles.formSubtitle}>
          {t("registration.roles.breeder.description")}
        </p>

        <div className={styles.stepIndicator}>
          {Array.from({ length: totalSteps }, (_, i) => (
            <div
              key={i}
              className={`${styles.stepDot} ${
                i + 1 === currentStep ? styles.active : ""
              } ${i + 1 < currentStep ? styles.completed : ""}`}
            />
          ))}
        </div>

        {registrationError && (
          <div className={styles.error}>{registrationError}</div>
        )}

        <AnimatePresence mode="wait">{renderStepContent()}</AnimatePresence>

        <div className={styles.buttonGroup}>
          {currentStep > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className={`${commonStyles.findBreederButton} ${commonStyles.small}`}
            >
              <FaArrowLeft className={styles.buttonIcon} />
              {t("registration.breeder.form.back")}
            </button>
          )}
          {currentStep < totalSteps ? (
            <button
              type="button"
              onClick={nextStep}
              className={`${commonStyles.findBreederButton} ${commonStyles.small}`}
              disabled={!validateStep()}
              style={{ opacity: validateStep() ? 1 : 0.7 }}
            >
              {t("registration.breeder.form.next")}
              <FaArrowRight className={styles.buttonIcon} />
            </button>
          ) : (
            <button
              type="submit"
              className={`${commonStyles.findBreederButton} ${commonStyles.small}`}
              disabled={loading || !formData.acceptTerms || !validateStep()}
              style={{
                opacity:
                  !loading && formData.acceptTerms && validateStep() ? 1 : 0.7,
              }}
            >
              {loading
                ? t("registration.loading")
                : t("registration.breeder.form.submit")}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default BreederRegistrationForm;
