import { createSlice } from "@reduxjs/toolkit";

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
    registrationStart: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    registrationSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.userData = action.payload;
      state.error = null;
    },
    registrationFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
    resetRegistration: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.userData = null;
    },
  },
});

export const {
  registrationStart,
  registrationSuccess,
  registrationFailure,
  resetRegistration,
} = registrationSlice.actions;

// Селекторы
export const selectRegistrationLoading = (state) => state.registration.loading;
export const selectRegistrationError = (state) => state.registration.error;
export const selectRegistrationSuccess = (state) => state.registration.success;
export const selectRegistrationData = (state) => state.registration.userData;
