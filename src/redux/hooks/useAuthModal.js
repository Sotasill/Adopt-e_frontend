import { useSelector } from "react-redux";

export const useAuthModal = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleFavoriteClick = (e, itemId, onFavoriteClick, onOpenAuthModal) => {
    e.stopPropagation();

    if (isAuthenticated) {
      onFavoriteClick(itemId);
    } else {
      onOpenAuthModal();
    }
  };

  return {
    handleFavoriteClick,
    isAuthenticated,
  };
};
