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
    const response = await api.post(API_URLS.login, credentials);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  },

  async logout() {
    await api.post(API_URLS.logout);
    localStorage.removeItem("token");
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
    return !!localStorage.getItem("token");
  },
};

export default authService;
