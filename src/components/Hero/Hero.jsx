import { useTranslatedContent } from "../../redux/hooks/useTranslatedContent";
import styles from "./Hero.module.css";

const Hero = () => {
  const { t } = useTranslatedContent();

  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h1 className={styles.title}>{t("hero.title")}</h1>
        <p className={styles.subtitle}>{t("hero.subtitle")}</p>
      </div>
    </section>
  );
};

export default Hero;
