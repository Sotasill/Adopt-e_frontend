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
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      // Проверяем, не истек ли токен
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        if (payload.exp * 1000 < Date.now()) {
          // Токен истек, очищаем данные и перенаправляем на страницу входа
          localStorage.clear();
          sessionStorage.clear();
          window.location.href = "/login";
          return Promise.reject("Токен истек");
        }
      } catch (error) {
        console.error("Ошибка при проверке токена:", error);
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = "/login";
        return Promise.reject("Неверный формат токена");
      }
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Добавляем перехватчик для обработки ошибок авторизации
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
        console.error("Ошибка при обновлении токена:", refreshError);
        logout();
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
      console.log("Отправка данных на регистрацию:", userData);
      const response = await authApi.post("/auth/register/user", {
        ...userData,
        role: "user",
      });

      console.log("Ответ сервера:", response.data);

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
      console.error("Ошибка при регистрации:", error);
      throw error;
    }
  },

  async registerBreeder(userData) {
    try {
      console.log("=== Отправка данных на регистрацию заводчика ===");
      console.log("Данные для отправки:", userData);

      const response = await authApi.post("/auth/register/breeder", {
        ...userData,
        role: "breeder",
      });

      console.log("=== Ответ сервера при регистрации заводчика ===");
      console.log("Полный ответ:", response.data);

      // Если сервер вернул только user без tokens, создаем структуру самостоятельно
      const user = response.data.user || response.data;
      const tokens = response.data.tokens || {
        accessToken: response.data.token || "",
        refreshToken: response.data.refreshToken || "",
      };

      console.log("=== Обработанные данные ===");
      console.log("Данные пользователя:", user);
      console.log("Токены:", tokens);

      // Проверяем наличие хотя бы user
      if (!user) {
        throw new Error(i18next.t("auth.errors.invalidServerResponse"));
      }

      // Убеждаемся, что у пользователя есть роль
      if (!user.role) {
        user.role = "breeder";
      }

      // Сохраняем токены, если они есть
      if (tokens.accessToken) {
        console.log("Сохранение accessToken:", tokens.accessToken);
        localStorage.setItem("accessToken", tokens.accessToken);
      }
      if (tokens.refreshToken) {
        console.log("Сохранение refreshToken:", tokens.refreshToken);
        localStorage.setItem("refreshToken", tokens.refreshToken);
      }

      // Сохраняем информацию о пользователе
      console.log("Сохранение данных пользователя:", user);
      localStorage.setItem("user", JSON.stringify(user));

      // Проверяем сохраненные данные
      console.log("=== Проверка сохраненных данных в authService ===");
      console.log("Сохраненный пользователь:", localStorage.getItem("user"));
      console.log(
        "Сохраненный accessToken:",
        localStorage.getItem("accessToken")
      );
      console.log(
        "Сохраненный refreshToken:",
        localStorage.getItem("refreshToken")
      );

      return {
        user: processUserData(user),
        tokens,
      };
    } catch (error) {
      console.error("=== Ошибка при регистрации заводчика в authService ===");
      console.error("Полная ошибка:", error);
      console.error("Ответ сервера:", error.response?.data);
      console.error("Статус ошибки:", error.response?.status);
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
      console.log("Отправка запроса на вход");
      const response = await authApi.post("/auth/login", { email, password });
      console.log("Ответ сервера:", response.data);

      const { accessToken, refreshToken, user } = response.data;
      console.log("Полученные данные:", { accessToken, refreshToken, user });

      // Проверяем наличие всех необходимых данных
      if (!accessToken || !refreshToken || !user) {
        throw new Error("Неполные данные в ответе сервера");
      }

      // Сохраняем токены
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      // Обрабатываем данные пользователя
      const processedUser = processUserData(user);
      console.log("Обработанные данные пользователя:", processedUser);
      localStorage.setItem("user", JSON.stringify(processedUser));

      // Устанавливаем заголовок авторизации
      authApi.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${accessToken}`;

      return processedUser;
    } catch (error) {
      console.error("Ошибка при входе:", error);
      throw error;
    }
  },

  logout() {
    console.log("=== Начало процесса выхода ===");

    // Сначала отправляем запрос на сервер для выхода
    const sendLogoutRequest = async () => {
      try {
        console.log("Отправка запроса на сервер для выхода");
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
          console.log("Токен отсутствует, пропускаем запрос на сервер");
          return;
        }

        const response = await authApi.post("/auth/logout", null, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });

        console.log("Ответ сервера:", response.status);

        if (response.status === 204) {
          console.log("Сервер успешно обработал запрос на выход");
        } else {
          console.log("Неожиданный статус ответа:", response.status);
        }
      } catch (error) {
        console.error("Ошибка при отправке запроса на выход:", error);
        // Продолжаем процесс выхода даже при ошибке сервера
      }
    };

    // Выполняем запрос на сервер
    sendLogoutRequest();

    // Очищаем все данные из localStorage
    console.log("Очистка localStorage...");
    const localStorageItems = Object.keys(localStorage);
    console.log("Текущие элементы в localStorage:", localStorageItems);
    localStorage.clear();
    console.log("localStorage очищен");

    // Очищаем все данные из sessionStorage
    console.log("Очистка sessionStorage...");
    const sessionStorageItems = Object.keys(sessionStorage);
    console.log("Текущие элементы в sessionStorage:", sessionStorageItems);
    sessionStorage.clear();
    console.log("sessionStorage очищен");

    // Удаляем все куки
    console.log("Удаление куки...");
    const cookies = document.cookie.split(";");
    console.log("Текущие куки:", cookies);
    cookies.forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    console.log("Куки удалены");

    // Удаляем заголовок авторизации
    console.log("Удаление заголовка авторизации...");
    console.log("Текущие заголовки:", authApi.defaults.headers.common);
    delete authApi.defaults.headers.common["Authorization"];
    console.log("Заголовок авторизации удален");

    // Принудительно очищаем кэш браузера
    console.log("Очистка кэша браузера...");
    if (window.caches) {
      caches.keys().then((names) => {
        console.log("Текущие кэши:", names);
        names.forEach((name) => {
          caches.delete(name);
        });
      });
    }
    console.log("Кэш браузера очищен");

    // Проверяем, что все данные действительно удалены
    console.log("=== Проверка после очистки ===");
    console.log("localStorage пуст:", Object.keys(localStorage).length === 0);
    console.log(
      "sessionStorage пуст:",
      Object.keys(sessionStorage).length === 0
    );
    console.log("Куки пусты:", document.cookie === "");
    console.log(
      "Заголовок авторизации удален:",
      !authApi.defaults.headers.common["Authorization"]
    );

    // Перенаправляем на главную страницу
    console.log("Перенаправление на главную страницу...");
    window.location.replace("/");
    console.log("=== Процесс выхода завершен ===");
  },

  // Добавляем функцию проверки авторизации
  isAuthenticated() {
    console.log("=== Проверка авторизации ===");
    const accessToken = localStorage.getItem("accessToken");
    const user = localStorage.getItem("user");

    console.log("Наличие токена:", !!accessToken);
    console.log("Наличие данных пользователя:", !!user);

    if (!accessToken || !user) {
      console.log(
        "Пользователь не авторизован: отсутствует токен или данные пользователя"
      );
      return false;
    }

    try {
      // Проверяем срок действия токена
      const decodedToken = jwtDecode(accessToken);
      const currentTime = Date.now() / 1000;

      console.log("Проверка токена:", {
        exp: decodedToken.exp,
        currentTime,
        timeLeft: decodedToken.exp - currentTime,
      });

      if (decodedToken.exp && decodedToken.exp < currentTime) {
        console.log("Токен истек");
        this.logout();
        return false;
      }

      const userData = JSON.parse(user);
      console.log("Данные пользователя:", userData);

      if (!userData || !userData.role) {
        console.log(
          "Пользователь не авторизован: некорректные данные пользователя"
        );
        return false;
      }
      console.log("Пользователь авторизован:", userData);
      return true;
    } catch (error) {
      console.error("Ошибка при проверке авторизации:", error);
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
      console.error("Ошибка при получении данных пользователя:", error);
      return null;
    }
  },
};

export default authService;
