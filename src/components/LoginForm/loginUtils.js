import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Минимум 3 символа")
    .max(50, "Максимум 50 символов")
    .required("Обязательное поле"),
  password: Yup.string()
    .min(6, "Минимум 6 символов")
    .required("Обязательное поле"),
  rememberMe: Yup.boolean(),
});

export const getErrorMessage = (error) => {
  if (!error) return "Произошла неизвестная ошибка";

  const errorLower = error.toLowerCase();

  if (errorLower.includes("401") || errorLower.includes("unauthorized")) {
    return "Неверное имя пользователя или пароль";
  }

  if (errorLower.includes("404") || errorLower.includes("not found")) {
    return "Пользователь не найден";
  }

  if (
    errorLower.includes("network") ||
    errorLower.includes("failed to fetch")
  ) {
    return "Ошибка соединения с сервером. Проверьте подключение к интернету";
  }

  if (errorLower.includes("timeout")) {
    return "Превышено время ожидания ответа от сервера";
  }

  return "Произошла ошибка при входе. Попробуйте позже";
};

export const loadSavedCredentials = () => {
  const initialValues = {
    username: "",
    password: "",
    rememberMe: false,
  };

  try {
    const savedCredentials = localStorage.getItem("savedCredentials");
    const savedRememberMe = localStorage.getItem("rememberMe");

    if (savedRememberMe === "true" && savedCredentials) {
      const { username, password } = JSON.parse(savedCredentials);
      return {
        ...initialValues,
        username,
        password,
        rememberMe: true,
      };
    }
  } catch (error) {
    console.error("Ошибка при загрузке сохраненных данных:", error);
  }

  return initialValues;
};

export const saveCredentials = (values) => {
  if (values.rememberMe) {
    localStorage.setItem(
      "savedCredentials",
      JSON.stringify({
        username: values.username,
        password: values.password,
      })
    );
    localStorage.setItem("rememberMe", "true");
  } else {
    localStorage.removeItem("savedCredentials");
    localStorage.setItem("rememberMe", "false");
  }
};
