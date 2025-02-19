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
      const filteredUserData = {
        ...userData,
        role: "user",
      };

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

      console.log("Данные бридера перед отправкой:", breederDataWithRole);

      const response = await api.post(
        API_URLS.registerBreeder,
        breederDataWithRole
      );

      console.log("Ответ сервера при регистрации бридера:", response.data);

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

export const registerSpecialist = createAsyncThunk(
  "registration/registerSpecialist",
  async (specialistData, { rejectWithValue }) => {
    try {
      // Проверяем доступность сервера перед отправкой запроса
      const isServerAvailable = await checkServerAvailability();
      if (!isServerAvailable) {
        return rejectWithValue(
          "Сервер временно недоступен. Пожалуйста, попробуйте позже."
        );
      }

      // Добавляем роль для специалиста
      const specialistDataWithRole = {
        ...specialistData,
        role: "specialist",
      };

      console.log(
        "Данные специалиста перед отправкой:",
        specialistDataWithRole
      );

      const response = await api.post(
        API_URLS.registerSpecialist,
        specialistDataWithRole
      );

      console.log("Ответ сервера при регистрации специалиста:", response.data);

      return response.data;
    } catch (error) {
      console.error("Полная ошибка специалиста:", error);
      console.error("Данные ошибки специалиста:", error.response?.data);
      console.error("Статус ошибки специалиста:", error.response?.status);

      if (!error.response) {
        return rejectWithValue(
          "Ошибка подключения к серверу. Проверьте ваше интернет-соединение."
        );
      }
      return rejectWithValue(
        error.response?.data?.message ||
          "Произошла ошибка при регистрации специалиста"
      );
    }
  }
);
