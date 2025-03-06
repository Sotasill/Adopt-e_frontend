import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { FaArrowRight, FaDog, FaCat } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useTranslatedContent } from "../../redux/hooks/useTranslatedContent";
import PropTypes from "prop-types";
import PetCard from "./PetCard";
import styles from "./PetSlider.module.css";
import { useFavorites } from "../../redux/hooks/useFavorites";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

const PetContent = ({ pets = [], error, petType, onOpenAuthModal }) => {
  const navigate = useNavigate();
  const { t } = useTranslatedContent();
  const { handleToggleFavorite, isFavorite } = useFavorites();

  const handleMoreClick = () => {
    navigate(`/pets?type=${petType}`);
  };

  const renderCard = (pet) => {
    if (pet.isMorePets) {
      return (
        <div className={styles.morePetsCard}>
          <div className={styles.morePetsContent}>
            <div className={styles.morePetsIcon}>
              {petType === "dogs" ? <FaDog size={32} /> : <FaCat size={32} />}
            </div>
            <h3 className={styles.morePetsTitle}>{pet.title}</h3>
            <p className={styles.morePetsText}>{pet.text}</p>
            <button
              className={styles.morePetsButton}
              onClick={handleMoreClick}
              aria-label={t("pets.viewMore")}
            >
              <FaArrowRight size={24} />
            </button>
          </div>
        </div>
      );
    }
    return (
      <PetCard
        key={pet.id}
        pet={pet}
        isFavorite={isFavorite(pet.id)}
        onFavoriteClick={() => handleToggleFavorite(pet)}
        onOpenAuthModal={onOpenAuthModal}
      />
    );
  };

  if (error) {
    return (
      <div className={styles.petsSlider}>
        <div className={styles.error}>{error}</div>
      </div>
    );
  }

  if (!pets || pets.length === 0) {
    return (
      <div className={styles.petsSlider}>
        <div className={styles.error}>Нет доступных питомцев</div>
      </div>
    );
  }

  return (
    <div className={styles.petsSlider}>
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={20}
        navigation
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          576: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          992: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1200: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }}
        className={styles.swiper}
        key={petType}
      >
        {pets.map((pet) => (
          <SwiperSlide key={pet.id}>{renderCard(pet)}</SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

PetContent.propTypes = {
  pets: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({
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
      }),
      PropTypes.shape({
        isMorePets: PropTypes.bool.isRequired,
        title: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
      }),
    ])
  ).isRequired,
  error: PropTypes.string,
  petType: PropTypes.oneOf(["cats", "dogs"]).isRequired,
  onOpenAuthModal: PropTypes.func.isRequired,
};

export default PetContent;
