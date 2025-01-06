import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
} from "@mui/material";
import { animalService } from "../../services/animalService";
import styles from "./AnimalsList.module.css";

const AnimalsList = () => {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const response = await animalService.getUserAnimals();
        console.log("Ответ сервера:", response);
        const animalsData = Array.isArray(response)
          ? response
          : response?.data
          ? Array.isArray(response.data)
            ? response.data
            : []
          : [];
        console.log("Обработанные данные:", animalsData);
        setAnimals(animalsData);
      } catch (err) {
        setError("Не удалось загрузить список животных");
        console.error("Error fetching animals:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimals();
  }, []);

  if (loading) {
    return <CircularProgress className={styles.loader} />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <TableContainer component={Paper} className={styles.tableContainer}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Имя</TableCell>
            <TableCell>Вид</TableCell>
            <TableCell>Порода</TableCell>
            <TableCell>Возраст</TableCell>
            <TableCell>Статус</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!animals || animals.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} align="center">
                Нет доступных животных
              </TableCell>
            </TableRow>
          ) : (
            animals.map((animal) => (
              <TableRow key={animal.id || Math.random()}>
                <TableCell>{animal.name}</TableCell>
                <TableCell>{animal.species}</TableCell>
                <TableCell>{animal.breed}</TableCell>
                <TableCell>{animal.age}</TableCell>
                <TableCell>{animal.status}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AnimalsList;
