import {
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
  SET_FAVORITES,
  CLEAR_FAVORITES,
} from "../types/favorites";

// Загрузка избранного из localStorage при инициализации
const loadFavoritesFromStorage = () => {
  try {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  } catch (error) {
    console.error("Ошибка при загрузке избранного из localStorage:", error);
    return [];
  }
};

// Сохранение избранного в localStorage
const saveFavoritesToStorage = (favorites) => {
  try {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  } catch (error) {
    console.error("Ошибка при сохранении избранного в localStorage:", error);
  }
};

const initialState = {
  items: loadFavoritesFromStorage(), // Загружаем из localStorage
  loading: false,
  error: null,
};

const favoritesReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case ADD_TO_FAVORITES:
      newState = {
        ...state,
        items: [...state.items, action.payload],
      };
      saveFavoritesToStorage(newState.items); // Сохраняем в localStorage
      return newState;

    case REMOVE_FROM_FAVORITES:
      newState = {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
      saveFavoritesToStorage(newState.items); // Сохраняем в localStorage
      return newState;

    case SET_FAVORITES:
      newState = {
        ...state,
        items: action.payload,
      };
      saveFavoritesToStorage(newState.items); // Сохраняем в localStorage
      return newState;

    case CLEAR_FAVORITES:
      newState = {
        ...state,
        items: [],
      };
      saveFavoritesToStorage(newState.items); // Сохраняем в localStorage
      return newState;

    default:
      return state;
  }
};

export default favoritesReducer;
