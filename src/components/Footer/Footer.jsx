import { useTranslatedContent } from "../../redux/hooks/useTranslatedContent";
import styles from "./Footer.module.css";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const { t } = useTranslatedContent();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.section}>
            <h3>{t("footer.mission.title")}</h3>
            <p>{t("footer.mission.description")}</p>
            <Link to="/about" className={styles.missionLink}>
              {t("footer.mission.readMore")}
            </Link>
            <div className={styles.socialLinks}>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter />
              </a>
            </div>
          </div>

          <div className={styles.section}>
            <h3>{t("footer.quickLinks.title")}</h3>
            <ul>
              <li>
                <Link to="/breeds">{t("breeds.title")}</Link>
              </li>
              <li>
                <Link to="/kennels">{t("findBreeder")}</Link>
              </li>
              <li>
                <Link to="/find-pet">{t("findYourPet")}</Link>
              </li>
            </ul>
          </div>

          <div className={styles.section}>
            <h3>{t("footer.contact.title")}</h3>
            <ul>
              <li>
                <strong>{t("footer.contact.shelter")}:</strong>{" "}
                {t("footer.contact.address")}
              </li>
              <li>
                <strong>Email:</strong> {t("footer.contact.email")}
              </li>
              <li>
                <strong>{t("footer.contact.phoneLabel")}:</strong>{" "}
                {t("footer.contact.phone")}
              </li>
              <li>
                <strong>{t("footer.contact.workingHours")}:</strong>{" "}
                {t("footer.contact.hours")}
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>
            © {currentYear} Adopt-e. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
