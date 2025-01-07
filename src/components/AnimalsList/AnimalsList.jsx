import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
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
  Avatar,
  IconButton,
  Box,
  useMediaQuery,
  useTheme,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Pagination,
  TableSortLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { animalService } from "../../services/animalService";
import styles from "./AnimalsList.module.css";

const AnimalsList = ({ onClose }) => {
  const navigate = useNavigate();
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });
  const [sorting, setSorting] = useState({
    sortBy: "registrationDate",
    sortOrder: "desc",
  });
  const [filters, setFilters] = useState({
    sex: "",
    breed: "",
    search: "",
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const fetchAnimals = async () => {
    try {
      setLoading(true);
      const response = await animalService.getUserAnimals({
        page: pagination.page,
        limit: pagination.limit,
        ...sorting,
        ...filters,
      });

      setAnimals(response.data.animals);
      setPagination({
        ...pagination,
        total: response.data.pagination.total,
        totalPages: response.data.pagination.totalPages,
      });
    } catch (err) {
      setError("Не удалось загрузить список животных");
      console.error("Error fetching animals:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnimals();

    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [pagination.page, sorting.sortBy, sorting.sortOrder]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (pagination.page === 1) {
        fetchAnimals();
      } else {
        setPagination((prev) => ({ ...prev, page: 1 }));
      }
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [filters]);

  const handlePageChange = (event, newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  const handleSortChange = (field) => {
    setSorting((prev) => ({
      sortBy: field,
      sortOrder:
        prev.sortBy === field && prev.sortOrder === "asc" ? "desc" : "asc",
    }));
  };

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Не указана";
    const date = new Date(dateString);
    return date.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getDefaultImage = (species) => {
    return species?.toLowerCase() === "кошка"
      ? "/src/assets/images/default-cat.jpg"
      : "/src/assets/images/default-dog.jpg";
  };

  const handleRowClick = (animalId) => {
    navigate(`/animals/${animalId}`);
  };

  const renderFilters = () => (
    <Box className={styles.filters}>
      <TextField
        label="Поиск по имени"
        variant="outlined"
        size="small"
        value={filters.search}
        onChange={(e) => handleFilterChange("search", e.target.value)}
        className={styles.filterField}
      />
      <FormControl size="small" className={styles.filterField}>
        <InputLabel>Пол</InputLabel>
        <Select
          value={filters.sex}
          label="Пол"
          onChange={(e) => handleFilterChange("sex", e.target.value)}
        >
          <MenuItem value="">Все</MenuItem>
          <MenuItem value="male">Самец</MenuItem>
          <MenuItem value="female">Самка</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Порода"
        variant="outlined"
        size="small"
        value={filters.breed}
        onChange={(e) => handleFilterChange("breed", e.target.value)}
        className={styles.filterField}
      />
    </Box>
  );

  if (loading && !animals.length) {
    return <CircularProgress className={styles.loader} />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  const renderMobileView = () => (
    <div className={styles.responsiveTable}>
      {animals.map((animal) => (
        <div key={animal.id} className={styles.responsiveRow}>
          <div className={styles.responsiveCell}>
            <Avatar
              src={getDefaultImage(animal.species)}
              alt={animal.name}
              className={styles.animalAvatar}
            />
            <div style={{ marginLeft: "10px" }}>
              <Typography variant="subtitle1">{animal.name}</Typography>
              <Typography variant="body2" color="textSecondary">
                {animal.uniqueIdentifier}
              </Typography>
            </div>
          </div>
          <div className={styles.responsiveCell} data-label="Порода">
            {animal.breed}
          </div>
          <div className={styles.responsiveCell} data-label="Пол">
            {animal.sex}
          </div>
          <div className={styles.responsiveCell} data-label="Дата рождения">
            {formatDate(animal.birthDate)}
          </div>
        </div>
      ))}
    </div>
  );

  const renderDesktopView = () => (
    <TableContainer component={Paper} className={styles.tableContainer}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Фото</TableCell>
            <TableCell>
              <TableSortLabel
                active={sorting.sortBy === "name"}
                direction={
                  sorting.sortBy === "name" ? sorting.sortOrder : "asc"
                }
                onClick={() => handleSortChange("name")}
              >
                Имя
              </TableSortLabel>
            </TableCell>
            <TableCell>Идентификатор</TableCell>
            <TableCell>Порода</TableCell>
            <TableCell>
              <TableSortLabel
                active={sorting.sortBy === "sex"}
                direction={sorting.sortBy === "sex" ? sorting.sortOrder : "asc"}
                onClick={() => handleSortChange("sex")}
              >
                Пол
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sorting.sortBy === "birthDate"}
                direction={
                  sorting.sortBy === "birthDate" ? sorting.sortOrder : "asc"
                }
                onClick={() => handleSortChange("birthDate")}
              >
                Дата рождения
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!animals || animals.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} align="center">
                Нет доступных животных
              </TableCell>
            </TableRow>
          ) : (
            animals.map((animal) => (
              <TableRow
                key={animal.id}
                onClick={() => handleRowClick(animal.id)}
                className={styles.clickableRow}
                hover
              >
                <TableCell>
                  <Avatar
                    src={getDefaultImage(animal.species)}
                    alt={animal.name}
                    className={styles.animalAvatar}
                  />
                </TableCell>
                <TableCell>{animal.name}</TableCell>
                <TableCell>{animal.uniqueIdentifier}</TableCell>
                <TableCell>{animal.breed}</TableCell>
                <TableCell>{animal.sex}</TableCell>
                <TableCell>{formatDate(animal.birthDate)}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Box className={styles.fullScreenContainer}>
      <Box className={styles.header}>
        <Typography variant="h5">Список животных</Typography>
        <IconButton onClick={onClose} className={styles.closeButton}>
          <CloseIcon />
        </IconButton>
      </Box>

      {renderFilters()}

      {loading && <CircularProgress size={24} className={styles.tableLoader} />}

      {isMobile ? renderMobileView() : renderDesktopView()}

      <Box className={styles.pagination}>
        <Pagination
          count={pagination.totalPages}
          page={pagination.page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
};

AnimalsList.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default AnimalsList;
