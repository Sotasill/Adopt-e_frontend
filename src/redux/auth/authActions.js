import { AUTH_TYPES } from "./authTypes";
import { authService } from "../../services/authService";
import { clearFavorites } from "../actions/favoritesActions";

export const loginSuccess = (userData) => ({
  type: AUTH_TYPES.LOGIN_SUCCESS,
  payload: userData,
});

export const loginFailure = (error) => ({
  type: AUTH_TYPES.LOGIN_FAILURE,
  payload: error,
});

export const logout = () => ({
  type: AUTH_TYPES.LOGOUT,
});

export const setAuth = (isAuthenticated) => ({
  type: AUTH_TYPES.SET_AUTH,
  payload: isAuthenticated,
});

export const setUser = (user) => ({
  type: AUTH_TYPES.SET_USER,
  payload: user,
});

export const setAuthenticated = (isAuthenticated) => ({
  type: AUTH_TYPES.SET_AUTHENTICATED,
  payload: isAuthenticated,
});

export const refreshTokenSuccess = (tokens) => ({
  type: AUTH_TYPES.REFRESH_TOKEN_SUCCESS,
  payload: tokens,
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
    const { user, tokens } = response;

    if (!user || !tokens) {
      throw new Error("Не удалось получить данные пользователя или токены");
    }

    // Сохраняем токены
    localStorage.setItem("accessToken", tokens.accessToken);
    if (tokens.refreshToken) {
      localStorage.setItem("refreshToken", tokens.refreshToken);
    }

    localStorage.setItem("user", JSON.stringify(user));

    dispatch(setUser(user));
    dispatch(setAuth(true));
    dispatch(loginSuccess({ user, tokens }));

    return { user, tokens };
  } catch (error) {
    console.error("Ошибка при входе:", error);
    dispatch(loginFailure(error.message));
    throw error;
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    await authService.logout();
  } catch (error) {
    console.error("Ошибка при выходе:", error);
  } finally {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    localStorage.removeItem("favorites");
    dispatch(logout());
    dispatch(clearFavorites());
  }
};

export const refreshToken = () => async (dispatch) => {
  try {
    const response = await authService.refreshToken();
    const { user, tokens } = response;

    if (!tokens?.accessToken) {
      throw new Error("Не удалось получить новый токен");
    }

    localStorage.setItem("accessToken", tokens.accessToken);
    if (tokens.refreshToken) {
      localStorage.setItem("refreshToken", tokens.refreshToken);
    }

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      dispatch(setUser(user));
    }

    dispatch(refreshTokenSuccess(tokens));
    return response;
  } catch (error) {
    console.error("Ошибка при обновлении токена:", error);
    dispatch(refreshTokenFailure());
    dispatch(setAuth(false));
    dispatch(setUser(null));
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
