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
    user,
  } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Следим за изменением статуса аутентификации
  useEffect(() => {
    if (isAuthenticated && user) {
      console.log("Login successful, user data:", {
        user,
        isAuthenticated,
        role: user.role,
        roleType: typeof user.role,
      });

      const redirectUser = () => {
        if (!user.role) {
          console.error("Роль пользователя не определена");
          toast.error("Ошибка: роль пользователя не определена");
          return;
        }

        const userRole = user.role.toLowerCase();
        console.log("Redirecting user with role:", {
          originalRole: user.role,
          normalizedRole: userRole,
        });

        switch (userRole) {
          case "breeder":
            navigate("/mainbcs");
            break;
          case "user":
            navigate("/mainusersystem");
            break;
          default:
            console.error("Неизвестная роль пользователя:", user.role);
            toast.error("Ошибка: неизвестная роль пользователя");
        }
      };

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
      console.log("Attempting login with credentials:", {
        username: values.username,
        hasPassword: !!values.password,
      });

      const response = await dispatch(
        login({ username: values.username, password: values.password })
      );

      console.log("Login response:", {
        success: !!response,
        userData: response?.user,
        userRole: response?.user?.role,
      });

      saveCredentials(values);
    } catch (err) {
      console.error("Login error details:", {
        error: err,
        message: err.message,
        stack: err.stack,
      });

      const userFriendlyMessage = getErrorMessage(err.message);
      toast.error(userFriendlyMessage);

      if (userFriendlyMessage === "Неверное имя пользователя или пароль") {
        setFieldError("password", "Проверьте правильность введенного пароля");
      } else if (userFriendlyMessage === "Пользователь не найден") {
        setFieldError("username", "Пользователь с таким именем не найден");
      }
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
