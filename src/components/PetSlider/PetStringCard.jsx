import { FaMars, FaVenus, FaUser } from "react-icons/fa6";
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

const PetStringCard = ({ pet }) => {
  const { t } = useTranslatedContent();
  const navigate = useNavigate();
  const currentLanguage = useSelector(
    (state) => state.language.currentLanguage
  );

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
    <div className={styles.petString}>
      <div className={styles.mainInfo}>
        <img src={pet.image} alt={pet.name} className={styles.petImage} />

        <div className={styles.petNameBreed}>
          <h3 className={styles.petName}>{pet.name}</h3>
          <p className={styles.petBreed}>
            {getBreedName(pet.breedKey, pet.type)}
          </p>
        </div>

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
};

export default PetStringCard;
