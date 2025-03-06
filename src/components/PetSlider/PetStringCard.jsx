import { FaMars, FaVenus, FaUser } from "react-icons/fa6";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { useTranslatedContent } from "../../redux/hooks/useTranslatedContent";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./PetStringCard.module.css";
import commonStyles from "../../styles/common.module.css";
import catBreeds from "../../redux/language/dictionaries/cats.json";
import dogBreeds from "../../redux/language/dictionaries/dogs.json";
import countries from "../../redux/language/dictionaries/countries.json";
import { useSelector } from "react-redux";
import { useAuthModal } from "../../redux/hooks/useAuthModal";
import AuthModal from "../AuthModal/AuthModal";

const PetStringCard = ({ pet, isFavorite, onFavoriteClick }) => {
  const { t } = useTranslatedContent();
  const navigate = useNavigate();
  const currentLanguage = useSelector(
    (state) => state.language.currentLanguage
  );
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const { isAuthModalOpen, closeAuthModal, handleFavoriteClick } =
    useAuthModal();

  const getBreedName = (breedKey, petType) => {
    try {
      const breedsData = petType === "cats" ? catBreeds : dogBreeds;
      const breedData = breedsData[breedKey];

      if (!breedData) {
        console.warn(`No breed data found for key: ${breedKey}`);
        return breedKey;
      }

      return breedData.ru || breedData.en || breedKey;
    } catch (error) {
      console.error("Error getting breed name:", error);
      return breedKey;
    }
  };

  const getCountryInfo = (countryName) => {
    const countryKey = Object.keys(countries).find(
      (key) => countries[key].ru === countryName
    );

    if (countryKey) {
      const countryData = countries[countryKey];
      return {
        flag: countryData.flag,
        name: countryData[currentLanguage] || countryData.en || countryData.ru,
      };
    }

    return {
      flag: "🌍",
      name: countryName,
    };
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

  const countryInfo = getCountryInfo(pet.country);

  // Вычисляем процент скидки если есть старая цена
  const discount = pet.oldPrice
    ? Math.round(((pet.oldPrice - pet.price) / pet.oldPrice) * 100)
    : 0;

  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <div className={styles.mediaContainer}>
          <img src={pet.image} alt={pet.name} className={styles.media} />
          <button
            className={styles.favoriteButton}
            onClick={(e) => handleFavoriteClick(e, pet.id, onFavoriteClick)}
            aria-label={
              isFavorite
                ? t("common.removeFromFavorites")
                : t("common.addToFavorites")
            }
            title={
              isFavorite
                ? t("common.removeFromFavorites")
                : t("common.addToFavorites")
            }
          >
            {isFavorite ? (
              <span className={styles.favoriteIconActive}>❤️</span>
            ) : (
              <span className={styles.favoriteIcon}>🤍</span>
            )}
          </button>
        </div>
        <div className={styles.content}>
          <div className={styles.mainInfo}>
            <h3 className={styles.title}>{pet.name}</h3>
            <p className={styles.subtitle}>
              {getBreedName(pet.breedKey, pet.type)}
            </p>
          </div>

          <div className={styles.details}>
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

            <div className={styles.locationInfo}>
              <MdLocationOn className={styles.locationIcon} />
              <span>
                {pet.city}, {countryInfo.name}
              </span>
            </div>
          </div>

          <div className={styles.priceContainer}>
            <div className={styles.priceInfo}>
              <span className={styles.price}>
                {t("pets.price", { price: pet.price })}
              </span>
              {pet.oldPrice && (
                <span className={styles.oldPrice}>
                  {t("pets.price", { price: pet.oldPrice })}
                </span>
              )}
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
      </div>

      <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} />
    </div>
  );
};

PetStringCard.propTypes = {
  pet: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    breedKey: PropTypes.string.isRequired,
    type: PropTypes.oneOf(["cats", "dogs"]).isRequired,
    ageInMonths: PropTypes.number.isRequired,
    gender: PropTypes.oneOf(["male", "female"]).isRequired,
    price: PropTypes.number.isRequired,
    oldPrice: PropTypes.number,
    breederId: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    badges: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
  isFavorite: PropTypes.bool.isRequired,
  onFavoriteClick: PropTypes.func.isRequired,
};

export default PetStringCard;
