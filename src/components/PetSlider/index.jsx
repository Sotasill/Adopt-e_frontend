import React from 'react';
import { useFavorites } from '../../redux/hooks/useFavorites';
import PetCard from './PetCard';
// ... остальные импорты

const PetSlider = ({ pets }) => {
  const { handleToggleFavorite, isFavorite } = useFavorites();

  return (
    <div className={styles.petsSlider}>
      {pets.map((pet) => (
        <PetCard
          key={pet.id}
          pet={pet}
          isFavorite={isFavorite(pet.id)}
          onFavoriteClick={() => handleToggleFavorite(pet)}
        />
      ))}
    </div>
  );
};

export default PetSlider; 