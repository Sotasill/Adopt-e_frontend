import axios from "axios";
import store from "../redux/store";
import { refreshToken, logout } from "../redux/auth/authActions";

// Создаем экземпляр axios с базовой конфигурацией
const api = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 5000, // Таймаут в 5 секунд
});

// Эндпоинты API
export const API_URLS = {
  login: "/auth/login",
  registerBreeder: "/auth/register/breeder",
  registerUser: "/auth/register/user",
  registerSpecialist: "/auth/register/specialist",
  socialAuth: "/auth/social-auth",
  refresh: "/auth/refresh",
  logout: "/auth/logout",
  updateAvatar: "/auth/update-avatar",
  updateProfileBackground: "/auth/update-profile-background",
  registerAnimal: "/animals",
};

// Проверка доступности сервера
export const checkServerAvailability = async () => {
  try {
    await api.get("/health");
    return true;
  } catch {
    return false;
  }
};

// Интерцептор для добавления токена к запросам
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");

    const publicEndpoints = [
      API_URLS.login,
      API_URLS.registerBreeder,
      API_URLS.registerUser,
      API_URLS.registerSpecialist,
      API_URLS.socialAuth,
      API_URLS.refresh,
      "/health",
    ];

    // Добавляем Content-Type: application/json только если это не multipart/form-data
    if (!config.headers["Content-Type"] && !(config.data instanceof FormData)) {
      config.headers["Content-Type"] = "application/json";
    }

    if (accessToken && !publicEndpoints.includes(config.url)) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Интерцептор для обработки ответов
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (!error.response) {
      throw new Error(
        "Сервер недоступен. Пожалуйста, проверьте подключение к интернету или попробуйте позже."
      );
    }

    const originalRequest = error.config;

    // Проверяем, является ли ошибка связанной с авторизацией
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== API_URLS.refresh &&
      originalRequest.url !== API_URLS.login
    ) {
      if (isRefreshing) {
        try {
          const token = await new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          });
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        } catch (err) {
          return Promise.reject(err);
        }
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshTokenValue = localStorage.getItem("refreshToken");
        if (!refreshTokenValue) {
          throw new Error("Отсутствует refresh token");
        }

        const { dispatch } = store;
        const response = await dispatch(refreshToken());
        const { tokens } = response.payload;

        if (!tokens?.accessToken) {
          throw new Error("Не удалось обновить токен");
        }

        localStorage.setItem("accessToken", tokens.accessToken);
        localStorage.setItem("refreshToken", tokens.refreshToken);

        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${tokens.accessToken}`;
        originalRequest.headers.Authorization = `Bearer ${tokens.accessToken}`;

        isRefreshing = false;
        processQueue(null, tokens.accessToken);

        return api(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        processQueue(refreshError, null);

        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");

        store.dispatch(logout());
        window.location.href = "/login";

        return Promise.reject(refreshError);
      }
    }

    // Обработка других ошибок
    let errorMessage = error.response?.data?.message || error.message;

    switch (error.response?.status) {
      case 400:
        errorMessage = error.response.data.message || "Неверный запрос";
        break;
      case 409:
        errorMessage = error.response.data.message || "Конфликт данных";
        break;
      case 404:
        errorMessage = "Ресурс не найден";
        break;
      case 500:
        errorMessage = "Внутренняя ошибка сервера";
        break;
      default:
        if (!error.response) {
          errorMessage = "Ошибка подключения к серверу";
        }
    }

    return Promise.reject({
      ...error,
      message: errorMessage,
    });
  }
);

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

export default api;
