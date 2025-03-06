import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslatedContent } from "../../redux/hooks/useTranslatedContent";
import styles from "./ProductPage.module.css";
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  Rating,
  Chip,
  TextField,
} from "@mui/material";
import {
  FaShoppingCart,
  FaHeart,
  FaTruck,
  FaShieldAlt,
  FaUndo,
  FaCreditCard,
} from "react-icons/fa";

// Моковые данные для товаров
const MOCK_PRODUCTS = {
  products: [
    {
      id: 1,
      name: "Royal Canin Maxi Adult",
      image: "/images/products/royal-canin.webp",
      category: "Корм",
      type: "products",
      price: 89.99,
      oldPrice: 99.99,
      rating: 4.8,
      reviewsCount: 245,
      inStock: true,
      description:
        "Премиальный сухой корм для взрослых собак крупных пород. Способствует поддержанию идеального веса и здоровья суставов.",
      features: [
        "Для собак крупных пород",
        "Возраст: от 15 месяцев",
        "Вес упаковки: 15 кг",
        "Беззерновой состав",
        "Содержание протеина: 26%",
      ],
      specifications: {
        brand: "Royal Canin",
        weight: "15 кг",
        type: "Сухой корм",
        age: "Взрослые собаки",
        specialNeeds: "Нет",
        madeIn: "Франция",
      },
      ingredients: [
        "Дегидратированное мясо птицы",
        "Кукуруза",
        "Животные жиры",
        "Пшеница",
        "Гидролизат белков животного происхождения",
        "Свекольный жом",
        "Минеральные вещества",
      ],
      benefits: [
        "Поддержание мышечной массы",
        "Здоровье суставов и костей",
        "Легкое усвоение",
        "Здоровая кожа и шерсть",
        "Крепкий иммунитет",
      ],
      gallery: [
        "/images/products/royal-canin.webp",
        "/images/products/royal-canin-2.webp",
        "/images/products/royal-canin-3.webp",
        "/images/products/royal-canin-4.webp",
      ],
      reviews: [
        {
          author: "Анна М.",
          rating: 5,
          date: "2024-02-15",
          text: "Отличный корм! Собака в восторге, шерсть стала блестящей.",
          pros: "Качество, состав, результат",
          cons: "Цена выше среднего",
        },
        {
          author: "Игорь К.",
          rating: 4,
          date: "2024-02-10",
          text: "Хороший корм, но дороговато",
          pros: "Качество, удобная упаковка",
          cons: "Высокая цена",
        },
      ],
      delivery: {
        free: true,
        express: true,
        estimatedDays: "1-3 дня",
      },
      warranty: "30 дней гарантия возврата",
      badges: [
        { type: "top", text: "Топ продаж" },
        { type: "sale", text: "Скидка 10%" },
      ],
    },
  ],
  services: [
    // Сервисы...
  ],
};

const ProductPage = () => {
  const { id, type } = useParams();
  const { t } = useTranslatedContent();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Здесь будет API запрос к серверу
    // Временно используем моковые данные
    const foundProduct = MOCK_PRODUCTS[type]?.find(
      (p) => p.id === parseInt(id)
    );
    setProduct(foundProduct);
    if (foundProduct) {
      setSelectedImage(foundProduct.image);
    }
    setLoading(false);
  }, [id, type]);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (!product) {
    return <div>Товар не найден</div>;
  }

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  return (
    <Container className={styles.productPage}>
      <Grid container spacing={4}>
        {/* Галерея */}
        <Grid item xs={12} md={6}>
          <Box className={styles.mainGallery}>
            <img
              src={selectedImage}
              alt={product.name}
              className={styles.mainImage}
            />
            <Grid container spacing={1} className={styles.thumbnails}>
              {product.gallery.map((image, index) => (
                <Grid item xs={3} key={index}>
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className={`${styles.thumbnail} ${
                      selectedImage === image ? styles.selected : ""
                    }`}
                    onClick={() => setSelectedImage(image)}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>

        {/* Информация о товаре */}
        <Grid item xs={12} md={6}>
          <Box className={styles.productInfo}>
            <Typography variant="h4" className={styles.productName}>
              {product.name}
            </Typography>

            <Box className={styles.badges}>
              {product.badges?.map((badge, index) => (
                <Chip
                  key={index}
                  label={badge.text}
                  className={`${styles.badge} ${styles[badge.type]}`}
                />
              ))}
            </Box>

            <Box className={styles.ratingSection}>
              <Rating value={product.rating} precision={0.1} readOnly />
              <Typography variant="body2">
                {product.rating} ({product.reviewsCount} отзывов)
              </Typography>
            </Box>

            <Box className={styles.priceSection}>
              {product.oldPrice && (
                <Typography variant="body1" className={styles.oldPrice}>
                  ${product.oldPrice}
                </Typography>
              )}
              <Typography variant="h4" className={styles.price}>
                ${product.price}
              </Typography>
            </Box>

            <Box className={styles.stockInfo}>
              <Chip
                label={product.inStock ? "В наличии" : "Нет в наличии"}
                color={product.inStock ? "success" : "error"}
              />
            </Box>

            <Box className={styles.quantitySection}>
              <TextField
                type="number"
                label="Количество"
                value={quantity}
                onChange={handleQuantityChange}
                inputProps={{ min: 1 }}
                variant="outlined"
                size="small"
              />
            </Box>

            <Box className={styles.actionButtons}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                startIcon={<FaShoppingCart />}
                className={styles.addToCartButton}
              >
                Добавить в корзину
              </Button>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                startIcon={<FaHeart />}
                className={styles.favoriteButton}
              >
                В избранное
              </Button>
            </Box>

            <Box className={styles.benefits}>
              <div className={styles.benefitItem}>
                <FaTruck />
                <Typography>
                  {product.delivery.free
                    ? "Бесплатная доставка"
                    : "Платная доставка"}
                </Typography>
              </div>
              <div className={styles.benefitItem}>
                <FaShieldAlt />
                <Typography>{product.warranty}</Typography>
              </div>
              <div className={styles.benefitItem}>
                <FaUndo />
                <Typography>Возврат в течение 30 дней</Typography>
              </div>
              <div className={styles.benefitItem}>
                <FaCreditCard />
                <Typography>Безопасная оплата</Typography>
              </div>
            </Box>
          </Box>
        </Grid>

        {/* Описание */}
        <Grid item xs={12}>
          <Box className={styles.section}>
            <Typography variant="h6" className={styles.sectionTitle}>
              Описание
            </Typography>
            <Typography paragraph>{product.description}</Typography>
          </Box>
        </Grid>

        {/* Характеристики */}
        <Grid item xs={12} md={6}>
          <Box className={styles.section}>
            <Typography variant="h6" className={styles.sectionTitle}>
              Характеристики
            </Typography>
            <div className={styles.specifications}>
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className={styles.specificationItem}>
                  <Typography variant="body2" className={styles.specKey}>
                    {key}:
                  </Typography>
                  <Typography variant="body2" className={styles.specValue}>
                    {value}
                  </Typography>
                </div>
              ))}
            </div>
          </Box>
        </Grid>

        {/* Особенности */}
        <Grid item xs={12} md={6}>
          <Box className={styles.section}>
            <Typography variant="h6" className={styles.sectionTitle}>
              Особенности
            </Typography>
            <ul className={styles.featuresList}>
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </Box>
        </Grid>

        {/* Состав */}
        <Grid item xs={12}>
          <Box className={styles.section}>
            <Typography variant="h6" className={styles.sectionTitle}>
              Состав
            </Typography>
            <ul className={styles.ingredientsList}>
              {product.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </Box>
        </Grid>

        {/* Преимущества */}
        <Grid item xs={12}>
          <Box className={styles.section}>
            <Typography variant="h6" className={styles.sectionTitle}>
              Преимущества
            </Typography>
            <ul className={styles.benefitsList}>
              {product.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </Box>
        </Grid>

        {/* Отзывы */}
        <Grid item xs={12}>
          <Box className={styles.section}>
            <Typography variant="h6" className={styles.sectionTitle}>
              Отзывы
            </Typography>
            <div className={styles.reviews}>
              {product.reviews.map((review, index) => (
                <Box key={index} className={styles.review}>
                  <Box className={styles.reviewHeader}>
                    <Typography variant="subtitle1">{review.author}</Typography>
                    <Rating value={review.rating} readOnly size="small" />
                    <Typography variant="body2" color="textSecondary">
                      {review.date}
                    </Typography>
                  </Box>
                  <Typography paragraph>{review.text}</Typography>
                  <Box className={styles.reviewDetails}>
                    <Typography variant="body2" color="success.main">
                      <strong>Плюсы:</strong> {review.pros}
                    </Typography>
                    <Typography variant="body2" color="error.main">
                      <strong>Минусы:</strong> {review.cons}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </div>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductPage;
