import { useTranslatedContent } from "../../redux/hooks/useTranslatedContent";
import { FaMars, FaVenus, FaUser } from "react-icons/fa6";
import { MdLocationOn } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./PetSlider.module.css";
import commonStyles from "../../styles/common.module.css";
import catBreeds from "../../redux/language/dictionaries/cats.json";
import dogBreeds from "../../redux/language/dictionaries/dogs.json";
import countries from "../../redux/language/dictionaries/countries.json";
import { useSelector } from "react-redux";
import { useAuthModal } from "../../redux/hooks/useAuthModal";

const PetCard = ({ pet, isFavorite, onFavoriteClick, onOpenAuthModal }) => {
  const { t } = useTranslatedContent();
  const navigate = useNavigate();
  const currentLanguage = useSelector(
    (state) => state.language.currentLanguage
  );
  const { handleFavoriteClick: handleAuthFavoriteClick } = useAuthModal();

  const getBreedName = (breedKey, petType) => {
    try {
      const breedsData = petType === "cats" ? catBreeds : dogBreeds;
      const breedData = breedsData[breedKey];

      if (!breedData) {
        return breedKey;
      }

      return breedData.ru || breedData.en || breedKey;
    } catch (error) {
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

  const handleBreederClick = (e) => {
    e.preventDefault();
    handleAuthFavoriteClick(
      e,
      pet.id,
      () => {
        navigate(`/breeders/${pet.breederId}`);
      },
      onOpenAuthModal
    );
  };

  const countryInfo = getCountryInfo(pet.country);

  // Вычисляем процент скидки если есть старая цена
  const discount = pet.oldPrice
    ? Math.round(((pet.oldPrice - pet.price) / pet.oldPrice) * 100)
    : 0;

  // Добавляем бейдж скидки автоматически, если есть старая цена
  const allBadges = [
    ...(pet.oldPrice
      ? [
          {
            type: "discount",
            text: t("badges.discount", { percent: discount }),
          },
        ]
      : []),
    ...(pet.badges || []).map((badge) => ({
      type: badge.type.toLowerCase(),
      text: t(`badges.${badge.type.toLowerCase()}`),
    })),
  ];

  const handleCardClick = () => {
    navigate(`/pets/${pet.type}/${pet.id}`);
  };

  return (
    <div className={styles.petCard} onClick={handleCardClick}>
      <div className={styles.imageContainer}>
        <img src={pet.image} alt={pet.name} className={styles.petImage} />
        <button
          className={styles.favoriteButton}
          onClick={(e) => {
            e.stopPropagation(); // Предотвращаем всплытие события
            handleAuthFavoriteClick(
              e,
              pet.id,
              onFavoriteClick,
              onOpenAuthModal
            );
          }}
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
        {allBadges.length > 0 && (
          <div className={styles.badges}>
            {allBadges.map((badge, index) => (
              <span
                key={index}
                className={`${styles.badge} ${
                  styles[
                    `badge${badge.type
                      .charAt(0)
                      .toUpperCase()}${badge.type.slice(1)}`
                  ]
                }`}
              >
                {badge.text}
              </span>
            ))}
          </div>
        )}
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
          <div className={styles.locationContainer}>
            <MdLocationOn className={styles.locationIcon} />
            <div className={styles.locationInfo}>
              <span className={styles.city}>{pet.city}</span>
              <span className={styles.countryInfo}>
                <span className={styles.countryFlag}>{countryInfo.flag}</span>
                <span className={styles.countryName}>{countryInfo.name}</span>
              </span>
            </div>
          </div>
          <div className={styles.price}>
            {pet.oldPrice && (
              <span className={styles.priceOld}>
                {t("pets.price", { price: pet.oldPrice })}
              </span>
            )}
            <span className={pet.oldPrice ? styles.priceNew : ""}>
              {t("pets.price", { price: pet.price })}
            </span>
            {pet.oldPrice && (
              <span className={styles.priceDiscount}>
                {t("badges.discount", { percent: discount })}
              </span>
            )}
          </div>
        </div>
        <button
          className={`${commonStyles.findBreederButton} ${commonStyles.small}`}
          onClick={(e) => {
            e.stopPropagation(); // Предотвращаем всплытие события
            handleBreederClick(e);
          }}
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
  onOpenAuthModal: PropTypes.func.isRequired,
};

export default PetCard;
