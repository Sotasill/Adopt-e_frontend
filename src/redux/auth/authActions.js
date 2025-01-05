import { AUTH_TYPES } from "./authTypes";
import { authService } from "../../services/authService";

export const loginSuccess = (user) => ({
  type: AUTH_TYPES.LOGIN_SUCCESS,
  payload: user,
});

export const loginFailure = (error) => ({
  type: AUTH_TYPES.LOGIN_FAILURE,
  payload: error,
});

export const logoutAction = () => ({
  type: AUTH_TYPES.LOGOUT,
});

export const setUser = (user) => ({
  type: AUTH_TYPES.SET_USER,
  payload: user,
});

export const setAuth = (isAuthenticated) => ({
  type: AUTH_TYPES.SET_AUTH,
  payload: isAuthenticated,
});

export const setAuthenticated = (isAuthenticated) => ({
  type: AUTH_TYPES.SET_AUTHENTICATED,
  payload: isAuthenticated,
});

export const refreshTokenSuccess = (token) => ({
  type: AUTH_TYPES.REFRESH_TOKEN_SUCCESS,
  payload: token,
});

export const refreshTokenFailure = () => ({
  type: AUTH_TYPES.REFRESH_TOKEN_FAILURE,
});

export const updateProfileBackgroundStart = () => ({
  type: AUTH_TYPES.UPDATE_PROFILE_BACKGROUND_START,
});

export const updateProfileBackgroundSuccess = (backgroundUrl) => ({
  type: AUTH_TYPES.UPDATE_PROFILE_BACKGROUND_SUCCESS,
  payload: backgroundUrl,
});

export const updateProfileBackgroundFailure = (error) => ({
  type: AUTH_TYPES.UPDATE_PROFILE_BACKGROUND_FAILURE,
  payload: error,
});

export const updateAvatarStart = () => ({
  type: AUTH_TYPES.UPDATE_AVATAR_START,
});

export const updateAvatarSuccess = (avatarUrl) => ({
  type: AUTH_TYPES.UPDATE_AVATAR_SUCCESS,
  payload: avatarUrl,
});

export const updateAvatarFailure = (error) => ({
  type: AUTH_TYPES.UPDATE_AVATAR_FAILURE,
  payload: error,
});

// Асинхронные действия
export const login = (credentials) => async (dispatch) => {
  try {
    const response = await authService.login(credentials);
    dispatch(loginSuccess(response.user));
    return response;
  } catch (error) {
    dispatch(loginFailure(error.message));
    throw error;
  }
};

export const logout = () => async (dispatch) => {
  try {
    await authService.logout();
    dispatch(logoutAction());
  } catch (error) {
    console.error("Ошибка при выходе:", error);
  }
};

export const refreshToken = () => async (dispatch) => {
  try {
    const response = await authService.refreshToken();
    dispatch(refreshTokenSuccess(response.token));
    return response;
  } catch (error) {
    dispatch(refreshTokenFailure());
    throw error;
  }
};

export const updateProfileBackground = (imageFile) => async (dispatch) => {
  dispatch(updateProfileBackgroundStart());
  try {
    const response = await authService.updateProfileBackground(imageFile);
    dispatch(updateProfileBackgroundSuccess(response.backgroundUrl));
    return response.backgroundUrl;
  } catch (error) {
    dispatch(updateProfileBackgroundFailure(error.message));
    throw error;
  }
};

export const updateAvatar = (avatarFile) => async (dispatch) => {
  dispatch(updateAvatarStart());
  try {
    const response = await authService.updateAvatar(avatarFile);
    dispatch(updateAvatarSuccess(response.avatarUrl));
    return response.avatarUrl;
  } catch (error) {
    dispatch(updateAvatarFailure(error.message));
    throw error;
  }
};
