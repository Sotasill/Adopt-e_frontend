import axios from "axios";
import { processUserData } from "../utils/userUtils";
import i18next from "i18next";

const BASE_URL = "http://localhost:3000/api";

const authApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

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
      return name && name[0] === name[0].toUpperCase();
    },

    specialization: {
      breeder: (spec) => ["dog", "cat"].includes(spec),
      specialist: (spec) => ["veterinary", "petshop", "service"].includes(spec),
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
    const response = await authApi.post("/auth/register/breeder", {
      ...userData,
      role: "breeder",
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

  async login(credentials) {
    try {
      const response = await authApi.post("/auth/login", credentials);

      if (!response.data) {
        throw new Error(i18next.t("auth.errors.invalidServerResponse"));
      }

      console.log("Ответ сервера при входе:", response.data);

      // Обрабатываем разные форматы ответа
      const user = response.data.user || response.data;
      const tokens = response.data.tokens || {
        accessToken: response.data.token || response.data.accessToken || "",
        refreshToken: response.data.refreshToken || "",
      };

      // Проверяем наличие минимально необходимых данных
      if (!user || (!tokens.accessToken && !response.data.token)) {
        console.error("Неполные данные от сервера:", {
          user,
          tokens,
          responseData: response.data,
        });
        throw new Error(i18next.t("auth.errors.invalidServerResponse"));
      }

      // Сохраняем токены
      if (tokens.accessToken) {
        localStorage.setItem("accessToken", tokens.accessToken);
      } else if (response.data.token) {
        localStorage.setItem("accessToken", response.data.token);
      }

      if (tokens.refreshToken) {
        localStorage.setItem("refreshToken", tokens.refreshToken);
      }

      // Сохраняем информацию о пользователе
      localStorage.setItem("user", JSON.stringify(user));

      return {
        user: processUserData(user),
        tokens: {
          accessToken: tokens.accessToken || response.data.token,
          refreshToken: tokens.refreshToken,
        },
      };
    } catch (error) {
      console.error("Ошибка в authService.login:", error);
      throw error;
    }
  },

  async logout() {
    try {
      await authApi.post("/auth/logout");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Ошибка при выходе:", error);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
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
};

export default authService;
