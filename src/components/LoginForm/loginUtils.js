import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Minimum 3 characters")
    .max(50, "Maximum 50 characters")
    .required("Required field"),
  password: Yup.string()
    .min(6, "Minimum 6 characters")
    .required("Required field"),
  rememberMe: Yup.boolean(),
});

export const getErrorMessage = (error) => {
  if (!error) return "Unexpected error";

  const errorLower = error.toLowerCase();

  if (errorLower.includes("401") || errorLower.includes("unauthorized")) {
    return "Invalid username or password";
  }

  if (errorLower.includes("404") || errorLower.includes("not found")) {
    return "User not found";
  }

  if (
    errorLower.includes("network") ||
    errorLower.includes("failed to fetch")
  ) {
    return "Connection error. Check your internet connection";
  }

  if (errorLower.includes("timeout")) {
    return "Timeout error. Please try again later";
  }

  return "An error occurred during login. Please try again later";
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
    console.error("Error loading saved data:", error);
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
