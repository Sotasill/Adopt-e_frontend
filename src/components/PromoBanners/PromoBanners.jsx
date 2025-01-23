import { useState, useEffect } from "react";
import { useTranslatedContent } from "../../redux/hooks/useTranslatedContent";
import styles from "./PromoBanners.module.css";

const banners = [
  {
    id: 1,
    image: "/images/banners/pet-shop-banner-1.png",
    titleKey: "banners.special",
    link: "#",
  },
  {
    id: 2,
    image: "/images/banners/pet-shop-banner-2.png",
    titleKey: "banners.newPets",
    link: "#",
  },
  {
    id: 3,
    image: "/images/banners/pet-shop-banner-3.png",
    titleKey: "banners.monthlyDeals",
    link: "#",
  },
];

const AUTOPLAY_DELAY = 5000; // 5 секунд между сменой баннеров

const PromoBanners = () => {
  const { t } = useTranslatedContent();
  const [activeBannerIndex, setActiveBannerIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 320);
  const [isTablet, setIsTablet] = useState(window.innerWidth <= 760);

  // Отслеживаем изменение размера экрана
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 320);
      setIsTablet(width <= 760);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Автоматическая смена баннеров на мобильных и планшетных устройствах
  useEffect(() => {
    if (!isMobile && !isTablet) return;

    const interval = setInterval(() => {
      setActiveBannerIndex((current) => (current + 1) % banners.length);
    }, AUTOPLAY_DELAY);

    return () => clearInterval(interval);
  }, [isMobile, isTablet]);

  const renderBanners = () => {
    if (isMobile) {
      // Для мобильных устройств показываем только активный баннер
      const banner = banners[activeBannerIndex];
      return (
        <div key={banner.id} className={styles.banner}>
          <a href={banner.link} className={styles.bannerLink}>
            <img src={banner.image} alt={t(banner.titleKey)} />
            <div className={styles.bannerOverlay}>
              <h3 className={styles.bannerTitle}>{t(banner.titleKey)}</h3>
            </div>
          </a>
          <div className={styles.bannerDots}>
            {banners.map((_, index) => (
              <span
                key={index}
                className={`${styles.dot} ${
                  index === activeBannerIndex ? styles.activeDot : ""
                }`}
                onClick={() => setActiveBannerIndex(index)}
              />
            ))}
          </div>
        </div>
      );
    }

    if (isTablet) {
      // Для планшетов показываем два баннера с автоматической сменой
      const firstBannerIndex = activeBannerIndex;
      const secondBannerIndex = (activeBannerIndex + 1) % banners.length;
      const displayedBanners = [
        banners[firstBannerIndex],
        banners[secondBannerIndex],
      ];

      return (
        <>
          {displayedBanners.map((banner) => (
            <div key={banner.id} className={styles.banner}>
              <a href={banner.link} className={styles.bannerLink}>
                <img src={banner.image} alt={t(banner.titleKey)} />
                <div className={styles.bannerOverlay}>
                  <h3 className={styles.bannerTitle}>{t(banner.titleKey)}</h3>
                </div>
              </a>
            </div>
          ))}
          <div className={styles.bannerDots}>
            {[0, 1, 2].map((index) => (
              <span
                key={index}
                className={`${styles.dot} ${
                  index === activeBannerIndex ? styles.activeDot : ""
                }`}
                onClick={() => setActiveBannerIndex(index)}
              />
            ))}
          </div>
        </>
      );
    }

    // Для десктопа показываем все баннеры
    return banners.map((banner) => (
      <div key={banner.id} className={styles.banner}>
        <a href={banner.link} className={styles.bannerLink}>
          <img src={banner.image} alt={t(banner.titleKey)} />
          <div className={styles.bannerOverlay}>
            <h3 className={styles.bannerTitle}>{t(banner.titleKey)}</h3>
          </div>
        </a>
      </div>
    ));
  };

  return (
    <section className={styles.bannersSection}>
      <div className={styles.bannersContainer}>{renderBanners()}</div>
    </section>
  );
};

export default PromoBanners;
