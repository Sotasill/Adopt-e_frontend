import {
  setSearchResults,
  setSearchLoading,
  setSearchError,
  setTotalResults,
} from "./searchSlice";
import api from "../../services/api";

export const searchPets = (params) => async (dispatch) => {
  dispatch(setSearchLoading(true));
  try {
    const { query, filters, pagination, sorting } = params;
    const queryParams = new URLSearchParams({
      query: query || "",
      page: pagination?.page || 1,
      limit: pagination?.limit || 10,
      sortBy: sorting?.field || "createdAt",
      sortDirection: sorting?.direction || "desc",
      ...filters,
    });

    const response = await api.get(`/search?${queryParams}`);

    if (!response.data) {
      throw new Error("Пустой ответ от сервера");
    }

    const { items, total } = response.data;
    dispatch(setSearchResults(items));
    dispatch(setTotalResults(total));
  } catch (error) {
    dispatch(setSearchError(error.message));
  }
};

export const searchByFilters = (params) => async (dispatch) => {
  dispatch(setSearchLoading(true));
  try {
    const { filters, pagination, sorting } = params;
    const queryParams = new URLSearchParams({
      page: pagination?.page || 1,
      limit: pagination?.limit || 10,
      sortBy: sorting?.field || "createdAt",
      sortDirection: sorting?.direction || "desc",
      ...filters,
    });

    const response = await api.get(`/search/filter?${queryParams}`);

    if (!response.data) {
      throw new Error("Пустой ответ от сервера");
    }

    const { items, total } = response.data;
    dispatch(setSearchResults(items));
    dispatch(setTotalResults(total));
  } catch (error) {
    dispatch(setSearchError(error.message));
  }
};

// Поиск пользователей
export const searchUsers = (query) => async (dispatch) => {
  dispatch(setSearchLoading(true));
  try {
    const response = await api.get(`/users/search?query=${query}`);

    if (!response.data) {
      throw new Error("Пустой ответ от сервера");
    }

    const { items, total } = response.data;
    dispatch(setSearchResults(items));
    dispatch(setTotalResults(total));
  } catch (error) {
    dispatch(setSearchError(error.message));
  }
};

// Поиск по BCS
export const searchBCSData = (query) => async (dispatch) => {
  dispatch(setSearchLoading(true));
  try {
    const response = await api.get(`/bcs/search?query=${query}`);

    if (!response.data) {
      throw new Error("Пустой ответ от сервера");
    }

    const { items, total } = response.data;
    dispatch(setSearchResults(items));
    dispatch(setTotalResults(total));
  } catch (error) {
    dispatch(setSearchError(error.message));
  }
};
