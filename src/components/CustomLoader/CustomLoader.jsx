import styles from "./CustomLoader.module.css";

const CustomLoader = () => {
  // Случайный выбор между котом и собакой
  const isShowCat = Math.random() < 0.5;

  return (
    <div className={styles.loaderContainer}>
      {isShowCat ? (
        <div className={styles.catLoader}>
          <div className={styles.cat}>
            <div className={styles.catBody}></div>
            <div className={styles.catHead}>
              <div className={styles.catEars}></div>
              <div className={styles.catFace}></div>
            </div>
            <div className={styles.catTail}></div>
          </div>
          <div className={styles.mice}>
            <div className={`${styles.mouse} ${styles.mouse1}`}></div>
            <div className={`${styles.mouse} ${styles.mouse2}`}></div>
            <div className={`${styles.mouse} ${styles.mouse3}`}></div>
            <div className={`${styles.mouse} ${styles.mouse4}`}></div>
            <div className={`${styles.mouse} ${styles.mouse5}`}></div>
          </div>
        </div>
      ) : (
        <div className={styles.dogLoader}>
          <div className={styles.dog}>
            <div className={styles.dogBody}></div>
            <div className={styles.dogHead}>
              <div className={styles.dogEars}></div>
              <div className={styles.dogSnout}></div>
            </div>
            <div className={styles.dogTail}></div>
          </div>
          <div className={styles.bones}>
            <div className={`${styles.bone} ${styles.bone1}`}></div>
            <div className={`${styles.bone} ${styles.bone2}`}></div>
            <div className={`${styles.bone} ${styles.bone3}`}></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomLoader;
