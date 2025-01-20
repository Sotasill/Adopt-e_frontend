import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  IconButton,
  Grid,
  Paper,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Tooltip,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import SettingsIcon from "@mui/icons-material/Settings";
import ImageGallery from "react-image-gallery";
import Lightbox from "yet-another-react-lightbox";
import "react-image-gallery/styles/css/image-gallery.css";
import "yet-another-react-lightbox/styles.css";
import styles from "./Gallery.module.css";
import { toast } from "react-hot-toast";

const Gallery = ({
  images,
  setImages,
  onImageUpload,
  onDeleteImage,
  onSaveOrder,
}) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showGalleryActions, setShowGalleryActions] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedImage, setDraggedImage] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [imageToDelete, setImageToDelete] = useState(null);
  const [hasOrderChanged, setHasOrderChanged] = useState(false);

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
  };

  // Функции для drag-and-drop
  const handleDragStart = (e, index) => {
    setIsDragging(true);
    setDraggedImage(index);
    e.dataTransfer.effectAllowed = "move";
    e.target.style.opacity = "0.5";
  };

  const handleDragEnd = (e) => {
    setIsDragging(false);
    setDraggedImage(null);
    e.target.style.opacity = "1";
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedImage === null || draggedImage === index) return;

    // Переупорядочиваем изображения
    const newImages = [...images];
    const draggedItem = newImages[draggedImage];
    newImages.splice(draggedImage, 1);
    newImages.splice(index, 0, draggedItem);

    setImages(newImages);
    setDraggedImage(index);
    setHasOrderChanged(true);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.target.style.transform = "scale(1.05)";
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.target.style.transform = "scale(1)";
  };

  // Обработчики удаления
  const handleDeleteClick = (image) => {
    if (!image || !image.public_id) {
      toast.error("Невозможно удалить изображение без идентификатора");
      return;
    }
    console.log("Оригинальный public_id:", image.public_id);

    // Проверяем, содержит ли public_id путь animals/[animalId]/gallery
    const pathParts = image.public_id.split("/");
    console.log("Части пути:", pathParts);

    // Берем только последнюю часть пути (сам идентификатор изображения)
    const imageId = pathParts[pathParts.length - 1];
    console.log("ID для удаления:", imageId);

    setImageToDelete({ ...image, public_id: imageId });
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (imageToDelete && imageToDelete.public_id) {
      try {
        await onDeleteImage(imageToDelete.public_id);
        setDeleteDialogOpen(false);
        setImageToDelete(null);
      } catch (error) {
        console.error("Ошибка при удалении изображения:", error);
        toast.error("Не удалось удалить изображение", {
          description:
            error.response?.data?.message ||
            error.message ||
            "Попробуйте еще раз",
        });
      }
    }
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setImageToDelete(null);
  };

  // Получаем только изображения галереи (без аватара)
  const galleryImages = images
    .slice(1)
    .filter((img) => img && img.original && img.thumbnail && img.public_id);

  const handleSaveOrder = async () => {
    if (hasOrderChanged) {
      try {
        const imageIds = galleryImages.map((image) => {
          const pathParts = image.public_id.split("/");
          return pathParts[pathParts.length - 1];
        });

        if (imageIds.length === 0) {
          toast.error("Нет доступных изображений для сохранения порядка");
          return;
        }

        await onSaveOrder(imageIds);
        setHasOrderChanged(false);
        const newImages = [images[0], ...galleryImages];
        setImages(newImages);

        // Добавляем задержку для уведомления
        setTimeout(() => {
          toast.success("Порядок изображений успешно сохранен", {
            duration: 3000,
          });
        }, 100);
      } catch (error) {
        setTimeout(() => {
          toast.error(
            error.message || "Не удалось сохранить порядок изображений",
            {
              duration: 3000,
            }
          );
        }, 100);

        const originalImages = [...images];
        setImages(originalImages);
      }
    }
  };

  // Обработчик клика вне компонента управления
  const handleClickOutside = useCallback(
    (event) => {
      if (showGalleryActions && !event.target.closest(".gallery-management")) {
        setShowGalleryActions(false);
      }
    },
    [showGalleryActions]
  );

  // Обработчик нажатия Esc
  const handleEscKey = useCallback(
    (event) => {
      if (showGalleryActions && event.key === "Escape") {
        setShowGalleryActions(false);
      }
    },
    [showGalleryActions]
  );

  // Добавляем и удаляем обработчики при монтировании/размонтировании
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscKey);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [handleClickOutside, handleEscKey]);

  return (
    <Box
      sx={{
        mt: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Typography variant="subtitle1" gutterBottom align="center">
        Галерея изображений
      </Typography>

      <Box sx={{ width: "100%", maxWidth: "800px", margin: "0 auto" }}>
        {/* Кнопки управления */}
        <Box
          sx={{
            mt: 3,
            mb: 2,
            display: "flex",
            justifyContent: "center",
            gap: 2,
            position: "relative",
            zIndex: 1,
          }}
        >
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={onImageUpload}
            style={{ display: "none" }}
            id="gallery-upload"
          />
          <label htmlFor="gallery-upload">
            <Tooltip title="Добавить фото в галерею">
              <IconButton component="span" color="primary">
                <AddPhotoAlternateIcon />
              </IconButton>
            </Tooltip>
          </label>

          {galleryImages.length > 0 && (
            <Tooltip title="Управление галереей">
              <IconButton
                color={showGalleryActions ? "primary" : "default"}
                onClick={() => setShowGalleryActions(!showGalleryActions)}
              >
                <SettingsIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        {/* Отображение галереи */}
        {galleryImages.length > 0 ? (
          showGalleryActions ? (
            <Box sx={{ mb: 2 }} className="gallery-management">
              <Grid container spacing={2} justifyContent="center">
                {galleryImages.map((image, index) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    key={image.public_id || index}
                  >
                    <Paper
                      elevation={3}
                      draggable
                      onDragStart={(e) => handleDragStart(e, index)}
                      onDragEnd={handleDragEnd}
                      onDragOver={(e) => handleDragOver(e, index)}
                      onDragEnter={handleDragEnter}
                      onDragLeave={handleDragLeave}
                      sx={{
                        position: "relative",
                        opacity: isDragging && draggedImage === index ? 0.5 : 1,
                        cursor: "move",
                        transition: "transform 0.2s ease",
                        "&:hover": {
                          transform: "scale(1.02)",
                        },
                      }}
                    >
                      <Box sx={{ position: "relative", paddingTop: "75%" }}>
                        <img
                          src={image.original}
                          alt={image.description || "Изображение галереи"}
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                        <Box
                          sx={{
                            position: "absolute",
                            top: 8,
                            right: 8,
                            backgroundColor: "rgba(255, 255, 255, 0.8)",
                            borderRadius: "50%",
                          }}
                        >
                          <IconButton
                            size="small"
                            onClick={() => handleDeleteClick(image)}
                            sx={{
                              "&:hover": {
                                color: "error.main",
                              },
                            }}
                            disabled={!image.public_id}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
              {hasOrderChanged && (
                <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
                  <Button
                    variant="contained"
                    onClick={handleSaveOrder}
                    startIcon={<SaveIcon />}
                    color="primary"
                  >
                    Сохранить порядок
                  </Button>
                </Box>
              )}
            </Box>
          ) : (
            <Box sx={{ width: "100%" }}>
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: "500px",
                  mb: 5,
                  "& .image-gallery": {
                    height: "100%",
                  },
                  "& .image-gallery-content": {
                    height: "100%",
                  },
                  "& .image-gallery-slide-wrapper": {
                    height: "calc(100% - 100px)",
                  },
                  "& .image-gallery-swipe": {
                    height: "100%",
                  },
                  "& .image-gallery-slides": {
                    height: "100%",
                  },
                  "& .image-gallery-slide": {
                    height: "100%",
                  },
                  "& .image-gallery-image": {
                    height: "100%",
                    objectFit: "contain",
                    backgroundColor: "rgba(0, 0, 0, 0.03)",
                  },
                  "& .image-gallery-thumbnails-wrapper": {
                    marginTop: "10px",
                  },
                }}
              >
                <ImageGallery
                  items={galleryImages}
                  showPlayButton={false}
                  showFullscreenButton={true}
                  onClick={handleImageClick}
                  showBullets={galleryImages.length > 2}
                  showThumbnails={true}
                  showNav={true}
                  additionalClass={styles.customGallery}
                />
              </Box>
            </Box>
          )
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              py: 4,
              backgroundColor: "rgba(0, 0, 0, 0.03)",
              borderRadius: 1,
            }}
          >
            <Typography color="textSecondary">
              В галерее пока нет изображений
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Нажмите на кнопку "+" чтобы добавить фотографии
            </Typography>
          </Box>
        )}
      </Box>

      <Lightbox
        open={isLightboxOpen}
        close={() => setIsLightboxOpen(false)}
        index={currentImageIndex}
        slides={galleryImages.map((img) => ({ src: img.original }))}
      />

      {/* Диалог подтверждения удаления */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCancelDelete}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">
          Подтверждение удаления
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Вы уверены, что хотите удалить это изображение? Это действие нельзя
            будет отменить.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Отмена</Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
          >
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

Gallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      original: PropTypes.string.isRequired,
      thumbnail: PropTypes.string.isRequired,
      description: PropTypes.string,
      public_id: PropTypes.string,
    })
  ).isRequired,
  setImages: PropTypes.func.isRequired,
  onImageUpload: PropTypes.func.isRequired,
  onDeleteImage: PropTypes.func.isRequired,
  onSaveOrder: PropTypes.func.isRequired,
};

export default Gallery;
