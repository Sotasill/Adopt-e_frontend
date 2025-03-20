import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form } from "formik";
import { toast } from "sonner";
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
    user,
  } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Следим за изменением статуса аутентификации
  useEffect(() => {
    if (isAuthenticated && user) {
      if (!user.role) {
        toast.error("Ошибка: роль пользователя не определена");
        return;
      }

      const userRole = user.role.toLowerCase();

      switch (userRole) {
        case "breeder":
          navigate("/mainbcs");
          break;
        case "user":
          navigate("/mainusersystem");
          break;
        default:
          toast.error("Ошибка: неизвестная роль пользователя");
      }

      toast.success("Вход выполнен успешно!");
      const timer = setTimeout(redirectUser, 500);

      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, navigate, user]);

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
        login({ email: values.username, password: values.password })
      );

      // Сохраняем учетные данные только если вход успешен
      if (values.rememberMe) {
        saveCredentials(values);
      }
    } catch (err) {
      const userFriendlyMessage = getErrorMessage(err.message);
      toast.error(userFriendlyMessage);
    }
  };

  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
        rememberMe: false,
      }}
      validationSchema={LoginSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form className={styles.form}>
          <TextField
            name="username"
            label="Email"
            type="email"
            error={touched.username && errors.username}
          />
          <PasswordField
            name="password"
            label="Пароль"
            showPassword={showPassword}
            togglePasswordVisibility={togglePasswordVisibility}
            error={touched.password && errors.password}
          />
          <div className={styles.rememberForgot}>
            <CheckboxField
              name="rememberMe"
              label="Запомнить меня"
              error={touched.rememberMe && errors.rememberMe}
            />
            <Link to="/forgot-password" className={styles.forgotPassword}>
              Забыли пароль?
            </Link>
          </div>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting || loading}
          >
            {loading ? "Вход..." : "Войти"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
