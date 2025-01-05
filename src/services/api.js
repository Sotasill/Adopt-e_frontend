import axios from "axios";
import store from "../redux/store";
import { refreshToken, logout } from "../redux/auth/authActions";

// Создаем экземпляр axios с базовой конфигурацией
const api = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
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
    await api.get("/health"); // Предполагаем, что есть эндпоинт для проверки здоровья сервера
    return true;
  } catch (error) {
    console.error("Сервер недоступен:", error.message);
    return false;
  }
};

// Интерцептор для добавления токена к запросам
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
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
    // Если нет ответа от сервера вообще
    if (!error.response) {
      throw new Error(
        "Сервер недоступен. Пожалуйста, проверьте подключение к интернету или попробуйте позже."
      );
    }

    const originalRequest = error.config;

    // Если ошибка 401 и это не запрос на обновление токена
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

        isRefreshing = false;
        processQueue(null, token);

        return api(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        processQueue(refreshError, null);

        store.dispatch(logout());
        localStorage.removeItem("token");
        window.location.href = "/login";

        return Promise.reject(refreshError);
      }
    }

    // Обработка других ошибок
    let errorMessage = error.response?.data?.message || error.message;

    // Специфичные сообщения об ошибках
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
