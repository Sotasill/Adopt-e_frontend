import KennelsSlider from "../../components/KennelsSlider/KennelsSlider";
import PetSlider from "../../components/PetSlider/PetSlider";
import ProductsSlider from "../../components/ProductsSlider/ProductsSlider";
import Hero from "../../components/Hero/Hero";
import PromoBanners from "../../components/PromoBanners/PromoBanners";
import styles from "./HomePage.module.css";

const HomePage = () => {
  return (
    <div className={styles.container}>
      <Hero />
      <div className={styles.mainContainer}>
        <PromoBanners />
        <KennelsSlider />
        <PetSlider />
        <ProductsSlider />
      </div>
    </div>
  );
};

export default HomePage;
