import { createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "../../services/authService";
import { checkServerAvailability } from "../../services/api";

const validateRegistrationData = (data, role) => {
  const errors = [];

  // Базовая валидация
  if (!authService.validateFields.username(data.username)) {
    errors.push(
      "Имя пользователя должно начинаться с заглавной буквы и может содержать только буквы, цифры, подчеркивание и тире"
    );
  }

  if (!authService.validateFields.email(data.email)) {
    errors.push("Неверный формат email");
  }

  if (!authService.validateFields.password(data.password)) {
    errors.push(
      "Пароль должен содержать минимум 8 символов, включая хотя бы одну букву и одну цифру"
    );
  }

  if (!data.acceptTerms) {
    errors.push("Необходимо принять условия использования");
  }

  // Дополнительная валидация для заводчиков и специалистов
  if (role !== "user") {
    if (!authService.validateFields.companyName(data.companyName)) {
      errors.push("Название компании должно начинаться с заглавной буквы");
    }

    if (role === "breeder") {
      if (
        !authService.validateFields.specialization.breeder(data.specialization)
      ) {
        errors.push("Выберите специализацию: dog или cat");
      }
    } else if (role === "specialist") {
      if (
        !authService.validateFields.specialization.specialist(
          data.specialization
        )
      ) {
        errors.push("Выберите специализацию: veterinary, petshop или service");
      }
    }

    if (!data.country || data.country[0] !== data.country[0].toUpperCase()) {
      errors.push("Название страны должно начинаться с заглавной буквы");
    }

    if (data.city && data.city[0] !== data.city[0].toUpperCase()) {
      errors.push("Название города должно начинаться с заглавной буквы");
    }
  }

  return errors;
};

export const registerUser = createAsyncThunk(
  "registration/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const isServerAvailable = await checkServerAvailability();
      if (!isServerAvailable) {
        return rejectWithValue(
          "Сервер временно недоступен. Пожалуйста, попробуйте позже."
        );
      }

      const validationErrors = validateRegistrationData(userData, "user");
      if (validationErrors.length > 0) {
        return rejectWithValue(validationErrors.join(". "));
      }

      const response = await authService.registerUser(userData);
      return response;
    } catch (error) {
      console.error("Ошибка при регистрации пользователя:", error);
      return rejectWithValue(
        error.message || "Произошла ошибка при регистрации"
      );
    }
  }
);

export const registerBreeder = createAsyncThunk(
  "registration/registerBreeder",
  async (breederData, { rejectWithValue }) => {
    try {
      const isServerAvailable = await checkServerAvailability();
      if (!isServerAvailable) {
        return rejectWithValue(
          "Сервер временно недоступен. Пожалуйста, попробуйте позже."
        );
      }

      const validationErrors = validateRegistrationData(breederData, "breeder");
      if (validationErrors.length > 0) {
        return rejectWithValue(validationErrors.join(". "));
      }

      const response = await authService.registerBreeder(breederData);
      return response;
    } catch (error) {
      console.error("Ошибка при регистрации заводчика:", error);
      return rejectWithValue(
        error.message || "Произошла ошибка при регистрации заводчика"
      );
    }
  }
);

export const registerSpecialist = createAsyncThunk(
  "registration/registerSpecialist",
  async (specialistData, { rejectWithValue }) => {
    try {
      const isServerAvailable = await checkServerAvailability();
      if (!isServerAvailable) {
        return rejectWithValue(
          "Сервер временно недоступен. Пожалуйста, попробуйте позже."
        );
      }

      const validationErrors = validateRegistrationData(
        specialistData,
        "specialist"
      );
      if (validationErrors.length > 0) {
        return rejectWithValue(validationErrors.join(". "));
      }

      const response = await authService.registerSpecialist(specialistData);
      return response;
    } catch (error) {
      console.error("Ошибка при регистрации специалиста:", error);
      return rejectWithValue(
        error.message || "Произошла ошибка при регистрации специалиста"
      );
    }
  }
);
