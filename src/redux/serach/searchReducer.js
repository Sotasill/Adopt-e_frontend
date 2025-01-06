import { SEARCH_USER, SEARCH_BCS, CLEAR_SEARCH } from "./searchConstants";

const initialState = {
  query: "",
  searchType: null, // 'user' или 'bcs'
  results: [],
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_USER:
      return {
        ...state,
        query: action.payload,
        searchType: "user",
        results: [], // Здесь будут результаты поиска после интеграции с API
      };
    case SEARCH_BCS:
      return {
        ...state,
        query: action.payload,
        searchType: "bcs",
        results: [], // Здесь будут результаты поиска после интеграции с API
      };
    case CLEAR_SEARCH:
      return initialState;
    default:
      return state;
  }
};

export default searchReducer;
