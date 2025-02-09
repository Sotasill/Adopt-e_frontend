import { memo, useState, useMemo, useEffect } from "react";
import { useTranslatedContent } from "../../redux/hooks/useTranslatedContent";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectProductType,
  setProductType,
} from "../../redux/productType/productTypeSlice";
import ProductContent from "./ProductContent";
import ViewControlsProducts from "../ViewControlsProducts/ViewControls";
import styles from "./ProductsSlider.module.css";

// Моковые данные
const MOCK_ITEMS = {
  products: [
    {
      id: 1,
      name: "Royal Canin Premium",
      image: "/images/default/petfood1.webp",
      category: "food",
      price: 2500,
      city: "Москва",
      country: "Россия",
    },
    {
      id: 2,
      name: "Игрушка-пищалка",
      image: "/images/default/petproduct3.webp",
      category: "toys",
      price: 350,
      city: "Санкт-Петербург",
      country: "Россия",
    },
    {
      id: 3,
      name: "Витамины для собак",
      image: "/images/default/petproduct1.webp",
      category: "equipment",
      price: 1200,
      city: "Казань",
      country: "Россия",
    },
    {
      id: 4,
      name: "Лежанка Deluxe",
      image: "/images/default/petproduct5.webp",
      category: "beds",
      price: 3500,
      city: "Новосибирск",
      country: "Россия",
    },
    {
      id: 5,
      name: "Шампунь для щенков",
      image: "/images/default/petproduct2.webp",
      category: "hygiene",
      price: 450,
      city: "Екатеринбург",
      country: "Россия",
    },
    {
      id: 6,
      name: "Корм для собак",
      image: "/images/default/petfood2.webp",
      category: "accessories",
      price: 800,
      city: "Краснодар",
      country: "Россия",
    },
  ],
  services: [
    {
      id: 1,
      name: "Стрижка собак",
      image: "/images/default/petstore1.webp",
      category: "grooming",
      price: 2000,
      city: "Москва",
      country: "Россия",
    },
    {
      id: 2,
      name: "Курс дрессировки",
      image: "/images/default/petstore2.webp",
      category: "training",
      price: 8000,
      city: "Санкт-Петербург",
      country: "Россия",
    },
    {
      id: 3,
      name: "Передержка (сутки)",
      image: "/images/default/petstore3.webp",
      category: "boarding",
      price: 1000,
      city: "Казань",
      country: "Россия",
    },
    {
      id: 4,
      name: "Выгул собак",
      image: "/images/default/cut3.webp",
      category: "walking",
      price: 500,
      city: "Новосибирск",
      country: "Россия",
    },
    {
      id: 5,
      name: "Фотосессия",
      image: "/images/default/cut2.webp",
      category: "photoshoot",
      price: 3000,
      city: "Екатеринбург",
      country: "Россия",
    },
    {
      id: 6,
      name: "Зоотакси",
      image: "/images/default/petstore6.webp",
      category: "petaxi",
      price: 1500,
      city: "Краснодар",
      country: "Россия",
    },
  ],
  veterinary: [
    {
      id: 1,
      name: "Первичный осмотр",
      image: "/images/default/zoo1.webp",
      category: "consultation",
      price: 1000,
      city: "Москва",
      country: "Россия",
    },
    {
      id: 2,
      name: "Вакцинация",
      image: "/images/default/zoo2.webp",
      category: "vaccination",
      price: 1500,
      city: "Санкт-Петербург",
      country: "Россия",
    },
    {
      id: 3,
      name: "УЗИ",
      image: "/images/default/zoo3.webp",
      category: "diagnostics",
      price: 2000,
      city: "Казань",
      country: "Россия",
    },
    {
      id: 4,
      name: "Чистка зубов",
      image: "/images/default/zoo4.webp",
      category: "dental",
      price: 3000,
      city: "Новосибирск",
      country: "Россия",
    },
    {
      id: 5,
      name: "Стерилизация",
      image: "/images/default/zoo5.webp",
      category: "surgery",
      price: 5000,
      city: "Екатеринбург",
      country: "Россия",
    },
    {
      id: 6,
      name: "Анализ крови",
      image: "/images/default/zoo6.webp",
      category: "tests",
      price: 1200,
      city: "Краснодар",
      country: "Россия",
    },
  ],
};

const ProductsSlider = () => {
  const { t } = useTranslatedContent();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productType = useSelector(selectProductType);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  // Восстанавливаем тип из localStorage при монтировании
  useEffect(() => {
    const savedProductType = localStorage.getItem("productType");
    if (savedProductType && savedProductType !== productType) {
      dispatch(setProductType(savedProductType));
    }
  }, [dispatch, productType]);

  const handleProductTypeChange = (type) => {
    console.log("ProductsSlider: changing type to", type); // Для отладки
    if (type !== productType) {
      dispatch(setProductType(type));
      localStorage.setItem("productType", type);
    }
  };

  const filteredAndSortedItems = useMemo(() => {
    let items = MOCK_ITEMS[productType] || [];

    // Применяем поиск
    if (searchQuery) {
      items = items.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Применяем сортировку
    items = [...items].sort((a, b) => {
      const modifier = sortOrder === "asc" ? 1 : -1;
      return modifier * a.name.localeCompare(b.name);
    });

    // Добавляем карточку "Показать больше"
    const moreItemsCard = {
      id: "more-items",
      isMoreProducts: true,
      title: t(`${productType}.viewMore`),
      text: t(`${productType}.viewMoreText`),
    };
    return [...items, moreItemsCard];
  }, [productType, searchQuery, sortOrder, t]);

  return (
    <section id="products-slider" className={styles.productsSection}>
      <div className={styles.productsSectionHeader}>
        <h2
          className={styles.sectionTitle}
          onClick={() => navigate(`/${productType}`)}
        >
          {t(`${productType}.findProducts`)}
        </h2>

        <ViewControlsProducts
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
          productType={productType}
          onProductTypeChange={handleProductTypeChange}
          sortOrder={sortOrder}
          onSortChange={setSortOrder}
          showSort={false}
          hideSearch={true}
        />
      </div>

      <ProductContent products={filteredAndSortedItems} />
    </section>
  );
};

export default memo(ProductsSlider);
