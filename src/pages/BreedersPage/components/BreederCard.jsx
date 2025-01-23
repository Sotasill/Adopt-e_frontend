import { FaFacebookF, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";
import { LinearProgress, Tooltip } from "@mui/material";
import { useTranslatedContent } from "../../../redux/hooks/useTranslatedContent";
import PropTypes from "prop-types";
import styles from "../BreedersPage.module.css";

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

const KENNEL_COUNTRY_MAPPING = {
  "kennels.list.goldenParadise.country": "us",
  "kennels.list.royalPaws.country": "gb",
  "kennels.list.eliteGermanShepherds.country": "de",
  "kennels.list.siberianStars.country": "ru",
  "kennels.list.persianPalace.country": "ir",
  "kennels.list.britishCharm.country": "gb",
  "kennels.list.maineCoonMagic.country": "us",
  "kennels.list.siameseSecrets.country": "th",
};

const BreederCard = ({ breeder }) => {
  const { t } = useTranslatedContent();
  const countryCode = COUNTRY_CODES[breeder.countryKey];

  return (
    <div className={styles.breederCard}>
      <div className={styles.breederHeader}>
        <img
          src={breeder.logo}
          alt={breeder.name}
          className={styles.breederLogo}
        />
        <div className={styles.breederInfo}>
          <h2 className={styles.breederName}>{breeder.name}</h2>
          <p className={styles.breederBreed}>{t(breeder.breedKey)}</p>
          <div className={styles.countryContainer}>
            <img
              src={`https://flagcdn.com/w20/${countryCode}.png`}
              alt={t(breeder.countryKey)}
              className={styles.countryFlag}
            />
            <p className={styles.breederCountry}>{t(breeder.countryKey)}</p>
          </div>
        </div>
      </div>

      <div className={styles.ratingContainer}>
        <Tooltip
          title={`${t("kennels.rating")} ${breeder.rating} ${t(
            "kennels.outOf"
          )} 5`}
          placement="top"
        >
          <div className={styles.ratingBar}>
            <LinearProgress
              variant="determinate"
              value={(breeder.rating / 5) * 100}
              className={styles.ratingProgress}
            />
            <span className={styles.ratingValue}>{breeder.rating}</span>
          </div>
        </Tooltip>
      </div>

      <div className={styles.socialIcons}>
        {breeder.socials.facebook && (
          <a
            href="#"
            className={`${styles.socialIcon} ${styles.facebook}`}
            aria-label="Facebook"
          >
            <FaFacebookF />
          </a>
        )}
        {breeder.socials.instagram && (
          <a
            href="#"
            className={`${styles.socialIcon} ${styles.instagram}`}
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
        )}
        {breeder.socials.youtube && (
          <a
            href="#"
            className={`${styles.socialIcon} ${styles.youtube}`}
            aria-label="YouTube"
          >
            <FaYoutube />
          </a>
        )}
        {breeder.socials.twitter && (
          <a
            href="#"
            className={`${styles.socialIcon} ${styles.twitter}`}
            aria-label="Twitter"
          >
            <FaTwitter />
          </a>
        )}
      </div>
    </div>
  );
};

BreederCard.propTypes = {
  breeder: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
    breedKey: PropTypes.string.isRequired,
    countryKey: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    socials: PropTypes.shape({
      facebook: PropTypes.bool,
      instagram: PropTypes.bool,
      youtube: PropTypes.bool,
      twitter: PropTypes.bool,
    }).isRequired,
  }).isRequired,
};

export default BreederCard;
