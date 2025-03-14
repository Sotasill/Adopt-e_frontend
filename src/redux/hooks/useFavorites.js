import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite } from "../actions/favoritesActions";

export const useFavorites = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleToggleFavorite = (item) => {
    if (isAuthenticated) {
      dispatch(toggleFavorite(item));
    }
  };

  const isFavorite = (itemId) => {
    if (!isAuthenticated) return false;
    return favorites.some((item) => item.id === itemId);
  };

  return {
    favorites,
    handleToggleFavorite,
    isFavorite,
  };
};
