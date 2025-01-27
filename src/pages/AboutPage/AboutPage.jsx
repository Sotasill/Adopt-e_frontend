import styles from "./AboutPage.module.css";
import commonStyles from "../../styles/common.module.css";
import { useTranslatedContent } from "../../redux/hooks/useTranslatedContent";

const AboutPage = () => {
  const { t } = useTranslatedContent();

  return (
    <div className={commonStyles.pageContainer}>
      <div className={commonStyles.pageHeader}>
        <h1 className={commonStyles.pageTitle}>{t("footer.mission.title")}</h1>
        <p className={commonStyles.pageDescription}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quos. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor
          sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quos. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Quisquam, quos.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
