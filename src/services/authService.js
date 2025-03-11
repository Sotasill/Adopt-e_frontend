import axios from "axios";
import { processUserData } from "../utils/userUtils";

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
    username:
      "Имя пользователя должно начинаться с заглавной буквы и содержать от 3 до 30 символов (буквы, цифры, _ или -)",
    password:
      "Пароль должен содержать минимум 8 символов, включая хотя бы одну букву и одну цифру",
    email: "Неверный формат email",
    companyName: "Название компании должно начинаться с заглавной буквы",
    specialization: {
      breeder: "Выберите специализацию: dog или cat",
      specialist: "Выберите специализацию: veterinary, petshop или service",
    },
  },

  async registerUser(userData) {
    const response = await authApi.post("/auth/register/user", {
      ...userData,
      role: "user",
    });
    return response.data;
  },

  async registerBreeder(userData) {
    const response = await authApi.post("/auth/register/breeder", {
      ...userData,
      role: "breeder",
    });
    return response.data;
  },

  async registerSpecialist(userData) {
    const response = await authApi.post("/auth/register/specialist", {
      ...userData,
      role: "specialist",
    });
    return response.data;
  },

  async socialAuth(socialData) {
    const response = await authApi.post("/auth/social-auth", socialData);
    return response.data;
  },

  async login(credentials) {
    try {
      const response = await authApi.post("/auth/login", credentials);

      if (!response.data) {
        throw new Error("Пустой ответ от сервера");
      }

      const { user, tokens } = response.data;

      if (tokens) {
        localStorage.setItem("accessToken", tokens.accessToken);
        localStorage.setItem("refreshToken", tokens.refreshToken);
      }

      return { user: processUserData(user), tokens };
    } catch (error) {
      console.error("Ошибка при входе:", error);
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
