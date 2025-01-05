import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form } from "formik";
import toast from "react-hot-toast";
import { login } from "../../redux/auth/authActions";
import { TextField, PasswordField, CheckboxField } from "./FormFields";
import {
  LoginSchema,
  getErrorMessage,
  loadSavedCredentials,
  saveCredentials,
} from "./loginUtils";
import styles from "./LoginForm.module.css";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    error: authError,
    loading,
    isAuthenticated,
  } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Следим за изменением статуса аутентификации
  useEffect(() => {
    if (isAuthenticated) {
      toast.success("Вход выполнен успешно!");
      const timer = setTimeout(() => {
        navigate("/mainbcs");
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, navigate]);

  // Следим за ошибками аутентификации
  useEffect(() => {
    if (authError) {
      const userFriendlyMessage = getErrorMessage(authError);
      toast.error(userFriendlyMessage);
    }
  }, [authError]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      await dispatch(
        login({ username: values.username, password: values.password })
      );
      saveCredentials(values);
    } catch (err) {
      const userFriendlyMessage = getErrorMessage(err.message);
      toast.error(userFriendlyMessage);

      if (userFriendlyMessage === "Неверное имя пользователя или пароль") {
        setFieldError("password", "Проверьте правильность введенного пароля");
      } else if (userFriendlyMessage === "Пользователь не найден") {
        setFieldError("username", "Пользователь с таким именем не найден");
      }

      console.error("Ошибка входа:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <Formik
        initialValues={loadSavedCredentials()}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className={styles.loginForm}>
            <h2>Вход</h2>

            <TextField
              name="username"
              label="Имя пользователя:"
              autoComplete="username"
              disabled={loading || isSubmitting}
              error={errors.username}
              touched={touched.username}
            />

            <PasswordField
              name="password"
              label="Пароль:"
              autoComplete="current-password"
              showPassword={showPassword}
              onTogglePassword={togglePasswordVisibility}
              disabled={loading || isSubmitting}
              error={errors.password}
              touched={touched.password}
            />

            <div className={styles.rememberMeContainer}>
              <CheckboxField
                name="rememberMe"
                label="Запомнить меня"
                disabled={loading || isSubmitting}
              />
              <Link to="/forgot-password" className={styles.forgotPasswordLink}>
                Забыли пароль?
              </Link>
            </div>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={loading || isSubmitting}
            >
              {loading || isSubmitting ? "Вход..." : "Войти"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
