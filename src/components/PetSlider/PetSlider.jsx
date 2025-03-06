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
import CustomLoader from "../CustomLoader/CustomLoader";
import AuthModal from "../AuthModal/AuthModal";
import LoginModal from "../LoginModal/LoginModal";
import styles from "./PetSlider.module.css";

const PetSlider = () => {
  const { t } = useTranslatedContent();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const petType = useSelector(selectPetType);

  const [sortOrder, setSortOrder] = useState("asc");
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

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
        city: "Санкт-Петербург",
        country: "Россия",
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
  };

  // Восстанавливаем тип животного из localStorage при монтировании
  useEffect(() => {
    const savedPetType = localStorage.getItem("petType");
    if (savedPetType && savedPetType !== petType) {
      dispatch(setPetType(savedPetType));
    }
  }, [dispatch, petType]);

  useEffect(() => {
    // Имитация загрузки данных
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [petType]);

  const handlePetTypeChange = (type) => {
    if (type !== petType) {
      dispatch(togglePetType());
      localStorage.setItem("petType", type);
    }
  };

  const filteredAndSortedPets = useMemo(() => {
    let pets = MOCK_PETS[petType] || [];

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
  }, [petType, sortOrder, t, MOCK_PETS]);

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
    <section id="pet-slider" className={styles.petsSection}>
      <div className={styles.petsSectionHeader}>
        <h2 className={styles.sectionTitle} onClick={() => navigate("/pets")}>
          {t("pets.findYourPet")}
        </h2>
      </div>
      <div className={styles.petsControls}>
        <ViewControls
          sortOrder={sortOrder}
          onSortChange={setSortOrder}
          onPetTypeChange={handlePetTypeChange}
          petType={petType}
          hideSearch={true}
        />
      </div>
      {isLoading ? (
        <CustomLoader />
      ) : (
        <PetContent
          pets={filteredAndSortedPets}
          petType={petType}
          onOpenAuthModal={handleOpenAuthModal}
        />
      )}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={handleCloseAuthModal}
        onLoginClick={handleOpenLoginModal}
      />
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </section>
  );
};

export default memo(PetSlider);
