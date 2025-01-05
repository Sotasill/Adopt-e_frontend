import { setSearchResults, setLoading, setError } from "./searchSlice";

export const searchPets = (query, filters) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    // TODO: Заменить на реальный API-запрос
    const response = await fetch(
      `/api/search?query=${query}&filters=${JSON.stringify(filters)}`
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Ошибка при поиске");
    }

    dispatch(setSearchResults(data));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const searchByFilters = (filters) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    // TODO: Заменить на реальный API-запрос
    const response = await fetch(
      `/api/search/filter?${new URLSearchParams(filters)}`
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Ошибка при фильтрации");
    }

    dispatch(setSearchResults(data));
  } catch (error) {
    dispatch(setError(error.message));
  }
};
