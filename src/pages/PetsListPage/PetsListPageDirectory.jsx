import { useState, useMemo, useEffect } from "react";
import { useTranslatedContent } from "../../redux/hooks/useTranslatedContent";
import { useSelector, useDispatch } from "react-redux";
import { setPetType, selectPetType } from "../../redux/petType/petTypeSlice";
import ControlPanel from "../../components/ControlPanel/ControlPanel";
import PetCard from "../../components/PetSlider/PetCard";
import PetStringCard from "../../components/PetSlider/PetStringCard";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import AuthModal from "../../components/AuthModal/AuthModal";
import LoginModal from "../../components/LoginModal/LoginModal";
import commonStyles from "../../styles/common.module.css";
import styles from "./PetsListPageDirectory.module.css";
import { useFavorites } from "../../redux/hooks/useFavorites";

const PetsListPage = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("nameAsc");
  const [selectedBreeds, setSelectedBreeds] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedBreeders, setSelectedBreeders] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [minAge, setMinAge] = useState(0);
  const [maxAge, setMaxAge] = useState(20);
  const [expandedCardId, setExpandedCardId] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const dispatch = useDispatch();
  const petType = useSelector(selectPetType);
  const { t } = useTranslatedContent();
  const { handleToggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    // Имитация загрузки данных
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, [
    petType,
    selectedBreeds,
    selectedCountries,
    selectedBreeders,
    minPrice,
    maxPrice,
    sortBy,
  ]);

  // Временные моковые данные для питомцев
  const MOCK_PETS = useMemo(
    () => ({
      dogs: [
        {
          id: 1,
          name: "Макс",
          image: "/images/default/puppy1.webp",
          breedKey: "goldenRetriever",
          type: "dogs",
          ageInMonths: 24,
          gender: "male",
          price: 1200,
          oldPrice: 1500,
          breederId: "breeder1",
          city: "Kyiv",
          country: "Ukraine",
          badges: [{ type: "top", text: t("badges.top") }],
        },
        {
          id: 2,
          name: "Белла",
          image: "/images/default/puppy2.webp",
          breedKey: "germanShepherd",
          type: "dogs",
          ageInMonths: 12,
          gender: "female",
          price: 1800,
          breederId: "breeder2",
          city: "Kyiv",
          country: "Ukraine",
          badges: [{ type: "new", text: t("badges.new") }],
        },
        {
          id: 3,
          name: "Чарли",
          image: "/images/default/puppy3.webp",
          breedKey: "husky",
          type: "dogs",
          ageInMonths: 36,
          gender: "male",
          price: 1500,
          oldPrice: 2000,
          breederId: "breeder3",
          city: "Rivne",
          country: "Ukraine",
        },
        {
          id: 4,
          name: "Люси",
          image: "/images/default/puppy4.webp",
          breedKey: "labrador",
          type: "dogs",
          ageInMonths: 12,
          gender: "female",
          price: 1700,
          breederId: "breeder4",
          city: "Rivne",
          country: "Ukraine",
        },
        {
          id: 5,
          name: "Рокки",
          image: "/images/default/puppy5.webp",
          breedKey: "rottweiler",
          type: "dogs",
          ageInMonths: 24,
          gender: "male",
          price: 1800,
          oldPrice: 2200,
          breederId: "breeder5",
          city: "Rivne",
          country: "Ukraine",
        },
        {
          id: 6,
          name: "Дейзи",
          image: "/images/default/puppy6.webp",
          breedKey: "beagle",
          type: "dogs",
          ageInMonths: 12,
          gender: "female",
          price: 1600,
          breederId: "breeder6",
          city: "Rivne",
          country: "Ukraine",
        },
      ],
      cats: [
        {
          id: 1,
          name: "Луна",
          image: "/images/default/kitten1.webp",
          breedKey: "persian",
          type: "cats",
          ageInMonths: 12,
          gender: "female",
          price: 900,
          oldPrice: 1200,
          breederId: "breeder7",
          city: "Kyiv",
          country: "Ukraine",
          badges: [{ type: "top", text: t("badges.top") }],
        },
        {
          id: 2,
          name: "Симба",
          image: "/images/default/kitten2.webp",
          breedKey: "maineCoon",
          type: "cats",
          ageInMonths: 24,
          gender: "male",
          price: 1500,
          breederId: "breeder8",
          city: "Kyiv",
          country: "Ukraine",
        },
        {
          id: 3,
          name: "Мия",
          image: "/images/default/kitten3.webp",
          breedKey: "britishShorthair",
          type: "cats",
          ageInMonths: 12,
          gender: "female",
          price: 1000,
          oldPrice: 1300,
          breederId: "breeder9",
          city: "Lviv",
          country: "Ukraine",
        },
        {
          id: 4,
          name: "Оливер",
          image: "/images/default/kitten4.webp",
          breedKey: "scottishFold",
          type: "cats",
          ageInMonths: 24,
          gender: "male",
          price: 1400,
          breederId: "breeder10",
          city: "Lviv",
          country: "Ukraine",
          badges: [{ type: "new", text: t("badges.new") }],
        },
        {
          id: 5,
          name: "Лилу",
          image: "/images/default/kitten5.webp",
          breedKey: "siamese",
          type: "cats",
          ageInMonths: 12,
          gender: "female",
          price: 1200,
          oldPrice: 1600,
          breederId: "breeder11",
          city: "Chervonograd",
          country: "Ukraine",
        },
        {
          id: 6,
          name: "Феликс",
          image: "/images/default/kitten6.webp",
          breedKey: "bengal",
          type: "cats",
          ageInMonths: 24,
          gender: "male",
          price: 2000,
          breederId: "breeder12",
          city: "Chervonograd",
          country: "Ukraine",
        },
      ],
    }),
    [t]
  );

  const handlePetTypeChange = (newPetType) => {
    dispatch(setPetType(newPetType));
  };

  // Получаем уникальные породы для текущего типа животных
  const uniqueBreeds = useMemo(() => {
    return [...new Set(MOCK_PETS[petType]?.map((pet) => pet.breedKey) || [])];
  }, [petType, MOCK_PETS]);

  // Получаем уникальные страны для текущего типа животных
  const countries = useMemo(() => {
    const uniqueCountries = new Set();
    MOCK_PETS[petType]?.forEach((pet) => {
      if (pet.country) {
        uniqueCountries.add(pet.country);
      }
    });
    return Array.from(uniqueCountries).map((country) => ({
      code: country,
      name: country,
      flag: `/images/flags/${country.toLowerCase()}.png`,
    }));
  }, [petType, MOCK_PETS]);

  // Получаем уникальных заводчиков для текущего типа животных
  const breeders = useMemo(() => {
    const uniqueBreeders = new Set();
    MOCK_PETS[petType]?.forEach((pet) => {
      if (pet.breederId) {
        uniqueBreeders.add(pet.breederId);
      }
    });
    return Array.from(uniqueBreeders).map((id) => ({
      id,
      name: `Заводчик ${id}`, // В реальном приложении здесь будут настоящие имена заводчиков
    }));
  }, [petType, MOCK_PETS]);

  // Обновляем фильтрацию, добавляя фильтры по цене и заводчикам
  const filteredAndSortedPets = useMemo(() => {
    let filtered = MOCK_PETS[petType] || [];

    // Применяем поиск
    if (searchValue.trim()) {
      const searchLower = searchValue.toLowerCase();
      filtered = filtered.filter((pet) =>
        pet.name.toLowerCase().includes(searchLower)
      );
    }

    // Применяем фильтры
    if (selectedBreeds.length > 0) {
      filtered = filtered.filter((pet) =>
        selectedBreeds.includes(pet.breedKey)
      );
    }

    if (selectedCountries.length > 0) {
      filtered = filtered.filter((pet) =>
        selectedCountries.includes(pet.country)
      );
    }

    if (selectedBreeders.length > 0) {
      filtered = filtered.filter((pet) =>
        selectedBreeders.includes(pet.breederId)
      );
    }

    filtered = filtered.filter(
      (pet) =>
        pet.ageInMonths >= minAge * 12 &&
        pet.ageInMonths <= maxAge * 12 &&
        pet.price >= minPrice &&
        pet.price <= maxPrice
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
        case "ageDesc":
          return b.ageInMonths - a.ageInMonths;
        case "ageAsc":
          return a.ageInMonths - b.ageInMonths;
        default:
          return 0;
      }
    });
  }, [
    petType,
    searchValue,
    selectedBreeds,
    selectedCountries,
    selectedBreeders,
    minAge,
    maxAge,
    minPrice,
    maxPrice,
    sortBy,
    MOCK_PETS,
  ]);

  const handleCardExpand = (cardId) => {
    setExpandedCardId(expandedCardId === cardId ? null : cardId);
  };

  const handleOpenAuthModal = () => {
    setIsAuthModalOpen(true);
  };

  const handleCloseAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const handleOpenLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  return (
    <div className={styles.petsListPage}>
      <div className={styles.header}>
        <h1 className={styles.title}>{t("pets.title")}</h1>
      </div>

      <div className={styles.content}>
        <ControlPanel
          sortBy={sortBy}
          setSortBy={setSortBy}
          selectedBreeds={selectedBreeds}
          setSelectedBreeds={setSelectedBreeds}
          selectedCountries={selectedCountries}
          setSelectedCountries={setSelectedCountries}
          selectedBreeders={selectedBreeders}
          setSelectedBreeders={setSelectedBreeders}
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          breeds={uniqueBreeds}
          countries={countries}
          breeders={breeders}
          showPriceFilter={true}
          showRatingFilter={false}
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          petType={petType}
          onPetTypeChange={handlePetTypeChange}
          viewMode={viewMode}
          setViewMode={setViewMode}
          t={t}
        />

        {isLoading ? (
          <CustomLoader />
        ) : (
          <div
            className={`${styles.petsList} ${
              viewMode === "grid" ? styles.grid : styles.list
            }`}
          >
            {filteredAndSortedPets.map((pet) =>
              viewMode === "grid" ? (
                <PetCard
                  key={pet.id}
                  pet={pet}
                  isFavorite={isFavorite(pet.id)}
                  onFavoriteClick={() => handleToggleFavorite(pet)}
                  onOpenAuthModal={handleOpenAuthModal}
                />
              ) : (
                <PetStringCard
                  key={pet.id}
                  pet={pet}
                  isFavorite={isFavorite(pet.id)}
                  onFavoriteClick={() => handleToggleFavorite(pet)}
                  onOpenAuthModal={handleOpenAuthModal}
                />
              )
            )}
          </div>
        )}
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={handleCloseAuthModal}
        onLoginClick={handleOpenLoginModal}
      />
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </div>
  );
};

export default PetsListPage;
