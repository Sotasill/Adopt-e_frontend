import { useState } from "react";
import {
  Paper,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useNavigate } from "react-router-dom";

const Notes = ({ animals }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);

  const allNotes = animals
    ?.flatMap((animal) =>
      (animal.notes || []).map((note) => ({
        ...note,
        animalId: animal.id,
        animalName: animal.name,
        type: "note",
      }))
    )
    .concat(
      animals?.flatMap((animal) =>
        (animal.treatmentPosts || []).map((post) => ({
          ...post,
          animalId: animal.id,
          animalName: animal.name,
          type: "treatment",
        }))
      )
    )
    .filter(Boolean)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const filteredNotes = allNotes?.filter((note) => {
    const matchesSearch =
      searchTerm === "" ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.animalName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesAnimal = !selectedAnimal || note.animalId === selectedAnimal;

    return matchesSearch && matchesAnimal;
  });

  const handleAnimalClick = (animalId) => {
    navigate(`/animals/${animalId}`);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <Box sx={{ height: "100%", p: 2 }}>
      <Paper elevation={3} sx={{ height: "100%", p: 2 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" gutterBottom>
            Заметки о животных
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs>
              <TextField
                fullWidth
                placeholder="Поиск по заметкам..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item>
              <IconButton onClick={() => setFilterDialogOpen(true)}>
                <FilterListIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ overflowY: "auto", height: "calc(100% - 100px)" }}>
          <Grid container spacing={2}>
            {filteredNotes?.map((note, index) => (
              <Grid item xs={12} key={index}>
                <Card>
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 1,
                      }}
                    >
                      <Typography variant="subtitle2" color="text.secondary">
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
                    <Typography variant="body1" gutterBottom>
                      {note.content}
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      <Chip
                        label={note.animalName}
                        onClick={() => handleAnimalClick(note.animalId)}
                        color="primary"
                        size="small"
                        sx={{ mr: 1 }}
                      />
                      <Chip
                        label={note.type === "note" ? "Заметка" : "Лечение"}
                        color={note.type === "note" ? "info" : "warning"}
                        size="small"
                      />
                    </Box>
                    {note.images && note.images.length > 0 && (
                      <Box
                        sx={{
                          mt: 2,
                          display: "flex",
                          gap: 1,
                          flexWrap: "wrap",
                        }}
                      >
                        {note.images.map((image, imgIndex) => (
                          <img
                            key={imgIndex}
                            src={image}
                            alt={`Изображение ${imgIndex + 1}`}
                            style={{
                              width: 100,
                              height: 100,
                              objectFit: "cover",
                              borderRadius: 4,
                            }}
                          />
                        ))}
                      </Box>
                    )}
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => handleAnimalClick(note.animalId)}
                    >
                      Перейти к животному
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Dialog
          open={filterDialogOpen}
          onClose={() => setFilterDialogOpen(false)}
        >
          <DialogTitle>Фильтр по животным</DialogTitle>
          <DialogContent>
            <Grid container spacing={1}>
              {animals?.map((animal) => (
                <Grid item key={animal.id}>
                  <Chip
                    label={animal.name}
                    onClick={() =>
                      setSelectedAnimal(
                        selectedAnimal === animal.id ? null : animal.id
                      )
                    }
                    color={selectedAnimal === animal.id ? "primary" : "default"}
                    variant={
                      selectedAnimal === animal.id ? "filled" : "outlined"
                    }
                  />
                </Grid>
              ))}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setSelectedAnimal(null)}>Сбросить</Button>
            <Button onClick={() => setFilterDialogOpen(false)}>Закрыть</Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Box>
  );
};

export default Notes;
