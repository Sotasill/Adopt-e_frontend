import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Grid,
  CircularProgress,
  Button,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  TextField,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Snackbar,
  Autocomplete,
  Menu,
  MenuItem,
  DialogContentText,
  Switch,
  FormControlLabel,
  FormGroup,
  Badge,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import ImageIcon from "@mui/icons-material/Image";
import { animalService } from "../../services/animalService";
import styles from "./AnimalDetails.module.css";
import QuickLinks from "../../pages/QuickLinksBCS/QuickLinks";
import SaveIcon from "@mui/icons-material/Save";
import ImageGallery from "react-image-gallery";
import Lightbox from "yet-another-react-lightbox";
import "react-image-gallery/styles/css/image-gallery.css";
import "yet-another-react-lightbox/styles.css";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { useDispatch } from "react-redux";
import { addNotification } from "../../redux/notifications/notificationsSlice";

const getDefaultImage = (species) => {
  return species?.toLowerCase() === "кошка"
    ? "/src/assets/images/default-cat.jpg"
    : "/src/assets/images/default-dog.jpg";
};

const DOG_VACCINES = [
  "Nobivac DHPPi + L",
  "Eurican DHPPI2-L",
  "Vanguard Plus 5/L",
  "Biocan DHPPi + L",
  "Hexadog",
  "Nobivac Rabies",
  "Rabizin",
  "Defensor 3",
  "Другое",
];

const CAT_VACCINES = [
  "Nobivac Tricat Trio",
  "Purevax RCP",
  "Felocell 3",
  "Quadricat",
  "Eurican RCP",
  "Nobivac Rabies",
  "Rabifel",
  "Purevax Rabies",
  "Другое",
];

const DEWORMING_MEDICINES = [
  "Milbemax",
  "Drontal",
  "Cestal",
  "Caniverm",
  "Pratel",
  "Prazitel",
  "Profender (капли на холку)",
  "Stronghold (капли на холку)",
  "Broadline (капли на холку)",
  "Helmintal (капли на холку)",
  "Panacur",
  "Albendazole",
  "Febtal",
  "Dirofen",
  "Другое",
];

const AnimalDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openVaccinationDialog, setOpenVaccinationDialog] = useState(false);
  const [openTreatmentDialog, setOpenTreatmentDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [newVaccination, setNewVaccination] = useState({
    date: new Date(),
    name: "",
    reminder: {
      enabled: false,
      date: new Date(),
      time: "12:00",
      sendEmail: false,
      sendNotification: true,
    },
  });
  const [newTreatment, setNewTreatment] = useState({
    date: new Date(),
    name: "",
    reminder: {
      enabled: false,
      date: new Date(),
      time: "12:00",
      sendEmail: false,
      sendNotification: true,
    },
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [openTreatmentPostDialog, setOpenTreatmentPostDialog] = useState(false);
  const [newTreatmentPost, setNewTreatmentPost] = useState({
    date: new Date(),
    content: "",
    images: [],
    reminder: {
      enabled: false,
      date: new Date(),
      time: "12:00",
      sendEmail: false,
      sendNotification: true,
    },
  });
  const [openNotesDialog, setOpenNotesDialog] = useState(false);
  const [newNote, setNewNote] = useState({
    date: new Date(),
    content: "",
    images: [],
    reminder: {
      enabled: false,
      date: new Date(),
      time: "12:00",
      sendEmail: false,
      sendNotification: true,
    },
  });
  const [customVaccine, setCustomVaccine] = useState("");
  const [customTreatment, setCustomTreatment] = useState("");
  const [openHabitsDialog, setOpenHabitsDialog] = useState(false);
  const [editableHabits, setEditableHabits] = useState({
    date: new Date(),
    foodHabits: "",
    litterTraining: false,
    shortInfo: "",
  });
  const [openFoodHabitsDialog, setOpenFoodHabitsDialog] = useState(false);
  const [openShortInfoDialog, setOpenShortInfoDialog] = useState(false);
  const [newFoodHabit, setNewFoodHabit] = useState({
    date: new Date(),
    content: "",
  });
  const [newShortInfo, setNewShortInfo] = useState({
    date: new Date(),
    content: "",
  });
  const [editableBasicInfo, setEditableBasicInfo] = useState({
    name: "",
    microchip: "",
    owner: "",
  });
  const [editingField, setEditingField] = useState({
    name: false,
    microchip: false,
    owner: false,
  });
  const [images, setImages] = useState([]);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [statusAnchorEl, setStatusAnchorEl] = useState(null);
  const [confirmStatusDialog, setConfirmStatusDialog] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const dispatch = useDispatch();

  const statusOptions = [
    { value: "active", label: "Активен", color: "success" },
    { value: "inactive", label: "Неактивен", color: "warning" },
    { value: "sold", label: "Продан", color: "info" },
    { value: "dead", label: "Умер", color: "error" },
  ];

  const handleStatusClick = (event) => {
    if (!["sold", "dead"].includes(animal.status)) {
      setStatusAnchorEl(event.currentTarget);
    }
  };

  const handleStatusClose = () => {
    setStatusAnchorEl(null);
  };

  const handleStatusSelect = (status) => {
    setSelectedStatus(status);
    handleStatusClose();

    if (status.value === "dead" || status.value === "sold") {
      setConfirmStatusDialog(true);
    } else {
      updateAnimalStatus(status.value);
    }
  };

  const handleConfirmStatus = () => {
    if (selectedStatus) {
      updateAnimalStatus(selectedStatus.value);
    }
    setConfirmStatusDialog(false);
  };

  const updateAnimalStatus = async (statusValue) => {
    try {
      await animalService.updateAnimal(id, {
        status: statusValue,
      });

      setAnimal({
        ...animal,
        status: statusValue,
      });
      showSuccess("Статус успешно обновлен");
    } catch (err) {
      console.error("Error updating status:", err);
      showError("Ошибка при обновлении статуса");
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const showError = (message) => {
    setSnackbar({
      open: true,
      message: message,
      severity: "error",
    });
  };

  const showSuccess = (message) => {
    setSnackbar({
      open: true,
      message: message,
      severity: "success",
    });
  };

  const createNotification = (title, message) => {
    dispatch(
      addNotification({
        id: Date.now(),
        title,
        message,
        timestamp: new Date().toISOString(),
      })
    );
  };

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

  const handleEdit = () => {
    // Добавить логику редактирования
    console.log("Edit animal:", id);
  };

  const handleDelete = async () => {
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await animalService.deleteAnimal(id);
      setOpenDeleteDialog(false);
      navigate("/animals");
    } catch (err) {
      console.error("Error deleting animal:", err);
      showError("Ошибка при удалении животного");
    }
  };

  const validateDate = (selectedDate, birthDate) => {
    const selected = new Date(selectedDate);
    const birth = new Date(birthDate);
    const today = new Date();

    if (selected < birth) {
      showError("Дата не может быть раньше даты рождения животного");
      return false;
    }

    if (selected > today) {
      showError("Дата не может быть позже текущей даты");
      return false;
    }

    return true;
  };

  const handleAddVaccination = async () => {
    try {
      if (!newVaccination.date || !newVaccination.name?.trim()) {
        showError("Пожалуйста, заполните все поля");
        return;
      }

      if (!validateDate(newVaccination.date, animal.birthDate)) {
        return;
      }

      const updatedVaccinations = [
        ...(animal.vaccinations || []),
        {
          date: newVaccination.date,
          name: newVaccination.name.trim(),
          reminder: newVaccination.reminder,
        },
      ];

      await animalService.updateAnimal(id, {
        vaccinations: updatedVaccinations,
      });

      setAnimal({
        ...animal,
        vaccinations: updatedVaccinations,
      });
      setOpenVaccinationDialog(false);
      setNewVaccination({
        date: new Date(),
        name: "",
        reminder: {
          enabled: false,
          date: new Date(),
          time: "12:00",
          sendEmail: false,
          sendNotification: true,
        },
      });
      setCustomVaccine("");
      showSuccess("Вакцинация успешно добавлена");

      if (newVaccination.reminder.enabled) {
        if (newVaccination.reminder.sendNotification) {
          createNotification(
            "Напоминание о вакцинации",
            `Вакцинация "${newVaccination.name}" для ${
              animal.name
            } запланирована на ${formatDate(newVaccination.reminder.date)} ${
              newVaccination.reminder.time
            }`
          );
        }
      }
    } catch (err) {
      console.error("Error adding vaccination:", err);
      showError(
        err.response?.data?.message || "Ошибка при добавлении вакцинации"
      );
    }
  };

  const handleAddTreatment = async () => {
    try {
      if (!newTreatment.date || !newTreatment.name?.trim()) {
        showError("Пожалуйста, заполните все поля");
        return;
      }

      if (!validateDate(newTreatment.date, animal.birthDate)) {
        return;
      }

      const updatedTreatments = [
        ...(animal.treatments || []),
        {
          date: newTreatment.date,
          name: newTreatment.name.trim(),
          reminder: newTreatment.reminder,
        },
      ];

      await animalService.updateAnimal(id, {
        treatments: updatedTreatments,
      });

      setAnimal({
        ...animal,
        treatments: updatedTreatments,
      });
      setOpenTreatmentDialog(false);
      setNewTreatment({
        date: new Date(),
        name: "",
        reminder: {
          enabled: false,
          date: new Date(),
          time: "12:00",
          sendEmail: false,
          sendNotification: true,
        },
      });
      setCustomTreatment("");
      showSuccess("Процедура успешно добавлена");

      if (newTreatment.reminder.enabled) {
        if (newTreatment.reminder.sendNotification) {
          createNotification(
            "Напоминание о дегельминтизации",
            `Процедура "${newTreatment.name}" для ${
              animal.name
            } запланирована на ${formatDate(newTreatment.reminder.date)} ${
              newTreatment.reminder.time
            }`
          );
        }
      }
    } catch (err) {
      console.error("Error adding treatment:", err);
      showError(
        err.response?.data?.message || "Ошибка при добавлении процедуры"
      );
    }
  };

  const handleAddTreatmentPost = async () => {
    try {
      if (!newTreatmentPost.date || !newTreatmentPost.content.trim()) {
        showError("Пожалуйста, заполните все поля");
        return;
      }

      const formData = new FormData();
      formData.append("date", newTreatmentPost.date);
      formData.append("content", newTreatmentPost.content);
      formData.append("reminder", JSON.stringify(newTreatmentPost.reminder));
      newTreatmentPost.images.forEach((image, index) => {
        formData.append(`images[${index}]`, image);
      });

      await animalService.addTreatmentPost(id, formData);
      setOpenTreatmentPostDialog(false);
      setNewTreatmentPost({
        date: new Date(),
        content: "",
        images: [],
        reminder: {
          enabled: false,
          date: new Date(),
          time: "12:00",
          sendEmail: false,
          sendNotification: true,
        },
      });
      showSuccess("Запись о лечении успешно добавлена");

      if (newTreatmentPost.reminder.enabled) {
        if (newTreatmentPost.reminder.sendNotification) {
          addNotification(
            "Напоминание о лечении",
            `Запись о лечении для ${animal.name}`,
            newTreatmentPost.reminder.date,
            newTreatmentPost.reminder.time
          );
        }
      }
    } catch (err) {
      console.error("Error adding treatment post:", err);
      showError(
        err.response?.data?.message || "Ошибка при добавлении записи о лечении"
      );
    }
  };

  const handleImageUpload = async (event) => {
    const files = Array.from(event.target.files);
    const formData = new FormData();

    files.forEach((file, index) => {
      formData.append(`images[${index}]`, file);
    });

    try {
      const response = await animalService.uploadImages(id, formData);
      const newImages = response.data.images.map((img) => ({
        original: img.url,
        thumbnail: img.thumbnailUrl,
        description: `Изображение ${img.id}`,
      }));

      setImages((prevImages) => [...prevImages, ...newImages]);
      showSuccess("Изображения успешно загружены");
    } catch (err) {
      console.error("Error uploading images:", err);
      showError("Ошибка при загрузке изображений");
    }
  };

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = newTreatmentPost.images.filter((_, i) => i !== index);
    setNewTreatmentPost({
      ...newTreatmentPost,
      images: updatedImages,
    });
  };

  const handleAddNote = async () => {
    try {
      if (!newNote.date || !newNote.content.trim()) {
        showError("Пожалуйста, заполните все поля");
        return;
      }

      const formData = new FormData();
      formData.append("date", newNote.date);
      formData.append("content", newNote.content);
      formData.append("reminder", JSON.stringify(newNote.reminder));
      newNote.images.forEach((image, index) => {
        formData.append(`images[${index}]`, image);
      });

      await animalService.addNote(id, formData);
      setOpenNotesDialog(false);
      setNewNote({
        date: new Date(),
        content: "",
        images: [],
        reminder: {
          enabled: false,
          date: new Date(),
          time: "12:00",
          sendEmail: false,
          sendNotification: true,
        },
      });
      showSuccess("Заметка успешно добавлена");

      if (newNote.reminder.enabled) {
        if (newNote.reminder.sendNotification) {
          addNotification(
            "Напоминание о заметке",
            `Заметка для ${animal.name}`,
            newNote.reminder.date,
            newNote.reminder.time
          );
        }
      }
    } catch (err) {
      console.error("Error adding note:", err);
      showError(err.response?.data?.message || "Ошибка при добавлении заметки");
    }
  };

  const handleNoteImageUpload = (event) => {
    const files = Array.from(event.target.files);
    setNewNote({
      ...newNote,
      images: [...newNote.images, ...files],
    });
  };

  const handleRemoveNoteImage = (index) => {
    setNewNote({
      ...newNote,
      images: newNote.images.filter((_, i) => i !== index),
    });
  };

  const handleOpenVaccinationDialog = () => {
    setNewVaccination({
      date: new Date(),
      name: "",
      reminder: {
        enabled: false,
        date: new Date(),
        time: "12:00",
        sendEmail: false,
        sendNotification: true,
      },
    });
    setOpenVaccinationDialog(true);
  };

  const handleOpenTreatmentDialog = () => {
    setNewTreatment({
      date: new Date(),
      name: "",
      reminder: {
        enabled: false,
        date: new Date(),
        time: "12:00",
        sendEmail: false,
        sendNotification: true,
      },
    });
    setCustomTreatment("");
    setOpenTreatmentDialog(true);
  };

  const handleOpenTreatmentPostDialog = () => {
    setNewTreatmentPost({
      date: new Date(),
      content: "",
      images: [],
      reminder: {
        enabled: false,
        date: new Date(),
        time: "12:00",
        sendEmail: false,
        sendNotification: true,
      },
    });
    setOpenTreatmentPostDialog(true);
  };

  const handleOpenNotesDialog = () => {
    setNewNote({
      date: new Date(),
      content: "",
      images: [],
      reminder: {
        enabled: false,
        date: new Date(),
        time: "12:00",
        sendEmail: false,
        sendNotification: true,
      },
    });
    setOpenNotesDialog(true);
  };

  const getVaccinesList = () => {
    return animal?.species?.toLowerCase() === "кошка"
      ? CAT_VACCINES
      : DOG_VACCINES;
  };

  const handleSaveHabitsInfo = async () => {
    try {
      await animalService.updateAnimal(id, {
        foodHabits: editableHabits.foodHabits,
        litterTraining: editableHabits.litterTraining,
        shortInfo: editableHabits.shortInfo,
      });

      setAnimal({
        ...animal,
        foodHabits: editableHabits.foodHabits,
        litterTraining: editableHabits.litterTraining,
        shortInfo: editableHabits.shortInfo,
      });
      setOpenHabitsDialog(false);
      showSuccess("Информация успешно обновлена");
    } catch (err) {
      console.error("Error saving habits:", err);
      showError(
        err.response?.data?.message || "Ошибка при сохранении информации"
      );
    }
  };

  const handleSaveFoodHabits = async () => {
    try {
      if (!newFoodHabit.content.trim()) {
        showError("Пожалуйста, заполните поле");
        return;
      }

      await animalService.updateAnimal(id, {
        foodHabits: [
          ...(animal.foodHabits || []),
          {
            date: newFoodHabit.date,
            content: newFoodHabit.content.trim(),
          },
        ],
      });

      setAnimal({
        ...animal,
        foodHabits: [
          ...(animal.foodHabits || []),
          {
            date: newFoodHabit.date,
            content: newFoodHabit.content.trim(),
          },
        ],
      });
      setOpenFoodHabitsDialog(false);
      setNewFoodHabit({ date: new Date(), content: "" });
      showSuccess("Информация успешно добавлена");
    } catch (err) {
      console.error("Error saving food habits:", err);
      showError(
        err.response?.data?.message || "Ошибка при сохранении информации"
      );
    }
  };

  const handleSaveShortInfo = async () => {
    try {
      if (!newShortInfo.content.trim()) {
        showError("Пожалуйста, заполните поле");
        return;
      }

      await animalService.updateAnimal(id, {
        shortInfo: [
          ...(animal.shortInfo || []),
          {
            date: newShortInfo.date,
            content: newShortInfo.content.trim(),
          },
        ],
      });

      setAnimal({
        ...animal,
        shortInfo: [
          ...(animal.shortInfo || []),
          {
            date: newShortInfo.date,
            content: newShortInfo.content.trim(),
          },
        ],
      });
      setOpenShortInfoDialog(false);
      setNewShortInfo({ date: new Date(), content: "" });
      showSuccess("Информация успешно добавлена");
    } catch (err) {
      console.error("Error saving short info:", err);
      showError(
        err.response?.data?.message || "Ошибка при сохранении информации"
      );
    }
  };

  const handleSaveField = async (field, value) => {
    try {
      await animalService.updateAnimal(id, {
        [field]: value,
      });

      setAnimal({
        ...animal,
        [field]: value,
      });
      setEditingField({ ...editingField, [field]: false });
      showSuccess("Информация успешно обновлена");
    } catch (err) {
      console.error(`Error saving ${field}:`, err);
      showError(
        err.response?.data?.message || "Ошибка при сохранении информации"
      );
    }
  };

  const ReminderBlock = ({ reminder, onChange }) => (
    <Box sx={{ mt: 2, mb: 2 }}>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={reminder.enabled}
              onChange={(e) =>
                onChange({
                  ...reminder,
                  enabled: e.target.checked,
                })
              }
            />
          }
          label={
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <NotificationsIcon sx={{ mr: 1 }} />
              <Typography>Установить напоминание</Typography>
            </Box>
          }
        />
      </FormGroup>

      {reminder.enabled && (
        <Box sx={{ ml: 4, mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                type="date"
                label="Дата напоминания"
                fullWidth
                value={
                  reminder.date
                    ? new Date(reminder.date).toISOString().split("T")[0]
                    : ""
                }
                onChange={(e) =>
                  onChange({
                    ...reminder,
                    date: new Date(e.target.value),
                  })
                }
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  min: new Date().toISOString().split("T")[0],
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="time"
                label="Время напоминания"
                fullWidth
                value={reminder.time}
                onChange={(e) =>
                  onChange({
                    ...reminder,
                    time: e.target.value,
                  })
                }
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={reminder.sendEmail}
                      onChange={(e) =>
                        onChange({
                          ...reminder,
                          sendEmail: e.target.checked,
                        })
                      }
                    />
                  }
                  label="Отправить на email"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={reminder.sendNotification}
                      onChange={(e) =>
                        onChange({
                          ...reminder,
                          sendNotification: e.target.checked,
                        })
                      }
                    />
                  }
                  label="Показать уведомление в браузере"
                />
              </FormGroup>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );

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
    <>
      <QuickLinks />
      <Box className={styles.container}>
        <Paper elevation={3} className={styles.paper}>
          {/* Верхняя панель с кнопками */}
          <Box className={styles.actionButtons}></Box>

          <Grid container spacing={3}>
            {/* Фото и основная информация */}
            <Grid item xs={12} md={4}>
              <Box className={styles.imageSection}>
                <Avatar
                  src={animal.photoUrl || getDefaultImage(animal.species)}
                  alt={animal.name}
                  className={styles.avatar}
                />
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: "none" }}
                  id="animal-images-upload"
                />
                <label htmlFor="animal-images-upload">
                  <Button
                    variant="outlined"
                    component="span"
                    startIcon={<ImageIcon />}
                    sx={{ mt: 2 }}
                  >
                    Добавить фото
                  </Button>
                </label>

                {images.length > 0 && (
                  <Box className={styles.galleryContainer}>
                    <ImageGallery
                      items={images}
                      showPlayButton={false}
                      showFullscreenButton={false}
                      onClick={(e, index) => handleImageClick(index)}
                      showBullets={images.length > 1}
                    />
                  </Box>
                )}
              </Box>
              <Box mt={2}>
                <Chip
                  label={
                    statusOptions.find(
                      (s) => s.value === (animal.status || "active")
                    )?.label || "Активен"
                  }
                  color={
                    statusOptions.find(
                      (s) => s.value === (animal.status || "active")
                    )?.color || "success"
                  }
                  className={styles.statusChip}
                  onClick={handleStatusClick}
                  style={{
                    cursor: !["sold", "dead"].includes(animal.status)
                      ? "pointer"
                      : "default",
                  }}
                />
                <Menu
                  anchorEl={statusAnchorEl}
                  open={Boolean(statusAnchorEl)}
                  onClose={handleStatusClose}
                >
                  {statusOptions.map((status) => (
                    <MenuItem
                      key={status.value}
                      onClick={() => handleStatusSelect(status)}
                    >
                      <Chip
                        label={status.label}
                        color={status.color}
                        size="small"
                        style={{ pointerEvents: "none" }}
                      />
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Grid>

            {/* Основная информация */}
            <Grid item xs={12} md={8}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
              >
                {editingField.name ? (
                  <Box display="flex" alignItems="center" width="100%" gap={1}>
                    <TextField
                      fullWidth
                      value={editableBasicInfo.name}
                      onChange={(e) =>
                        setEditableBasicInfo({
                          ...editableBasicInfo,
                          name: e.target.value,
                        })
                      }
                      onBlur={() =>
                        handleSaveField("name", editableBasicInfo.name)
                      }
                      variant="standard"
                      sx={{ fontSize: "h4.fontSize" }}
                      autoFocus
                    />
                  </Box>
                ) : (
                  <Box display="flex" alignItems="center" gap={1}>
                    <Typography variant="h4">{animal.name}</Typography>
                    <IconButton
                      size="small"
                      onClick={() => {
                        setEditableBasicInfo({
                          ...editableBasicInfo,
                          name: animal.name,
                        });
                        setEditingField({ ...editingField, name: true });
                      }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Box>
                )}
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    <strong>Идентификатор:</strong> {animal.uniqueIdentifier}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Порода:</strong> {animal.breed}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Пол:</strong> {animal.sex}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Дата рождения:</strong>{" "}
                    {formatDate(animal.birthDate)}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Дата регистрации:</strong>{" "}
                    {formatDate(animal.registrationDate)}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="body1" gutterBottom>
                    <strong>Цвет:</strong> {animal.furColor}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Цвет глаз:</strong> {animal.eyeColor}
                  </Typography>
                  <Box display="flex" alignItems="center" gap={1} mb={1}>
                    <Typography variant="body1">
                      <strong>Микрочип:</strong>{" "}
                      {editingField.microchip ? (
                        <TextField
                          size="small"
                          value={editableBasicInfo.microchip}
                          onChange={(e) =>
                            setEditableBasicInfo({
                              ...editableBasicInfo,
                              microchip: e.target.value,
                            })
                          }
                          onBlur={() =>
                            handleSaveField(
                              "microchip",
                              editableBasicInfo.microchip
                            )
                          }
                          autoFocus
                        />
                      ) : (
                        animal.microchip || "Не указан"
                      )}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() => {
                        setEditableBasicInfo({
                          ...editableBasicInfo,
                          microchip: animal.microchip || "",
                        });
                        setEditingField({ ...editingField, microchip: true });
                      }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1} mb={1}>
                    <Typography variant="body1">
                      <strong>Владелец:</strong>{" "}
                      {editingField.owner ? (
                        <TextField
                          size="small"
                          value={editableBasicInfo.owner}
                          onChange={(e) =>
                            setEditableBasicInfo({
                              ...editableBasicInfo,
                              owner: e.target.value,
                            })
                          }
                          onBlur={() =>
                            handleSaveField("owner", editableBasicInfo.owner)
                          }
                          autoFocus
                        />
                      ) : (
                        animal.owner || "Не указан"
                      )}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() => {
                        setEditableBasicInfo({
                          ...editableBasicInfo,
                          owner: animal.owner || "",
                        });
                        setEditingField({ ...editingField, owner: true });
                      }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Box>
                  <Typography variant="body1" gutterBottom>
                    <strong>Заводчик:</strong> {animal.breeder || "Не указан"}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            {/* Дополнительная информация */}
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>
                Дополнительная информация
              </Typography>

              <Grid container spacing={3}>
                {/* Пищевые привычки */}
                <Grid item xs={12} md={6}>
                  <Paper elevation={1} className={styles.sectionPaper}>
                    <Box className={styles.treatmentHeader}>
                      <Typography variant="subtitle1">
                        Пищевые привычки
                      </Typography>
                      <Button
                        startIcon={<AddIcon />}
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          setNewFoodHabit({
                            date: new Date(),
                            content: "",
                          });
                          setOpenFoodHabitsDialog(true);
                        }}
                      >
                        Добавить запись
                      </Button>
                    </Box>
                    <Box className={styles.treatmentPosts}>
                      {(animal.foodHabits || []).map((habit, index) => (
                        <Paper
                          key={index}
                          elevation={2}
                          className={styles.treatmentPost}
                        >
                          <Box className={styles.treatmentPostHeader}>
                            <Typography variant="subtitle2">
                              {formatDate(habit.date)}
                            </Typography>
                          </Box>
                          <Typography
                            variant="body1"
                            className={styles.treatmentPostContent}
                          >
                            {habit.content}
                          </Typography>
                        </Paper>
                      ))}
                      {(!animal.foodHabits ||
                        animal.foodHabits.length === 0) && (
                        <Typography variant="body2" color="textSecondary">
                          Информация о пищевых привычках не добавлена
                        </Typography>
                      )}
                    </Box>
                  </Paper>
                </Grid>

                {/* Приучение к лотку */}
                <Grid item xs={12} md={6}>
                  <Paper elevation={1} className={styles.sectionPaper}>
                    <Box className={styles.treatmentHeader}>
                      <Typography variant="subtitle1">
                        Приучение к лотку
                      </Typography>
                      <Button
                        variant={
                          animal.litterTraining ? "contained" : "outlined"
                        }
                        color="primary"
                        onClick={async () => {
                          try {
                            await animalService.updateAnimal(id, {
                              litterTraining: !animal.litterTraining,
                            });
                            setAnimal({
                              ...animal,
                              litterTraining: !animal.litterTraining,
                            });
                            showSuccess("Статус успешно обновлен");
                          } catch (err) {
                            console.error(
                              "Error updating litter training:",
                              err
                            );
                            showError("Ошибка при обновлении статуса");
                          }
                        }}
                      >
                        {animal.litterTraining ? "Да" : "Нет"}
                      </Button>
                    </Box>
                  </Paper>
                </Grid>

                {/* Краткая информация */}
                <Grid item xs={12} md={6}>
                  <Paper elevation={1} className={styles.sectionPaper}>
                    <Box className={styles.treatmentHeader}>
                      <Typography variant="subtitle1">
                        Краткая информация
                      </Typography>
                      <Button
                        startIcon={<AddIcon />}
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          setNewShortInfo({
                            date: new Date(),
                            content: "",
                          });
                          setOpenShortInfoDialog(true);
                        }}
                      >
                        Добавить запись
                      </Button>
                    </Box>
                    <Box className={styles.treatmentPosts}>
                      {(animal.shortInfo || []).map((info, index) => (
                        <Paper
                          key={index}
                          elevation={2}
                          className={styles.treatmentPost}
                        >
                          <Box className={styles.treatmentPostHeader}>
                            <Typography variant="subtitle2">
                              {formatDate(info.date)}
                            </Typography>
                          </Box>
                          <Typography
                            variant="body1"
                            className={styles.treatmentPostContent}
                          >
                            {info.content}
                          </Typography>
                        </Paper>
                      ))}
                      {(!animal.shortInfo || animal.shortInfo.length === 0) && (
                        <Typography variant="body2" color="textSecondary">
                          Краткая информация не добавлена
                        </Typography>
                      )}
                    </Box>
                  </Paper>
                </Grid>

                {/* Заметки */}
                <Grid item xs={12} md={6}>
                  <Paper elevation={1} className={styles.sectionPaper}>
                    <Box className={styles.treatmentHeader}>
                      <Typography variant="subtitle1">Заметки</Typography>
                      <Button
                        startIcon={<AddIcon />}
                        variant="contained"
                        color="primary"
                        onClick={handleOpenNotesDialog}
                      >
                        Добавить заметку
                      </Button>
                    </Box>
                    <Box className={styles.treatmentPosts}>
                      {(animal.notes || []).map((note, index) => (
                        <Paper
                          key={index}
                          elevation={2}
                          className={styles.treatmentPost}
                        >
                          <Box className={styles.treatmentPostHeader}>
                            <Typography variant="subtitle2">
                              {formatDate(note.date)}
                            </Typography>
                            {note.reminder?.enabled && (
                              <Chip
                                icon={<NotificationsIcon />}
                                label={`Напоминание: ${formatDate(
                                  note.reminder.date
                                )} ${note.reminder.time}`}
                                size="small"
                                color="primary"
                                variant="outlined"
                              />
                            )}
                          </Box>
                          <Typography
                            variant="body1"
                            className={styles.treatmentPostContent}
                          >
                            {note.content}
                          </Typography>
                          {note.images && note.images.length > 0 && (
                            <Box className={styles.treatmentPostImages}>
                              {note.images.map((image, imgIndex) => (
                                <img
                                  key={imgIndex}
                                  src={image}
                                  alt={`Изображение ${imgIndex + 1}`}
                                  className={styles.treatmentImage}
                                />
                              ))}
                            </Box>
                          )}
                        </Paper>
                      ))}
                    </Box>
                  </Paper>
                </Grid>

                {/* Медицинская информация */}
                <Grid item xs={12}>
                  <Paper elevation={1} className={styles.sectionPaper}>
                    <Typography variant="subtitle1" gutterBottom>
                      Медицинская информация
                    </Typography>
                    <Grid container spacing={2}>
                      {/* Вакцинации */}
                      <Grid item xs={12} md={6}>
                        <Box className={styles.medicalSection}>
                          <Typography variant="body2" gutterBottom>
                            <strong>Вакцинации:</strong>
                          </Typography>
                          <Button
                            startIcon={<AddIcon />}
                            variant="outlined"
                            size="small"
                            onClick={handleOpenVaccinationDialog}
                            className={styles.addButton}
                          >
                            Добавить вакцинацию
                          </Button>
                          <List dense className={styles.medicalList}>
                            {(animal.vaccinations || []).map(
                              (vaccination, index) => (
                                <ListItem key={index}>
                                  <ListItemText
                                    primary={vaccination.name}
                                    secondary={
                                      <Box>
                                        {formatDate(vaccination.date)}
                                        {vaccination.reminder?.enabled && (
                                          <Chip
                                            icon={<NotificationsIcon />}
                                            label={`Напоминание: ${formatDate(
                                              vaccination.reminder.date
                                            )} ${vaccination.reminder.time}`}
                                            size="small"
                                            color="primary"
                                            variant="outlined"
                                            sx={{ ml: 1 }}
                                          />
                                        )}
                                      </Box>
                                    }
                                  />
                                </ListItem>
                              )
                            )}
                          </List>
                        </Box>
                      </Grid>

                      {/* Дегельминтизация */}
                      <Grid item xs={12} md={6}>
                        <Box className={styles.medicalSection}>
                          <Typography variant="body2" gutterBottom>
                            <strong>Дегельминтизация:</strong>
                          </Typography>
                          <Button
                            startIcon={<AddIcon />}
                            variant="outlined"
                            size="small"
                            onClick={handleOpenTreatmentDialog}
                            className={styles.addButton}
                          >
                            Добавить процедуру
                          </Button>
                          <List dense className={styles.medicalList}>
                            {(animal.treatments || []).map(
                              (treatment, index) => (
                                <ListItem key={index}>
                                  <ListItemText
                                    primary={treatment.name}
                                    secondary={
                                      <Box>
                                        {formatDate(treatment.date)}
                                        {treatment.reminder?.enabled && (
                                          <Chip
                                            icon={<NotificationsIcon />}
                                            label={`Напоминание: ${formatDate(
                                              treatment.reminder.date
                                            )} ${treatment.reminder.time}`}
                                            size="small"
                                            color="primary"
                                            variant="outlined"
                                            sx={{ ml: 1 }}
                                          />
                                        )}
                                      </Box>
                                    }
                                  />
                                </ListItem>
                              )
                            )}
                          </List>
                        </Box>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>

                {/* Лечение */}
                <Grid item xs={12}>
                  <Paper elevation={1} className={styles.sectionPaper}>
                    <Box className={styles.treatmentHeader}>
                      <Typography variant="subtitle1">
                        История лечения
                      </Typography>
                      <Button
                        startIcon={<AddIcon />}
                        variant="contained"
                        color="primary"
                        onClick={handleOpenTreatmentPostDialog}
                      >
                        Добавить запись
                      </Button>
                    </Box>
                    <Box className={styles.treatmentPosts}>
                      {(animal.treatmentPosts || []).map((post, index) => (
                        <Paper
                          key={index}
                          elevation={2}
                          className={styles.treatmentPost}
                        >
                          <Box className={styles.treatmentPostHeader}>
                            <Typography variant="subtitle2">
                              {formatDate(post.date)}
                            </Typography>
                            {post.reminder?.enabled && (
                              <Chip
                                icon={<NotificationsIcon />}
                                label={`Напоминание: ${formatDate(
                                  post.reminder.date
                                )} ${post.reminder.time}`}
                                size="small"
                                color="primary"
                                variant="outlined"
                              />
                            )}
                          </Box>
                          <Typography
                            variant="body1"
                            className={styles.treatmentPostContent}
                          >
                            {post.content}
                          </Typography>
                          {post.images && post.images.length > 0 && (
                            <Box className={styles.treatmentPostImages}>
                              {post.images.map((image, imgIndex) => (
                                <img
                                  key={imgIndex}
                                  src={image}
                                  alt={`Изображение ${imgIndex + 1}`}
                                  className={styles.treatmentImage}
                                />
                              ))}
                            </Box>
                          )}
                        </Paper>
                      ))}
                    </Box>
                  </Paper>
                </Grid>

                {/* Связанные помёты */}
                <Grid item xs={12}>
                  <Paper elevation={1} className={styles.sectionPaper}>
                    <Typography variant="subtitle1" gutterBottom>
                      Связанные помёты
                    </Typography>
                    <List dense>
                      {(animal.litters || []).map((litter, index) => (
                        <ListItem key={index}>
                          <ListItemText
                            primary={`Помёт #${litter.number}`}
                            secondary={`Дата: ${formatDate(
                              litter.date
                            )}, Количество котят: ${litter.kittensCount}`}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/* Кнопка удаления в нижней части */}
          <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={handleDelete}
            >
              Удалить
            </Button>
          </Box>
        </Paper>
      </Box>

      {/* Диалог добавления вакцинации */}
      <Dialog
        open={openVaccinationDialog}
        onClose={() => setOpenVaccinationDialog(false)}
      >
        <DialogTitle>Добавить вакцинацию</DialogTitle>
        <DialogContent>
          <Box className={styles.dialogContent}>
            <TextField
              fullWidth
              type="date"
              label="Дата вакцинации"
              value={
                newVaccination.date
                  ? new Date(newVaccination.date).toISOString().split("T")[0]
                  : ""
              }
              onChange={(e) =>
                setNewVaccination({
                  ...newVaccination,
                  date: new Date(e.target.value),
                })
              }
              InputLabelProps={{ shrink: true }}
              inputProps={{
                min: animal.birthDate
                  ? new Date(animal.birthDate).toISOString().split("T")[0]
                  : "",
                max: new Date().toISOString().split("T")[0],
              }}
            />
            <Autocomplete
              freeSolo={
                newVaccination.name === "Другое" || customVaccine !== ""
              }
              fullWidth
              options={getVaccinesList()}
              value={newVaccination.name}
              inputValue={customVaccine}
              onInputChange={(event, newValue) => {
                setCustomVaccine(newValue);
                if (newVaccination.name === "Другое" || customVaccine !== "") {
                  setNewVaccination({ ...newVaccination, name: newValue });
                }
              }}
              onChange={(event, newValue) => {
                if (newValue === "Другое") {
                  setNewVaccination({ ...newVaccination, name: "Другое" });
                  setCustomVaccine("");
                } else {
                  setNewVaccination({
                    ...newVaccination,
                    name: newValue || customVaccine,
                  });
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Название вакцины"
                  margin="normal"
                  placeholder={
                    newVaccination.name === "Другое"
                      ? "Введите название вакцины"
                      : "Выберите или введите название вакцины"
                  }
                />
              )}
            />
            {(newVaccination.name === "Другое" || customVaccine !== "") && (
              <TextField
                fullWidth
                label="Введите название вакцины"
                value={customVaccine}
                onChange={(e) => {
                  const value = e.target.value;
                  setCustomVaccine(value);
                  setNewVaccination({ ...newVaccination, name: value });
                }}
                margin="normal"
              />
            )}
            <ReminderBlock
              reminder={newVaccination.reminder}
              onChange={(newReminder) =>
                setNewVaccination({
                  ...newVaccination,
                  reminder: newReminder,
                })
              }
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenVaccinationDialog(false)}>
            Отмена
          </Button>
          <Button onClick={handleAddVaccination} variant="contained">
            Добавить
          </Button>
        </DialogActions>
      </Dialog>

      {/* Диалог добавления дегельминтизации */}
      <Dialog
        open={openTreatmentDialog}
        onClose={() => setOpenTreatmentDialog(false)}
      >
        <DialogTitle>Добавить процедуру</DialogTitle>
        <DialogContent>
          <Box className={styles.dialogContent}>
            <TextField
              fullWidth
              type="date"
              label="Дата процедуры"
              value={
                newTreatment.date
                  ? new Date(newTreatment.date).toISOString().split("T")[0]
                  : ""
              }
              onChange={(e) =>
                setNewTreatment({
                  ...newTreatment,
                  date: new Date(e.target.value),
                })
              }
              InputLabelProps={{ shrink: true }}
              inputProps={{
                min: animal.birthDate
                  ? new Date(animal.birthDate).toISOString().split("T")[0]
                  : "",
                max: new Date().toISOString().split("T")[0],
              }}
            />
            <Autocomplete
              freeSolo={
                newTreatment.name === "Другое" || customTreatment !== ""
              }
              fullWidth
              options={DEWORMING_MEDICINES}
              value={newTreatment.name}
              inputValue={customTreatment}
              onInputChange={(event, newValue) => {
                setCustomTreatment(newValue);
                if (newTreatment.name === "Другое" || customTreatment !== "") {
                  setNewTreatment({ ...newTreatment, name: newValue });
                }
              }}
              onChange={(event, newValue) => {
                if (newValue === "Другое") {
                  setNewTreatment({ ...newTreatment, name: "Другое" });
                  setCustomTreatment("");
                } else {
                  setNewTreatment({
                    ...newTreatment,
                    name: newValue || customTreatment,
                  });
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Название препарата"
                  margin="normal"
                  placeholder={
                    newTreatment.name === "Другое"
                      ? "Введите название препарата"
                      : "Выберите или введите название препарата"
                  }
                />
              )}
            />
            {(newTreatment.name === "Другое" || customTreatment !== "") && (
              <TextField
                fullWidth
                label="Введите название препарата"
                value={customTreatment}
                onChange={(e) => {
                  const value = e.target.value;
                  setCustomTreatment(value);
                  setNewTreatment({ ...newTreatment, name: value });
                }}
                margin="normal"
              />
            )}
            <ReminderBlock
              reminder={newTreatment.reminder}
              onChange={(newReminder) =>
                setNewTreatment({
                  ...newTreatment,
                  reminder: newReminder,
                })
              }
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenTreatmentDialog(false)}>Отмена</Button>
          <Button onClick={handleAddTreatment} variant="contained">
            Добавить
          </Button>
        </DialogActions>
      </Dialog>

      {/* Диалог добавления записи о лечении */}
      <Dialog
        open={openTreatmentPostDialog}
        onClose={() => setOpenTreatmentPostDialog(false)}
      >
        <DialogTitle>Добавить запись о лечении</DialogTitle>
        <DialogContent>
          <Box className={styles.treatmentPostForm}>
            <TextField
              type="date"
              label="Дата"
              fullWidth
              value={
                newTreatmentPost.date
                  ? new Date(newTreatmentPost.date).toISOString().split("T")[0]
                  : ""
              }
              onChange={(e) =>
                setNewTreatmentPost({
                  ...newTreatmentPost,
                  date: new Date(e.target.value),
                })
              }
              InputLabelProps={{ shrink: true }}
              inputProps={{
                min: animal.birthDate
                  ? new Date(animal.birthDate).toISOString().split("T")[0]
                  : "",
                max: new Date().toISOString().split("T")[0],
              }}
            />
            <TextField
              multiline
              rows={4}
              label="Описание лечения"
              fullWidth
              value={newTreatmentPost.content}
              onChange={(e) =>
                setNewTreatmentPost({
                  ...newTreatmentPost,
                  content: e.target.value,
                })
              }
              placeholder="Опишите проведенное лечение..."
            />
            <ReminderBlock
              reminder={newTreatmentPost.reminder}
              onChange={(newReminder) =>
                setNewTreatmentPost({
                  ...newTreatmentPost,
                  reminder: newReminder,
                })
              }
            />
            <Box className={styles.imageUploadSection}>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
                id="treatment-images-upload"
              />
              <label htmlFor="treatment-images-upload">
                <Button
                  variant="outlined"
                  component="span"
                  startIcon={<ImageIcon />}
                >
                  Добавить изображения
                </Button>
              </label>
              {newTreatmentPost.images &&
                newTreatmentPost.images.length > 0 && (
                  <Box className={styles.imagePreviewContainer}>
                    {newTreatmentPost.images.map((image, index) => (
                      <Box key={index} className={styles.imagePreviewWrapper}>
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Preview ${index + 1}`}
                          className={styles.imagePreview}
                        />
                        <IconButton
                          size="small"
                          className={styles.removeImageButton}
                          onClick={() => handleRemoveImage(index)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    ))}
                  </Box>
                )}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenTreatmentPostDialog(false)}>
            Отмена
          </Button>
          <Button
            onClick={handleAddTreatmentPost}
            variant="contained"
            color="primary"
          >
            Добавить
          </Button>
        </DialogActions>
      </Dialog>

      {/* Добавим диалог для создания заметки после остальных диалогов */}
      <Dialog
        open={openNotesDialog}
        onClose={() => setOpenNotesDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Добавить заметку</DialogTitle>
        <DialogContent>
          <Box className={styles.treatmentPostForm}>
            <TextField
              type="date"
              label="Дата"
              fullWidth
              value={
                newNote.date
                  ? new Date(newNote.date).toISOString().split("T")[0]
                  : ""
              }
              onChange={(e) =>
                setNewNote({ ...newNote, date: new Date(e.target.value) })
              }
              InputLabelProps={{ shrink: true }}
              inputProps={{
                max: new Date().toISOString().split("T")[0],
              }}
            />
            <TextField
              multiline
              rows={4}
              label="Текст заметки"
              fullWidth
              value={newNote.content}
              onChange={(e) =>
                setNewNote({ ...newNote, content: e.target.value })
              }
              placeholder="Введите текст заметки..."
              margin="normal"
            />

            <Box sx={{ mt: 2, mb: 2 }}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={newNote.reminder.enabled}
                      onChange={(e) =>
                        setNewNote({
                          ...newNote,
                          reminder: {
                            ...newNote.reminder,
                            enabled: e.target.checked,
                          },
                        })
                      }
                    />
                  }
                  label={
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <NotificationsIcon sx={{ mr: 1 }} />
                      <Typography>Установить напоминание</Typography>
                    </Box>
                  }
                />
              </FormGroup>

              {newNote.reminder.enabled && (
                <Box sx={{ ml: 4, mt: 2 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        type="date"
                        label="Дата напоминания"
                        fullWidth
                        value={
                          newNote.reminder.date
                            ? new Date(newNote.reminder.date)
                                .toISOString()
                                .split("T")[0]
                            : ""
                        }
                        onChange={(e) =>
                          setNewNote({
                            ...newNote,
                            reminder: {
                              ...newNote.reminder,
                              date: new Date(e.target.value),
                            },
                          })
                        }
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={{
                          min: new Date().toISOString().split("T")[0],
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        type="time"
                        label="Время напоминания"
                        fullWidth
                        value={newNote.reminder.time}
                        onChange={(e) =>
                          setNewNote({
                            ...newNote,
                            reminder: {
                              ...newNote.reminder,
                              time: e.target.value,
                            },
                          })
                        }
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={newNote.reminder.sendEmail}
                              onChange={(e) =>
                                setNewNote({
                                  ...newNote,
                                  reminder: {
                                    ...newNote.reminder,
                                    sendEmail: e.target.checked,
                                  },
                                })
                              }
                            />
                          }
                          label="Отправить на email"
                        />
                        <FormControlLabel
                          control={
                            <Switch
                              checked={newNote.reminder.sendNotification}
                              onChange={(e) =>
                                setNewNote({
                                  ...newNote,
                                  reminder: {
                                    ...newNote.reminder,
                                    sendNotification: e.target.checked,
                                  },
                                })
                              }
                            />
                          }
                          label="Показать уведомление в браузере"
                        />
                      </FormGroup>
                    </Grid>
                  </Grid>
                </Box>
              )}
            </Box>

            <Box className={styles.imageUploadSection}>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleNoteImageUpload}
                style={{ display: "none" }}
                id="note-images-upload"
              />
              <label htmlFor="note-images-upload">
                <Button
                  variant="outlined"
                  component="span"
                  startIcon={<ImageIcon />}
                >
                  Добавить изображения
                </Button>
              </label>
              {newNote.images && newNote.images.length > 0 && (
                <Box className={styles.imagePreviewContainer}>
                  {newNote.images.map((image, index) => (
                    <Box key={index} className={styles.imagePreviewWrapper}>
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Preview ${index + 1}`}
                        className={styles.imagePreview}
                      />
                      <IconButton
                        size="small"
                        className={styles.removeImageButton}
                        onClick={() => handleRemoveNoteImage(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenNotesDialog(false)}>Отмена</Button>
          <Button onClick={handleAddNote} variant="contained" color="primary">
            Добавить
          </Button>
        </DialogActions>
      </Dialog>

      {/* Добавим диалог редактирования привычек */}
      <Dialog
        open={openHabitsDialog}
        onClose={() => setOpenHabitsDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Редактировать информацию</DialogTitle>
        <DialogContent>
          <Box className={styles.treatmentPostForm}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Пищевые привычки"
              value={editableHabits.foodHabits}
              onChange={(e) =>
                setEditableHabits({
                  ...editableHabits,
                  foodHabits: e.target.value,
                })
              }
              placeholder="Опишите пищевые привычки животного..."
              margin="normal"
            />
            <Box className={styles.litterTrainingField}>
              <Typography variant="body1">Приучен к лотку:</Typography>
              <Button
                variant={
                  editableHabits.litterTraining ? "contained" : "outlined"
                }
                color="primary"
                onClick={() =>
                  setEditableHabits({
                    ...editableHabits,
                    litterTraining: !editableHabits.litterTraining,
                  })
                }
              >
                {editableHabits.litterTraining ? "Да" : "Нет"}
              </Button>
            </Box>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Краткая информация"
              value={editableHabits.shortInfo}
              onChange={(e) =>
                setEditableHabits({
                  ...editableHabits,
                  shortInfo: e.target.value,
                })
              }
              placeholder="Добавьте дополнительную информацию..."
              margin="normal"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenHabitsDialog(false)}>Отмена</Button>
          <Button
            onClick={handleSaveHabitsInfo}
            variant="contained"
            color="primary"
          >
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>

      {/* Добавим диалоги для пищевых привычек и краткой информации */}
      <Dialog
        open={openFoodHabitsDialog}
        onClose={() => setOpenFoodHabitsDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Добавить запись о пищевых привычках</DialogTitle>
        <DialogContent>
          <Box className={styles.treatmentPostForm}>
            <TextField
              type="date"
              label="Дата"
              fullWidth
              value={
                newFoodHabit.date
                  ? new Date(newFoodHabit.date).toISOString().split("T")[0]
                  : ""
              }
              onChange={(e) =>
                setNewFoodHabit({
                  ...newFoodHabit,
                  date: new Date(e.target.value),
                })
              }
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                max: new Date().toISOString().split("T")[0],
              }}
            />
            <TextField
              multiline
              rows={4}
              label="Описание пищевых привычек"
              fullWidth
              value={newFoodHabit.content}
              onChange={(e) =>
                setNewFoodHabit({
                  ...newFoodHabit,
                  content: e.target.value,
                })
              }
              placeholder="Опишите пищевые привычки животного..."
              margin="normal"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenFoodHabitsDialog(false)}>Отмена</Button>
          <Button
            onClick={handleSaveFoodHabits}
            variant="contained"
            color="primary"
          >
            Добавить
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openShortInfoDialog}
        onClose={() => setOpenShortInfoDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Добавить краткую информацию</DialogTitle>
        <DialogContent>
          <Box className={styles.treatmentPostForm}>
            <TextField
              type="date"
              label="Дата"
              fullWidth
              value={
                newShortInfo.date
                  ? new Date(newShortInfo.date).toISOString().split("T")[0]
                  : ""
              }
              onChange={(e) =>
                setNewShortInfo({
                  ...newShortInfo,
                  date: new Date(e.target.value),
                })
              }
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                max: new Date().toISOString().split("T")[0],
              }}
            />
            <TextField
              multiline
              rows={4}
              label="Краткая информация"
              fullWidth
              value={newShortInfo.content}
              onChange={(e) =>
                setNewShortInfo({
                  ...newShortInfo,
                  content: e.target.value,
                })
              }
              placeholder="Добавьте краткую информацию..."
              margin="normal"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenShortInfoDialog(false)}>Отмена</Button>
          <Button
            onClick={handleSaveShortInfo}
            variant="contained"
            color="primary"
          >
            Добавить
          </Button>
        </DialogActions>
      </Dialog>

      {/* Добавляем Snackbar для уведомлений */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      <Lightbox
        open={isLightboxOpen}
        close={() => setIsLightboxOpen(false)}
        index={currentImageIndex}
        slides={images.map((img) => ({ src: img.original }))}
      />

      {/* Add confirmation dialog */}
      <Dialog
        open={confirmStatusDialog}
        onClose={() => setConfirmStatusDialog(false)}
      >
        <DialogTitle>Подтверждение изменения статуса</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Вы уверены, что хотите установить статус "{selectedStatus?.label}"?
            Это действие нельзя будет отменить.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmStatusDialog(false)}>Отмена</Button>
          <Button
            onClick={handleConfirmStatus}
            color="error"
            variant="contained"
          >
            Подтвердить
          </Button>
        </DialogActions>
      </Dialog>

      {/* Диалог подтверждения удаления */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Подтверждение удаления
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Вы уверены, что хотите удалить это животное? Это действие нельзя
            будет отменить.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Отмена</Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
            autoFocus
          >
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AnimalDetails;
