import { AUTH_TYPES } from "./authTypes";

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_TYPES.LOGIN_SUCCESS: {
      const user = action.payload.user;

      // Проверяем и обрабатываем данные заводчика
      if (user && user.role === "breeder") {
        // Если специализация не установлена, пытаемся определить её
        if (!user.specialization) {
          const emailOrUsername = (
            user.email ||
            user.username ||
            ""
          ).toLowerCase();
          if (emailOrUsername.includes("dog")) {
            user.specialization = "dog";
          } else if (emailOrUsername.includes("cat")) {
            user.specialization = "cat";
          }
        }

        console.log("Данные заводчика в редьюсере:", {
          email: user.email,
          username: user.username,
          role: user.role,
          specialization: user.specialization,
        });
      }

      return {
        ...state,
        isAuthenticated: true,
        user: user,
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
      const user = action.payload;

      // Также обрабатываем специализацию при установке пользователя
      if (user && user.role === "breeder" && !user.specialization) {
        const emailOrUsername = (
          user.email ||
          user.username ||
          ""
        ).toLowerCase();
        if (emailOrUsername.includes("dog")) {
          user.specialization = "dog";
        } else if (emailOrUsername.includes("cat")) {
          user.specialization = "cat";
        }
      }

      return {
        ...state,
        user: user,
        isAuthenticated: !!user,
      };
    }

    default:
      return state;
  }
};

export default authReducer;
