import api, { API_URLS } from "./api";
import { processUserData } from "../utils/userUtils";

export const authService = {
  async registerBreeder(userData) {
    // Убеждаемся, что регистрируем именно заводчика
    const breederData = {
      ...userData,
      role: "breeder",
    };
    const response = await api.post(API_URLS.registerBreeder, breederData);
    return response.data;
  },

  async registerUser(userData) {
    // Убеждаемся, что регистрируем обычного пользователя
    const userWithRole = {
      ...userData,
      role: "user",
    };
    const response = await api.post(API_URLS.registerUser, userWithRole);
    return response.data;
  },

  async login(credentials) {
    try {
      const response = await api.post(API_URLS.login, credentials);

      if (!response.data) {
        throw new Error("Пустой ответ от сервера");
      }

      const responseData = response.data;
      const token = responseData.accessToken || responseData.token;

      // Собираем все данные пользователя
      const rawUser = responseData.user || {
        id: responseData.id || responseData._id,
        username: responseData.username,
        email: responseData.email,
        role: responseData.role || responseData.userType,
        userId: responseData.userId,
        specialization: responseData.specialization,
      };

      // Обрабатываем данные пользователя
      const user = processUserData(rawUser);

      // Проверяем корректность роли
      if (user.role === "breeder" && !user.specialization) {
        console.error("Заводчик без специализации:", user);
      }

      return { token, user };
    } catch (error) {
      console.error("Ошибка при входе:", error);
      throw error;
    }
  },

  async logout() {
    try {
      await api.post(API_URLS.logout);
      // Очищаем локальное хранилище
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Ошибка при выходе:", error);
      // В любом случае очищаем хранилище
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  },

  async refreshToken() {
    const response = await api.post(API_URLS.refresh);
    const data = response.data;

    if (data.user) {
      // Обрабатываем данные пользователя при обновлении токена
      data.user = processUserData(data.user);
    }

    return data;
  },

  async updateProfileBackground(imageFile) {
    const formData = new FormData();
    formData.append("background", imageFile);

    const response = await api.post(
      API_URLS.updateProfileBackground,
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

    const response = await api.post(API_URLS.updateAvatar, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },
};

export default authService;
