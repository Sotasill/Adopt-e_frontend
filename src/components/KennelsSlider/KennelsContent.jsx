import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { FaArrowRight, FaDog, FaCat } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useTranslatedContent } from "../../redux/hooks/useTranslatedContent";
import PropTypes from "prop-types";
import KennelCard from "./KennelCard";
import styles from "./KennelsSlider.module.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

const KennelsContent = ({ kennels = [], error, petType }) => {
  const navigate = useNavigate();
  const { t } = useTranslatedContent();

  const handleMoreClick = () => {
    navigate(`/kennels?type=${petType}`);
  };

  const renderCard = (kennel) => {
    if (kennel.isMoreKennels) {
      return (
        <div className={styles.moreKennelsCard}>
          <div className={styles.moreKennelsContent}>
            <div className={styles.moreKennelsIcon}>
              {petType === "dogs" ? <FaDog size={32} /> : <FaCat size={32} />}
            </div>
            <h3 className={styles.moreKennelsTitle}>{kennel.title}</h3>
            <p className={styles.moreKennelsText}>{kennel.text}</p>
            <button
              className={styles.moreKennelsButton}
              onClick={handleMoreClick}
              aria-label={t("kennels.viewMore")}
            >
              <FaArrowRight size={24} />
            </button>
          </div>
        </div>
      );
    }
    return <KennelCard kennel={kennel} />;
  };

  if (error) {
    return (
      <div className={styles.kennelsSlider}>
        <div className={styles.error}>{error}</div>
      </div>
    );
  }

  if (!kennels || kennels.length === 0) {
    return (
      <div className={styles.kennelsSlider}>
        <div className={styles.error}>Нет доступных питомников</div>
      </div>
    );
  }

  return (
    <div className={styles.kennelsSlider}>
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={30}
        navigation
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          760: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 4,
          },
        }}
        className={styles.swiper}
        key={petType}
      >
        {kennels.map((kennel) => (
          <SwiperSlide key={kennel.id}>{renderCard(kennel)}</SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

KennelsContent.propTypes = {
  kennels: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      isMoreKennels: PropTypes.bool,
      title: PropTypes.string,
      text: PropTypes.string,
      name: PropTypes.string,
      logo: PropTypes.string,
      breedKey: PropTypes.string,
      countryKey: PropTypes.string,
      rating: PropTypes.number,
      socials: PropTypes.shape({
        facebook: PropTypes.bool,
        instagram: PropTypes.bool,
        youtube: PropTypes.bool,
        twitter: PropTypes.bool,
      }),
    })
  ),
  error: PropTypes.string,
  petType: PropTypes.oneOf(["dogs", "cats"]).isRequired,
};

export default KennelsContent;
