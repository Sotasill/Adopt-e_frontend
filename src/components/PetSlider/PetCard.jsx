import { useTranslatedContent } from "../../redux/hooks/useTranslatedContent";
import { FaMars, FaVenus, FaUser } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./PetSlider.module.css";
import commonStyles from "../../styles/common.module.css";
import catBreeds from "../../redux/language/dictionaries/cats.json";
import dogBreeds from "../../redux/language/dictionaries/dogs.json";

const PetCard = ({ pet }) => {
  const { t } = useTranslatedContent();
  const navigate = useNavigate();

  const getBreedName = (breedKey, petType) => {
    try {
      const breedsData = petType === "cats" ? catBreeds : dogBreeds;
      const breedData = breedsData[breedKey];

      if (!breedData) {
        console.warn(`No breed data found for key: ${breedKey}`);
        return breedKey;
      }

      // Пробуем получить перевод на русском, если нет - на английском
      return breedData.ru || breedData.en || breedKey;
    } catch (error) {
      console.error("Error getting breed name:", error);
      return breedKey;
    }
  };

  const getAgeText = (months) => {
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    if (years > 0 && remainingMonths > 0) {
      return t("pets.ageYearsAndMonths", { years, months: remainingMonths });
    } else if (years > 0) {
      return t("pets.ageYears", { years });
    } else {
      return t("pets.ageMonths", { months: remainingMonths });
    }
  };

  const handleBreederClick = () => {
    navigate(`/breeder/${pet.breederId}`);
  };

  return (
    <div className={styles.petCard}>
      <div className={styles.imageContainer}>
        <img src={pet.image} alt={pet.name} className={styles.petImage} />
      </div>
      <div className={styles.petInfo}>
        <div className={styles.petNameBreed}>
          <h3 className={styles.petName}>{pet.name}</h3>
          <p className={styles.petBreed}>
            {getBreedName(pet.breedKey, pet.type)}
          </p>
        </div>
        <div className={styles.petDetails}>
          <div className={styles.ageGender}>
            <span className={styles.age}>{getAgeText(pet.ageInMonths)}</span>
            <span className={styles.gender}>
              {pet.gender === "male" ? (
                <FaMars className={styles.maleIcon} />
              ) : (
                <FaVenus className={styles.femaleIcon} />
              )}
            </span>
          </div>
          <div className={styles.price}>
            {t("pets.price", { price: pet.price })}
          </div>
        </div>
        <button
          className={`${commonStyles.findBreederButton} ${commonStyles.small}`}
          onClick={handleBreederClick}
        >
          <FaUser className={styles.breederIcon} />
          {t("pets.viewBreeder")}
        </button>
      </div>
    </div>
  );
};

PetCard.propTypes = {
  pet: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    breedKey: PropTypes.string.isRequired,
    type: PropTypes.oneOf(["cats", "dogs"]).isRequired,
    ageInMonths: PropTypes.number.isRequired,
    gender: PropTypes.oneOf(["male", "female"]).isRequired,
    price: PropTypes.number.isRequired,
    breederId: PropTypes.string.isRequired,
  }).isRequired,
};

export default PetCard;
