import { useState, useEffect } from "react";
import { useTranslatedContent } from "../../redux/hooks/useTranslatedContent";
import { useNavigate } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaDog, FaCat } from "react-icons/fa6";
import {
  Switch,
  FormControlLabel,
  Box,
  LinearProgress,
  Tooltip,
} from "@mui/material";
import styles from "./KennelsSlider.module.css";

// Моковые данные для питомников
const MOCK_KENNELS = {
  dogs: [
    {
      id: 1,
      nameKey: "kennels.list.goldenParadise.name",
      logo: "https://placeholder.com/150",
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
    {
      id: 2,
      nameKey: "kennels.list.royalPaws.name",
      logo: "https://placeholder.com/150",
      breedKey: "kennels.list.royalPaws.breed",
      countryKey: "kennels.list.royalPaws.country",
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
      nameKey: "kennels.list.eliteGermanShepherds.name",
      logo: "https://placeholder.com/150",
      breedKey: "kennels.list.eliteGermanShepherds.breed",
      countryKey: "kennels.list.eliteGermanShepherds.country",
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
      nameKey: "kennels.list.siberianStars.name",
      logo: "https://placeholder.com/150",
      breedKey: "kennels.list.siberianStars.breed",
      countryKey: "kennels.list.siberianStars.country",
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
      nameKey: "kennels.list.goldenParadise.name",
      logo: "https://placeholder.com/150",
      breedKey: "kennels.list.goldenParadise.breed",
      countryKey: "kennels.list.goldenParadise.country",
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
      nameKey: "kennels.list.royalPaws.name",
      logo: "https://placeholder.com/150",
      breedKey: "kennels.list.royalPaws.breed",
      countryKey: "kennels.list.royalPaws.country",
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
      nameKey: "kennels.list.eliteGermanShepherds.name",
      logo: "https://placeholder.com/150",
      breedKey: "kennels.list.eliteGermanShepherds.breed",
      countryKey: "kennels.list.eliteGermanShepherds.country",
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
      nameKey: "kennels.list.siberianStars.name",
      logo: "https://placeholder.com/150",
      breedKey: "kennels.list.siberianStars.breed",
      countryKey: "kennels.list.siberianStars.country",
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
      nameKey: "kennels.list.goldenParadise.name",
      logo: "https://placeholder.com/150",
      breedKey: "kennels.list.goldenParadise.breed",
      countryKey: "kennels.list.goldenParadise.country",
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
      nameKey: "kennels.list.royalPaws.name",
      logo: "https://placeholder.com/150",
      breedKey: "kennels.list.royalPaws.breed",
      countryKey: "kennels.list.royalPaws.country",
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
      nameKey: "kennels.list.persianPalace.name",
      logo: "https://placeholder.com/150",
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
    {
      id: 2,
      nameKey: "kennels.list.britishCharm.name",
      logo: "https://placeholder.com/150",
      breedKey: "kennels.list.britishCharm.breed",
      countryKey: "kennels.list.britishCharm.country",
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
      nameKey: "kennels.list.maineCoonMagic.name",
      logo: "https://placeholder.com/150",
      breedKey: "kennels.list.maineCoonMagic.breed",
      countryKey: "kennels.list.maineCoonMagic.country",
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
      nameKey: "kennels.list.siameseSecrets.name",
      logo: "https://placeholder.com/150",
      breedKey: "kennels.list.siameseSecrets.breed",
      countryKey: "kennels.list.siameseSecrets.country",
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
      nameKey: "kennels.list.persianPalace.name",
      logo: "https://placeholder.com/150",
      breedKey: "kennels.list.persianPalace.breed",
      countryKey: "kennels.list.persianPalace.country",
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
      nameKey: "kennels.list.britishCharm.name",
      logo: "https://placeholder.com/150",
      breedKey: "kennels.list.britishCharm.breed",
      countryKey: "kennels.list.britishCharm.country",
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
      nameKey: "kennels.list.maineCoonMagic.name",
      logo: "https://placeholder.com/150",
      breedKey: "kennels.list.maineCoonMagic.breed",
      countryKey: "kennels.list.maineCoonMagic.country",
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
      nameKey: "kennels.list.siameseSecrets.name",
      logo: "https://placeholder.com/150",
      breedKey: "kennels.list.siameseSecrets.breed",
      countryKey: "kennels.list.siameseSecrets.country",
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

  const getVisibleSlides = () => {
    const width = window.innerWidth;
    if (width >= 1440) return 6;
    if (width >= 1200) return 5;
    if (width >= 900) return 4;
    if (width >= 600) return 3;
    if (width >= 480) return 2;
    return 1;
  };

  const [currentSlide, setCurrentSlide] = useState(0);
  const [petType, setPetType] = useState("dogs");
  const [kennelsData, setKennelsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleSlides, setVisibleSlides] = useState(getVisibleSlides());

  const handlePetTypeChange = (e) => {
    const newType = e.target.checked ? "cats" : "dogs";
    setPetType(newType);
    setCurrentSlide(0);
  };

  useEffect(() => {
    fetchKennelsData();

    const handleResize = () => {
      setVisibleSlides(getVisibleSlides());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [petType]);

  const fetchKennelsData = async () => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500));

      const kennels = MOCK_KENNELS[petType].slice(0, 10);
      const moreKennelsSlide = {
        id: "more-kennels",
        isMoreKennels: true,
        title: t("kennels.viewMore"),
        text: t("kennels.viewMoreText"),
      };

      setKennelsData([...kennels, moreKennelsSlide]);
      setCurrentSlide(0);
      setError(null);
    } catch (err) {
      setError("Ошибка при загрузке данных питомников");
      console.error("Error fetching kennels data:", err);
    } finally {
      setLoading(false);
    }
  };

  const nextSlide = () => {
    const maxSlide = kennelsData.length - visibleSlides;
    if (currentSlide < maxSlide) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const calculateTranslateX = () => {
    const cardWidth = 100 / visibleSlides;
    return -(currentSlide * cardWidth);
  };

  const isLastSlideReached = () => {
    return currentSlide >= 8 - visibleSlides;
  };

  const handleKennelClick = (kennel) => {
    if (kennel.isMoreKennels) {
      navigate(`/kennels/${petType}`); // Переход на страницу со всеми питомниками
    } else {
      navigate(`/kennels/${petType}/${kennel.id}`); // Переход на страницу конкретного питомника
    }
  };

  if (loading) {
    return <div className={styles.loading}>{t("loading")}</div>;
  }

  if (error) {
    return <div className={styles.error}>{t("error")}</div>;
  }

  return (
    <section className={styles.kennelsSection}>
      <div className={styles.kennelsSectionHeader}>
        <h2 className={styles.sectionTitle}>{t("kennels.title")}</h2>
        <div className={styles.petTypeSwitch}>
          <Box className={styles.switchContainer}>
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
                  color="primary"
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
          </Box>
        </div>
      </div>

      <div className={styles.kennelsSlider}>
        <button
          className={styles.sliderButton}
          onClick={prevSlide}
          disabled={currentSlide === 0}
          aria-label="Previous slide"
        >
          <IoIosArrowBack size={24} />
        </button>

        <div
          className={styles.kennelsContainer}
          style={{
            transform: `translateX(${calculateTranslateX()}%)`,
          }}
        >
          {kennelsData.map((kennel) => (
            <div
              key={kennel.id}
              className={`${styles.kennelCard} ${
                kennel.isMoreKennels ? styles.moreKennelsCard : ""
              }`}
              onClick={() => handleKennelClick(kennel)}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleKennelClick(kennel);
                }
              }}
            >
              {kennel.isMoreKennels ? (
                <div className={styles.moreKennelsContent}>
                  <div className={styles.moreKennelsIcon}>
                    <IoIosArrowForward size={40} />
                  </div>
                  <h3 className={styles.moreKennelsTitle}>{kennel.title}</h3>
                  <p className={styles.moreKennelsText}>{kennel.text}</p>
                </div>
              ) : (
                <>
                  <img
                    src={kennel.logo}
                    alt={t(kennel.nameKey)}
                    className={styles.kennelLogo}
                  />
                  <h3 className={styles.kennelName}>{t(kennel.nameKey)}</h3>
                  <p className={styles.kennelBreed}>{t(kennel.breedKey)}</p>
                  <p className={styles.kennelCountry}>{t(kennel.countryKey)}</p>
                  <div className={styles.ratingContainer}>
                    <Tooltip
                      title={`${t("kennels.rating")}: ${kennel.rating} ${t(
                        "kennels.outOf"
                      )} 5`}
                      placement="top"
                    >
                      <div className={styles.ratingBar}>
                        <LinearProgress
                          variant="determinate"
                          value={(kennel.rating / 5) * 100}
                          className={styles.ratingProgress}
                        />
                        <span className={styles.ratingValue}>
                          {kennel.rating}
                        </span>
                      </div>
                    </Tooltip>
                  </div>
                  <div className={styles.socialIcons}>
                    {kennel.socials.facebook && (
                      <span className={styles.socialIcon}>
                        <FaFacebookF />
                      </span>
                    )}
                    {kennel.socials.instagram && (
                      <span className={styles.socialIcon}>
                        <FaInstagram />
                      </span>
                    )}
                    {kennel.socials.youtube && (
                      <span className={styles.socialIcon}>
                        <FaYoutube />
                      </span>
                    )}
                    {kennel.socials.twitter && (
                      <span className={styles.socialIcon}>
                        <FaTwitter />
                      </span>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        <button
          className={styles.sliderButton}
          onClick={nextSlide}
          disabled={isLastSlideReached()}
          aria-label="Next slide"
        >
          <IoIosArrowForward size={24} />
        </button>
      </div>
    </section>
  );
};

export default KennelsSlider;
