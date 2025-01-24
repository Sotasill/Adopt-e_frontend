import { LinearProgress } from "@mui/material";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTwitter,
} from "react-icons/fa6";
import { useTranslatedContent } from "../../redux/hooks/useTranslatedContent";
import styles from "./KennelStringCard.module.css";

const KennelStringCard = ({ kennel }) => {
  const { t } = useTranslatedContent();

  const countryCode = {
    "kennels.list.countries.us": "us",
    "kennels.list.countries.gb": "gb",
    "kennels.list.countries.de": "de",
    "kennels.list.countries.ru": "ru",
    "kennels.list.countries.ir": "ir",
    "kennels.list.countries.th": "th",
  }[kennel.countryKey];

  return (
    <div className={styles.kennelString}>
      <div className={styles.mainInfo}>
        <img
          src={kennel.logo}
          alt={kennel.name}
          className={styles.kennelLogo}
        />

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
          <span className={styles.kennelCountry}>{t(kennel.countryKey)}</span>
        </div>

        <div className={styles.ratingContainer}>
          <div className={styles.ratingBar}>
            <div className={styles.ratingProgress}>
              <LinearProgress
                variant="determinate"
                value={(kennel.rating / 5) * 100}
              />
            </div>
            <span className={styles.ratingValue}>{kennel.rating}</span>
          </div>
        </div>

        <div className={styles.socialIcons}>
          {kennel.socials.facebook && (
            <a
              href="#"
              className={`${styles.socialIcon} ${styles.facebook}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF />
            </a>
          )}
          {kennel.socials.instagram && (
            <a
              href="#"
              className={`${styles.socialIcon} ${styles.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
          )}
          {kennel.socials.youtube && (
            <a
              href="#"
              className={`${styles.socialIcon} ${styles.youtube}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube />
            </a>
          )}
          {kennel.socials.twitter && (
            <a
              href="#"
              className={`${styles.socialIcon} ${styles.twitter}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default KennelStringCard;
