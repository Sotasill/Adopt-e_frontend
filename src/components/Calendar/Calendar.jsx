import { useState, useEffect } from "react";
import { Calendar as BigCalendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import ruLocale from "date-fns/locale/ru";
import {
  Paper,
  Typography,
  Box,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = {
  ru: ruLocale,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const Calendar = ({ animals }) => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const allEvents = [];

    animals?.forEach((animal) => {
      // Добавляем вакцинации
      animal.vaccinations?.forEach((vaccination) => {
        if (vaccination.reminder?.enabled) {
          allEvents.push({
            title: `Вакцинация: ${animal.name}`,
            start: new Date(
              `${vaccination.reminder.date}T${vaccination.reminder.time}`
            ),
            end: new Date(
              `${vaccination.reminder.date}T${vaccination.reminder.time}`
            ),
            type: "vaccination",
            animal: animal.name,
            details: vaccination.name,
            animalId: animal.id,
          });
        }
      });

      // Добавляем дегельминтизации
      animal.treatments?.forEach((treatment) => {
        if (treatment.reminder?.enabled) {
          allEvents.push({
            title: `Дегельминтизация: ${animal.name}`,
            start: new Date(
              `${treatment.reminder.date}T${treatment.reminder.time}`
            ),
            end: new Date(
              `${treatment.reminder.date}T${treatment.reminder.time}`
            ),
            type: "treatment",
            animal: animal.name,
            details: treatment.name,
            animalId: animal.id,
          });
        }
      });

      // Добавляем заметки
      animal.notes?.forEach((note) => {
        if (note.reminder?.enabled) {
          allEvents.push({
            title: `Заметка: ${animal.name}`,
            start: new Date(`${note.reminder.date}T${note.reminder.time}`),
            end: new Date(`${note.reminder.date}T${note.reminder.time}`),
            type: "note",
            animal: animal.name,
            details: note.content,
            animalId: animal.id,
          });
        }
      });
    });

    setEvents(allEvents);
  }, [animals]);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseDialog = () => {
    setSelectedEvent(null);
  };

  const eventStyleGetter = (event) => {
    let backgroundColor = "#3174ad";

    switch (event.type) {
      case "vaccination":
        backgroundColor = "#4caf50";
        break;
      case "treatment":
        backgroundColor = "#ff9800";
        break;
      case "note":
        backgroundColor = "#2196f3";
        break;
      default:
        break;
    }

    return {
      style: {
        backgroundColor,
        borderRadius: "5px",
        opacity: 0.8,
        color: "white",
        border: "0px",
        display: "block",
      },
    };
  };

  const messages = {
    today: "Сегодня",
    previous: "Назад",
    next: "Вперед",
    month: "Месяц",
    week: "Неделя",
    day: "День",
    agenda: "Повестка",
    date: "Дата",
    time: "Время",
    event: "Событие",
    noEventsInRange: "Нет событий в этом диапазоне",
  };

  return (
    <Box sx={{ height: "100%", p: 2 }}>
      <Paper elevation={3} sx={{ height: "100%", p: 2 }}>
        <Typography variant="h5" gutterBottom>
          Календарь событий
        </Typography>
        <Box sx={{ height: "calc(100% - 50px)" }}>
          <BigCalendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: "100%" }}
            onSelectEvent={handleEventClick}
            eventPropGetter={eventStyleGetter}
            messages={messages}
            culture="ru"
          />
        </Box>

        <Dialog open={!!selectedEvent} onClose={handleCloseDialog}>
          <DialogTitle>{selectedEvent?.title}</DialogTitle>
          <DialogContent>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1" gutterBottom>
                <strong>Животное:</strong> {selectedEvent?.animal}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Тип события:</strong>{" "}
                <Chip
                  label={
                    selectedEvent?.type === "vaccination"
                      ? "Вакцинация"
                      : selectedEvent?.type === "treatment"
                      ? "Дегельминтизация"
                      : "Заметка"
                  }
                  color={
                    selectedEvent?.type === "vaccination"
                      ? "success"
                      : selectedEvent?.type === "treatment"
                      ? "warning"
                      : "primary"
                  }
                  size="small"
                />
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Дата и время:</strong>{" "}
                {selectedEvent?.start.toLocaleString("ru-RU", {
                  dateStyle: "long",
                  timeStyle: "short",
                })}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Детали:</strong> {selectedEvent?.details}
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Закрыть</Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Box>
  );
};

export default Calendar;
