import {
  SET_SEARCH_QUERY,
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_FAIL,
  CLEAR_SEARCH,
} from "./searchConstants";

export const setSearchQuery = (query) => ({
  type: SET_SEARCH_QUERY,
  payload: query,
});

export const clearSearch = () => ({
  type: CLEAR_SEARCH,
});

export const searchBCS = (query) => async (dispatch) => {
  if (!query) {
    dispatch(clearSearch());
    return;
  }

  try {
    dispatch({ type: SEARCH_REQUEST });

    // Здесь будет запрос к API
    // const response = await axios.get(`/api/search?q=${query}`);

    // Временная имитация поиска
    const mockResults = [
      { id: 1, title: "Результат 1", type: "pet" },
      { id: 2, title: "Результат 2", type: "event" },
    ];

    dispatch({
      type: SEARCH_SUCCESS,
      payload: mockResults,
    });
  } catch (error) {
    dispatch({
      type: SEARCH_FAIL,
      payload: error.message,
    });
  }
};
