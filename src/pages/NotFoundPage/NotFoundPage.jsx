import styles from "./NotFoundPage.module.css";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import LetterGlitch from "../../components/LetterGlitch/LetterGlitch";

const NotFoundPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleHomeClick = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className={styles.fullscreenContainer}>
      <div className={styles.glitchBackground}>
        <LetterGlitch
          glitchColors={["#2b4539", "#61dca3", "#61b3dc"]}
          glitchSpeed={50}
          centerVignette={false}
          outerVignette={true}
          smooth={true}
        />
      </div>
      <div className={styles.contentContainer}>
        <h1 className={styles.title}>404</h1>
        <p className={styles.text}>{t("notFound.message")}</p>
        <button onClick={handleHomeClick} className={styles.homeLink}>
          {t("notFound.returnHome")}
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
