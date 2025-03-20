import axios from "axios";
import { processUserData } from "../utils/userUtils";
import i18next from "i18next";
import { jwtDecode } from "jwt-decode";

const BASE_URL = "http://localhost:3000/api";

const authApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Добавляем перехватчик для автоматического добавления токена
authApi.interceptors.request.use(
  async (config) => {
    // Пропускаем проверку токена для путей регистрации и входа
    if (
      config.url?.includes("/auth/register") ||
      config.url?.includes("/auth/login")
    ) {
      return config;
    }

    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Изменяем перехватчик ответов
authApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Если ошибка 401 и это не повторный запрос
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          throw new Error("Нет refresh token");
        }

        const response = await authApi.post("/auth/refresh", {
          refreshToken,
        });

        const { accessToken } = response.data;
        localStorage.setItem("accessToken", accessToken);
        authApi.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;

        return authApi(originalRequest);
      } catch (refreshError) {
        // Только очищаем токены и возвращаем ошибку
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export const authService = {
  // Валидация полей
  validateFields: {
    username: (username) => {
      const regex = /^[A-Z][a-zA-Z0-9_-]{2,29}$/;
      return regex.test(username);
    },

    password: (password) => {
      const hasLetter = /[a-zA-Z]/.test(password);
      const hasNumber = /\d/.test(password);
      return password.length >= 8 && hasLetter && hasNumber;
    },

    email: (email) => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    },

    companyName: (name) => {
      if (!name) return false;
      if (name[0] !== name[0].toUpperCase()) return false;
      // Проверка на нецензурную лексику (можно добавить список запрещенных слов)
      const forbiddenWords = ["bad", "word"]; // Замените на реальный список
      return !forbiddenWords.some((word) => name.toLowerCase().includes(word));
    },

    specialization: {
      breeder: (spec) => ["dog", "cat"].includes(spec),
      specialist: (spec) => ["veterinary", "petshop", "service"].includes(spec),
    },

    country: (country) => {
      return country && country[0] === country[0].toUpperCase();
    },

    city: (city) => {
      if (!city) return true; // Город опциональный
      return city[0] === city[0].toUpperCase();
    },
  },

  // Описания ошибок валидации
  validationErrors: {
    username: i18next.t("registration.errors.username"),
    password: i18next.t("registration.errors.password"),
    email: i18next.t("registration.errors.email"),
    companyName: i18next.t("registration.errors.companyName"),
    specialization: {
      breeder: i18next.t("registration.errors.specialization.breeder"),
      specialist: i18next.t("registration.errors.specialization.specialist"),
    },
  },

  async registerUser(userData) {
    try {
      const response = await authApi.post("/auth/register/user", {
        ...userData,
        role: "user",
      });

      // Если сервер вернул только user без tokens, создаем структуру самостоятельно
      const user = response.data.user || response.data;
      const tokens = response.data.tokens || {
        accessToken: response.data.token || "",
        refreshToken: response.data.refreshToken || "",
      };

      // Проверяем наличие хотя бы user
      if (!user) {
        throw new Error(i18next.t("auth.errors.invalidServerResponse"));
      }

      // Сохраняем токены, если они есть
      if (tokens.accessToken) {
        localStorage.setItem("accessToken", tokens.accessToken);
      }
      if (tokens.refreshToken) {
        localStorage.setItem("refreshToken", tokens.refreshToken);
      }

      // Сохраняем информацию о пользователе
      localStorage.setItem("user", JSON.stringify(user));

      return {
        user: processUserData(user),
        tokens,
      };
    } catch (error) {
      throw error;
    }
  },

  async registerBreeder(userData) {
    try {
      const response = await authApi.post("/auth/register/breeder", {
        ...userData,
        role: "breeder",
      });

      // Если сервер вернул только user без tokens, создаем структуру самостоятельно
      const user = response.data.user || response.data;
      const tokens = response.data.tokens || {
        accessToken: response.data.token || "",
        refreshToken: response.data.refreshToken || "",
      };

      // Проверяем наличие хотя бы user
      if (!user) {
        throw new Error(i18next.t("auth.errors.invalidServerResponse"));
      }

      // Сохраняем токены, если они есть
      if (tokens.accessToken) {
        localStorage.setItem("accessToken", tokens.accessToken);
      }
      if (tokens.refreshToken) {
        localStorage.setItem("refreshToken", tokens.refreshToken);
      }

      // Сохраняем информацию о пользователе
      localStorage.setItem("user", JSON.stringify(user));

      return {
        user: processUserData(user),
        tokens,
      };
    } catch (error) {
      throw error;
    }
  },

  async registerSpecialist(userData) {
    const response = await authApi.post("/auth/register/specialist", {
      ...userData,
      role: "specialist",
    });

    if (!response.data) {
      throw new Error(i18next.t("auth.errors.invalidServerResponse"));
    }

    const { user, tokens } = response.data;

    if (tokens) {
      localStorage.setItem("accessToken", tokens.accessToken);
      localStorage.setItem("refreshToken", tokens.refreshToken);
    }

    return { user: processUserData(user), tokens };
  },

  async socialAuth(socialData) {
    const response = await authApi.post("/auth/social-auth", socialData);
    return response.data;
  },

  async login(email, password) {
    try {
      const response = await authApi.post("/auth/login", { email, password });

      const { accessToken, refreshToken, user } = response.data;

      // Проверяем наличие всех необходимых данных
      if (!accessToken || !refreshToken || !user) {
        throw new Error("Неполные данные в ответе сервера");
      }

      // Сохраняем токены
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      // Обрабатываем данные пользователя
      const processedUser = processUserData(user);
      localStorage.setItem("user", JSON.stringify(processedUser));

      // Устанавливаем заголовок авторизации
      authApi.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${accessToken}`;

      return processedUser;
    } catch (error) {
      throw error;
    }
  },

  logout() {
    // Сначала отправляем запрос на сервер для выхода
    const sendLogoutRequest = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
          return;
        }

        await authApi.post("/auth/logout", null, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });
      } catch (error) {
        // Продолжаем процесс выхода даже при ошибке сервера
      }
    };

    // Выполняем запрос на сервер
    sendLogoutRequest();

    // Очищаем все данные из localStorage
    localStorage.clear();

    // Очищаем все данные из sessionStorage
    sessionStorage.clear();

    // Перенаправляем на главную страницу
    window.location.replace("/");
  },

  // Добавляем функцию проверки авторизации
  isAuthenticated() {
    const accessToken = localStorage.getItem("accessToken");
    const user = localStorage.getItem("user");

    if (!accessToken || !user) {
      return false;
    }

    try {
      // Проверяем срок действия токена
      const decodedToken = jwtDecode(accessToken);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp && decodedToken.exp < currentTime) {
        this.logout();
        return false;
      }

      const userData = JSON.parse(user);

      if (!userData || !userData.role) {
        return false;
      }
      return true;
    } catch (error) {
      this.logout();
      return false;
    }
  },

  async refreshToken() {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      throw new Error("Отсутствует refresh token");
    }

    const response = await authApi.post("/auth/refresh", { refreshToken });
    const { user, tokens } = response.data;

    if (tokens) {
      localStorage.setItem("accessToken", tokens.accessToken);
      localStorage.setItem("refreshToken", tokens.refreshToken);
    }

    return { user: processUserData(user), tokens };
  },

  async updateProfileBackground(imageFile) {
    const formData = new FormData();
    formData.append("background", imageFile);

    const response = await authApi.post(
      "/auth/update-profile-background",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  },

  async updateAvatar(avatarFile) {
    const formData = new FormData();
    formData.append("avatar", avatarFile);

    const response = await authApi.post("/auth/update-avatar", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  async checkEmail(email) {
    try {
      const response = await authApi.post("/auth/check-email", { email });
      return response.data;
    } catch (error) {
      // Если сервер вернул 409, значит email занят
      if (error.response?.status === 409) {
        return { available: false };
      }
      // В случае других ошибок считаем email доступным
      return { available: true };
    }
  },

  getCurrentUser() {
    const user = localStorage.getItem("user");
    if (!user) {
      return null;
    }
    try {
      return JSON.parse(user);
    } catch (error) {
      return null;
    }
  },
};

export default authService;
