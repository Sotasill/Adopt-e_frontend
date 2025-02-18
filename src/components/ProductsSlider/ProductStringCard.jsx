import { memo } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ProductsSlider.module.css";

const ProductStringCard = ({ title, text }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/products");
  };

  return (
    <div className={styles.productStringCard} onClick={handleClick}>
      <div className={styles.productStringContent}>
        <h3 className={styles.productStringTitle}>{title}</h3>
        <p className={styles.productStringText}>{text}</p>
      </div>
    </div>
  );
};

export default memo(ProductStringCard);
