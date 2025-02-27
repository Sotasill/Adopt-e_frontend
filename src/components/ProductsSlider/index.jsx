import React from "react";
import { useFavorites } from "../../redux/hooks/useFavorites";
import ProductCard from "./ProductCard";
// ... остальные импорты

const ProductsSlider = ({ products }) => {
  const { handleToggleFavorite, isFavorite } = useFavorites();

  return (
    <div className={styles.productsSlider}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          {...product}
          isFavorite={isFavorite(product.id)}
          onFavoriteClick={() => handleToggleFavorite(product)}
        />
      ))}
    </div>
  );
};

export default ProductsSlider;
