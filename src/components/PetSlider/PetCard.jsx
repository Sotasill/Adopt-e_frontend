import { useTranslatedContent } from "../../redux/hooks/useTranslatedContent";
import { Tooltip, LinearProgress } from "@mui/material";
import { FaMars, FaVenus } from "react-icons/fa6";
import PropTypes from "prop-types";
import styles from "./PetSlider.module.css";

const PetCard = ({ pet }) => {
  const { t } = useTranslatedContent();

  return (
    <div className={styles.petCard}>
      <img src={pet.image} alt={pet.name} className={styles.petImage} />
      <div className={styles.petInfo}>
        <div className={styles.petNameBreed}>
          <h3 className={styles.petName}>{pet.name}</h3>
          <p className={styles.petBreed}>{t(pet.breedKey)}</p>
        </div>
        <div className={styles.petDetails}>
          <div className={styles.ageGender}>
            <span className={styles.age}>
              {t("pets.age", { age: pet.age })}
            </span>
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
        <div className={styles.ratingContainer}>
          <Tooltip
            title={`${t("pets.rating")} ${pet.rating} ${t("pets.outOf")} 5`}
            placement="top"
          >
            <div className={styles.ratingBar}>
              <LinearProgress
                variant="determinate"
                value={(pet.rating / 5) * 100}
                className={styles.ratingProgress}
              />
              <span className={styles.ratingValue}>{pet.rating}</span>
            </div>
          </Tooltip>
        </div>
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
    age: PropTypes.number.isRequired,
    gender: PropTypes.oneOf(["male", "female"]).isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
  }).isRequired,
};

export default PetCard;
