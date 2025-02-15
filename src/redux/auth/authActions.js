import { AUTH_TYPES } from "./authTypes";
import { authService } from "../../services/authService";

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
    const { user, token } = await authService.login(credentials);

    if (!user) {
      throw new Error("Не удалось получить данные пользователя");
    }

    if (token) {
      localStorage.setItem("token", token);
    }

    localStorage.setItem("user", JSON.stringify(user));

    dispatch(setUser(user));
    dispatch(setAuth(true));
    dispatch(loginSuccess({ user, token }));

    return { user, token };
  } catch (error) {
    console.error("Ошибка при входе:", error);
    dispatch(loginFailure(error.message));
    throw error;
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    await authService.logout();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(logout());
  } catch (error) {
    console.error("Ошибка при выходе:", error);
    dispatch(logout());
  }
};

export const refreshToken = () => async (dispatch) => {
  try {
    const response = await authService.refreshToken();
    const { token, user } = response;

    if (token) {
      localStorage.setItem("token", token);
      if (user) {
        dispatch(setUser(user));
      }
      dispatch(refreshTokenSuccess(token));
    }

    return response;
  } catch (error) {
    dispatch(refreshTokenFailure());
    dispatch(setAuthenticated(false));
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
