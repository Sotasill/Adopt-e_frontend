import React from "react";
import { useSelector } from "react-redux";
import { useTranslatedContent } from "../../redux/hooks/useTranslatedContent";
import styles from "./MainSpecialist.module.css";

function MainSpecialist() {
  const { t } = useTranslatedContent();
  const user = useSelector((state) => state.auth.user);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        {t("specialist.dashboard.welcome", {
          name: user?.username || "Специалист",
        })}
      </h1>
      <div className={styles.content}>
        {/* Здесь будет контент панели управления специалиста */}
      </div>
    </div>
  );
}

export default MainSpecialist;
