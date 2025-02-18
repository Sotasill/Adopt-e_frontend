import PropTypes from "prop-types";
import { MdLocationOn } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useTranslatedContent } from "../../redux/hooks/useTranslatedContent";
import styles from "./ProductStringCard.module.css";
import commonStyles from "../../styles/common.module.css";

const ProductStringCard = ({
  id,
  name,
  image,
  category,
  price,
  oldPrice,
  city,
  country,
  badges,
  expanded,
  onExpand,
}) => {
  const { t } = useTranslatedContent();
  const productType = useSelector((state) => state.productType.productType);

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
        <img
          src={image || "/images/default/no-image.webp"}
          alt={name || ""}
          className={styles.media}
        />
        <div className={styles.content}>
          <div className={styles.mainInfo}>
            <h3 className={styles.title}>{name || "Без названия"}</h3>
            <p className={styles.subtitle}>
              {t(`${productType}.categories.${category}`) || "Без категории"}
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
  onExpand: PropTypes.func.isRequired,
};

ProductStringCard.defaultProps = {
  name: "Без названия",
  image: "/images/default/no-image.webp",
  category: "Без категории",
  price: 0,
  city: "",
  country: "",
  badges: [],
};

export default ProductStringCard;
