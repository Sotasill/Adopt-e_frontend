import { createSlice } from "@reduxjs/toolkit";
import {
  registerUser,
  registerBreeder,
  registerSpecialist,
} from "./registrationThunks";

const initialState = {
  loading: false,
  error: null,
  success: false,
  userData: null,
};

export const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    resetRegistration: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.userData = null;
    },
  },
  extraReducers: (builder) => {
    // Обработка регистрации обычного пользователя
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.userData = action.payload.user;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });

    // Обработка регистрации заводчика
    builder
      .addCase(registerBreeder.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(registerBreeder.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.userData = action.payload.user;
        state.error = null;
      })
      .addCase(registerBreeder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });

    // Обработка регистрации специалиста
    builder
      .addCase(registerSpecialist.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(registerSpecialist.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.userData = action.payload.user;
        state.error = null;
      })
      .addCase(registerSpecialist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { resetRegistration } = registrationSlice.actions;

// Селекторы
export const selectRegistrationLoading = (state) => state.registration.loading;
export const selectRegistrationError = (state) => state.registration.error;
export const selectRegistrationSuccess = (state) => state.registration.success;
export const selectRegistrationData = (state) => state.registration.userData;
