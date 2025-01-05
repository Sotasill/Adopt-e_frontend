import { createAsyncThunk } from "@reduxjs/toolkit";
import api, { API_URLS, checkServerAvailability } from "../../services/api";

export const registerUser = createAsyncThunk(
  "registration/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      // Проверяем доступность сервера перед отправкой запроса
      const isServerAvailable = await checkServerAvailability();
      if (!isServerAvailable) {
        return rejectWithValue(
          "Сервер временно недоступен. Пожалуйста, попробуйте позже."
        );
      }

      // Фильтруем данные и добавляем роль для обычного пользователя
      const { username, email, password } = userData;
      const filteredUserData = {
        username,
        email,
        password,
        role: "user",
      };

      console.log("Тип роли:", typeof filteredUserData.role);
      console.log("Значение роли:", filteredUserData.role);
      console.log(
        "Все данные для регистрации:",
        JSON.stringify(filteredUserData, null, 2)
      );

      const response = await api.post(API_URLS.registerUser, filteredUserData);
      return response.data;
    } catch (error) {
      console.error("Полная ошибка:", error);
      console.error("Данные ошибки:", error.response?.data);
      console.error("Статус ошибки:", error.response?.status);

      if (!error.response) {
        return rejectWithValue(
          "Ошибка подключения к серверу. Проверьте ваше интернет-соединение."
        );
      }
      return rejectWithValue(
        error.response?.data?.message || "Произошла ошибка при регистрации"
      );
    }
  }
);

export const registerBreeder = createAsyncThunk(
  "registration/registerBreeder",
  async (breederData, { rejectWithValue }) => {
    try {
      // Проверяем доступность сервера перед отправкой запроса
      const isServerAvailable = await checkServerAvailability();
      if (!isServerAvailable) {
        return rejectWithValue(
          "Сервер временно недоступен. Пожалуйста, попробуйте позже."
        );
      }

      // Добавляем роль для заводчика
      const breederDataWithRole = {
        ...breederData,
        role: "breeder",
      };

      console.log("Тип роли заводчика:", typeof breederDataWithRole.role);
      console.log("Значение роли заводчика:", breederDataWithRole.role);
      console.log(
        "Все данные для регистрации заводчика:",
        JSON.stringify(breederDataWithRole, null, 2)
      );

      const response = await api.post(
        API_URLS.registerBreeder,
        breederDataWithRole
      );
      return response.data;
    } catch (error) {
      console.error("Полная ошибка заводчика:", error);
      console.error("Данные ошибки заводчика:", error.response?.data);
      console.error("Статус ошибки заводчика:", error.response?.status);

      if (!error.response) {
        return rejectWithValue(
          "Ошибка подключения к серверу. Проверьте ваше интернет-соединение."
        );
      }
      return rejectWithValue(
        error.response?.data?.message ||
          "Произошла ошибка при регистрации заводчика"
      );
    }
  }
);
