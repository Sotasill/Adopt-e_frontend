import { memo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import ProductCard from "./ProductCard";
import ProductStringCard from "./ProductStringCard";
import styles from "./ProductsSlider.module.css";
import { useFavorites } from "../../redux/hooks/useFavorites";
import PropTypes from "prop-types";

// Импорты стилей Swiper
import "swiper/css";
import "swiper/css/navigation";

const ProductContent = ({ products, onOpenAuthModal }) => {
  const { handleToggleFavorite, isFavorite } = useFavorites();

  return (
    <div className={styles.productsSlider}>
      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={4}
        navigation
        className={styles.swiper}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          480: {
            slidesPerView: 1,
            spaceBetween: 15,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id} className={styles.productCardWrapper}>
            {product.isMoreProducts ? (
              <ProductStringCard
                id={product.id}
                name={product.title}
                category="more"
                price={0}
                city=""
                country=""
                expanded={false}
                isFavorite={false}
                onFavoriteClick={() => {}}
                onOpenAuthModal={onOpenAuthModal}
              />
            ) : (
              <ProductCard
                id={product.id}
                name={product.name}
                image={product.image}
                category={product.category}
                price={product.price}
                oldPrice={product.oldPrice}
                description={product.description}
                city={product.city}
                country={product.country}
                badges={product.badges}
                isFavorite={isFavorite(product.id)}
                onFavoriteClick={() => handleToggleFavorite(product)}
                onOpenAuthModal={onOpenAuthModal}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

ProductContent.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        oldPrice: PropTypes.number,
        city: PropTypes.string.isRequired,
        country: PropTypes.string.isRequired,
        badges: PropTypes.arrayOf(
          PropTypes.shape({
            type: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
          })
        ),
      }),
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        isMoreProducts: PropTypes.bool.isRequired,
        title: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
      }),
    ])
  ).isRequired,
  onOpenAuthModal: PropTypes.func.isRequired,
};

export default memo(ProductContent);
