import { useState, useMemo, useEffect } from "react";
import { useTranslatedContent } from "../../redux/hooks/useTranslatedContent";
import { useSelector, useDispatch } from "react-redux";
import {
  setProductType,
  selectProductType,
} from "../../redux/productType/productTypeSlice";
import ControlPanelProducts from "../../components/ControlPanel/ControlPanelProducts";
import ProductCard from "../../components/ProductsSlider/ProductCard";
import ProductStringCard from "../../components/ProductsSlider/ProductStringCard";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import styles from "./ProductsPage.module.css";

const ProductsPage = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("nameAsc");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [expandedCardId, setExpandedCardId] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const productType = useSelector(selectProductType);
  const { t } = useTranslatedContent();

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, [
    productType,
    selectedCategories,
    selectedCountries,
    minPrice,
    maxPrice,
    sortBy,
  ]);

  // Моковые данные из ProductsSlider
  const MOCK_ITEMS = useMemo(
    () => ({
      products: [
        {
          id: 1,
          name: "Royal Canin Premium",
          image: "/images/default/petfood1.webp",
          category: "food",
          price: 2500,
          oldPrice: 3300,
          city: "New York",
          country: "USA",
          badges: [{ type: "Top", text: "Хит продаж" }],
        },
        {
          id: 2,
          name: "Игрушка-пищалка",
          image: "/images/default/petproduct3.webp",
          category: "toys",
          price: 350,
          city: "Kiev",
          country: "Ukraine",
          badges: [{ type: "New", text: "New" }],
        },
        {
          id: 3,
          name: "Витамины для собак",
          image: "/images/default/petproduct1.webp",
          category: "equipment",
          price: 1200,
          oldPrice: 1500,
          city: "Kazan",
          country: "Russia",
        },
        {
          id: 4,
          name: "Лежанка Deluxe",
          image: "/images/default/petproduct5.webp",
          category: "beds",
          price: 3500,
          city: "Paris",
          country: "France",
        },
        {
          id: 5,
          name: "Шампунь для щенков",
          image: "/images/default/petproduct2.webp",
          category: "hygiene",
          price: 450,
          oldPrice: 650,
          city: "Berlin",
          country: "Germany",
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
          oldPrice: 2500,
          city: "Москва",
          country: "Россия",
          badges: [{ type: "Top", text: "Популярная услуга" }],
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
          oldPrice: 1200,
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
          badges: [{ type: "New", text: "Новая услуга" }],
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
          badges: [{ type: "New", text: "Новый врач" }],
        },
        {
          id: 2,
          name: "Вакцинация",
          image: "/images/default/zoo2.webp",
          category: "vaccination",
          price: 1500,
          oldPrice: 2000,
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
          badges: [{ type: "Top", text: "Лучший специалист" }],
        },
        {
          id: 4,
          name: "Чистка зубов",
          image: "/images/default/zoo4.webp",
          category: "dental",
          price: 3000,
          oldPrice: 3500,
          city: "Новосибирск",
          country: "Россия",
        },
        {
          id: 5,
          name: "Стерилизация",
          image: "/images/default/zoo5.webp",
          category: "surgery",
          price: 5000,
          oldPrice: 6000,
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
    }),
    []
  );

  const handleProductTypeChange = (newProductType) => {
    dispatch(setProductType(newProductType));
  };

  // Получаем уникальные категории для текущего типа товаров/услуг
  const uniqueCategories = useMemo(() => {
    return [
      ...new Set(MOCK_ITEMS[productType]?.map((item) => item.category) || []),
    ];
  }, [productType, MOCK_ITEMS]);

  // Получаем уникальные страны
  const countries = useMemo(() => {
    const uniqueCountries = new Set();
    MOCK_ITEMS[productType]?.forEach((item) => {
      if (item.country) {
        uniqueCountries.add(item.country);
      }
    });
    return Array.from(uniqueCountries).map((country) => ({
      code: country,
      name: country,
      flag: `/images/flags/${country.toLowerCase()}.png`,
    }));
  }, [productType, MOCK_ITEMS]);

  // Фильтрация и сортировка
  const filteredAndSortedItems = useMemo(() => {
    let filtered = MOCK_ITEMS[productType] || [];

    // Применяем поиск
    if (searchValue.trim()) {
      const searchLower = searchValue.toLowerCase();
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(searchLower)
      );
    }

    // Применяем фильтры
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((item) =>
        selectedCategories.includes(item.category)
      );
    }

    if (selectedCountries.length > 0) {
      filtered = filtered.filter((item) =>
        selectedCountries.includes(item.country)
      );
    }

    filtered = filtered.filter(
      (item) => item.price >= minPrice && item.price <= maxPrice
    );

    // Применяем сортировку
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "nameAsc":
          return a.name.localeCompare(b.name);
        case "nameDesc":
          return b.name.localeCompare(a.name);
        case "priceAsc":
          return a.price - b.price;
        case "priceDesc":
          return b.price - a.price;
        default:
          return 0;
      }
    });
  }, [
    productType,
    searchValue,
    selectedCategories,
    selectedCountries,
    minPrice,
    maxPrice,
    sortBy,
    MOCK_ITEMS,
  ]);

  const handleCardExpand = (cardId) => {
    setExpandedCardId(expandedCardId === cardId ? null : cardId);
  };

  return (
    <div className={styles.productsPage}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          {productType === "products"
            ? t("products.zootovary")
            : productType === "services"
            ? t("products.services")
            : t("products.veterinary")}
        </h1>
      </div>

      <div className={styles.content}>
        <ControlPanelProducts
          sortBy={sortBy}
          setSortBy={setSortBy}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          selectedCountries={selectedCountries}
          setSelectedCountries={setSelectedCountries}
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          categories={uniqueCategories}
          countries={countries}
          showPriceFilter={true}
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          productType={productType}
          onProductTypeChange={handleProductTypeChange}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />

        {isLoading ? (
          <CustomLoader />
        ) : (
          <div
            className={`${styles.productsList} ${
              viewMode === "grid" ? styles.grid : styles.list
            }`}
          >
            {filteredAndSortedItems.map((item) =>
              viewMode === "grid" ? (
                <ProductCard
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  image={item.image}
                  category={item.category}
                  price={item.price}
                  oldPrice={item.oldPrice}
                  city={item.city}
                  country={item.country}
                  badges={item.badges}
                  expanded={expandedCardId === item.id}
                  onExpand={() => handleCardExpand(item.id)}
                />
              ) : (
                <ProductStringCard
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  image={item.image}
                  category={item.category}
                  price={item.price}
                  oldPrice={item.oldPrice}
                  city={item.city}
                  country={item.country}
                  badges={item.badges}
                  expanded={expandedCardId === item.id}
                  onExpand={() => handleCardExpand(item.id)}
                />
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
