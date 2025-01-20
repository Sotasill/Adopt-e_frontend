import { useState, useRef, useEffect, useMemo } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "sonner";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import {
  animalRegistrationSchema,
  EYE_COLORS,
  FUR_COLORS,
  FUR_TYPES,
} from "./validationSchemas";
import { CAT_BREEDS, DOG_BREEDS } from "./breedData";
import styles from "./AnimalRegistration.module.css";
import { animalService } from "../../services/animalService";
import React from "react";

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
    const numbers = value.replace(/[^\d]/g, "");
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
      maxLength={17}
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

// Компонент для выбора породы
const BreedSelect = ({ field, form, animalType }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLabel, setSelectedLabel] = useState("");
  const dropdownRef = useRef(null);

  const breeds = useMemo(() => {
    return animalType === "cat" ? CAT_BREEDS : DOG_BREEDS;
  }, [animalType]);

  // Группируем породы по категориям и фильтруем по поисковому запросу
  const groupedBreeds = useMemo(() => {
    // Получаем все уникальные категории из пород
    const categories = new Set();
    Object.values(breeds).forEach((breed) => {
      categories.add(breed.category || "Другие");
    });

    // Создаем объект с категориями
    const result = {};
    categories.forEach((category) => {
      result[category] = [];
    });

    // Распределяем породы по категориям
    Object.entries(breeds).forEach(([key, value]) => {
      if (
        !searchTerm ||
        value.label.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        const category = value.category || "Другие";
        result[category].push([key, value]);
      }
    });

    return result;
  }, [breeds, searchTerm]);

  // Обновляем метку при изменении значения
  useEffect(() => {
    if (field.value && breeds[field.value]) {
      setSelectedLabel(breeds[field.value].label);
    } else {
      setSelectedLabel("");
    }
  }, [field.value, breeds]);

  // Закрываем выпадающий список при клике вне компонента
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Сортируем категории в нужном порядке
  const orderedCategories = [
    "Беспородные",
    "Гибриды",
    "Пастушьи и скотогонные собаки",
    "Пинчеры и молоссы",
    "Терьеры",
    "Таксы",
    "Шпицы и примитивные породы",
    "Гончие",
    "Легавые",
    "Ретриверы и спаниели",
    "Декоративные собаки",
    "Борзые",
    "Породистые",
    "Другие",
  ];

  // Сортируем категории так, чтобы они отображались в нужном порядке
  const sortedCategories = Object.keys(groupedBreeds).sort((a, b) => {
    const indexA = orderedCategories.indexOf(a);
    const indexB = orderedCategories.indexOf(b);
    return indexA - indexB;
  });

  return (
    <div className={styles.searchableSelect} ref={dropdownRef}>
      <div className={styles.selectHeader} onClick={() => setIsOpen(!isOpen)}>
        <span>{selectedLabel || "Выберите породу"}</span>
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
            placeholder="Поиск породы..."
            autoFocus
          />
          <div className={styles.optionsContainer}>
            {sortedCategories.map((category) => {
              const breeds = groupedBreeds[category];
              if (!breeds || breeds.length === 0) return null;

              return (
                <div key={category} className={styles.categoryGroup}>
                  <div className={styles.categoryHeader}>{category}</div>
                  {breeds.map(([key, value]) => (
                    <div
                      key={key}
                      className={`${styles.option} ${
                        field.value === key ? styles.selected : ""
                      }`}
                      onClick={() => {
                        form.setFieldValue(field.name, key);
                        setSelectedLabel(value.label);
                        setIsOpen(false);
                        setSearchTerm("");
                      }}
                    >
                      {value.label}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

BreedSelect.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  animalType: PropTypes.string.isRequired,
};

const AnimalRegistration = ({ onClose }) => {
  // Получаем информацию о пользователе из Redux
  const user = useSelector((state) => state.auth.user);
  const isBreeder = user?.role === "breeder";
  const specialization = user?.specialization;

  // Расширенное логирование при инициализации
  useEffect(() => {
    console.log("=== Данные пользователя при монтировании компонента ===");
    console.log("Redux user:", user);
    console.log("isBreeder:", isBreeder);
    console.log("specialization:", specialization);

    if (!user) {
      console.warn("Пользователь не найден в Redux store");
    } else if (isBreeder && !specialization) {
      console.warn("У заводчика отсутствует специализация:", user);
    }
  }, [user, isBreeder, specialization]);

  // Проверяем и логируем данные пользователя
  console.log("Данные пользователя при инициализации:", {
    user,
    isBreeder: user?.role === "breeder",
    specialization: user?.specialization,
    userId: user?._id,
  });

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

  // Функция для получения начальных значений формы
  const getInitialValues = (registrationType) => {
    console.log("Определение начальных значений:", {
      isBreeder,
      specialization,
      user,
    });

    // Для заводчика используем его специализацию, для остальных - кошка по умолчанию
    const animalType = isBreeder && specialization ? specialization : "cat";

    console.log("Выбранный тип животного:", animalType);

    const baseValues = {
      name: "",
      breed: "",
      birthDate: "",
      eyeColor: "",
      type: animalType,
      sex: "female",
      microchip: "",
      furColor: "",
      furLength: "",
    };

    // Добавляем дополнительные поля в зависимости от типа регистрации
    let values;
    switch (registrationType) {
      case REGISTRATION_TYPES.LITTER:
        values = {
          ...baseValues,
          litterRegistrationNumber: litterNumber || "",
          registrationType: REGISTRATION_TYPES.LITTER,
        };
        break;
      case REGISTRATION_TYPES.PARENT:
        values = {
          ...baseValues,
          [parentType]: parentId || "",
          [`${parentType}Registered`]: false,
          registrationType: REGISTRATION_TYPES.PARENT,
        };
        break;
      default:
        values = {
          ...baseValues,
          registrationType: REGISTRATION_TYPES.NONE,
        };
    }

    console.log("Итоговые начальные значения формы:", values);
    return values;
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      console.log("=== Начало отправки формы ===");
      console.log("Исходные значения формы:", values);
      console.log("Данные пользователя при отправке:", {
        user,
      });

      // Создаем FormData для отправки всех данных вместе с изображением
      const formData = new FormData();

      // Список полей, которые не нужно отправлять на сервер
      const excludeFields = ["registrationType"];

      // Добавляем все поля формы
      Object.keys(values).forEach((key) => {
        // Пропускаем поля, которые не нужно отправлять
        if (excludeFields.includes(key)) {
          return;
        }

        // Для поля microchip добавляем значение только если оно не пустое
        if (key === "microchip") {
          if (values[key] && values[key].trim() !== "") {
            formData.append(key, values[key]);
          }
        }
        // Специальная обработка для типа животного
        else if (key === "type") {
          const isBreeder = user?.role === "breeder";
          const specialization = user?.specialization;

          const animalType =
            isBreeder && specialization
              ? specialization
              : values[key].toLowerCase();

          console.log("Определение типа животного при отправке:", {
            isBreeder,
            specialization,
            animalType,
            originalValue: values[key],
          });

          formData.append(key, animalType);
        } else if (values[key] !== undefined && values[key] !== null) {
          formData.append(key, values[key]);
        }
      });

      // Если есть изображение, добавляем его в FormData
      if (image) {
        formData.append("image", image);
      }

      // Для отладки - выводим все данные формы
      console.log("=== Данные отправляемые на сервер ===");
      for (let [key, value] of formData.entries()) {
        console.log(key + ": " + value);
      }

      // Регистрируем животное через сервис
      const data = await animalService.registerAnimal(formData);

      console.log("=== Ответ сервера ===");
      console.log("Полный ответ:", data);
      console.log("Тип животного в ответе:", data.type);
      console.log(
        "Специализация бридера в ответе:",
        data.breederSpecialization
      );

      // Проверяем соответствие типа животного специализации бридера
      if (
        user?.role === "breeder" &&
        data.type !== user.specialization?.toLowerCase()
      ) {
        console.error("Несоответствие типа животного специализации бридера:", {
          responseType: data.type,
          breederSpecialization: user.specialization,
        });
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
      console.error("Ответ сервера при ошибке:", err.response?.data);
      console.error("Статус ошибки:", err.response?.status);

      let errorMessage = "Произошла ошибка при регистрации животного";

      if (err.response?.data?.error?.message) {
        errorMessage = err.response.data.error.message;
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.message) {
        errorMessage = err.message;
      }

      setError(errorMessage);

      toast.error(errorMessage, {
        duration: 5000,
        position: "top-right",
        style: {
          background: "#f44336",
          color: "#fff",
        },
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Модифицируем функцию renderAnimalTypeSelect
  const renderAnimalTypeSelect = (field, form) => {
    console.log("Рендер селектора типа животного:", {
      isBreeder,
      specialization,
      currentValue: field.value,
    });

    // Для заводчика показываем только его специализацию
    if (isBreeder && specialization) {
      const displayText = specialization === "dog" ? "Собака" : "Кошка";

      // Устанавливаем значение в соответствии со специализацией
      if (field.value !== specialization) {
        console.log("Устанавливаем тип животного:", {
          oldValue: field.value,
          newValue: specialization,
        });
        form.setFieldValue(field.name, specialization);
      }

      return (
        <div className={styles.inputGroup}>
          <div className={styles.staticField}>
            <strong>{displayText}</strong>
            <span className={styles.specialization}>
              (в соответствии с вашей специализацией: {specialization})
            </span>
          </div>
        </div>
      );
    }

    // Для обычного пользователя показываем радио-кнопки
    return (
      <div className={styles.radioGroup}>
        <label className={styles.radioLabel}>
          <input
            type="radio"
            name={field.name}
            value="cat"
            checked={field.value === "cat"}
            onChange={() => form.setFieldValue(field.name, "cat")}
            className={styles.radioInput}
            disabled={isBreeder}
          />
          <span className={styles.radioText}>Кошка</span>
        </label>
        <label className={styles.radioLabel}>
          <input
            type="radio"
            name={field.name}
            value="dog"
            checked={field.value === "dog"}
            onChange={() => form.setFieldValue(field.name, "dog")}
            className={styles.radioInput}
            disabled={isBreeder}
          />
          <span className={styles.radioText}>Собака</span>
        </label>
      </div>
    );
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
          enableReinitialize={true}
        >
          {({ isSubmitting, errors, touched, values, setFieldValue }) => {
            // Эффект для типа животного
            React.useEffect(() => {
              const isBreeder = user?.role === "breeder";
              const specialization = user?.specialization;

              if (
                isBreeder &&
                specialization &&
                values.type !== specialization
              ) {
                console.log(
                  "Обновление типа животного при изменении данных пользователя:",
                  {
                    isBreeder,
                    specialization,
                    currentValue: values.type,
                  }
                );
                setFieldValue("type", specialization);
              }
            }, [user, values.type]);

            // Новый эффект для сброса породы при изменении типа животного
            React.useEffect(() => {
              // Сбрасываем значение породы при изменении типа животного
              setFieldValue("breed", "");
            }, [values.type]);

            return (
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

                  <div className={styles.inputGroup}>
                    <label htmlFor="breed">Порода*:</label>
                    <Field name="breed">
                      {({ field, form }) => (
                        <BreedSelect
                          field={field}
                          form={form}
                          animalType={values.type}
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      name="breed"
                      render={(msg) => (
                        <span className={styles.errorText}>{msg}</span>
                      )}
                    />
                  </div>

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
                    <label>Тип животного*:</label>
                    <Field name="type">
                      {({ field, form }) => renderAnimalTypeSelect(field, form)}
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

                  <div className={styles.inputGroup}>
                    <label htmlFor="microchip">Микрочип:</label>
                    <Field name="microchip">
                      {({ field, form }) => (
                        <MicrochipInput field={field} form={form} />
                      )}
                    </Field>
                    <ErrorMessage
                      name="microchip"
                      render={(msg) => (
                        <span className={styles.errorText}>{msg}</span>
                      )}
                    />
                  </div>

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
                  {isSubmitting
                    ? "Регистрация..."
                    : "Зарегистрировать животное"}
                </button>
              </Form>
            );
          }}
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
