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
  pagination: {
    page: 1,
    limit: 10,
    totalResults: 0,
  },
  sorting: {
    field: "createdAt",
    direction: "desc",
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
    setSearchFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setSearchLoading: (state, action) => {
      state.loading = action.payload;
    },
    setSearchError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearSearch: (state) => {
      state.searchQuery = "";
      state.searchResults = [];
      state.error = null;
    },
    clearSearchFilters: (state) => {
      state.filters = initialState.filters;
    },
    setSearchPage: (state, action) => {
      state.pagination.page = action.payload;
    },
    setSearchLimit: (state, action) => {
      state.pagination.limit = action.payload;
    },
    setTotalResults: (state, action) => {
      state.pagination.totalResults = action.payload;
    },
    setSearchSort: (state, action) => {
      state.sorting.field = action.payload;
    },
    toggleSortDirection: (state) => {
      state.sorting.direction =
        state.sorting.direction === "asc" ? "desc" : "asc";
    },
  },
});

export const {
  setSearchQuery,
  setSearchResults,
  setSearchFilters,
  setSearchLoading,
  setSearchError,
  clearSearch,
  clearSearchFilters,
  setSearchPage,
  setSearchLimit,
  setTotalResults,
  setSearchSort,
  toggleSortDirection,
} = searchSlice.actions;

// Селекторы
export const selectSearchQuery = (state) => state.search.searchQuery;
export const selectSearchResults = (state) => state.search.searchResults;
export const selectSearchFilters = (state) => state.search.filters;
export const selectSearchLoading = (state) => state.search.loading;
export const selectSearchError = (state) => state.search.error;
export const selectSearchPagination = (state) => state.search.pagination;
export const selectSearchSorting = (state) => state.search.sorting;

export default searchSlice.reducer;
