import { useState } from 'react';
import { useSelector } from 'react-redux';

export const useAuthModal = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const openAuthModal = () => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
    }
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const handleFavoriteClick = (e, itemId, onFavoriteClick) => {
    e.stopPropagation();
    
    if (isAuthenticated) {
      onFavoriteClick(itemId);
    } else {
      openAuthModal();
    }
  };

  return {
    isAuthModalOpen,
    openAuthModal,
    closeAuthModal,
    handleFavoriteClick,
  };
}; 