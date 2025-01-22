import { createAction } from "@reduxjs/toolkit";

// Действия для поиска
export const setSearchQuery = createAction("search/setSearchQuery");
export const setSearchResults = createAction("search/setSearchResults");
export const setSearchLoading = createAction("search/setSearchLoading");
export const setSearchError = createAction("search/setSearchError");
export const clearSearch = createAction("search/clearSearch");

// Действия для фильтрации
export const setSearchFilters = createAction("search/setSearchFilters");
export const clearSearchFilters = createAction("search/clearSearchFilters");

// Действия для пагинации
export const setSearchPage = createAction("search/setSearchPage");
export const setSearchLimit = createAction("search/setSearchLimit");
export const setTotalResults = createAction("search/setTotalResults");

// Действия для сортировки
export const setSearchSort = createAction("search/setSearchSort");
export const toggleSortDirection = createAction("search/toggleSortDirection");

// Действия для поиска пользователей и BCS
export const searchUser = createAction("search/searchUser");
export const searchBCS = createAction("search/searchBCS");
