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

      if (!authService.validateFields.country(data.country)) {
        errors.push(i18next.t("registration.errors.countryFirstLetter"));
      }

      if (data.city && !authService.validateFields.city(data.city)) {
        errors.push(i18next.t("registration.errors.cityFirstLetter"));
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
  const redirectUrl = DEFAULT_ROUTES_BY_ROLE[user.role] || "/mainbcs";
  window.location.replace(redirectUrl);

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
  async (breederData, { rejectWithValue, dispatch }) => {
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

      // Подробное логирование ответа сервера
      console.log("=== Ответ сервера при регистрации заводчика ===");
      console.log("Полный ответ:", response);
      console.log("Структура ответа:", {
        hasUser: !!response.user,
        hasTokens: !!response.tokens,
        hasToken: !!response.token,
        userData: response.user,
        tokensData: response.tokens,
        tokenData: response.token,
      });

      // Проверяем наличие минимально необходимых данных
      if (!response || !response.user) {
        console.error("Неполные данные от сервера:", response);
        throw new Error(i18next.t("auth.errors.invalidServerResponse"));
      }

      // Сохраняем информацию о пользователе
      const userData = {
        ...response.user,
        role: "breeder", // Явно указываем роль
      };
      localStorage.setItem("user", JSON.stringify(userData));

      // Если есть токены, сохраняем их
      if (response.tokens) {
        console.log("Сохранение токенов из response.tokens:", response.tokens);
        if (response.tokens.accessToken) {
          localStorage.setItem("accessToken", response.tokens.accessToken);
        }
        if (response.tokens.refreshToken) {
          localStorage.setItem("refreshToken", response.tokens.refreshToken);
        }
      } else if (response.token) {
        console.log("Сохранение токена из response.token:", response.token);
        localStorage.setItem("accessToken", response.token);
      }

      // Проверяем, что токены и данные пользователя сохранены
      const savedUser = localStorage.getItem("user");
      const savedToken = localStorage.getItem("accessToken");
      const savedRefreshToken = localStorage.getItem("refreshToken");

      console.log("=== Проверка сохраненных данных ===");
      console.log("Сохраненный пользователь:", savedUser);
      console.log("Сохраненный accessToken:", savedToken);
      console.log("Сохраненный refreshToken:", savedRefreshToken);

      // Обновляем состояние аутентификации
      const authPayload = {
        user: userData,
        tokens: response.tokens || { accessToken: response.token },
      };
      console.log(
        "Данные для обновления состояния аутентификации:",
        authPayload
      );

      dispatch({
        type: "auth/loginSuccess",
        payload: authPayload,
      });

      // Перенаправляем на страницу mainbcs
      window.location.replace("/mainbcs");

      return response;
    } catch (error) {
      console.error("=== Ошибка при регистрации заводчика ===");
      console.error("Полная ошибка:", error);
      console.error("Ответ сервера:", error.response?.data);
      console.error("Статус ошибки:", error.response?.status);

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
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      } else {
        errorMessage = i18next.t("auth.errors.breederRegistrationError");
      }

      return rejectWithValue(errorMessage);
    }
  }
);

export const registerSpecialist = createAsyncThunk(
  "registration/registerSpecialist",
  async (specialistData, { rejectWithValue, dispatch }) => {
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

      // Проверяем наличие минимально необходимых данных
      if (!response || !response.user) {
        console.error("Неполные данные от сервера:", response);
        throw new Error(i18next.t("auth.errors.invalidServerResponse"));
      }

      // Сохраняем информацию о пользователе
      const userData = {
        ...response.user,
        role: "specialist", // Явно указываем роль
      };
      localStorage.setItem("user", JSON.stringify(userData));

      // Сохраняем токены
      if (response.tokens) {
        localStorage.setItem("accessToken", response.tokens.accessToken);
        if (response.tokens.refreshToken) {
          localStorage.setItem("refreshToken", response.tokens.refreshToken);
        }
      }

      // Обновляем состояние аутентификации
      dispatch({
        type: "auth/loginSuccess",
        payload: {
          user: userData,
          tokens: response.tokens,
        },
      });

      // Перенаправляем на страницу специалиста
      window.location.replace("/mainspecialist");

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
        } else if (errorText.includes("company name")) {
          errorMessage = i18next.t("registration.errors.companyName");
        } else if (errorText.includes("specialization")) {
          errorMessage = i18next.t(
            "registration.errors.specialization.specialist"
          );
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
