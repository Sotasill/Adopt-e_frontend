import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchQuery: "",
  searchResults: [],
  filters: {
    type: "all",
    breed: "",
    age: "",
    location: "",
  },
  loading: false,
  error: null,
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
      state.loading = false;
      state.error = null;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearSearch: (state) => {
      state.searchQuery = "";
      state.searchResults = [];
      state.error = null;
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
});

export const {
  setSearchQuery,
  setSearchResults,
  setFilters,
  setLoading,
  setError,
  clearSearch,
  clearFilters,
} = searchSlice.actions;

// Селекторы
export const selectSearchQuery = (state) => state.search.searchQuery;
export const selectSearchResults = (state) => state.search.searchResults;
export const selectFilters = (state) => state.search.filters;
export const selectSearchLoading = (state) => state.search.loading;
export const selectSearchError = (state) => state.search.error;
