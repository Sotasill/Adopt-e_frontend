import { AUTH_TYPES } from "./authTypes";

const initialState = {
  isAuthenticated: false,
  user: null,
  error: null,
  loading: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_TYPES.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        error: null,
        loading: false,
      };

    case AUTH_TYPES.LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: action.payload,
        loading: false,
      };

    case AUTH_TYPES.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: null,
        loading: false,
      };

    case AUTH_TYPES.SET_USER:
      return {
        ...state,
        user: action.payload,
      };

    case AUTH_TYPES.SET_AUTH:
    case AUTH_TYPES.SET_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: action.payload,
      };

    case AUTH_TYPES.REFRESH_TOKEN_SUCCESS:
      return {
        ...state,
        error: null,
      };

    case AUTH_TYPES.REFRESH_TOKEN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: "Ошибка обновления токена",
      };

    case AUTH_TYPES.UPDATE_PROFILE_BACKGROUND_START:
    case AUTH_TYPES.UPDATE_AVATAR_START:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case AUTH_TYPES.UPDATE_PROFILE_BACKGROUND_SUCCESS:
      return {
        ...state,
        loading: false,
        user: {
          ...state.user,
          profileBackground: action.payload,
        },
      };

    case AUTH_TYPES.UPDATE_AVATAR_SUCCESS:
      return {
        ...state,
        loading: false,
        user: {
          ...state.user,
          avatar: action.payload,
        },
      };

    case AUTH_TYPES.UPDATE_PROFILE_BACKGROUND_FAILURE:
    case AUTH_TYPES.UPDATE_AVATAR_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
