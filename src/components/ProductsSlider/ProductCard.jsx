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
  description,
  city,
  country,
}) => {
  const { t } = useTranslatedContent();
  const navigate = useNavigate();
  const currentLanguage = useSelector(
    (state) => state.language.currentLanguage
  );
  const productType = useSelector((state) => state.productType.productType);

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
            {t(`${productType}.price`, { price })}
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
  description: PropTypes.string,
  city: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
};

export default ProductCard;
