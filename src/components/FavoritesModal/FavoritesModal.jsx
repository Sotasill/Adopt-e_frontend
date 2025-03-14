import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { MdClose } from "react-icons/md";
import styles from "./FavoritesModal.module.css";

const FavoritesModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("pets");

  // Получаем избранные объявления из Redux store
  const favorites = useSelector((state) => state.favorites);

  // Ограничиваем количество отображаемых объявлений
  const recentPets = favorites.pets?.slice(0, 3) || [];
  const recentProducts = favorites.products?.slice(0, 3) || [];

  const handleViewAll = () => {
    navigate("/favorites");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          <MdClose size={24} />
        </button>

        <h2 className={styles.title}>{t("favorites.title")}</h2>

        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${
              activeTab === "pets" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("pets")}
          >
            {t("favorites.pets")}
          </button>
          <button
            className={`${styles.tab} ${
              activeTab === "products" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("products")}
          >
            {t("favorites.products")}
          </button>
        </div>

        <div className={styles.content}>
          {activeTab === "pets" && (
            <div className={styles.itemsGrid}>
              {recentPets.length > 0 ? (
                recentPets.map((pet) => (
                  <div key={pet.id} className={styles.item}>
                    <img
                      src={pet.image}
                      alt={pet.name}
                      className={styles.itemImage}
                    />
                    <div className={styles.itemInfo}>
                      <h3>{pet.name}</h3>
                      <p>{pet.breed}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className={styles.emptyMessage}>{t("favorites.noPets")}</p>
              )}
            </div>
          )}

          {activeTab === "products" && (
            <div className={styles.itemsGrid}>
              {recentProducts.length > 0 ? (
                recentProducts.map((product) => (
                  <div key={product.id} className={styles.item}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className={styles.itemImage}
                    />
                    <div className={styles.itemInfo}>
                      <h3>{product.name}</h3>
                      <p>{product.price}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className={styles.emptyMessage}>
                  {t("favorites.noProducts")}
                </p>
              )}
            </div>
          )}
        </div>

        <button className={styles.viewAllButton} onClick={handleViewAll}>
          {t("favorites.viewAll")}
        </button>
      </div>
    </div>
  );
};

FavoritesModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default FavoritesModal;
