import { AUTH_TYPES } from "./authTypes";

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_TYPES.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false,
        error: null,
      };

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
        ...initialState,
      };

    case AUTH_TYPES.SET_AUTH:
      return {
        ...state,
        isAuthenticated: action.payload,
      };

    case AUTH_TYPES.SET_USER:
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};
