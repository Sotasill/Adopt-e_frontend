import { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaFacebook,
  FaApple,
} from "react-icons/fa";
import { useTranslatedContent } from "../../redux/hooks/useTranslatedContent";
import {
  registerUser,
  registerBreeder,
  registerSpecialist,
} from "../../redux/registration/registrationThunks";
import { login } from "../../redux/auth/authActions";
import { addNotification } from "../../redux/notifications/notificationsSlice";
import { selectRegistrationLoading } from "../../redux/registration/registrationSlice";
import { handleSocialAuth } from "../../utils/socialAuth";
import styles from "./UserRegistrationForm.module.css";
import commonStyles from "../../styles/common.module.css";

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .matches(
      /^[A-Z][a-zA-Z0-9_-]{2,29}$/,
      "Имя пользователя должно начинаться с заглавной буквы и содержать от 3 до 30 символов (буквы, цифры, _ или -)"
    )
    .required("Введите имя пользователя"),
  email: Yup.string()
    .email("Введите корректный email адрес")
    .required("Введите email"),
  password: Yup.string()
    .min(8, "Пароль должен содержать минимум 8 символов")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Пароль должен содержать заглавные, строчные буквы и цифры"
    )
    .required("Введите пароль"),
  acceptTerms: Yup.boolean()
    .oneOf([true], "Необходимо принять условия использования")
    .required("Необходимо принять условия использования"),
});

const socialIcons = {
  google: FaGoogle,
  facebook: FaFacebook,
  apple: FaApple,
};

const UserRegistrationForm = ({ selectedRole }) => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslatedContent();
  const loading = useSelector(selectRegistrationLoading);

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      setStatus(null);
      const registerAction = {
        user: registerUser,
        breeder: registerBreeder,
        specialist: registerSpecialist,
      }[selectedRole.id];

      if (!registerAction) {
        throw new Error("Неверный тип пользователя");
      }

      const result = await dispatch(registerAction(values)).unwrap();

      if (result) {
        toast.success("Регистрация прошла успешно!", {
          duration: 3000,
          position: "top-center",
          style: {
            background: "#4caf50",
            color: "#fff",
            fontSize: "16px",
            padding: "16px",
            borderRadius: "8px",
          },
        });

        dispatch(
          addNotification({
            id: Date.now(),
            title: "Добро пожаловать!",
            message: `Здравствуйте, ${values.username}! Мы рады приветствовать вас на нашей платформе.`,
            timestamp: new Date().toISOString(),
          })
        );

        await dispatch(
          login({ email: values.email, password: values.password })
        );

        navigate("/");
      }
    } catch (error) {
      console.error("Registration error details:", {
        errorType: typeof error,
        errorValue: error,
        isString: typeof error === "string",
        stack: error?.stack,
      });

      let errorMessage = "";

      // Пропускаем ошибку 404 для check-email
      if (
        error?.response?.status === 404 &&
        error.config?.url?.includes("/check-email")
      ) {
        console.log("Пропускаем ошибку проверки email");
        return;
      }

      // Получаем текст ошибки
      const errorText =
        typeof error === "string" ? error : error?.message || "";
      console.log("Исходный текст ошибки:", errorText);

      // Очищаем текст от эмодзи и пробелов
      const cleanErrorText = errorText.replace(/❌\s*/g, "").trim();
      console.log("Очищенный текст ошибки:", cleanErrorText);

      // Проверяем наличие ключевых слов в тексте ошибки
      const lowerErrorText = cleanErrorText.toLowerCase();
      console.log("Текст ошибки в нижнем регистре:", lowerErrorText);

      // Проверяем различные варианты текста ошибки для email
      if (
        lowerErrorText.includes("email already in use") ||
        lowerErrorText.includes("email уже используется") ||
        lowerErrorText.includes("этот email уже") ||
        lowerErrorText.includes("такой email уже существует")
      ) {
        errorMessage = "Этот email уже используется другим пользователем";
        console.log("Определен конфликт email");
      }
      // Проверяем различные варианты текста ошибки для username
      else if (
        lowerErrorText.includes("username already exists") ||
        lowerErrorText.includes("имя пользователя уже занято") ||
        lowerErrorText.includes("такое имя уже существует")
      ) {
        errorMessage = "Это имя пользователя уже занято";
        console.log("Определен конфликт username");
      }
      // Если не удалось определить тип ошибки
      else {
        errorMessage =
          cleanErrorText ||
          "Произошла ошибка при регистрации. Пожалуйста, попробуйте позже";
        console.log("Использовано общее сообщение об ошибке");
      }

      console.log("Итоговое сообщение об ошибке:", errorMessage);

      toast.error(errorMessage, {
        position: "top-center",
        duration: 5000,
        style: {
          background: "#ff5252",
          color: "#fff",
          fontSize: "16px",
          padding: "16px",
          borderRadius: "8px",
        },
      });

      setStatus(errorMessage);
      setSubmitting(false);
    }
  };

  const handleSocialClick = async (provider) => {
    try {
      await handleSocialAuth(provider);
    } catch (error) {
      console.error(`Ошибка авторизации через ${provider}:`, error);
    }
  };

  return (
    <Formik
      initialValues={{
        username: "",
        email: "",
        password: "",
        acceptTerms: false,
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting, isValid, values }) => (
        <Form className={styles.form}>
          <div className={styles.formHeader}>
            <h2 className={styles.formTitle}>{t("registration.user.title")}</h2>
            <p className={styles.formSubtitle}>
              {t(`registration.roles.${selectedRole.id}.description`)}
            </p>
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.inputWrapper}>
              <Field
                type="text"
                name="username"
                className={`${styles.input} ${
                  errors.username && touched.username ? styles.error : ""
                }`}
                placeholder={t("registration.user.username")}
                disabled={loading || isSubmitting}
              />
              <FaUser className={styles.inputIcon} />
            </div>
            {errors.username && touched.username && (
              <div className={styles.error}>{errors.username}</div>
            )}
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.inputWrapper}>
              <Field
                type="email"
                name="email"
                className={`${styles.input} ${
                  errors.email && touched.email ? styles.error : ""
                }`}
                placeholder={t("registration.user.email")}
                disabled={loading || isSubmitting}
              />
              <FaEnvelope className={styles.inputIcon} />
            </div>
            {errors.email && touched.email && (
              <div className={styles.error}>{errors.email}</div>
            )}
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.inputWrapper}>
              <Field
                type={showPassword ? "text" : "password"}
                name="password"
                className={`${styles.input} ${
                  errors.password && touched.password ? styles.error : ""
                }`}
                placeholder={t("registration.user.password")}
                disabled={loading || isSubmitting}
              />
              <FaLock className={styles.inputIcon} />
              <button
                type="button"
                className={styles.showPasswordButton}
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && touched.password && (
              <div className={styles.error}>{errors.password}</div>
            )}
          </div>

          <div className={styles.checkboxGroup}>
            <Field
              type="checkbox"
              name="acceptTerms"
              className={styles.checkbox}
            />
            <label className={styles.licenseText}>
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
          {errors.acceptTerms && touched.acceptTerms && (
            <div className={styles.error}>{errors.acceptTerms}</div>
          )}

          <button
            type="submit"
            className={`${commonStyles.findBreederButton} ${commonStyles.small} ${styles.submitButton}`}
            disabled={
              loading ||
              isSubmitting ||
              !isValid ||
              !values.username ||
              !values.email ||
              !values.password ||
              !values.acceptTerms
            }
          >
            {loading || isSubmitting
              ? t("registration.loading")
              : t("registration.submit")}
          </button>

          <div className={styles.socialAuth}>
            <div className={styles.socialDivider}>
              {t("registration.social.or")}
            </div>
            <div className={styles.socialButtons}>
              {Object.entries(socialIcons).map(([provider, Icon]) => (
                <button
                  key={provider}
                  type="button"
                  className={styles.socialButton}
                  onClick={() => handleSocialClick(provider)}
                  title={t(`registration.social.${provider}`)}
                >
                  <Icon size={20} />
                </button>
              ))}
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

UserRegistrationForm.propTypes = {
  selectedRole: PropTypes.shape({
    id: PropTypes.string.isRequired,
    colors: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default UserRegistrationForm;
