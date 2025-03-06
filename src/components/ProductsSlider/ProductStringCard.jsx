import PropTypes from "prop-types";
import { MdLocationOn } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useTranslatedContent } from "../../redux/hooks/useTranslatedContent";
import { useNavigate } from "react-router-dom";
import styles from "./ProductStringCard.module.css";
import commonStyles from "../../styles/common.module.css";
import { useAuthModal } from "../../redux/hooks/useAuthModal";

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
  onOpenAuthModal,
}) => {
  const { t } = useTranslatedContent();
  const navigate = useNavigate();
  const productType = useSelector((state) => state.productType.productType);
  const { handleFavoriteClick: handleAuthFavoriteClick } = useAuthModal();

  const handleMoreClick = () => {
    navigate(`/${productType}`);
  };

  const handleDetailsClick = (e) => {
    e.preventDefault();
    handleAuthFavoriteClick(
      e,
      id,
      () => {
        onExpand(id);
      },
      onOpenAuthModal
    );
  };

  // Специальный рендер для карточки "Показать больше"
  if (category === "more") {
    return (
      <div className={styles.moreProductsCard}>
        <div className={styles.morePetsContent}>
          <div className={styles.morePetsIcon}>
            <FaShoppingCart size={32} />
          </div>
          <h3 className={styles.morePetsTitle}>{name}</h3>
          <p className={styles.morePetsText}>
            {t(`${productType}.viewMoreText`)}
          </p>
          <button
            className={styles.morePetsButton}
            onClick={handleMoreClick}
            aria-label={t(`${productType}.viewMore`)}
          >
            <FaArrowRight size={24} />
          </button>
        </div>
      </div>
    );
  }

  // Вычисляем процент скидки если есть старая цена
  const discount = oldPrice
    ? Math.round(((oldPrice - price) / oldPrice) * 100)
    : 0;

  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <div className={styles.mediaContainer}>
          <img src={image} alt={name} className={styles.media} />
          <button
            className={styles.favoriteButton}
            onClick={(e) =>
              handleAuthFavoriteClick(e, id, onFavoriteClick, onOpenAuthModal)
            }
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
                  : t("common.locationNotSpecified")}
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
              {oldPrice && (
                <span className={styles.priceDiscount}>
                  {t("common.discount", { percent: discount })}
                </span>
              )}
            </div>
            <button
              className={`${commonStyles.findBreederButton} ${commonStyles.small}`}
              onClick={handleDetailsClick}
            >
              <FaShoppingCart className={styles.cartIcon} />
              {t(`${productType}.viewDetails`)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

ProductStringCard.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
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
  onOpenAuthModal: PropTypes.func.isRequired,
};

export default ProductStringCard;
