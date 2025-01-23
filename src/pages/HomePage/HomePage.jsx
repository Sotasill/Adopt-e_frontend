import { useTranslatedContent } from "../../redux/hooks/useTranslatedContent";
import KennelsSlider from "../../components/KennelsSlider/KennelsSlider";
import Hero from "../../components/Hero/Hero";
import PromoBanners from "../../components/PromoBanners/PromoBanners";
import styles from "./HomePage.module.css";

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

  return (
    <div className={styles.container}>
      <Hero />

      <div className={styles.mainContainer}>
        <PromoBanners />
        <KennelsSlider />
      </div>
    </div>
  );
};

export default HomePage;
