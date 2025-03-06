import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslatedContent } from "../../redux/hooks/useTranslatedContent";
import styles from "./PetPage.module.css";
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  Chip,
  Divider,
} from "@mui/material";
import {
  FaMapMarkerAlt,
  FaBirthdayCake,
  FaMars,
  FaVenus,
  FaMedal,
  FaPaw,
  FaHeart,
} from "react-icons/fa";

// Используем те же моковые данные, что и в PetSlider
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
      badges: [{ type: "top", text: "Топ продавец" }],
      description:
        "Прекрасный щенок золотистого ретривера с отличной родословной. Дружелюбный, умный и легко поддается дрессировке.",
      features: [
        "Полностью вакцинирован",
        "Имеет ветеринарный паспорт",
        "Чипирован",
        "Приучен к поводку",
        "Социализирован",
      ],
      documents: [
        "Родословная FCI",
        "Ветеринарный паспорт",
        "Договор купли-продажи",
      ],
      parents: {
        father: {
          name: "Champion Golden Boy",
          titles: ["Чемпион Украины", "Лучший представитель породы 2021"],
          image: "/images/default/father-dog.webp",
        },
        mother: {
          name: "Lady Success",
          titles: ["Чемпион Европы 2022"],
          image: "/images/default/mother-dog.webp",
        },
      },
      gallery: [
        "/images/default/puppy1.webp",
        "/images/default/puppy2.webp",
        "/images/default/puppy3.webp",
        "/images/default/puppy4.webp",
      ],
      breeder: {
        id: 1,
        name: "Golden Paradise",
        rating: 4.8,
        experience: "15 лет",
        location: "Киев, Украина",
        image: "/images/dogbreeder/1737585129219.jpg",
      },
      health: {
        vaccinations: "Полностью вакцинирован по возрасту",
        deworming: "Обработан от паразитов",
        additionalInfo: "Регулярные осмотры ветеринара",
      },
    },
    // Другие питомцы...
  ],
  cats: [
    // Кошки...
  ],
};

const PetPage = () => {
  const { id, type } = useParams();
  const { t } = useTranslatedContent();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    // Здесь будет API запрос к серверу
    // Временно используем моковые данные
    const foundPet = MOCK_PETS[type]?.find((p) => p.id === parseInt(id));
    setPet(foundPet);
    if (foundPet) {
      setSelectedImage(foundPet.image);
    }
    setLoading(false);
  }, [id, type]);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (!pet) {
    return <div>Питомец не найден</div>;
  }

  return (
    <Container className={styles.petPage}>
      <Grid container spacing={4}>
        {/* Галерея и основная информация */}
        <Grid item xs={12} md={8}>
          <Box className={styles.mainGallery}>
            <img
              src={selectedImage}
              alt={pet.name}
              className={styles.mainImage}
            />
            <Grid container spacing={1} className={styles.thumbnails}>
              {pet.gallery.map((image, index) => (
                <Grid item xs={3} key={index}>
                  <img
                    src={image}
                    alt={`${pet.name} ${index + 1}`}
                    className={`${styles.thumbnail} ${
                      selectedImage === image ? styles.selected : ""
                    }`}
                    onClick={() => setSelectedImage(image)}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>

        {/* Информация о питомце */}
        <Grid item xs={12} md={4}>
          <Box className={styles.petInfo}>
            <Typography variant="h4" className={styles.petName}>
              {pet.name}
            </Typography>

            <Typography variant="h6" className={styles.breed}>
              {t(`breeds.${pet.breedKey}`)}
            </Typography>

            <Box className={styles.badges}>
              {pet.badges?.map((badge, index) => (
                <Chip
                  key={index}
                  label={badge.text}
                  className={`${styles.badge} ${styles[badge.type]}`}
                />
              ))}
            </Box>

            <Box className={styles.mainDetails}>
              <div className={styles.detailItem}>
                <FaMapMarkerAlt />
                <span>{`${pet.city}, ${pet.country}`}</span>
              </div>
              <div className={styles.detailItem}>
                <FaBirthdayCake />
                <span>{`${Math.floor(pet.ageInMonths / 12)} лет ${
                  pet.ageInMonths % 12
                } мес.`}</span>
              </div>
              <div className={styles.detailItem}>
                {pet.gender === "male" ? <FaMars /> : <FaVenus />}
                <span>{pet.gender === "male" ? "Мальчик" : "Девочка"}</span>
              </div>
            </Box>

            <Box className={styles.priceSection}>
              {pet.oldPrice && (
                <Typography variant="body1" className={styles.oldPrice}>
                  ${pet.oldPrice}
                </Typography>
              )}
              <Typography variant="h5" className={styles.price}>
                ${pet.price}
              </Typography>
            </Box>

            <Box className={styles.actionButtons}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                className={styles.contactButton}
              >
                Связаться с заводчиком
              </Button>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                className={styles.favoriteButton}
                startIcon={<FaHeart />}
              >
                В избранное
              </Button>
            </Box>
          </Box>
        </Grid>

        {/* Описание */}
        <Grid item xs={12}>
          <Box className={styles.section}>
            <Typography variant="h6" className={styles.sectionTitle}>
              Описание
            </Typography>
            <Typography paragraph>{pet.description}</Typography>
          </Box>
        </Grid>

        {/* Особенности */}
        <Grid item xs={12} md={6}>
          <Box className={styles.section}>
            <Typography variant="h6" className={styles.sectionTitle}>
              Особенности
            </Typography>
            <ul className={styles.featuresList}>
              {pet.features.map((feature, index) => (
                <li key={index}>
                  <FaPaw className={styles.featureIcon} />
                  {feature}
                </li>
              ))}
            </ul>
          </Box>
        </Grid>

        {/* Документы */}
        <Grid item xs={12} md={6}>
          <Box className={styles.section}>
            <Typography variant="h6" className={styles.sectionTitle}>
              Документы
            </Typography>
            <ul className={styles.documentsList}>
              {pet.documents.map((document, index) => (
                <li key={index}>
                  <FaMedal className={styles.documentIcon} />
                  {document}
                </li>
              ))}
            </ul>
          </Box>
        </Grid>

        {/* Родители */}
        <Grid item xs={12}>
          <Box className={styles.section}>
            <Typography variant="h6" className={styles.sectionTitle}>
              Родители
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Box className={styles.parentCard}>
                  <img
                    src={pet.parents.father.image}
                    alt="Отец"
                    className={styles.parentImage}
                  />
                  <Typography variant="h6">
                    {pet.parents.father.name}
                  </Typography>
                  <ul className={styles.titlesList}>
                    {pet.parents.father.titles.map((title, index) => (
                      <li key={index}>{title}</li>
                    ))}
                  </ul>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box className={styles.parentCard}>
                  <img
                    src={pet.parents.mother.image}
                    alt="Мать"
                    className={styles.parentImage}
                  />
                  <Typography variant="h6">
                    {pet.parents.mother.name}
                  </Typography>
                  <ul className={styles.titlesList}>
                    {pet.parents.mother.titles.map((title, index) => (
                      <li key={index}>{title}</li>
                    ))}
                  </ul>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        {/* Здоровье */}
        <Grid item xs={12}>
          <Box className={styles.section}>
            <Typography variant="h6" className={styles.sectionTitle}>
              Здоровье
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Box className={styles.healthCard}>
                  <Typography variant="subtitle1">Вакцинация</Typography>
                  <Typography>{pet.health.vaccinations}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box className={styles.healthCard}>
                  <Typography variant="subtitle1">Дегельминтизация</Typography>
                  <Typography>{pet.health.deworming}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box className={styles.healthCard}>
                  <Typography variant="subtitle1">Дополнительно</Typography>
                  <Typography>{pet.health.additionalInfo}</Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        {/* Информация о заводчике */}
        <Grid item xs={12}>
          <Box className={styles.breederSection}>
            <Typography variant="h6" className={styles.sectionTitle}>
              Заводчик
            </Typography>
            <Box className={styles.breederCard}>
              <img
                src={pet.breeder.image}
                alt={pet.breeder.name}
                className={styles.breederImage}
              />
              <Box className={styles.breederInfo}>
                <Typography variant="h6">{pet.breeder.name}</Typography>
                <Typography variant="body2">
                  Рейтинг: {pet.breeder.rating} / 5
                </Typography>
                <Typography variant="body2">
                  Опыт: {pet.breeder.experience}
                </Typography>
                <Typography variant="body2">{pet.breeder.location}</Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  className={styles.viewBreederButton}
                >
                  Посмотреть профиль
                </Button>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PetPage;
