import { useTranslatedContent } from "../../redux/hooks/useTranslatedContent";
import { FaShoppingCart } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./ProductsSlider.module.css";
import commonStyles from "../../styles/common.module.css";
import countries from "../../redux/language/dictionaries/countries.json";
import { useSelector } from "react-redux";

const ProductCard = ({
  id,
  name,
  image,
  category,
  price,
  oldPrice,
  description,
  city,
  country,
  badges = [],
}) => {
  const { t } = useTranslatedContent();
  const navigate = useNavigate();
  const currentLanguage = useSelector(
    (state) => state.language.currentLanguage
  );
  const productType = useSelector((state) => state.productType.productType);

  // Вычисляем процент скидки если есть старая цена
  const discount = oldPrice
    ? Math.round(((oldPrice - price) / oldPrice) * 100)
    : 0;

  // Добавляем бейдж скидки автоматически, если есть старая цена
  const allBadges = [
    ...(oldPrice
      ? [
          {
            type: "discount",
            text: t("badges.discount", { percent: discount }),
          },
        ]
      : []),
    ...badges.map((badge) => ({
      type: badge.type.toLowerCase(),
      text: t(`badges.${badge.type.toLowerCase()}`),
    })),
  ];

  const getCountryInfo = (countryName) => {
    const countryKey = Object.keys(countries).find(
      (key) => countries[key].ru === countryName
    );

    if (countryKey) {
      const countryData = countries[countryKey];
      return {
        flag: countryData.flag,
        name: countryData[currentLanguage] || countryData.en || countryData.ru,
      };
    }

    return {
      flag: "🌍",
      name: countryName,
    };
  };

  const countryInfo = getCountryInfo(country);

  const handleClick = () => {
    navigate(`/${productType}/${id}`);
  };

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
    <div className={styles.productCard}>
      <div className={styles.imageContainer}>
        <img src={image} alt={name} className={styles.productImage} />
        <div className={styles.badges}>
          {allBadges.map((badge, index) => (
            <span
              key={index}
              className={`${styles.badge} ${
                styles[
                  `badge${badge.type.charAt(0).toUpperCase()}${badge.type.slice(
                    1
                  )}`
                ]
              }`}
            >
              {badge.text}
            </span>
          ))}
        </div>
      </div>
      <div className={styles.productInfo}>
        <div className={styles.productNameBreed}>
          <h3 className={styles.productName}>{name}</h3>
          <p className={styles.productCategory}>
            {t(`${productType}.categories.${category}`)}
          </p>
        </div>
        <div className={styles.productDetails}>
          <div className={styles.descriptionContainer}>
            <span className={styles.description}>{description}</span>
          </div>
          <div className={styles.locationContainer}>
            <MdLocationOn className={styles.locationIcon} />
            <div className={styles.locationInfo}>
              <span className={styles.city}>{city}</span>
              <span className={styles.countryInfo}>
                <span className={styles.countryFlag}>{countryInfo.flag}</span>
                <span className={styles.countryName}>{countryInfo.name}</span>
              </span>
            </div>
          </div>
          <div className={styles.price}>
            {oldPrice && (
              <span className={styles.priceOld}>
                {t(`${productType}.price`, { price: oldPrice })}
              </span>
            )}
            <span className={oldPrice ? styles.priceNew : ""}>
              {t(`${productType}.price`, { price })}
            </span>
            {oldPrice && (
              <span className={styles.priceDiscount}>Экономия {discount}%</span>
            )}
          </div>
        </div>
        <button
          className={`${commonStyles.findBreederButton} ${commonStyles.small}`}
          onClick={handleClick}
        >
          <FaShoppingCart className={styles.cartIcon} />
          {getButtonText()}
        </button>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  oldPrice: PropTypes.number,
  description: PropTypes.string,
  city: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  badges: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.oneOf(["Top", "Discount", "New"]).isRequired,
      text: PropTypes.string.isRequired,
    })
  ),
};

export default ProductCard;
