import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT,
  UPDATE_AVATAR_SUCCESS
} from './authConstant';

const initialState = {
  isAuthenticated: false,
  user: null,
  token: localStorage.getItem('token'),
  loading: false,
  error: null
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
        error: null
      };

    case REGISTER_FAIL:
    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload
      };

    case LOGOUT:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        token: null
      };

    case UPDATE_AVATAR_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          avatar: action.payload
        }
      };

    case 'UPDATE_PROFILE_BACKGROUND_START':
      return {
        ...state,
        loading: true,
        error: null
      };
    
    case 'UPDATE_PROFILE_BACKGROUND_SUCCESS':
      return {
        ...state,
        loading: false,
        user: {
          ...state.user,
          profileBackground: action.payload
        }
      };
    
    case 'UPDATE_PROFILE_BACKGROUND_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case 'SET_AUTHENTICATED':
      return {
        ...state,
        isAuthenticated: action.payload
      };

    default:
      return state;
  }
};
