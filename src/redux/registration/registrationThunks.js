import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const registerUser = createAsyncThunk(
  'registration/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      console.log('Начало запроса регистрации:', userData);
      
      const response = await axios.post(`${API_URL}/auth/register`, userData, {
        headers: {
          'Content-Type': 'application/json',
        },
        // Добавляем timeout
        timeout: 5000
      });
      
      console.log('Ответ сервера:', response.data);
      return response.data;
      
    } catch (error) {
      console.error('Ошибка в registerUser:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      
      if (error.response?.status === 500) {
        return rejectWithValue({
          message: 'Внутренняя ошибка сервера. Пожалуйста, попробуйте позже.'
        });
      }
      
      return rejectWithValue({
        message: error.response?.data?.message || 'Ошибка при регистрации'
      });
    }
  }
);
