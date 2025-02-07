import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import { useTranslations } from "../../redux/hooks/useTranslations";
import styles from "./BreedPage.module.css";
import commonStyles from "../../styles/common.module.css";
import defaultHeroImage from "../../assets/images/Andrew_P_create_picture_poster_style_with_dog_on_it_and_tex_b568d811-09c9-42ed-926e-ea6c1cf974c9.png";
import dogsData from "../../redux/language/dictionaries/dogs.json";
import catsData from "../../redux/language/dictionaries/cats.json";

const languageMapping = {
  rus: "ru",
  ukr: "uk",
  deu: "de",
  fr: "fr",
  en: "en",
};

const BreedPage = () => {
  const { breedId, type } = useParams();
  const navigate = useNavigate();
  const { translate } = useTranslations();
  const currentLanguage = useSelector(
    (state) => state.language.currentLanguage
  );

  // Получаем данные о породе
  const breedData = type === "dogs" ? dogsData[breedId] : catsData[breedId];
  const languageCode = languageMapping[currentLanguage.toLowerCase()] || "en";
  const breedName = breedData?.[languageCode] || breedData?.["en"] || breedId;

  const handleFindBreeder = () => {
    navigate(`/breeders?type=${type}&breed=${breedId}`);
  };

  if (!breedData) {
    return (
      <div className={commonStyles.pageContainer}>
        <h1>Порода не найдена</h1>
      </div>
    );
  }

  return (
    <div className={styles.breedPage}>
      {/* Hero секция */}
      <div className={styles.hero}>
        <img
          src={defaultHeroImage}
          alt={breedName}
          className={styles.heroImage}
        />
        <div className={styles.heroContent}>
          <h1 className={styles.breedName}>{breedName}</h1>
        </div>
      </div>

      {/* Основной контент */}
      <div className={commonStyles.pageContainer}>
        <div className={styles.breedContent}>
          <section className={styles.description}>
            <h2 className={styles.sectionTitle}>
              {translate("breed.description.title")}
            </h2>
            <p className={styles.descriptionText}>
              {/* Временный текст, позже будет заменен на реальные данные */}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </p>
          </section>

          <section className={styles.characteristics}>
            <h2 className={styles.sectionTitle}>
              {translate("breed.characteristics.title")}
            </h2>
            <div className={styles.characteristicsList}>
              {/* Временные характеристики, позже будут заменены на реальные данные */}
              <div className={styles.characteristicItem}>
                <span className={styles.characteristicLabel}>
                  {translate("breed.characteristics.temperament")}
                </span>
                <span className={styles.characteristicValue}>
                  Дружелюбный, Активный, Умный
                </span>
              </div>
              <div className={styles.characteristicItem}>
                <span className={styles.characteristicLabel}>
                  {translate("breed.characteristics.size")}
                </span>
                <span className={styles.characteristicValue}>Средний</span>
              </div>
              <div className={styles.characteristicItem}>
                <span className={styles.characteristicLabel}>
                  {translate("breed.characteristics.lifespan")}
                </span>
                <span className={styles.characteristicValue}>12-15 лет</span>
              </div>
            </div>
          </section>

          <div className={styles.actionSection}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleFindBreeder}
              className={`${commonStyles.findBreederButton} ${commonStyles.large}`}
            >
              {translate("findBreeder")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreedPage;
