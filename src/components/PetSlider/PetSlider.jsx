import { memo, useState, useMemo, useEffect } from "react";
import { useTranslatedContent } from "../../redux/hooks/useTranslatedContent";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  togglePetType,
  selectPetType,
  setPetType,
} from "../../redux/petType/petTypeSlice";
import PetContent from "./PetContent";
import ViewControls from "../ViewControls/ViewControls";
import styles from "./PetSlider.module.css";

// Моковые данные для питомцев
const MOCK_PETS = {
  dogs: [
    {
      id: 1,
      name: "Макс",
      image: "/images/pets/dog1.jpg",
      breedKey: "pets.list.goldenRetriever",
      age: 2,
      gender: "male",
      price: 1500,
      rating: 4.8,
    },
    {
      id: 2,
      name: "Белла",
      image: "/images/pets/dog2.jpg",
      breedKey: "pets.list.germanShepherd",
      age: 1,
      gender: "female",
      price: 1800,
      rating: 4.7,
    },
    {
      id: 3,
      name: "Чарли",
      image: "/images/pets/dog3.jpg",
      breedKey: "pets.list.husky",
      age: 3,
      gender: "male",
      price: 2000,
      rating: 4.9,
    },
  ],
  cats: [
    {
      id: 1,
      name: "Луна",
      image: "/images/pets/cat1.jpg",
      breedKey: "pets.list.persian",
      age: 1,
      gender: "female",
      price: 1200,
      rating: 4.6,
    },
    {
      id: 2,
      name: "Симба",
      image: "/images/pets/cat2.jpg",
      breedKey: "pets.list.maineCoon",
      age: 2,
      gender: "male",
      price: 1500,
      rating: 4.8,
    },
    {
      id: 3,
      name: "Мия",
      image: "/images/pets/cat3.jpg",
      breedKey: "pets.list.british",
      age: 1,
      gender: "female",
      price: 1300,
      rating: 4.7,
    },
  ],
};

const PetSlider = () => {
  const { t } = useTranslatedContent();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const petType = useSelector(selectPetType);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  // Восстанавливаем тип животного из localStorage при монтировании
  useEffect(() => {
    const savedPetType = localStorage.getItem("petType");
    if (savedPetType && savedPetType !== petType) {
      dispatch(setPetType(savedPetType));
    }
  }, []);

  const handlePetTypeChange = (type) => {
    if (type !== petType) {
      dispatch(togglePetType());
      localStorage.setItem("petType", type);
    }
  };

  const filteredAndSortedPets = useMemo(() => {
    let pets = MOCK_PETS[petType] || [];

    // Применяем поиск
    if (searchQuery) {
      pets = pets.filter((pet) =>
        pet.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Применяем сортировку
    pets = [...pets].sort((a, b) => {
      const modifier = sortOrder === "asc" ? 1 : -1;
      return modifier * a.name.localeCompare(b.name);
    });

    // Добавляем карточку "Показать больше" в конец
    const morePetsCard = {
      id: "more-pets",
      isMorePets: true,
      title: t("pets.viewMore"),
      text: t("pets.viewMoreText"),
    };
    return [...pets, morePetsCard];
  }, [petType, searchQuery, sortOrder, t]);

  return (
    <section id="pets-slider" className={styles.petsSection}>
      <div className={styles.petsSectionHeader}>
        <h2
          className={styles.sectionTitle}
          onClick={() => navigate(`/pets?type=${petType}`)}
        >
          {t("pets.findYourPet")}
        </h2>

        <ViewControls
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
          petType={petType}
          onPetTypeChange={handlePetTypeChange}
          sortOrder={sortOrder}
          onSortChange={setSortOrder}
          showSort={false}
          hideSearch={true}
        />
      </div>

      <PetContent pets={filteredAndSortedPets} petType={petType} />
    </section>
  );
};

const MemoizedPetContent = memo(PetContent);

export default memo(PetSlider);
