import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  UPDATE_AVATAR_SUCCESS,
  UPDATE_AVATAR_FAIL
} from "./authConstant";
import { API_URLS } from '../../services/api';
import { uploadProfileBackground } from '../services/uploadService';
import axios from 'axios';

export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUEST });

    const response = await fetch(`${API_URLS.AUTH}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Ошибка регистрации');
    }

    localStorage.setItem('token', data.token);
    
    dispatch({
      type: REGISTER_SUCCESS,
      payload: data.user
    });

    return Promise.resolve();
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: error.message
    });
    return Promise.reject(error);
  }
};

export const login = (userData) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    
    console.log('Попытка входа:', {
      url: API_URLS.login,
      baseURL: axios.defaults.baseURL,
      userData
    });

    const response = await axios.post(API_URLS.login, userData);
    
    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    console.error('Подробности ошибки:', {
      message: error.message,
      code: error.code,
      config: {
        url: error.config?.url,
        baseURL: error.config?.baseURL,
        method: error.config?.method
      }
    });

    dispatch({
      type: LOGIN_FAIL,
      payload: 'Ошибка при входе'
    });
    throw error;
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('token');
  dispatch({ type: LOGOUT });
};

export const checkAuth = () => async (dispatch) => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const response = await fetch(`${API_URLS.AUTH}/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const userData = await response.json();
        dispatch({
          type: LOGIN_SUCCESS,
          payload: userData
        });
      } else {
        localStorage.removeItem('token');
      }
    } catch {
      localStorage.removeItem('token');
    }
  }
};

export const updateAvatar = (avatarData) => async (dispatch) => {
  try {
    const response = await axios.post(API_URLS.updateAvatar, avatarData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    if (response.data) {
      dispatch({
        type: UPDATE_AVATAR_SUCCESS,
        payload: response.data.avatarUrl
      });
      return response.data;
    }
  } catch (error) {
    console.error('Ошибка при обновлении аватара:', error);
    dispatch({
      type: UPDATE_AVATAR_FAIL,
      payload: 'Ошибка при обновлении аватара'
    });
    throw error;
  }
};

export const updateProfileBackground = (imageFile) => async (dispatch) => {
  try {
    dispatch({ type: 'UPDATE_PROFILE_BACKGROUND_START' });
    
    const backgroundUrl = await uploadProfileBackground(imageFile);
    
    dispatch({ 
      type: 'UPDATE_PROFILE_BACKGROUND_SUCCESS',
      payload: backgroundUrl
    });
    
    return backgroundUrl;
  } catch (error) {
    dispatch({ 
      type: 'UPDATE_PROFILE_BACKGROUND_FAILURE',
      payload: error.message
    });
    throw error;
  }
};

export const clearErrors = () => ({
  type: CLEAR_ERRORS
});

export const setAuthenticated = (isAuthenticated) => ({
    type: 'SET_AUTHENTICATED',
    payload: isAuthenticated
});

export const setAuth = (isAuthenticated) => ({
  type: 'SET_AUTH',
  payload: isAuthenticated
});
