import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useFavorites } from "../../redux/hooks/useFavorites";
import PetCard from "../../components/PetSlider/PetCard";
import ProductCard from "../../components/ProductsSlider/ProductCard";
import styles from "./FavoritesPage.module.css";
import { FaPaw } from "react-icons/fa6";
import { MdShoppingBag } from "react-icons/md";
import CustomLoader from "../../components/CustomLoader/CustomLoader";

const FavoritesPage = () => {
  const { t } = useTranslation();
  const { favorites } = useFavorites();
  const [activeTab, setActiveTab] = useState("pets");
  const [isLoading] = useState(false);

  // Разделяем избранное на питомцев и товары
  const favoritePets = favorites.filter(
    (item) => item.type === "pet" || item.breedKey
  );
  const favoriteProducts = favorites.filter((item) => item.category);

  const renderContent = () => {
    if (isLoading) {
      return <CustomLoader />;
    }

    if (activeTab === "pets") {
      if (favoritePets.length === 0) {
        return (
          <div className={styles.emptyState}>
            <FaPaw size={48} />
            <p>{t("favorites.noPets")}</p>
          </div>
        );
      }
      return (
        <div className={styles.grid}>
          {favoritePets.map((pet) => (
            <PetCard
              key={pet.id}
              pet={pet}
              isFavorite={true}
              onFavoriteClick={() => {}}
            />
          ))}
        </div>
      );
    }

    if (favoriteProducts.length === 0) {
      return (
        <div className={styles.emptyState}>
          <MdShoppingBag size={48} />
          <p>{t("favorites.noProducts")}</p>
        </div>
      );
    }
    return (
      <div className={styles.grid}>
        {favoriteProducts.map((product) => (
          <ProductCard
            key={product.id}
            {...product}
            isFavorite={true}
            onFavoriteClick={() => {}}
          />
        ))}
      </div>
    );
  };

  return (
    <div className={styles.favoritesPage}>
      <h1 className={styles.title}>{t("favorites.title")}</h1>

      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${
            activeTab === "pets" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("pets")}
        >
          <FaPaw />
          <span>{t("favorites.pets")}</span>
          <span className={styles.count}>({favoritePets.length})</span>
        </button>
        <button
          className={`${styles.tab} ${
            activeTab === "products" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("products")}
        >
          <MdShoppingBag />
          <span>{t("favorites.products")}</span>
          <span className={styles.count}>({favoriteProducts.length})</span>
        </button>
      </div>

      <div className={styles.content}>{renderContent()}</div>
    </div>
  );
};

export default FavoritesPage;
