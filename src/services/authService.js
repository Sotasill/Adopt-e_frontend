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
        // Определяем роль пользователя
        if (!user.role) {
          const possibleRole =
            user.userType ||
            user.type ||
            responseData.role ||
            responseData.userType;
          user.role = possibleRole || "user";
        }

        // Проверяем, является ли пользователь заводчиком
        const isBreeder =
          user.role === "breeder" ||
          user.email?.includes("breeder") ||
          user.username?.toLowerCase().includes("breeder");

        if (isBreeder) {
          user.role = "breeder";

          // Определяем специализацию заводчика
          let specialization =
            responseData.specialization ||
            responseData.user?.specialization ||
            user.specialization;

          // Если специализация не определена, пытаемся определить её по email или username
          if (!specialization) {
            const userIdentifier = (
              user.email ||
              user.username ||
              ""
            ).toLowerCase();
            if (userIdentifier.includes("dog")) {
              specialization = "dog";
            } else if (userIdentifier.includes("cat")) {
              specialization = "cat";
            }

            console.log("Определение специализации по email/username:", {
              email: user.email,
              username: user.username,
              identifier: userIdentifier,
              determinedSpecialization: specialization,
            });
          }

          user.specialization = specialization;

          console.log("Данные заводчика после обработки:", {
            username: user.username,
            email: user.email,
            role: user.role,
            specialization: user.specialization,
            fromResponse: responseData.specialization,
            fromUserInResponse: responseData.user?.specialization,
          });
        }
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
    } catch (error) {
      console.error("Ошибка при выходе:", error);
    }
  },

  async refreshToken() {
    const response = await api.post(API_URLS.refresh);
    return response.data;
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
