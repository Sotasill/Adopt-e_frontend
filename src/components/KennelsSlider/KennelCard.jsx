import { FaFacebookF, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";
import { LinearProgress, Tooltip } from "@mui/material";
import { IoIosArrowForward } from "react-icons/io";
import { useTranslatedContent } from "../../redux/hooks/useTranslatedContent";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./KennelsSlider.module.css";

// Объект с кодами стран для флагов
const COUNTRY_CODES = {
  "kennels.list.countries.us": "us",
  "kennels.list.countries.gb": "gb",
  "kennels.list.countries.de": "de",
  "kennels.list.countries.ru": "ru",
  "kennels.list.countries.ir": "ir",
  "kennels.list.countries.th": "th",
  "kennels.list.countries.ua": "ua",
  "kennels.list.countries.fr": "fr",
};

const KennelCard = ({ kennel }) => {
  const { t } = useTranslatedContent();
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (!kennel.isMoreKennels) {
      navigate(`/breeder/${kennel.id}`);
    }
  };

  if (kennel.isMoreKennels) {
    return (
      <div className={`${styles.kennelCard} ${styles.moreKennelsCard}`}>
        <div className={styles.moreKennelsContent}>
          <div className={styles.moreKennelsIcon}>
            <IoIosArrowForward size={40} />
          </div>
          <h3 className={styles.moreKennelsTitle}>{kennel.title}</h3>
          <p className={styles.moreKennelsText}>{kennel.text}</p>
        </div>
      </div>
    );
  }

  const countryCode = COUNTRY_CODES[kennel.countryKey];

  return (
    <div className={styles.kennelCard} onClick={handleCardClick}>
      <img src={kennel.logo} alt={kennel.name} className={styles.kennelLogo} />
      <div className={styles.kennelInfo}>
        <div className={styles.kennelNameBreed}>
          <h3 className={styles.kennelName}>{kennel.name}</h3>
          <p className={styles.kennelBreed}>{t(kennel.breedKey)}</p>
        </div>
        <div className={styles.countryContainer}>
          <img
            src={`https://flagcdn.com/w20/${countryCode}.png`}
            alt={t(kennel.countryKey)}
            className={styles.countryFlag}
          />
          <p className={styles.kennelCountry}>{t(kennel.countryKey)}</p>
        </div>
        <div className={styles.ratingContainer}>
          <Tooltip
            title={`${t("kennels.rating")} ${kennel.rating} ${t(
              "kennels.outOf"
            )} 5`}
            placement="top"
          >
            <div className={styles.ratingBar}>
              <LinearProgress
                variant="determinate"
                value={(kennel.rating / 5) * 100}
                className={styles.ratingProgress}
              />
              <span className={styles.ratingValue}>{kennel.rating}</span>
            </div>
          </Tooltip>
        </div>
        <div className={styles.socialIcons}>
          {kennel.socials.facebook && (
            <span className={`${styles.socialIcon} ${styles.facebook}`}>
              <FaFacebookF />
            </span>
          )}
          {kennel.socials.instagram && (
            <span className={`${styles.socialIcon} ${styles.instagram}`}>
              <FaInstagram />
            </span>
          )}
          {kennel.socials.youtube && (
            <span className={`${styles.socialIcon} ${styles.youtube}`}>
              <FaYoutube />
            </span>
          )}
          {kennel.socials.twitter && (
            <span className={`${styles.socialIcon} ${styles.twitter}`}>
              <FaTwitter />
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

KennelCard.propTypes = {
  kennel: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
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
    isMoreKennels: PropTypes.bool,
    title: PropTypes.string,
    text: PropTypes.string,
  }).isRequired,
};

export default KennelCard;
