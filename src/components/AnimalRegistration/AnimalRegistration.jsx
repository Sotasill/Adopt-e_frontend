import { useState, useRef, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "sonner";
import PropTypes from "prop-types";
import {
  animalRegistrationSchema,
  EYE_COLORS,
  FUR_COLORS,
  FUR_TYPES,
} from "./validationSchemas";
import styles from "./AnimalRegistration.module.css";

const REGISTRATION_TYPES = {
  LITTER: "litter",
  PARENT: "parent",
  NONE: "none",
};

// Компонент поля ввода с обработкой ошибок
const FormField = ({
  name,
  label,
  type = "text",
  as,
  children,
  className,
  ...props
}) => {
  return (
    <div className={styles.inputGroup}>
      <label htmlFor={name}>{label}</label>
      <Field
        id={name}
        name={name}
        type={type}
        as={as}
        className={`${styles.input} ${className || ""}`}
        {...props}
      >
        {children}
      </Field>
      <ErrorMessage
        name={name}
        render={(msg) => <span className={styles.errorText}>{msg}</span>}
      />
    </div>
  );
};

FormField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  as: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
};

const SuccessResult = ({ animal }) => {
  return (
    <div className={styles.successResult}>
      <div className={styles.successHeader}>
        <h3>Животное успешно зарегистрировано!</h3>
        {animal.image && (
          <div className={styles.animalImage}>
            <img src={animal.image.url} alt={animal.name} />
          </div>
        )}
      </div>

      <div className={styles.animalDetails}>
        <div className={styles.detailsGrid}>
          <div className={styles.detailGroup}>
            <h4>Основная информация</h4>
            <p>
              <strong>Уникальный идентификатор:</strong>{" "}
              {animal.uniqueIdentifier}
            </p>
            <p>
              <strong>Кличка:</strong> {animal.name}
            </p>
            <p>
              <strong>Порода:</strong> {animal.breed}
            </p>
            <p>
              <strong>Тип:</strong> {animal.type === "cat" ? "Кошка" : "Собака"}
            </p>
            <p>
              <strong>Дата рождения:</strong>{" "}
              {new Date(animal.birthDate).toLocaleDateString()}
            </p>
            <p>
              <strong>Дата регистрации:</strong>{" "}
              {new Date(animal.registrationDate).toLocaleDateString()}
            </p>
          </div>

          <div className={styles.detailGroup}>
            <h4>Внешние характеристики</h4>
            <p>
              <strong>Цвет глаз:</strong> {animal.eyeColor}
            </p>
            <p>
              <strong>Цвет шерсти:</strong> {animal.furColor || "Не указан"}
            </p>
            <p>
              <strong>Длина шерсти:</strong> {animal.furLength}
            </p>
            <p>
              <strong>Микрочип:</strong> {animal.microchip || "Не указан"}
            </p>
          </div>

          {(animal.mother || animal.father) && (
            <div className={styles.detailGroup}>
              <h4>Информация о родителях</h4>
              {animal.mother && (
                <div className={styles.parentInfo}>
                  <p>
                    <strong>Мать:</strong>
                  </p>
                  <p>ID: {animal.mother._id}</p>
                  <p>Имя: {animal.mother.name}</p>
                  <p>Идентификатор: {animal.mother.uniqueIdentifier}</p>
                  <p>
                    Статус:{" "}
                    {animal.motherRegistered
                      ? "Зарегистрирована"
                      : "Не зарегистрирована"}
                  </p>
                </div>
              )}
              {animal.father && (
                <div className={styles.parentInfo}>
                  <p>
                    <strong>Отец:</strong>
                  </p>
                  <p>ID: {animal.father._id}</p>
                  <p>Имя: {animal.father.name}</p>
                  <p>Идентификатор: {animal.father.uniqueIdentifier}</p>
                  <p>
                    Статус:{" "}
                    {animal.fatherRegistered
                      ? "Зарегистрирован"
                      : "Не зарегистрирован"}
                  </p>
                </div>
              )}
            </div>
          )}

          <div className={styles.detailGroup}>
            <h4>Статус регистрации</h4>
            <p>
              <strong>Статус в системе:</strong>{" "}
              {animal.isRegisteredInSystem
                ? "Зарегистрирован"
                : "Не зарегистрирован"}
            </p>
            <p>
              <strong>Статус оплаты:</strong>{" "}
              {animal.paymentStatus === "completed"
                ? "Оплачено"
                : "Не оплачено"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

SuccessResult.propTypes = {
  animal: PropTypes.shape({
    image: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }),
    name: PropTypes.string.isRequired,
    uniqueIdentifier: PropTypes.string.isRequired,
    breed: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    birthDate: PropTypes.string.isRequired,
    registrationDate: PropTypes.string.isRequired,
    eyeColor: PropTypes.string.isRequired,
    furColor: PropTypes.string,
    furLength: PropTypes.string.isRequired,
    microchip: PropTypes.string,
    mother: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      uniqueIdentifier: PropTypes.string.isRequired,
    }),
    father: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      uniqueIdentifier: PropTypes.string.isRequired,
    }),
    motherRegistered: PropTypes.bool,
    fatherRegistered: PropTypes.bool,
    isRegisteredInSystem: PropTypes.bool.isRequired,
    paymentStatus: PropTypes.string.isRequired,
  }).isRequired,
};

// Компонент CustomSelect
const CustomSelect = ({
  value,
  onChange,
  options,
  placeholder = "Выберите значение",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.customSelect}>
      <div className={styles.selectHeader} onClick={() => setIsOpen(!isOpen)}>
        <span className={styles.selectedValue}>
          {value && options[value] ? options[value].label : placeholder}
        </span>
        {value && options[value] && options[value].color && (
          <span
            className={styles.colorDot}
            style={{ background: options[value].color }}
          />
        )}
        <span className={styles.arrow}>▼</span>
      </div>

      {isOpen && (
        <div className={styles.optionsList}>
          {Object.entries(options).map(([optionValue, { label, color }]) => (
            <div
              key={optionValue}
              className={`${styles.option} ${
                value === optionValue ? styles.selected : ""
              }`}
              onClick={() => {
                onChange({ target: { value: optionValue } });
                setIsOpen(false);
              }}
            >
              {color && (
                <span
                  className={styles.colorDot}
                  style={{ background: color }}
                />
              )}
              <span>{label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

CustomSelect.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.objectOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      color: PropTypes.string,
    })
  ).isRequired,
  placeholder: PropTypes.string,
};

// Компонент для маскированного ввода микрочипа
const MicrochipInput = ({ field, form }) => {
  const formatMicrochip = (value) => {
    if (!value) return value;

    // Удаляем все нецифровые символы
    const numbers = value.replace(/[^\d]/g, "");

    // Добавляем пробелы после 3 и 7 цифр
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 7)
      return `${numbers.slice(0, 3)} ${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)} ${numbers.slice(3, 7)} ${numbers.slice(
      7,
      15
    )}`;
  };

  const handleChange = (e) => {
    const { value } = e.target;
    const formattedValue = formatMicrochip(value);
    form.setFieldValue(field.name, formattedValue);
  };

  return (
    <input
      {...field}
      type="text"
      maxLength={17} // 15 цифр + 2 пробела
      onChange={handleChange}
      className={styles.input}
      placeholder="643 0981 00000003"
    />
  );
};

MicrochipInput.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
};

// Компонент SearchableSelect для выбора цвета шерсти
const SearchableSelect = ({ field, form }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLabel, setSelectedLabel] = useState("");
  const dropdownRef = useRef(null);

  // Группируем цвета по категориям
  const groupedColors = Object.entries(FUR_COLORS).reduce(
    (acc, [key, value]) => {
      if (!acc[value.category]) {
        acc[value.category] = [];
      }
      acc[value.category].push({ key, ...value });
      return acc;
    },
    {}
  );

  // Фильтруем цвета по поисковому запросу
  const filteredGroups = Object.entries(groupedColors).reduce(
    (acc, [category, colors]) => {
      const filteredColors = colors.filter((color) =>
        color.label.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (filteredColors.length > 0) {
        acc[category] = filteredColors;
      }
      return acc;
    },
    {}
  );

  useEffect(() => {
    if (field.value) {
      setSelectedLabel(FUR_COLORS[field.value]?.label || "");
    }
  }, [field.value]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (key) => {
    form.setFieldValue(field.name, key);
    setSelectedLabel(FUR_COLORS[key].label);
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <div className={styles.searchableSelect} ref={dropdownRef}>
      <div className={styles.selectHeader} onClick={() => setIsOpen(!isOpen)}>
        <span>{selectedLabel || "Выберите цвет шерсти"}</span>
        <span className={styles.arrow}>▼</span>
      </div>

      {isOpen && (
        <div className={styles.dropdown}>
          <input
            type="text"
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            placeholder="Поиск цвета..."
            autoFocus
          />
          <div className={styles.optionsContainer}>
            {Object.entries(filteredGroups).map(([category, colors]) => (
              <div key={category} className={styles.categoryGroup}>
                <div className={styles.categoryHeader}>{category}</div>
                {colors.map((color) => (
                  <div
                    key={color.key}
                    className={`${styles.option} ${
                      field.value === color.key ? styles.selected : ""
                    }`}
                    onClick={() => handleSelect(color.key)}
                  >
                    {color.label}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

SearchableSelect.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
};

// Компонент для выбора типа животного с радиокнопками
const AnimalTypeSelect = ({ field, form }) => {
  useEffect(() => {
    // Если тип не установлен, устанавливаем кошку по умолчанию
    if (!field.value) {
      form.setFieldValue("type", "cat");
    }
  }, []);

  const handleTypeChange = (newType) => {
    console.log("Изменение типа животного:", {
      oldValue: field.value,
      newValue: newType,
    });

    form.setFieldValue("type", newType);
  };

  return (
    <div className={styles.radioGroup}>
      <label className={styles.radioLabel}>
        <input
          type="radio"
          name={field.name}
          value="cat"
          checked={field.value === "cat"}
          onChange={() => handleTypeChange("cat")}
          className={styles.radioInput}
        />
        <span className={styles.radioText}>Кошка</span>
      </label>
      <label className={styles.radioLabel}>
        <input
          type="radio"
          name={field.name}
          value="dog"
          checked={field.value === "dog"}
          onChange={() => handleTypeChange("dog")}
          className={styles.radioInput}
        />
        <span className={styles.radioText}>Собака</span>
      </label>
    </div>
  );
};

AnimalTypeSelect.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
};

// Компонент для выбора пола животного
const SexSelect = ({ field, form }) => {
  return (
    <div className={styles.radioGroup}>
      <label className={styles.radioLabel}>
        <input
          type="radio"
          name={field.name}
          value="male"
          checked={field.value === "male"}
          onChange={() => form.setFieldValue(field.name, "male")}
          className={styles.radioInput}
        />
        <span className={styles.radioText}>Male (Самец)</span>
      </label>
      <label className={styles.radioLabel}>
        <input
          type="radio"
          name={field.name}
          value="female"
          checked={field.value === "female"}
          onChange={() => form.setFieldValue(field.name, "female")}
          className={styles.radioInput}
        />
        <span className={styles.radioText}>Female (Самка)</span>
      </label>
    </div>
  );
};

SexSelect.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
};

const AnimalRegistration = ({ onClose }) => {
  // Состояние для типа регистрации
  const [registrationType, setRegistrationType] = useState(null);

  // Состояния для проверки по помёту
  const [litterNumber, setLitterNumber] = useState("");

  // Состояния для проверки по родителю
  const [parentId, setParentId] = useState("");
  const [parentType, setParentType] = useState("mother");

  // Общие состояния
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [checkResult, setCheckResult] = useState(null);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  // Состояния для изображения
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleRegistrationTypeSelect = (type) => {
    setRegistrationType(type);
    setError(null);
    setCheckResult(null);

    if (type === REGISTRATION_TYPES.NONE) {
      setShowRegistrationForm(true);
    } else {
      setShowRegistrationForm(false);
    }
  };

  const handleLitterCheck = async (e, formik) => {
    e.preventDefault();
    if (!litterNumber.trim()) {
      setError("Введите номер помёта");
      return;
    }

    setLoading(true);
    setError(null);
    setCheckResult(null);

    try {
      const response = await fetch(
        "http://localhost:3000/api/animals/check-registration",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            litterRegistrationNumber: litterNumber,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Ошибка при проверке регистрации");
      }

      setCheckResult(data);
      if (data.found && formik) {
        formik.setFieldValue("litterRegistrationNumber", litterNumber);
        // Добавьте другие поля, которые приходят с сервера
      }
      setShowRegistrationForm(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleParentCheck = async (e, formik) => {
    e.preventDefault();
    if (!parentId.trim()) {
      setError("Введите ID родителя");
      return;
    }

    setLoading(true);
    setError(null);
    setCheckResult(null);

    try {
      const response = await fetch(
        "http://localhost:3000/api/animals/check-parents",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            parentId,
            parentType,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Ошибка при проверке родителей");
      }

      setCheckResult(data);
      if (data.found && formik) {
        formik.setFieldValue(parentType, parentId);
        formik.setFieldValue(`${parentType}Registered`, true);
      }
      setShowRegistrationForm(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB
        setError("Размер файла не должен превышать 5MB");
        return;
      }
      if (!file.type.startsWith("image/")) {
        setError("Пожалуйста, загрузите изображение");
        return;
      }
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Функция для получения начальных значений формы в зависимости от типа регистрации
  const getInitialValues = (registrationType) => {
    const baseValues = {
      name: "",
      breed: "",
      birthDate: "",
      eyeColor: "",
      type: "cat", // Устанавливаем кошку по умолчанию
      microchip: "",
      furColor: "",
      furLength: "",
    };

    // Добавляем дополнительные поля в зависимости от типа регистрации
    switch (registrationType) {
      case REGISTRATION_TYPES.LITTER:
        return {
          ...baseValues,
          litterRegistrationNumber: litterNumber || "",
        };
      case REGISTRATION_TYPES.PARENT:
        return {
          ...baseValues,
          [parentType]: parentId || "",
          [`${parentType}Registered`]: false,
        };
      default:
        return baseValues;
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      console.log("=== Начало отправки формы ===");
      console.log("Исходные значения формы:", values);
      console.log("Тип животного в форме:", values.type);

      // Явно создаем объект с данными
      const jsonData = {
        ...values,
        type: values.type,
      };

      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:3000/api/animals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(jsonData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Ошибка при регистрации животного");
      }

      // Если есть изображение, отправляем его отдельным запросом
      if (image) {
        console.log("Начало загрузки изображения");
        const imageFormData = new FormData();
        imageFormData.append("image", image);

        const imageResponse = await fetch(
          `http://localhost:3000/api/animals/${data._id}/image`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: imageFormData,
          }
        );

        console.log("Статус загрузки изображения:", imageResponse.status);
        if (!imageResponse.ok) {
          console.error(
            "Ошибка при загрузке изображения:",
            await imageResponse.json()
          );
        }
      }

      console.log("=== Успешное завершение регистрации ===");
      toast.success("Животное успешно зарегистрировано!", {
        duration: 3000,
        position: "top-right",
        style: {
          background: "#4caf50",
          color: "#fff",
        },
        icon: "🐾",
      });

      setShowRegistrationForm(false);
      setRegistrationType(null);
      setCheckResult(data);

      if (onClose) {
        setTimeout(() => {
          onClose();
        }, 1000);
      }
    } catch (err) {
      console.error("=== Ошибка при отправке формы ===");
      console.error("Детали ошибки:", err);
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Регистрация животного</h2>
        {onClose && (
          <button onClick={onClose} className={styles.closeButton}>
            ✕
          </button>
        )}
      </div>

      {/* Выбор типа регистрации */}
      {!registrationType && (
        <div className={styles.registrationTypeSelection}>
          <h3>Выберите тип регистрации:</h3>
          <div className={styles.typeButtons}>
            <button
              onClick={() =>
                handleRegistrationTypeSelect(REGISTRATION_TYPES.LITTER)
              }
              className={styles.typeButton}
            >
              Регистрация по номеру помёта
            </button>
            <button
              onClick={() =>
                handleRegistrationTypeSelect(REGISTRATION_TYPES.PARENT)
              }
              className={styles.typeButton}
            >
              Регистрация с указанием родителя
            </button>
            <button
              onClick={() =>
                handleRegistrationTypeSelect(REGISTRATION_TYPES.NONE)
              }
              className={styles.typeButton}
            >
              Регистрация без родителей
            </button>
          </div>
        </div>
      )}

      {/* Форма проверки по номеру помёта */}
      {registrationType === REGISTRATION_TYPES.LITTER &&
        !showRegistrationForm && (
          <form
            onSubmit={(e) => handleLitterCheck(e, null)}
            className={styles.form}
          >
            <div className={styles.inputGroup}>
              <label htmlFor="litterNumber">Номер помёта:</label>
              <input
                id="litterNumber"
                type="text"
                value={litterNumber}
                onChange={(e) => setLitterNumber(e.target.value)}
                placeholder="Введите номер помёта"
                className={styles.input}
              />
            </div>
            <button type="submit" className={styles.button} disabled={loading}>
              {loading ? "Проверка..." : "Проверить по номеру помёта"}
            </button>
          </form>
        )}

      {/* Форма проверки по родителю */}
      {registrationType === REGISTRATION_TYPES.PARENT &&
        !showRegistrationForm && (
          <form
            onSubmit={(e) => handleParentCheck(e, null)}
            className={styles.form}
          >
            <div className={styles.inputGroup}>
              <label htmlFor="parentId">ID родителя:</label>
              <input
                id="parentId"
                type="text"
                value={parentId}
                onChange={(e) => setParentId(e.target.value)}
                placeholder="Введите ID родителя"
                className={styles.input}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="parentType">Тип родителя:</label>
              <select
                id="parentType"
                value={parentType}
                onChange={(e) => setParentType(e.target.value)}
                className={styles.select}
              >
                <option value="mother">Мать</option>
                <option value="father">Отец</option>
              </select>
            </div>

            <button type="submit" className={styles.button} disabled={loading}>
              {loading ? "Проверка..." : "Проверить по родителю"}
            </button>
          </form>
        )}

      {/* Основная форма регистрации */}
      {showRegistrationForm && (
        <Formik
          initialValues={getInitialValues(registrationType)}
          validationSchema={animalRegistrationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className={`${styles.form} ${styles.registrationForm}`}>
              <h3>Регистрация животного</h3>

              <div className={styles.formGrid}>
                <FormField
                  name="name"
                  label="Кличка*:"
                  className={`${
                    errors.name && touched.name ? styles.inputError : ""
                  }`}
                />

                <FormField
                  name="breed"
                  label="Порода*:"
                  className={`${
                    errors.breed && touched.breed ? styles.inputError : ""
                  }`}
                />

                <FormField
                  name="birthDate"
                  label="Дата рождения*:"
                  type="date"
                  className={`${
                    errors.birthDate && touched.birthDate
                      ? styles.inputError
                      : ""
                  }`}
                />

                <div className={styles.inputGroup}>
                  <label htmlFor="eyeColor">Цвет глаз*:</label>
                  <Field name="eyeColor">
                    {({ field, form }) => (
                      <CustomSelect
                        value={field.value}
                        onChange={(e) =>
                          form.setFieldValue("eyeColor", e.target.value)
                        }
                        options={EYE_COLORS}
                        placeholder="Выберите цвет глаз"
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name="eyeColor"
                    render={(msg) => (
                      <span className={styles.errorText}>{msg}</span>
                    )}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="type">Тип животного*:</label>
                  <Field name="type">
                    {({ field, form }) => (
                      <AnimalTypeSelect field={field} form={form} />
                    )}
                  </Field>
                  <ErrorMessage
                    name="type"
                    render={(msg) => (
                      <span className={styles.errorText}>{msg}</span>
                    )}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="sex">Пол животного*:</label>
                  <Field name="sex">
                    {({ field, form }) => (
                      <SexSelect field={field} form={form} />
                    )}
                  </Field>
                  <ErrorMessage
                    name="sex"
                    render={(msg) => (
                      <span className={styles.errorText}>{msg}</span>
                    )}
                  />
                </div>

                <FormField name="microchip" label="Микрочип:">
                  {({ field, form }) => (
                    <MicrochipInput field={field} form={form} />
                  )}
                </FormField>

                <div className={styles.inputGroup}>
                  <label htmlFor="furColor">Цвет шерсти*:</label>
                  <Field name="furColor">
                    {({ field, form }) => (
                      <SearchableSelect field={field} form={form} />
                    )}
                  </Field>
                  <ErrorMessage
                    name="furColor"
                    render={(msg) => (
                      <span className={styles.errorText}>{msg}</span>
                    )}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="furLength">Тип шерсти*:</label>
                  <Field name="furLength">
                    {({ field, form }) => (
                      <CustomSelect
                        value={field.value}
                        onChange={(e) =>
                          form.setFieldValue("furLength", e.target.value)
                        }
                        options={FUR_TYPES}
                        placeholder="Выберите тип шерсти"
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name="furLength"
                    render={(msg) => (
                      <span className={styles.errorText}>{msg}</span>
                    )}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="image">Фотография:</label>
                  <input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className={styles.fileInput}
                  />
                  {imagePreview && (
                    <div className={styles.imagePreview}>
                      <img src={imagePreview} alt="Предпросмотр" />
                    </div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className={styles.button}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Регистрация..." : "Зарегистрировать животное"}
              </button>
            </Form>
          )}
        </Formik>
      )}

      {error && <div className={styles.error}>{error}</div>}

      {checkResult && checkResult.data && checkResult.data.animal ? (
        <SuccessResult animal={checkResult.data.animal} />
      ) : (
        checkResult && (
          <div className={styles.result}>
            <h3>Результат проверки:</h3>
            <pre>{JSON.stringify(checkResult, null, 2)}</pre>
          </div>
        )
      )}
    </div>
  );
};

AnimalRegistration.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default AnimalRegistration;
