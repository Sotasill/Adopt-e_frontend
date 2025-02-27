import {
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
  SET_FAVORITES,
  CLEAR_FAVORITES,
} from "../types/favorites";

// Добавить в избранное
export const addToFavorites = (item) => ({
  type: ADD_TO_FAVORITES,
  payload: item,
});

// Удалить из избранного
export const removeFromFavorites = (itemId) => ({
  type: REMOVE_FROM_FAVORITES,
  payload: itemId,
});

// Установить список избранного (например, при загрузке с сервера)
export const setFavorites = (favorites) => ({
  type: SET_FAVORITES,
  payload: favorites,
});

// Очистить список избранного
export const clearFavorites = () => ({
  type: CLEAR_FAVORITES,
});

// Асинхронное действие для переключения состояния избранного
export const toggleFavorite = (item) => async (dispatch, getState) => {
  try {
    const { favorites } = getState();
    const isItemInFavorites = favorites.items.some(
      (favItem) => favItem.id === item.id
    );

    if (isItemInFavorites) {
      dispatch(removeFromFavorites(item.id));
      // Здесь можно добавить вызов API для удаления из избранного на сервере
    } else {
      dispatch(addToFavorites(item));
      // Здесь можно добавить вызов API для добавления в избранное на сервере
    }
  } catch (error) {
    console.error("Ошибка при обновлении избранного:", error);
  }
};
