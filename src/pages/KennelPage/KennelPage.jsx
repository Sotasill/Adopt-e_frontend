import { useParams } from "react-router-dom";
import { useTranslatedContent } from "../../hooks/useTranslatedContent";
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaGlobe,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import { KENNELS_DATA } from "../../mocks/kennelsData";
import styles from "./KennelPage.module.css";

export const KennelPage = () => {
  const { id } = useParams();
  const { getContent } = useTranslatedContent();

  const kennel = KENNELS_DATA[id];

  if (!kennel) {
    return <div>Питомник не найден</div>;
  }

  const {
    name,
    logo,
    description,
    rating,
    contacts,
    socials,
    breedKey,
    countryKey,
    city,
  } = kennel;

  return (
    <div className={styles.kennelPage}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <img src={logo} alt={name} className={styles.kennelLogo} />
          <div className={styles.kennelInfo}>
            <h1 className={styles.kennelName}>{name}</h1>
            <div className={styles.location}>
              {getContent(countryKey)}, {city}
            </div>
            <div className={styles.breed}>{getContent(breedKey)}</div>
            <div className={styles.rating}>Рейтинг: {rating} / 5</div>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <section className={styles.about}>
          <h2>О питомнике</h2>
          <p>{description}</p>
        </section>

        <section className={styles.contacts}>
          <h2>Контакты</h2>
          <div className={styles.contactsList}>
            <a
              href={contacts.website}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactItem}
            >
              <FaGlobe /> {contacts.website}
            </a>
            <a href={`tel:${contacts.phone}`} className={styles.contactItem}>
              <FaPhone /> {contacts.phone}
            </a>
            <a href={`mailto:${contacts.email}`} className={styles.contactItem}>
              <FaEnvelope /> {contacts.email}
            </a>
          </div>
        </section>

        <section className={styles.socials}>
          <h2>Социальные сети</h2>
          <div className={styles.socialsList}>
            {socials.facebook && (
              <a href="#" className={styles.socialIcon}>
                <FaFacebook />
              </a>
            )}
            {socials.instagram && (
              <a href="#" className={styles.socialIcon}>
                <FaInstagram />
              </a>
            )}
            {socials.youtube && (
              <a href="#" className={styles.socialIcon}>
                <FaYoutube />
              </a>
            )}
            {socials.twitter && (
              <a href="#" className={styles.socialIcon}>
                <FaTwitter />
              </a>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};
