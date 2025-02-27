import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite } from '../actions/favoritesActions';

export const useFavorites = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);

  const handleToggleFavorite = (item) => {
    dispatch(toggleFavorite(item));
  };

  const isFavorite = (itemId) => {
    return favorites.some((item) => item.id === itemId);
  };

  return {
    favorites,
    handleToggleFavorite,
    isFavorite,
  };
}; 