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
      image: "/images/default/puppy1.webp",
      breedKey: "goldenRetriever",
      type: "dogs",
      ageInMonths: 24,
      gender: "male",
      price: 1500,
      breederId: "breeder1",
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
    },
    {
      id: 3,
      name: "Чарли",
      image: "/images/default/puppy3.webp",
      breedKey: "husky",
      type: "dogs",
      ageInMonths: 36,
      gender: "male",
      price: 2000,
      breederId: "breeder3",
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
    },
    {
      id: 5,
      name: "Рокки",
      image: "/images/default/puppy5.webp",
      breedKey: "rottweiler",
      type: "dogs",
      ageInMonths: 24,
      gender: "male",
      price: 2200,
      breederId: "breeder5",
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
      price: 1200,
      breederId: "breeder7",
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
    },
    {
      id: 3,
      name: "Мия",
      image: "/images/default/kitten3.webp",
      breedKey: "britishShorthair",
      type: "cats",
      ageInMonths: 12,
      gender: "female",
      price: 1300,
      breederId: "breeder9",
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
    },
    {
      id: 5,
      name: "Лилу",
      image: "/images/default/kitten5.webp",
      breedKey: "siamese",
      type: "cats",
      ageInMonths: 12,
      gender: "female",
      price: 1600,
      breederId: "breeder11",
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
