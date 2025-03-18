import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslatedContent } from "../../redux/hooks/useTranslatedContent";
import { Box, Typography, Paper, Grid, Button } from "@mui/material";
import {
  FaUser,
  FaBuilding,
  FaBriefcase,
  FaGlobe,
  FaCity,
  FaEdit,
  FaCalendarAlt,
  FaClock,
} from "react-icons/fa";
import styles from "./MainSpecialist.module.css";

function MainSpecialist() {
  const { t } = useTranslatedContent();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!user || user.role !== "specialist") {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  return (
    <div className={styles.container}>
      <Paper elevation={3} className={styles.header}>
        <Box className={styles.headerContent}>
          <Typography variant="h4" component="h1" className={styles.title}>
            {t("specialist.dashboard.welcome", {
              name: user.username || "Специалист",
            })}
          </Typography>
          <Button
            variant="outlined"
            startIcon={<FaEdit />}
            onClick={() => navigate("/profile/edit")}
          >
            {t("specialist.dashboard.editProfile")}
          </Button>
        </Box>
      </Paper>

      <Grid container spacing={3} className={styles.content}>
        {/* Информация о компании */}
        <Grid item xs={12} md={6}>
          <Paper elevation={2} className={styles.card}>
            <Box className={styles.cardHeader}>
              <FaBuilding className={styles.icon} />
              <Typography variant="h6">
                {t("specialist.dashboard.companyInfo")}
              </Typography>
            </Box>
            <Box className={styles.cardContent}>
              <Typography>
                <strong>{t("specialist.dashboard.companyName")}:</strong>{" "}
                {user.companyName}
              </Typography>
              <Typography>
                <strong>{t("specialist.dashboard.specialization")}:</strong>{" "}
                {t(`specialist.specializations.${user.specialization}`)}
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Контактная информация */}
        <Grid item xs={12} md={6}>
          <Paper elevation={2} className={styles.card}>
            <Box className={styles.cardHeader}>
              <FaGlobe className={styles.icon} />
              <Typography variant="h6">
                {t("specialist.dashboard.contactInfo")}
              </Typography>
            </Box>
            <Box className={styles.cardContent}>
              <Typography>
                <strong>{t("specialist.dashboard.email")}:</strong> {user.email}
              </Typography>
              <Typography>
                <strong>{t("specialist.dashboard.country")}:</strong>{" "}
                {user.country}
              </Typography>
              {user.city && (
                <Typography>
                  <strong>{t("specialist.dashboard.city")}:</strong> {user.city}
                </Typography>
              )}
            </Box>
          </Paper>
        </Grid>

        {/* Быстрые действия */}
        <Grid item xs={12}>
          <Paper elevation={2} className={styles.card}>
            <Box className={styles.cardHeader}>
              <FaBriefcase className={styles.icon} />
              <Typography variant="h6">
                {t("specialist.dashboard.quickActions")}
              </Typography>
            </Box>
            <Box className={styles.actionsGrid}>
              <Button
                variant="contained"
                startIcon={<FaCalendarAlt />}
                onClick={() => navigate("/appointments")}
                className={styles.actionButton}
              >
                {t("specialist.dashboard.appointments")}
              </Button>
              <Button
                variant="contained"
                startIcon={<FaClock />}
                onClick={() => navigate("/schedule")}
                className={styles.actionButton}
              >
                {t("specialist.dashboard.schedule")}
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default MainSpecialist;
