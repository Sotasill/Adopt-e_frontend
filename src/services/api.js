import axios from 'axios';

// Установите базовый URL
axios.defaults.baseURL = 'http://localhost:5000';

export const API_URLS = {
  login: '/api/auth/login',
  updateAvatar: '/api/user/avatar',
  // ... другие URL
};
