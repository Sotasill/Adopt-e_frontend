import { useEffect } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { setProductType } from "../../redux/productType/productTypeSlice";
import ViewControlsProducts from "../../components/ViewControlsProducts/ViewControls";
import styles from "./ProductsPage.module.css";

const ProductsPage = ({ type }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setProductType(type));
  }, [dispatch, type]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Продукты и услуги</h1>
      <ViewControlsProducts
        productType={type}
        onProductTypeChange={(newType) => dispatch(setProductType(newType))}
        showSort={true}
        hideSearch={false}
      />
      {/* Здесь будет список продуктов */}
    </div>
  );
};

ProductsPage.propTypes = {
  type: PropTypes.oneOf(["products", "services", "veterinary"]).isRequired,
};

export default ProductsPage;
