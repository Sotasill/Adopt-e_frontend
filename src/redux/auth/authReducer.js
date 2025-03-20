import { AUTH_TYPES } from "./authTypes";
import { processUserData } from "../../utils/userUtils";

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

const validateUserRole = (user) => {
  if (!user) return null;

  // Проверяем корректность роли
  if (user.role === "breeder" && !user.specialization) {
    return null;
  }

  return user;
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_TYPES.LOGIN_SUCCESS: {
      const processedUser = processUserData(action.payload.user);
      const validatedUser = validateUserRole(processedUser);

      // Если пользователь не прошел валидацию, возвращаем ошибку
      if (!validatedUser) {
        return {
          ...state,
          isAuthenticated: false,
          user: null,
          loading: false,
          error: "Недостаточно данных для аутентификации",
        };
      }

      return {
        ...state,
        isAuthenticated: true,
        user: validatedUser,
        loading: false,
        error: null,
      };
    }

    case AUTH_TYPES.LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false,
        error: action.payload,
      };

    case AUTH_TYPES.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false,
        error: null,
      };

    case AUTH_TYPES.SET_AUTH:
      return {
        ...state,
        isAuthenticated: action.payload,
      };

    case AUTH_TYPES.SET_USER: {
      const processedUser = action.payload
        ? processUserData(action.payload)
        : null;
      const validatedUser = validateUserRole(processedUser);

      return {
        ...state,
        user: validatedUser,
        isAuthenticated: !!validatedUser,
        error:
          !validatedUser && processedUser
            ? "Недостаточно данных для аутентификации"
            : null,
      };
    }

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

    default:
      return state;
  }
};

export default authReducer;
