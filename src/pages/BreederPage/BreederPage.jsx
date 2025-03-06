import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslatedContent } from "../../redux/hooks/useTranslatedContent";
import styles from "./BreederPage.module.css";
import { FaFacebookF, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";
import {
  LinearProgress,
  Container,
  Grid,
  Typography,
  Box,
} from "@mui/material";

// Временно используем моковые данные
const MOCK_KENNELS = {
  dogs: [
    {
      id: 1,
      name: "Golden Paradise",
      logo: "/images/dogbreeder/1737585129219.jpg",
      breedKey: "kennels.list.goldenParadise.breed",
      countryKey: "kennels.list.countries.us",
      rating: 4.8,
      description:
        "Мы специализируемся на разведении золотистых ретриверов высшего качества. Наши собаки являются победителями множества выставок и имеют отличную родословную. Мы уделяем особое внимание здоровью и темпераменту наших питомцев.",
      address: "123 Breeder Street, New York, USA",
      phone: "+1 234 567 8900",
      email: "contact@goldenparadise.com",
      website: "www.goldenparadise.com",
      workingHours: "Пн-Пт: 9:00-18:00, Сб: 10:00-15:00",
      experience: "15 лет в разведении",
      socials: {
        facebook: true,
        instagram: true,
        youtube: true,
        twitter: true,
      },
      gallery: [
        "/images/dogbreeder/1737585129219.jpg",
        "/images/dogbreeder/1737585125838.jpg",
        "/images/dogbreeder/1737585098223.jpg",
        "/images/dogbreeder/1737585094922.jpg",
        "/images/dogbreeder/1737585055764.jpg",
        "/images/dogbreeder/1737585046034.jpg",
      ],
      achievements: [
        "Best in Show 2023 - International Dog Show",
        "Champion of Champions 2022 - National Kennel Club",
        "Лучший питомник года 2021",
        "Золотой заводчик 2020",
        "Победитель выставки Golden Retriever Specialty Show 2019",
      ],
      services: [
        "Консультации по выбору щенка",
        "Помощь в воспитании",
        "Подготовка к выставкам",
        "Ветеринарное сопровождение",
        "Гостиница для собак",
      ],
      team: [
        {
          name: "Анна Петрова",
          position: "Главный заводчик",
          experience: "20 лет",
        },
        {
          name: "Иван Сидоров",
          position: "Ветеринарный врач",
          experience: "15 лет",
        },
        {
          name: "Мария Иванова",
          position: "Грумер",
          experience: "10 лет",
        },
      ],
      facilities: [
        "Просторные вольеры",
        "Крытая тренировочная площадка",
        "Груминг-салон",
        "Ветеринарный кабинет",
        "Территория для выгула",
      ],
    },
    {
      id: 2,
      name: "Royal Paws",
      logo: "/images/dogbreeder/1737585125838.jpg",
      breedKey: "kennels.list.royalPaws.breed",
      countryKey: "kennels.list.countries.gb",
      rating: 4.5,
      description:
        "Элитный питомник британских бульдогов с многолетней историей. Наши собаки - это воплощение породного стандарта и великолепного темперамента.",
      address: "45 Royal Street, London, UK",
      phone: "+44 20 1234 5678",
      email: "info@royalpaws.co.uk",
      website: "www.royalpaws.co.uk",
      workingHours: "Пн-Пт: 10:00-19:00, Сб: 11:00-16:00",
      experience: "12 лет в разведении",
      socials: {
        facebook: true,
        instagram: true,
        youtube: false,
        twitter: true,
      },
      gallery: [
        "/images/dogbreeder/1737585125838.jpg",
        "/images/dogbreeder/1737585098223.jpg",
        "/images/dogbreeder/1737585094922.jpg",
        "/images/dogbreeder/1737585055764.jpg",
      ],
      achievements: [
        "Crufts Best of Breed 2023",
        "UK Kennel Club Gold Award 2022",
        "European Dog Show Winner 2021",
      ],
      services: [
        "Разведение британских бульдогов",
        "Дрессировка",
        "Подготовка к выставкам",
        "Консультации по уходу",
      ],
      team: [
        {
          name: "James Smith",
          position: "Ведущий заводчик",
          experience: "18 лет",
        },
        {
          name: "Sarah Johnson",
          position: "Кинолог",
          experience: "10 лет",
        },
      ],
      facilities: [
        "Современные вольеры",
        "Площадка для тренировок",
        "Ветеринарный пункт",
      ],
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
      description:
        "Специализированный питомник персидских кошек. Наши питомцы отличаются великолепной шерстью и отменным здоровьем.",
      address: "Persian Cat Street 1, Tehran",
      phone: "+98 21 1234 5678",
      email: "info@persianpalace.com",
      website: "www.persianpalace.com",
      workingHours: "Ежедневно: 10:00-20:00",
      experience: "20 лет в разведении",
      socials: {
        facebook: true,
        instagram: true,
        youtube: false,
        twitter: true,
      },
      gallery: [
        "/images/catbreeder/1737585215040.jpg",
        "/images/catbreeder/1737585211710.jpg",
        "/images/catbreeder/1737585186942.jpg",
      ],
      achievements: [
        "Best Persian Cat 2023",
        "CFA Grand Champion",
        "International Feline Federation Gold Medal",
      ],
      services: [
        "Продажа котят",
        "Груминг персидских кошек",
        "Консультации по уходу",
        "Гостиница для кошек",
      ],
      team: [
        {
          name: "Лейла Хосейни",
          position: "Главный фелинолог",
          experience: "25 лет",
        },
      ],
      facilities: [
        "Отдельные комнаты для кошек",
        "Груминг-салон",
        "Ветеринарный кабинет",
      ],
    },
  ],
};

const BreederPage = () => {
  const { id } = useParams();
  const { t } = useTranslatedContent();
  const [breeder, setBreeder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Здесь будет API запрос к серверу
    // Временно используем моковые данные
    const foundBreeder = [...MOCK_KENNELS.dogs, ...MOCK_KENNELS.cats].find(
      (k) => k.id === parseInt(id)
    );
    setBreeder(foundBreeder);
    setLoading(false);
  }, [id]);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (!breeder) {
    return <div>Заводчик не найден</div>;
  }

  return (
    <Container className={styles.breederPage}>
      <Grid container spacing={4}>
        {/* Основная информация */}
        <Grid item xs={12} md={4}>
          <Box className={styles.breederProfile}>
            <img
              src={breeder.logo}
              alt={breeder.name}
              className={styles.breederLogo}
            />
            <Typography variant="h4" className={styles.breederName}>
              {breeder.name}
            </Typography>
            <Typography variant="subtitle1" className={styles.breederBreed}>
              {t(breeder.breedKey)}
            </Typography>
            <Typography variant="body2" className={styles.experience}>
              {breeder.experience}
            </Typography>
            <div className={styles.ratingContainer}>
              <LinearProgress
                variant="determinate"
                value={(breeder.rating / 5) * 100}
                className={styles.ratingProgress}
              />
              <span className={styles.ratingValue}>{breeder.rating}</span>
            </div>
            <div className={styles.socialIcons}>
              {breeder.socials.facebook && (
                <FaFacebookF className={styles.socialIcon} />
              )}
              {breeder.socials.instagram && (
                <FaInstagram className={styles.socialIcon} />
              )}
              {breeder.socials.youtube && (
                <FaYoutube className={styles.socialIcon} />
              )}
              {breeder.socials.twitter && (
                <FaTwitter className={styles.socialIcon} />
              )}
            </div>
          </Box>
        </Grid>

        {/* Контактная информация и описание */}
        <Grid item xs={12} md={8}>
          <Box className={styles.breederInfo}>
            <Typography variant="h6">О нас</Typography>
            <Typography paragraph>{breeder.description}</Typography>

            <Typography variant="h6">Контактная информация</Typography>
            <Typography paragraph>
              <strong>Адрес:</strong> {breeder.address}
            </Typography>
            <Typography paragraph>
              <strong>Телефон:</strong> {breeder.phone}
            </Typography>
            <Typography paragraph>
              <strong>Email:</strong> {breeder.email}
            </Typography>
            <Typography paragraph>
              <strong>Веб-сайт:</strong> {breeder.website}
            </Typography>
            <Typography paragraph>
              <strong>Часы работы:</strong> {breeder.workingHours}
            </Typography>
          </Box>
        </Grid>

        {/* Услуги */}
        <Grid item xs={12}>
          <Box className={styles.services}>
            <Typography variant="h6">Наши услуги</Typography>
            <ul className={styles.servicesList}>
              {breeder.services.map((service, index) => (
                <li key={index}>{service}</li>
              ))}
            </ul>
          </Box>
        </Grid>

        {/* Команда */}
        <Grid item xs={12}>
          <Box className={styles.team}>
            <Typography variant="h6">Наша команда</Typography>
            <Grid container spacing={2}>
              {breeder.team.map((member, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Box className={styles.teamMember}>
                    <Typography variant="subtitle1">{member.name}</Typography>
                    <Typography variant="body2">{member.position}</Typography>
                    <Typography variant="body2">
                      Опыт: {member.experience}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>

        {/* Галерея */}
        <Grid item xs={12}>
          <Typography variant="h6">Галерея</Typography>
          <Grid container spacing={2} className={styles.gallery}>
            {breeder.gallery.map((image, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <img
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  className={styles.galleryImage}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Достижения */}
        <Grid item xs={12}>
          <Typography variant="h6">Достижения</Typography>
          <ul className={styles.achievements}>
            {breeder.achievements.map((achievement, index) => (
              <li key={index}>{achievement}</li>
            ))}
          </ul>
        </Grid>

        {/* Условия содержания */}
        <Grid item xs={12}>
          <Box className={styles.facilities}>
            <Typography variant="h6">Условия содержания</Typography>
            <ul className={styles.facilitiesList}>
              {breeder.facilities.map((facility, index) => (
                <li key={index}>{facility}</li>
              ))}
            </ul>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BreederPage;
