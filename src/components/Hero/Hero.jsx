import { useTranslatedContent } from "../../redux/hooks/useTranslatedContent";
import { useNavigate } from "react-router-dom";
import styles from "./Hero.module.css";

const Hero = () => {
  const { t } = useTranslatedContent();
  const navigate = useNavigate();

  const handleBreedersClick = () => {
    navigate("/breeders");
  };

  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h1 className={styles.title}>{t("hero.title")}</h1>
        <p className={styles.subtitle}>{t("hero.subtitle")}</p>
        <button
          className={styles.findBreederButton}
          onClick={handleBreedersClick}
        >
          {t("hero.findBreeder")}
        </button>
      </div>
    </section>
  );
};

export default Hero;
