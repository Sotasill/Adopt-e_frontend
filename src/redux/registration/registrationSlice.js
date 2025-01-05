import { createSlice } from "@reduxjs/toolkit";

const registrationSlice = createSlice({
  name: "registration",
  initialState: {
    role: "", // Роль пользователя: 'buyer' или 'breeder'
    isLoading: false, // Состояние загрузки
    error: null, // Ошибки, если есть
  },
  reducers: {
    setRole: (state, action) => {
      state.role = action.payload;
    },
    resetRole: (state) => {
      state.role = "";
    },
    startLoading: (state) => {
      state.isLoading = true;
    },
    stopLoading: (state) => {
      state.isLoading = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setRole,
  resetRole,
  startLoading,
  stopLoading,
  setError,
  clearError,
} = registrationSlice.actions;
export default registrationSlice.reducer;
