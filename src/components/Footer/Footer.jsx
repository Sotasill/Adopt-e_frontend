import { useTranslatedContent } from "../../redux/hooks/useTranslatedContent";
import styles from "./Footer.module.css";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

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
                <a href="/animals">{t("footer.quickLinks.animals")}</a>
              </li>
              <li>
                <a href="/how-to-adopt">{t("footer.quickLinks.howToAdopt")}</a>
              </li>
              <li>
                <a href="/success-stories">
                  {t("footer.quickLinks.successStories")}
                </a>
              </li>
              <li>
                <a href="/volunteer">{t("footer.quickLinks.volunteer")}</a>
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
