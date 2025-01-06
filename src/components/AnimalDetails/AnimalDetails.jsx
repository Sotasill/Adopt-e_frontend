import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Grid,
  CircularProgress,
} from "@mui/material";
import { animalService } from "../../services/animalService";
import styles from "./AnimalDetails.module.css";

const AnimalDetails = () => {
  const { id } = useParams();
  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnimalDetails = async () => {
      try {
        setLoading(true);
        const response = await animalService.getAnimalById(id);
        setAnimal(response.data);
      } catch (err) {
        setError("Не удалось загрузить информацию о животном");
        console.error("Error fetching animal details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimalDetails();
  }, [id]);

  if (loading) {
    return <CircularProgress className={styles.loader} />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!animal) {
    return <Typography>Животное не найдено</Typography>;
  }

  const formatDate = (dateString) => {
    if (!dateString) return "Не указана";
    const date = new Date(dateString);
    return date.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <Box className={styles.container}>
      <Paper elevation={3} className={styles.paper}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Avatar
              src={animal.photoUrl || getDefaultImage(animal.species)}
              alt={animal.name}
              className={styles.avatar}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h4" gutterBottom>
              {animal.name}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Идентификатор: {animal.uniqueIdentifier}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Вид: {animal.species}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Порода: {animal.breed}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Пол: {animal.sex}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Дата рождения: {formatDate(animal.birthDate)}
            </Typography>
            {animal.description && (
              <Typography variant="body1" gutterBottom>
                Описание: {animal.description}
              </Typography>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default AnimalDetails;
