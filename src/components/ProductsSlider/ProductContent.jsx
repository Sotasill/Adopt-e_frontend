import { memo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import ProductCard from "./ProductCard";
import ProductStringCard from "./ProductStringCard";
import styles from "./ProductsSlider.module.css";

// Импорты стилей Swiper
import "swiper/css";
import "swiper/css/navigation";

const ProductContent = ({ products }) => {
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
              <ProductStringCard title={product.title} text={product.text} />
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
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default memo(ProductContent);
