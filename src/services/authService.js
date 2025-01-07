import api, { API_URLS } from "./api";

export const authService = {
  async registerBreeder(userData) {
    const response = await api.post(API_URLS.registerBreeder, userData);
    return response.data;
  },

  async registerUser(userData) {
    const response = await api.post(API_URLS.registerUser, userData);
    return response.data;
  },

  async login(credentials) {
    try {
      const response = await api.post(API_URLS.login, credentials);

      if (!response.data) {
        throw new Error("Пустой ответ от сервера");
      }

      const responseData = response.data;
      let token, user;

      if (responseData.accessToken && responseData.user) {
        token = responseData.accessToken;
        user = responseData.user;
      } else if (responseData.token && responseData.user) {
        token = responseData.token;
        user = responseData.user;
      } else if (responseData.token || responseData.accessToken) {
        token = responseData.token || responseData.accessToken;
        user = {
          id: responseData.id || responseData._id,
          username: responseData.username,
          email: responseData.email,
          role: responseData.role || responseData.userType,
          userId: responseData.userId,
        };
      }

      if (user) {
        if (!user.role) {
          const possibleRole =
            user.userType ||
            user.type ||
            responseData.role ||
            responseData.userType;
          user.role = possibleRole || "user";
        }

        if (
          user.email?.includes("breeder") ||
          user.username?.toLowerCase().includes("breeder")
        ) {
          user.role = "breeder";
        }
      }

      // Сохраняем токен и данные пользователя
      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
      }

      return { token, user };
    } catch (error) {
      throw error;
    }
  },

  async logout() {
    try {
      await api.post(API_URLS.logout);
    } catch (error) {
      console.error("Ошибка при выходе:", error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  },

  async refreshToken() {
    const response = await api.post(API_URLS.refresh);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  },

  async updateProfileBackground(imageFile) {
    const formData = new FormData();
    formData.append("background", imageFile);

    const response = await api.post(
      API_URLS.updateProfileBackground,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  },

  async updateAvatar(avatarFile) {
    const formData = new FormData();
    formData.append("avatar", avatarFile);

    const response = await api.post(API_URLS.updateAvatar, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  isAuthenticated() {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    return !!(token && user);
  },

  getCurrentUser() {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  },

  getToken() {
    return localStorage.getItem("token");
  },
};

export default authService;
