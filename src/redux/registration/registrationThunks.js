import { createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "../../services/authService";
import { checkServerAvailability } from "../../services/api";
import { DEFAULT_ROUTES_BY_ROLE } from "../../constants/routes";
import i18next from "i18next";

const validateRegistrationData = (data, role) => {
  const errors = [];

  // Базовая валидация
  if (!authService.validateFields.username(data.username)) {
    errors.push(authService.validationErrors.username);
  }

  if (!authService.validateFields.email(data.email)) {
    errors.push(authService.validationErrors.email);
  }

  if (!authService.validateFields.password(data.password)) {
    errors.push(authService.validationErrors.password);
  }

  if (!data.acceptTerms) {
    errors.push(i18next.t("registration.errors.acceptTerms"));
  }

  // Дополнительная валидация для заводчиков и специалистов
  if (role !== "user") {
    if (!authService.validateFields.companyName(data.companyName)) {
      errors.push(authService.validationErrors.companyName);
    }

    if (role === "breeder") {
      if (
        !authService.validateFields.specialization.breeder(data.specialization)
      ) {
        errors.push(authService.validationErrors.specialization.breeder);
      }
    } else if (role === "specialist") {
      if (
        !authService.validateFields.specialization.specialist(
          data.specialization
        )
      ) {
        errors.push(authService.validationErrors.specialization.specialist);
      }
    }

    if (!data.country || data.country[0] !== data.country[0].toUpperCase()) {
      errors.push(i18next.t("registration.errors.countryFirstLetter"));
    }

    if (data.city && data.city[0] !== data.city[0].toUpperCase()) {
      errors.push(i18next.t("registration.errors.cityFirstLetter"));
    }
  }

  return errors;
};

const handleSuccessfulRegistration = (response) => {
  if (!response || !response.user || !response.tokens) {
    throw new Error(i18next.t("auth.errors.invalidServerResponse"));
  }

  const { user, tokens } = response;

  // Сохраняем токены
  localStorage.setItem("accessToken", tokens.accessToken);
  localStorage.setItem("refreshToken", tokens.refreshToken);

  // Сохраняем базовую информацию о пользователе
  localStorage.setItem("user", JSON.stringify(user));

  // Перенаправляем на соответствующую страницу
  const redirectUrl =
    DEFAULT_ROUTES_BY_ROLE[user.role] || DEFAULT_ROUTES_BY_ROLE.user;
  window.location.href = redirectUrl;

  return response;
};

export const registerUser = createAsyncThunk(
  "registration/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const isServerAvailable = await checkServerAvailability();
      if (!isServerAvailable) {
        return rejectWithValue(i18next.t("auth.errors.serverUnavailable"));
      }

      const validationErrors = validateRegistrationData(userData, "user");
      if (validationErrors.length > 0) {
        return rejectWithValue(validationErrors.join(". "));
      }

      const response = await authService.registerUser(userData);

      // Проверяем наличие user в ответе
      if (!response || !response.user) {
        console.error("Неверный формат ответа сервера:", response);
        throw new Error(i18next.t("auth.errors.invalidServerResponse"));
      }

      // Сохраняем информацию о пользователе
      localStorage.setItem("user", JSON.stringify(response.user));

      // Если есть токены, сохраняем их
      if (response.tokens) {
        localStorage.setItem("accessToken", response.tokens.accessToken);
        if (response.tokens.refreshToken) {
          localStorage.setItem("refreshToken", response.tokens.refreshToken);
        }
      }

      return response;
    } catch (error) {
      console.error("Registration error details:", error);
      let errorMessage;

      if (error?.response?.status === 409) {
        const conflictData = error.response?.data;
        const errorText = (
          conflictData?.message ||
          error.message ||
          ""
        ).toLowerCase();

        if (
          errorText.includes("email already") ||
          errorText.includes("email уже") ||
          errorText.includes("email exists")
        ) {
          errorMessage = i18next.t("auth.errors.emailInUse");
        } else if (
          errorText.includes("username already") ||
          errorText.includes("имя пользователя уже") ||
          errorText.includes("username exists")
        ) {
          errorMessage = i18next.t("auth.errors.usernameInUse");
        } else {
          errorMessage = i18next.t("auth.errors.userExists");
        }
      } else if (error?.response?.data?.message) {
        const errorText = error.response.data.message.toLowerCase();

        if (errorText.includes("email")) {
          errorMessage = i18next.t("auth.errors.emailCheckError");
        } else if (
          errorText.includes("username") ||
          errorText.includes("имя пользователя")
        ) {
          errorMessage = i18next.t("auth.errors.usernameCheckError");
        } else {
          errorMessage = error.response.data.message;
        }
      } else if (error instanceof Error) {
        errorMessage = error.message;
      } else {
        errorMessage = i18next.t("auth.errors.registrationError");
      }

      return rejectWithValue(errorMessage);
    }
  }
);

export const registerBreeder = createAsyncThunk(
  "registration/registerBreeder",
  async (breederData, { rejectWithValue }) => {
    try {
      const isServerAvailable = await checkServerAvailability();
      if (!isServerAvailable) {
        return rejectWithValue(i18next.t("auth.errors.serverUnavailable"));
      }

      const validationErrors = validateRegistrationData(breederData, "breeder");
      if (validationErrors.length > 0) {
        return rejectWithValue(validationErrors.join(". "));
      }

      const response = await authService.registerBreeder(breederData);
      return handleSuccessfulRegistration(response);
    } catch (error) {
      let errorMessage;

      if (error.response?.data?.message) {
        const responseError = error.response.data.message;
        if (responseError.includes("Email already in use")) {
          errorMessage = i18next.t("auth.errors.emailInUse");
        } else if (responseError.includes("Username already exists")) {
          errorMessage = i18next.t("auth.errors.usernameInUse");
        } else {
          errorMessage = responseError;
        }
      } else if (error.message) {
        const errorText = error.message;
        if (errorText.includes("Email already in use")) {
          errorMessage = i18next.t("auth.errors.emailInUse");
        } else if (errorText.includes("Username already exists")) {
          errorMessage = i18next.t("auth.errors.usernameInUse");
        } else {
          errorMessage = errorText;
        }
      } else {
        errorMessage = i18next.t("auth.errors.breederRegistrationError");
      }

      return rejectWithValue(errorMessage);
    }
  }
);

export const registerSpecialist = createAsyncThunk(
  "registration/registerSpecialist",
  async (specialistData, { rejectWithValue }) => {
    try {
      const isServerAvailable = await checkServerAvailability();
      if (!isServerAvailable) {
        return rejectWithValue(i18next.t("auth.errors.serverUnavailable"));
      }

      const validationErrors = validateRegistrationData(
        specialistData,
        "specialist"
      );
      if (validationErrors.length > 0) {
        return rejectWithValue(validationErrors.join(". "));
      }

      const response = await authService.registerSpecialist(specialistData);
      return handleSuccessfulRegistration(response);
    } catch (error) {
      let errorMessage;

      if (error.response?.data?.message) {
        const responseError = error.response.data.message;
        if (responseError.includes("Email already in use")) {
          errorMessage = i18next.t("auth.errors.emailInUse");
        } else if (responseError.includes("Username already exists")) {
          errorMessage = i18next.t("auth.errors.usernameInUse");
        } else {
          errorMessage = responseError;
        }
      } else if (error.message) {
        const errorText = error.message;
        if (errorText.includes("Email already in use")) {
          errorMessage = i18next.t("auth.errors.emailInUse");
        } else if (errorText.includes("Username already exists")) {
          errorMessage = i18next.t("auth.errors.usernameInUse");
        } else {
          errorMessage = errorText;
        }
      } else {
        errorMessage = i18next.t("auth.errors.specialistRegistrationError");
      }

      return rejectWithValue(errorMessage);
    }
  }
);
