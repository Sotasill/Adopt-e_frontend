import { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useTranslatedContent } from "../../redux/hooks/useTranslatedContent";
import {
  registerUser,
  registerBreeder,
  registerSpecialist,
} from "../../redux/registration/registrationThunks";
import { login } from "../../redux/auth/authActions";
import { addNotification } from "../../redux/notifications/notificationsSlice";
import {
  selectRegistrationLoading,
  selectRegistrationError,
} from "../../redux/registration/registrationSlice";
import { handleSocialAuth } from "../../utils/socialAuth";
import styles from "./UserRegistrationForm.module.css";

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Минимум 3 символа")
    .max(30, "Максимум 30 символов")
    .required("Обязательное поле"),
  email: Yup.string().email("Некорректный email").required("Обязательное поле"),
  password: Yup.string()
    .min(8, "Минимум 8 символов")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Пароль должен содержать заглавные, строчные буквы и цифры"
    )
    .required("Обязательное поле"),
  acceptTerms: Yup.boolean()
    .oneOf([true], "Необходимо принять условия использования")
    .required("Обязательное поле"),
});

const socialIcons = {
  google: "/images/social/google.svg",
  facebook: "/images/social/facebook.svg",
  apple: "/images/social/apple.svg",
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

      await dispatch(registerAction(values));

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

      const loginResult = await dispatch(
        login({
          username: values.username,
          password: values.password,
        })
      );

      if (loginResult?.payload?.user) {
        const redirectPaths = {
          breeder: "/mainbcs",
          specialist: "/mainspecialistsystem",
          user: "/mainusersystem",
        };
        navigate(redirectPaths[selectedRole.id]);
      }
    } catch (error) {
      console.error("Registration/Login error:", error);
      setStatus("Ошибка при регистрации");
      toast.error(
        error.response?.data?.message || "Произошла ошибка при регистрации"
      );
    } finally {
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
      {({ errors, touched, isSubmitting }) => (
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
                className={styles.input}
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
                className={styles.input}
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
                className={styles.input}
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
            className={styles.submitButton}
            disabled={loading || isSubmitting}
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
              {Object.entries(socialIcons).map(([provider, iconPath]) => (
                <button
                  key={provider}
                  type="button"
                  className={styles.socialButton}
                  onClick={() => handleSocialClick(provider)}
                  title={t(`registration.social.${provider}`)}
                >
                  <img src={iconPath} alt={provider} width="24" height="24" />
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
