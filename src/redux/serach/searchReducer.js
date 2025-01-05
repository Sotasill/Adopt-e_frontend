import {
  SET_SEARCH_QUERY,
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_FAIL,
  CLEAR_SEARCH,
} from "./searchConstants";

const initialState = {
  query: "",
  results: [],
  loading: false,
  error: null,
};

export const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_QUERY:
      return {
        ...state,
        query: action.payload,
      };

    case SEARCH_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        results: action.payload,
        error: null,
      };

    case SEARCH_FAIL:
      return {
        ...state,
        loading: false,
        results: [],
        error: action.payload,
      };

    case CLEAR_SEARCH:
      return {
        ...state,
        query: "",
        results: [],
        error: null,
      };

    default:
      return state;
  }
};
