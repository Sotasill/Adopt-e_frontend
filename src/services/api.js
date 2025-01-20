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
  refresh: "/auth/refresh",
  logout: "/auth/logout",
  updateAvatar: "/user/avatar",
  updateProfileBackground: "/user/profile/background",
};

// Проверка доступности сервера
export const checkServerAvailability = async () => {
  try {
    await api.get("/health");
    return true;
  } catch  {
    return false;
  }
};

// Интерцептор для добавления токена к запросам
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    // Публичные эндпоинты, не требующие авторизации
    const publicEndpoints = [
      API_URLS.login,
      API_URLS.registerBreeder,
      API_URLS.registerUser,
      API_URLS.refresh,
      "/health",
    ];

    // Добавляем Content-Type: application/json только если это не multipart/form-data
    if (!config.headers["Content-Type"] && !(config.data instanceof FormData)) {
      config.headers["Content-Type"] = "application/json";
    }

    if (token && user) {
      config.headers.Authorization = `Bearer ${token}`;
    } else if (!publicEndpoints.includes(config.url)) {
      // Если нет токена и пользователя, и это не публичный эндпоинт
      window.location.href = "/login";
      return Promise.reject("Не авторизован");
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
        const { dispatch } = store;
        const response = await dispatch(refreshToken());
        const { token } = response;

        if (!token) {
          throw new Error("Не удалось обновить токен");
        }

        // Обновляем заголовок авторизации для текущего запроса
        originalRequest.headers.Authorization = `Bearer ${token}`;

        isRefreshing = false;
        processQueue(null, token);

        // Повторяем оригинальный запрос с новым токеном
        return api(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        processQueue(refreshError, null);

        // Очищаем данные пользователя
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        store.dispatch(logout());

        // Перенаправляем на страницу входа
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
