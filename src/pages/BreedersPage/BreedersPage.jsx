import { useEffect } from "react";
import { useTranslatedContent } from "../../redux/hooks/useTranslatedContent";
import { FaDog, FaCat } from "react-icons/fa6";
import { Switch, FormControlLabel } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setPetType, selectPetType } from "../../redux/petType/petTypeSlice";
import BreederCard from "./components/BreederCard";
import styles from "./BreedersPage.module.css";

// Используем те же моковые данные, что и в слайдере
const MOCK_KENNELS = {
  dogs: [
    {
      id: 1,
      name: "Golden Paradise",
      logo: "/images/dogbreeder/1737585129219.jpg",
      breedKey: "kennels.list.goldenParadise.breed",
      countryKey: "kennels.list.goldenParadise.country",
      rating: 4.8,
      socials: {
        facebook: true,
        instagram: true,
        youtube: true,
        twitter: true,
      },
    },
    // ... остальные данные будут такими же, как в KennelsSlider
  ],
  cats: [
    {
      id: 1,
      name: "Persian Palace",
      logo: "/images/catbreeder/1737585215040.jpg",
      breedKey: "kennels.list.persianPalace.breed",
      countryKey: "kennels.list.persianPalace.country",
      rating: 4.6,
      socials: {
        facebook: true,
        instagram: true,
        youtube: false,
        twitter: true,
      },
    },
    // ... остальные данные будут такими же, как в KennelsSlider
  ],
};

const BreedersPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const petType = useSelector(selectPetType);
  const { t } = useTranslatedContent();

  // Синхронизация с URL параметрами при монтировании
  useEffect(() => {
    const typeFromUrl = searchParams.get("type");
    if (typeFromUrl && ["dogs", "cats"].includes(typeFromUrl)) {
      dispatch(setPetType(typeFromUrl));
    }
  }, []);

  const handlePetTypeChange = () => {
    const newType = petType === "dogs" ? "cats" : "dogs";
    dispatch(setPetType(newType));
    setSearchParams({ type: newType });
  };

  const currentKennels = MOCK_KENNELS[petType] || [];

  return (
    <div className={styles.breedersPage}>
      <div className={styles.header}>
        <h1 className={styles.title}>{t("breeders.pageTitle")}</h1>
        <div className={styles.filters}>
          <div className={styles.petTypeSwitch}>
            <div className={styles.switchContainer}>
              <div className={styles.petTypeOption}>
                <FaDog
                  className={`${styles.petIcon} ${
                    petType === "dogs" ? styles.active : ""
                  }`}
                />
                <span
                  className={`${styles.petLabel} ${
                    petType === "dogs" ? styles.active : ""
                  }`}
                >
                  {t("kennels.petTypes.dogs")}
                </span>
              </div>
              <FormControlLabel
                control={
                  <Switch
                    checked={petType === "cats"}
                    onChange={handlePetTypeChange}
                    name="petType"
                  />
                }
                label=""
              />
              <div className={styles.petTypeOption}>
                <FaCat
                  className={`${styles.petIcon} ${
                    petType === "cats" ? styles.active : ""
                  }`}
                />
                <span
                  className={`${styles.petLabel} ${
                    petType === "cats" ? styles.active : ""
                  }`}
                >
                  {t("kennels.petTypes.cats")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.breedersList}>
        {currentKennels.map((kennel) => (
          <BreederCard key={kennel.id} breeder={kennel} />
        ))}
      </div>
    </div>
  );
};

export default BreedersPage;
