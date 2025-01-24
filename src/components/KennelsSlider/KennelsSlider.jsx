import { memo } from "react";
import { useTranslatedContent } from "../../redux/hooks/useTranslatedContent";
import { FaDog, FaCat } from "react-icons/fa6";
import { Switch, FormControlLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { togglePetType, selectPetType } from "../../redux/petType/petTypeSlice";
import KennelsContent from "./KennelsContent";
import styles from "./KennelsSlider.module.css";

// Моковые данные для питомников
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
    {
      id: 7,
      name: "Crown K9",
      logo: "/images/dogbreeder/1737585129219.jpg",
      breedKey: "kennels.list.eliteGermanShepherds.breed",
      countryKey: "kennels.list.countries.de",
      rating: 4.7,
      socials: {
        facebook: true,
        instagram: true,
        youtube: true,
        twitter: false,
      },
    },
    {
      id: 8,
      name: "Arctic Tails",
      logo: "/images/dogbreeder/1737585125838.jpg",
      breedKey: "kennels.list.siberianStars.breed",
      countryKey: "kennels.list.countries.ru",
      rating: 4.9,
      socials: {
        facebook: true,
        instagram: true,
        youtube: false,
        twitter: false,
      },
    },
    {
      id: 9,
      name: "Royal Breeds",
      logo: "/images/dogbreeder/1737585098223.jpg",
      breedKey: "kennels.list.goldenParadise.breed",
      countryKey: "kennels.list.countries.us",
      rating: 4.5,
      socials: {
        facebook: true,
        instagram: true,
        youtube: true,
        twitter: true,
      },
    },
    {
      id: 10,
      name: "Elite Pups",
      logo: "/images/dogbreeder/1737585094922.jpg",
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
    {
      id: 7,
      name: "Purrfect Palace",
      logo: "/images/catbreeder/1737585215040.jpg",
      breedKey: "kennels.list.maineCoonMagic.breed",
      countryKey: "kennels.list.countries.us",
      rating: 4.9,
      socials: {
        facebook: true,
        instagram: true,
        youtube: true,
        twitter: true,
      },
    },
    {
      id: 8,
      name: "Noble Cats",
      logo: "/images/catbreeder/1737585211710.jpg",
      breedKey: "kennels.list.siameseSecrets.breed",
      countryKey: "kennels.list.countries.th",
      rating: 4.6,
      socials: {
        facebook: true,
        instagram: true,
        youtube: false,
        twitter: false,
      },
    },
  ],
};

const KennelsSlider = () => {
  const { t } = useTranslatedContent();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const petType = useSelector(selectPetType);

  // Подготавливаем данные с карточкой "Показать больше"
  const prepareKennelsData = (type) => {
    const kennelsData = MOCK_KENNELS[type] || [];
    const moreKennelsCard = {
      id: "more-kennels",
      isMoreKennels: true,
      title: t("kennels.viewMore"),
      text: t("kennels.viewMoreText"),
    };
    return [...kennelsData, moreKennelsCard];
  };

  // Получаем текущие данные на основе типа
  const currentKennels = prepareKennelsData(petType);

  const handlePetTypeChange = () => {
    dispatch(togglePetType());
  };

  return (
    <section id="kennels-slider" className={styles.kennelsSection}>
      <div className={styles.kennelsSectionHeader}>
        <h2
          className={styles.sectionTitle}
          onClick={() => navigate(`/kennels?type=${petType}`)}
        >
          {t("kennels.title")}
        </h2>
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

      <MemoizedKennelsContent kennels={currentKennels} petType={petType} />
    </section>
  );
};

const MemoizedKennelsContent = memo(KennelsContent);

export default KennelsSlider;
