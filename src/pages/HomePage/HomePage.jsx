import { useState } from "react";
import { useTranslatedContent } from "../../redux/hooks/useTranslatedContent";
import KennelsSlider from "../../components/KennelsSlider/KennelsSlider";
import styles from "./HomePage.module.css";

const advantages = [
  {
    id: 1,
    titleKey: "advantages.searchTitle",
    contentKey: "advantages.searchContent",
  },
  {
    id: 2,
    titleKey: "advantages.breedersTitle",
    contentKey: "advantages.breedersContent",
  },
  {
    id: 3,
    titleKey: "advantages.supportTitle",
    contentKey: "advantages.supportContent",
  },
  {
    id: 4,
    titleKey: "advantages.toolsTitle",
    contentKey: "advantages.toolsContent",
  },
];

const banners = [
  {
    id: 1,
    image: "https://placeholder.com/1200x300",
    titleKey: "banners.special",
    link: "#",
  },
  {
    id: 2,
    image: "https://placeholder.com/1200x300",
    titleKey: "banners.newPets",
    link: "#",
  },
  {
    id: 3,
    image: "https://placeholder.com/1200x300",
    titleKey: "banners.monthlyDeals",
    link: "#",
  },
];

const HomePage = () => {
  const { t } = useTranslatedContent();
  const [activeId, setActiveId] = useState(null);

  const toggleAccordion = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <div className={styles.container}>
      {/* Приветственный блок */}
      <section className={styles.welcomeSection}>
        <h1 className={styles.mainTitle}>{t("welcome.title")}</h1>
        <p className={styles.welcomeText}>{t("welcome.subtitle")}</p>
      </section>

      {/* Рекламные баннеры */}
      <section className={styles.bannersSection}>
        <div className={styles.bannersContainer}>
          {banners.map((banner) => (
            <div key={banner.id} className={styles.banner}>
              <img src={banner.image} alt={t(banner.titleKey)} />
            </div>
          ))}
        </div>
      </section>

      {/* Слайдер питомников */}
      <KennelsSlider />

      {/* Преимущества */}
      <div className={styles.accordion}>
        {advantages.map((item) => (
          <div key={item.id} className={styles.accordionItem}>
            <div
              className={styles.accordionHeader}
              onClick={() => toggleAccordion(item.id)}
            >
              {t(item.titleKey)}
              <span
                className={`${styles.accordionIcon} ${
                  activeId === item.id ? styles.active : ""
                }`}
              >
                ▼
              </span>
            </div>
            <div
              className={`${styles.accordionContent} ${
                activeId === item.id ? styles.active : ""
              }`}
            >
              <p className={styles.accordionText}>{t(item.contentKey)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
