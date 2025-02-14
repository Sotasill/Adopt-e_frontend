import React from "react";
import styles from "./CustomLoader.module.css";

const CustomLoader = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loader}>
        <div className={styles.cat}>
          <div className={styles.catBody}></div>
          <div className={styles.catHead}>
            <div className={styles.catEars}></div>
          </div>
          <div className={styles.catTail}></div>
        </div>
        <div className={styles.dog}>
          <div className={styles.dogBody}></div>
          <div className={styles.dogHead}>
            <div className={styles.dogEars}></div>
            <div className={styles.dogSnout}></div>
          </div>
          <div className={styles.dogTail}></div>
        </div>
      </div>
    </div>
  );
};

export default CustomLoader;
