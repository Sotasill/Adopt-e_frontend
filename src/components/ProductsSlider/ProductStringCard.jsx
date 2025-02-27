import PropTypes from "prop-types";
import { MdLocationOn } from "react-icons/md";
import { FaShoppingCart, FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useTranslatedContent } from "../../redux/hooks/useTranslatedContent";
import { useNavigate } from "react-router-dom";
import styles from "./ProductStringCard.module.css";
import commonStyles from "../../styles/common.module.css";
import { useAuthModal } from "../../hooks/useAuthModal";
import AuthModal from "../AuthModal/AuthModal";

const ProductStringCard = ({
  id,
  name = "Без названия",
  image = "/images/default/no-image.webp",
  category = "Без категории",
  price = 0,
  oldPrice,
  city = "",
  country = "",
  badges = [],
  expanded = false,
  onExpand = () => {},
  isFavorite = false,
  onFavoriteClick = () => {},
}) => {
  const { t } = useTranslatedContent();
  const navigate = useNavigate();
  const productType = useSelector((state) => state.productType.productType);
  const { isAuthModalOpen, closeAuthModal, handleFavoriteClick } =
    useAuthModal();

  const getButtonText = () => {
    switch (productType) {
      case "products":
        return t("products.viewDetails");
      case "services":
        return t("services.viewDetails");
      case "veterinary":
        return t("veterinary.viewDetails");
      default:
        return t("products.viewDetails");
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <div className={styles.mediaContainer}>
          <img src={image} alt={name} className={styles.media} />
          <button
            className={styles.favoriteButton}
            onClick={(e) => handleFavoriteClick(e, id, onFavoriteClick)}
            aria-label={
              isFavorite
                ? t("common.removeFromFavorites")
                : t("common.addToFavorites")
            }
            title={
              isFavorite
                ? t("common.removeFromFavorites")
                : t("common.addToFavorites")
            }
          >
            {isFavorite ? (
              <span className={styles.favoriteIconActive}>❤️</span>
            ) : (
              <span className={styles.favoriteIcon}>🤍</span>
            )}
          </button>
        </div>
        <div className={styles.content}>
          <div className={styles.mainInfo}>
            <h3 className={styles.title}>{name}</h3>
            <p className={styles.subtitle}>
              {t(`${productType}.categories.${category}`)}
            </p>
          </div>

          <div className={styles.details}>
            <div className={styles.locationInfo}>
              <MdLocationOn className={styles.locationIcon} />
              <span>
                {city && country
                  ? `${city}, ${country}`
                  : "Местоположение не указано"}
              </span>
            </div>
          </div>

          <div className={styles.priceContainer}>
            <div className={styles.priceInfo}>
              <span className={styles.price}>
                {t(`${productType}.price`, { price })}
              </span>
              {oldPrice && (
                <span className={styles.oldPrice}>
                  {t(`${productType}.price`, { price: oldPrice })}
                </span>
              )}
            </div>
            <button
              className={`${commonStyles.findBreederButton} ${commonStyles.small}`}
              onClick={() => onExpand(id)}
            >
              <FaShoppingCart className={styles.cartIcon} />
              {getButtonText()}
            </button>
          </div>
        </div>
      </div>

      <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} />
    </div>
  );
};

ProductStringCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string,
  image: PropTypes.string,
  category: PropTypes.string,
  price: PropTypes.number,
  oldPrice: PropTypes.number,
  city: PropTypes.string,
  country: PropTypes.string,
  badges: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ),
  expanded: PropTypes.bool,
  onExpand: PropTypes.func,
  isFavorite: PropTypes.bool,
  onFavoriteClick: PropTypes.func,
};

export default ProductStringCard;
