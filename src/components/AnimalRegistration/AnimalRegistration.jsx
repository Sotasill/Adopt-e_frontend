import React, { useState } from "react";
import styles from "./AnimalRegistration.module.css";

const AnimalRegistration = ({ userType }) => {
  const [step, setStep] = useState(1);
  const [registrationType, setRegistrationType] = useState(null);
  const [breederCode, setBreederCode] = useState("");
  const [parentInfo, setParentInfo] = useState({
    hasParentInSystem: null,
    parentId: "",
  });
  const [animalData, setAnimalData] = useState({
    name: "",
    breed: "",
    birthDate: "",
    // другие необходимые поля
  });

  const handleTypeSelection = (type) => {
    setRegistrationType(type);
    setStep(2);
  };

  const handleBreederCodeSubmit = () => {
    // Здесь будет логика проверки кода заводчика
    setStep(3);
  };

  const handleParentInfoSubmit = () => {
    setStep(3);
  };

  const handleAnimalDataSubmit = () => {
    // Здесь будет логика отправки данных на сервер
  };

  const renderStep1 = () => (
    <div className={styles.step}>
      <h2>Регистрация животного</h2>
      <div className={styles.options}>
        {userType === "breeder" && (
          <button
            onClick={() => handleTypeSelection("breederRegistration")}
            className={styles.optionButton}
          >
            Зарегистрировать животное
          </button>
        )}
        <button
          onClick={() => handleTypeSelection("petRegistration")}
          className={styles.optionButton}
        >
          Зарегистрировать питомца
        </button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className={styles.step}>
      <h2>Проверка регистрации</h2>
      {registrationType === "petRegistration" ? (
        <div>
          <p>Есть ли у вас код регистрации от заводчика?</p>
          <div className={styles.options}>
            <button
              onClick={() => setStep(2.1)}
              className={styles.optionButton}
            >
              Да
            </button>
            <button
              onClick={() => setStep(2.2)}
              className={styles.optionButton}
            >
              Нет
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p>Зарегистрировано ли животное в системе?</p>
          <div className={styles.options}>
            <button
              onClick={() =>
                setParentInfo({ ...parentInfo, hasParentInSystem: true })
              }
              className={styles.optionButton}
            >
              Да
            </button>
            <button
              onClick={() =>
                setParentInfo({ ...parentInfo, hasParentInSystem: false })
              }
              className={styles.optionButton}
            >
              Нет
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const renderStep3 = () => (
    <div className={styles.step}>
      <h2>Регистрация животного</h2>
      <form onSubmit={handleAnimalDataSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Кличка животного"
          value={animalData.name}
          onChange={(e) =>
            setAnimalData({ ...animalData, name: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Порода"
          value={animalData.breed}
          onChange={(e) =>
            setAnimalData({ ...animalData, breed: e.target.value })
          }
        />
        <input
          type="date"
          placeholder="Дата рождения"
          value={animalData.birthDate}
          onChange={(e) =>
            setAnimalData({ ...animalData, birthDate: e.target.value })
          }
        />
        <button type="submit" className={styles.submitButton}>
          Зарегистрировать
        </button>
      </form>
    </div>
  );

  return (
    <div className={styles.container}>
      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {step === 3 && renderStep3()}
    </div>
  );
};

export default AnimalRegistration;
