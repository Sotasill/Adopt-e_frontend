import { useState, useMemo } from "react";
import { useTranslatedContent } from "../../redux/hooks/useTranslatedContent";
import { useCountries } from "../../redux/hooks/useCountries";
import { useSelector, useDispatch } from "react-redux";
import { setPetType, selectPetType } from "../../redux/petType/petTypeSlice";
import KennelCard from "../../components/KennelsSlider/KennelCard";
import KennelStringCard from "../../components/KennelsSlider/KennelStringCard";
import ControlPanel from "../../components/ControlPanel/ControlPanel";
import styles from "./BreedersPage.module.css";

// Используем те же моковые данные, что и в слайдере
const MOCK_KENNELS = {
  dogs: [
    {
      id: 1,
      name: "Golden Paradise",
      logo: "/images/dogbreeder/1737585129219.jpg",
      breedKey: "kennels.list.goldenParadise.breed",
      countryKey: "kennels.list.countries.us",
      rating: 4.8,
      socials: {
        facebook: true,
        instagram: true,
        youtube: true,
        twitter: true,
      },
    },
    {
      id: 2,
      name: "Royal Paws",
      logo: "/images/dogbreeder/1737585125838.jpg",
      breedKey: "kennels.list.royalPaws.breed",
      countryKey: "kennels.list.countries.gb",
      rating: 4.5,
      socials: {
        facebook: true,
        instagram: true,
        youtube: false,
        twitter: true,
      },
    },
    {
      id: 3,
      name: "Elite German Shepherds",
      logo: "/images/dogbreeder/1737585098223.jpg",
      breedKey: "kennels.list.eliteGermanShepherds.breed",
      countryKey: "kennels.list.countries.de",
      rating: 4.9,
      socials: {
        facebook: true,
        instagram: true,
        youtube: true,
        twitter: false,
      },
    },
    {
      id: 4,
      name: "Siberian Stars",
      logo: "/images/dogbreeder/1737585094922.jpg",
      breedKey: "kennels.list.siberianStars.breed",
      countryKey: "kennels.list.countries.ru",
      rating: 4.7,
      socials: {
        facebook: true,
        instagram: true,
        youtube: false,
        twitter: false,
      },
    },
    {
      id: 5,
      name: "Majestic Paws",
      logo: "/images/dogbreeder/1737585055764.jpg",
      breedKey: "kennels.list.goldenParadise.breed",
      countryKey: "kennels.list.countries.us",
      rating: 4.6,
      socials: {
        facebook: true,
        instagram: true,
        youtube: true,
        twitter: true,
      },
    },
    {
      id: 6,
      name: "Noble Canines",
      logo: "/images/dogbreeder/1737585046034.jpg",
      breedKey: "kennels.list.royalPaws.breed",
      countryKey: "kennels.list.countries.gb",
      rating: 4.8,
      socials: {
        facebook: true,
        instagram: true,
        youtube: false,
        twitter: true,
      },
    },
  ],
  cats: [
    {
      id: 1,
      name: "Persian Palace",
      logo: "/images/catbreeder/1737585215040.jpg",
      breedKey: "kennels.list.persianPalace.breed",
      countryKey: "kennels.list.countries.ir",
      rating: 4.6,
      socials: {
        facebook: true,
        instagram: true,
        youtube: false,
        twitter: true,
      },
    },
    {
      id: 2,
      name: "British Charm",
      logo: "/images/catbreeder/1737585211710.jpg",
      breedKey: "kennels.list.britishCharm.breed",
      countryKey: "kennels.list.countries.gb",
      rating: 4.9,
      socials: {
        facebook: true,
        instagram: true,
        youtube: true,
        twitter: true,
      },
    },
    {
      id: 3,
      name: "Maine Coon Magic",
      logo: "/images/catbreeder/1737585186942.jpg",
      breedKey: "kennels.list.maineCoonMagic.breed",
      countryKey: "kennels.list.countries.us",
      rating: 4.7,
      socials: {
        facebook: true,
        instagram: true,
        youtube: true,
        twitter: false,
      },
    },
    {
      id: 4,
      name: "Siamese Secrets",
      logo: "/images/catbreeder/1737585183526.jpg",
      breedKey: "kennels.list.siameseSecrets.breed",
      countryKey: "kennels.list.countries.th",
      rating: 4.8,
      socials: {
        facebook: true,
        instagram: true,
        youtube: false,
        twitter: true,
      },
    },
    {
      id: 5,
      name: "Royal Felines",
      logo: "/images/catbreeder/1737585157355.jpg",
      breedKey: "kennels.list.persianPalace.breed",
      countryKey: "kennels.list.countries.ir",
      rating: 4.5,
      socials: {
        facebook: true,
        instagram: true,
        youtube: true,
        twitter: false,
      },
    },
    {
      id: 6,
      name: "Elite Cats",
      logo: "/images/catbreeder/1737585154227.jpg",
      breedKey: "kennels.list.britishCharm.breed",
      countryKey: "kennels.list.countries.gb",
      rating: 4.7,
      socials: {
        facebook: true,
        instagram: true,
        youtube: false,
        twitter: true,
      },
    },
  ],
};

const BreedersPage = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("nameAsc");
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedBreeds, setSelectedBreeds] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [expandedCardId, setExpandedCardId] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  const dispatch = useDispatch();
  const petType = useSelector(selectPetType);
  const { t } = useTranslatedContent();

  const handlePetTypeChange = (newPetType) => {
    dispatch(setPetType(newPetType));
  };

  // Получаем список стран из хука
  const countries = useCountries(MOCK_KENNELS[petType]);

  // Получаем уникальные породы для текущего типа животных
  const uniqueBreeds = useMemo(() => {
    return [...new Set(MOCK_KENNELS[petType].map((kennel) => kennel.breedKey))];
  }, [petType]);

  // Фильтрация и сортировка питомников
  const filteredAndSortedKennels = useMemo(() => {
    let filtered = MOCK_KENNELS[petType] || [];

    // Применяем поиск
    if (searchValue.trim()) {
      const searchLower = searchValue.toLowerCase();
      filtered = filtered.filter((kennel) =>
        kennel.name.toLowerCase().includes(searchLower)
      );
    }

    // Применяем фильтры
    if (selectedCountries.length > 0) {
      filtered = filtered.filter((kennel) => {
        const countryKey = kennel.countryKey;
        const countryCode = countries.find((c) => c.key === countryKey)?.code;
        return selectedCountries.includes(countryCode);
      });
    }
    if (selectedBreeds.length > 0) {
      filtered = filtered.filter((kennel) =>
        selectedBreeds.includes(kennel.breedKey)
      );
    }
    if (minRating > 0) {
      filtered = filtered.filter((kennel) => kennel.rating >= minRating);
    }

    // Применяем сортировку
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "nameAsc":
          return a.name.localeCompare(b.name);
        case "nameDesc":
          return b.name.localeCompare(a.name);
        case "ratingDesc":
          return b.rating - a.rating;
        case "ratingAsc":
          return a.rating - b.rating;
        default:
          return 0;
      }
    });
  }, [
    petType,
    searchValue,
    selectedCountries,
    selectedBreeds,
    minRating,
    sortBy,
    countries,
  ]);

  const handleCardExpand = (cardId) => {
    setExpandedCardId(expandedCardId === cardId ? null : cardId);
  };

  return (
    <div className={styles.breedersPage}>
      <div className={styles.header}>
        <h1 className={styles.title}>{t("breeders.title")}</h1>
      </div>

      <div className={styles.content}>
        <ControlPanel
          // FilterPanel props
          sortBy={sortBy}
          setSortBy={setSortBy}
          selectedCountries={selectedCountries}
          setSelectedCountries={setSelectedCountries}
          selectedBreeds={selectedBreeds}
          setSelectedBreeds={setSelectedBreeds}
          minRating={minRating}
          setMinRating={setMinRating}
          countries={countries}
          breeds={uniqueBreeds}
          // ViewControls props
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          petType={petType}
          onPetTypeChange={handlePetTypeChange}
          // ViewModeToggle props
          viewMode={viewMode}
          setViewMode={setViewMode}
          // Common props
          t={t}
        />

        <div
          className={`${styles.breedersList} ${
            viewMode === "grid" ? styles.grid : styles.list
          }`}
        >
          {filteredAndSortedKennels.map((kennel) =>
            viewMode === "grid" ? (
              <KennelCard
                key={kennel.id}
                kennel={kennel}
                t={t}
                expanded={expandedCardId === kennel.id}
                onExpand={() => handleCardExpand(kennel.id)}
              />
            ) : (
              <KennelStringCard
                key={kennel.id}
                kennel={kennel}
                t={t}
                expanded={expandedCardId === kennel.id}
                onExpand={() => handleCardExpand(kennel.id)}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default BreedersPage;
