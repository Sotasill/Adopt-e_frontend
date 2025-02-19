import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Select from "react-select";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslatedContent } from "../../redux/hooks/useTranslatedContent";
import {
  registerUser,
  registerBreeder,
  registerSpecialist,
} from "../../redux/registration/registrationThunks";
import { login } from "../../redux/auth/authActions";
import { addNotification } from "../../redux/notifications/notificationsSlice";
import {
  selectRegistrationLoading,
  selectRegistrationError,
} from "../../redux/registration/registrationSlice";
import { FaUser, FaPaw, FaStethoscope, FaArrowsAltH } from "react-icons/fa";
import Aurora from "../Aurora/Aurora";
import styles from "./RegistrationForm.module.css";

const countryOptions = [
  "Австралия",
  "Австрия",
  "Азербайджан",
  "Албания",
  "Алжир",
  "Ангола",
  "Аргентина",
  "Армения",
  "Афганистан",
  "Бангладеш",
  "Бахрейн",
  "Беларусь",
  "Бельгия",
  "Болгария",
  "Боливия",
  "Босния и Герцеговина",
  "Бразилия",
  "Великобритания",
  "Венгрия",
  "Венесуэла",
  "Вьетнам",
  "Германия",
  "Гонконг",
  "Греция",
  "Грузия",
  "Дания",
  "Египет",
  "Израиль",
  "Индия",
  "Индонезия",
  "Иордания",
  "Ирак",
  "Иран",
  "Ирландия",
  "Исландия",
  "Испания",
  "Италия",
  "Казахстан",
  "Камбоджа",
  "Канада",
  "Катар",
  "Кения",
  "Кипр",
  "Китай",
  "Колумбия",
  "Корея Южная",
  "Куба",
  "Кыргызстан",
  "Латвия",
  "Ливан",
  "Литва",
  "Люксембург",
  "Малайзия",
  "Мальта",
  "Марокко",
  "Мексика",
  "Молдова",
  "Монголия",
  "Нигерия",
  "Нидерланды",
  "Новая Зеландия",
  "Норвегия",
  "ОАЭ",
  "Пакистан",
  "Перу",
  "Польша",
  "Португалия",
  "Россия",
  "Румыния",
  "Саудовская Аравия",
  "Сербия",
  "Сингапур",
  "Словакия",
  "Словения",
  "США",
  "Таджикистан",
  "Таиланд",
  "Тайвань",
  "Тунис",
  "Туркменистан",
  "Турция",
  "Узбекистан",
  "Украина",
  "Филиппины",
  "Финляндия",
  "Франция",
  "Хорватия",
  "Черногория",
  "Чехия",
  "Чили",
  "Швейцария",
  "Швеция",
  "Эстония",
  "Южная Африка",
  "Япония",
].map((country) => ({ value: country, label: country }));

const customSelectStyles = {
  control: (provided, state) => ({
    ...provided,
    borderColor: state.isFocused ? "#007bff" : "#ced4da",
    boxShadow: state.isFocused ? "0 0 0 0.2rem rgba(0, 123, 255, 0.25)" : null,
    "&:hover": {
      borderColor: "#007bff",
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#6c757d",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#007bff"
      : state.isFocused
      ? "#f8f9fa"
      : null,
    color: state.isSelected ? "white" : "#212529",
    "&:active": {
      backgroundColor: "#007bff",
    },
  }),
};

const UserRegistrationForm = ({ loading, isSubmitting }) => (
  <>
    <div className={styles.formGroup}>
      <label htmlFor="username">Имя пользователя:</label>
      <Field
        type="text"
        id="username"
        name="username"
        autoComplete="username"
        disabled={loading || isSubmitting}
      />
      <ErrorMessage name="username" component="div" className={styles.error} />
    </div>

    <div className={styles.formGroup}>
      <label htmlFor="email">Email:</label>
      <Field
        type="email"
        id="email"
        name="email"
        autoComplete="email"
        disabled={loading || isSubmitting}
      />
      <ErrorMessage name="email" component="div" className={styles.error} />
    </div>

    <div className={styles.formGroup}>
      <label htmlFor="password">Пароль:</label>
      <Field
        type="password"
        id="password"
        name="password"
        autoComplete="new-password"
        disabled={loading || isSubmitting}
      />
      <ErrorMessage name="password" component="div" className={styles.error} />
    </div>
  </>
);

UserRegistrationForm.propTypes = {
  loading: PropTypes.bool.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
};

const BreederRegistrationForm = ({ loading, isSubmitting }) => (
  <>
    <div className={styles.formGroup}>
      <label htmlFor="username">Имя пользователя:</label>
      <Field
        type="text"
        id="username"
        name="username"
        autoComplete="username"
        disabled={loading || isSubmitting}
      />
      <ErrorMessage name="username" component="div" className={styles.error} />
    </div>

    <div className={styles.formGroup}>
      <label htmlFor="email">Email:</label>
      <Field
        type="email"
        id="email"
        name="email"
        autoComplete="email"
        disabled={loading || isSubmitting}
      />
      <ErrorMessage name="email" component="div" className={styles.error} />
    </div>

    <div className={styles.formGroup}>
      <label htmlFor="password">Пароль:</label>
      <Field
        type="password"
        id="password"
        name="password"
        autoComplete="new-password"
        disabled={loading || isSubmitting}
      />
      <ErrorMessage name="password" component="div" className={styles.error} />
    </div>

    <div className={styles.formGroup}>
      <label htmlFor="companyName">Название питомника:</label>
      <Field
        type="text"
        id="companyName"
        name="companyName"
        disabled={loading || isSubmitting}
      />
      <ErrorMessage
        name="companyName"
        component="div"
        className={styles.error}
      />
    </div>

    <div className={styles.formGroup}>
      <label htmlFor="address">Адрес:</label>
      <Field
        type="text"
        id="address"
        name="address"
        disabled={loading || isSubmitting}
      />
      <ErrorMessage name="address" component="div" className={styles.error} />
    </div>

    <div className={styles.formGroup}>
      <label htmlFor="country">Страна:</label>
      <Field
        name="country"
        component={CustomSelect}
        isDisabled={loading || isSubmitting}
      />
      <ErrorMessage name="country" component="div" className={styles.error} />
    </div>

    <div className={styles.formGroup}>
      <label htmlFor="specialization">Специализация:</label>
      <Field
        as="select"
        id="specialization"
        name="specialization"
        disabled={loading || isSubmitting}
      >
        <option value="dog">Собаки</option>
        <option value="cat">Кошки</option>
      </Field>
      <ErrorMessage
        name="specialization"
        component="div"
        className={styles.error}
      />
    </div>
  </>
);

BreederRegistrationForm.propTypes = {
  loading: PropTypes.bool.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
};

const SpecialistRegistrationForm = ({ loading, isSubmitting }) => (
  <>
    <div className={styles.formGroup}>
      <label htmlFor="username">Имя пользователя:</label>
      <Field
        type="text"
        id="username"
        name="username"
        autoComplete="username"
        disabled={loading || isSubmitting}
      />
      <ErrorMessage name="username" component="div" className={styles.error} />
    </div>

    <div className={styles.formGroup}>
      <label htmlFor="email">Email:</label>
      <Field
        type="email"
        id="email"
        name="email"
        autoComplete="email"
        disabled={loading || isSubmitting}
      />
      <ErrorMessage name="email" component="div" className={styles.error} />
    </div>

    <div className={styles.formGroup}>
      <label htmlFor="password">Пароль:</label>
      <Field
        type="password"
        id="password"
        name="password"
        autoComplete="new-password"
        disabled={loading || isSubmitting}
      />
      <ErrorMessage name="password" component="div" className={styles.error} />
    </div>

    <div className={styles.formGroup}>
      <label htmlFor="services">Услуги:</label>
      <Field
        as="select"
        id="services"
        name="services"
        disabled={loading || isSubmitting}
        multiple
      >
        <option value="vet">Ветеринар</option>
        <option value="groomer">Грумер</option>
        <option value="trainer">Тренер</option>
      </Field>
      <ErrorMessage name="services" component="div" className={styles.error} />
    </div>
  </>
);

SpecialistRegistrationForm.propTypes = {
  loading: PropTypes.bool.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
};

const getValidationSchema = (roleId) => {
  const baseSchema = {
    username: Yup.string()
      .min(3, "Минимум 3 символа")
      .max(30, "Максимум 30 символов")
      .required("Обязательное поле"),
    email: Yup.string()
      .email("Некорректный email")
      .required("Обязательное поле"),
    password: Yup.string()
      .min(6, "Минимум 6 символов")
      .required("Обязательное поле"),
  };

  switch (roleId) {
    case "breeder":
      return Yup.object().shape({
        ...baseSchema,
        companyName: Yup.string().required("Обязательное поле для заводчика"),
        address: Yup.string().required("Обязательное поле для заводчика"),
        country: Yup.string().required("Выберите страну"),
        specialization: Yup.string().required("Обязательное поле"),
      });
    case "specialist":
      return Yup.object().shape({
        ...baseSchema,
        services: Yup.array()
          .min(1, "Выберите хотя бы одну услугу")
          .required("Обязательное поле для специалиста"),
      });
    default:
      return Yup.object().shape(baseSchema);
  }
};

const getInitialValues = (roleId) => {
  const baseValues = {
    username: "",
    email: "",
    password: "",
  };

  switch (roleId) {
    case "breeder":
      return {
        ...baseValues,
        companyName: "",
        address: "",
        country: "",
        specialization: "dog",
      };
    case "specialist":
      return {
        ...baseValues,
        services: [],
      };
    default:
      return baseValues;
  }
};

const CustomSelect = ({ field, form, isDisabled = false, ...props }) => {
  const onChange = (option) => {
    form.setFieldValue(field.name, option ? option.value : "");
  };

  const getValue = () => {
    if (field.value) {
      return countryOptions.find((option) => option.value === field.value);
    }
    return null;
  };

  return (
    <Select
      {...props}
      value={getValue()}
      onChange={onChange}
      isDisabled={isDisabled}
      options={countryOptions}
      styles={customSelectStyles}
      placeholder="Выберите страну"
      noOptionsMessage={() => "Страна не найдена"}
      loadingMessage={() => "Загрузка..."}
      isSearchable={true}
    />
  );
};

CustomSelect.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
  }).isRequired,
  form: PropTypes.shape({
    setFieldValue: PropTypes.func.isRequired,
  }).isRequired,
  isDisabled: PropTypes.bool,
};

const roleTypes = [
  {
    id: "user",
    icon: FaUser,
    colors: ["#FF6B6B", "#4ECDC4", "#45B7D1"],
    image: "/images/registration/user_default.jpg",
  },
  {
    id: "breeder",
    icon: FaPaw,
    colors: ["#96E6A1", "#D4FC79", "#96E6A1"],
    image: "/images/registration/breeder.jpg",
  },
  {
    id: "specialist",
    icon: FaStethoscope,
    colors: ["#A9C9FF", "#FFBBEC", "#A9C9FF"],
    image: "/images/registration/specialist.jpg",
  },
];

const cardVariants = {
  hidden: {
    y: 50,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
};

const RoleCard = ({ icon: Icon, title, description, selected, onClick }) => (
  <motion.div
    variants={cardVariants}
    whileHover={{
      scale: 1.05,
      transition: { type: "spring", stiffness: 300 },
    }}
    whileTap={{ scale: 0.95 }}
    className={`${styles.roleCard} ${selected ? styles.selected : ""}`}
    onClick={onClick}
  >
    <Icon size={40} className={styles.roleIcon} />
    <h3 className={styles.roleTitle}>{title}</h3>
    <p className={styles.roleDescription}>{description}</p>
  </motion.div>
);

RoleCard.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

RoleCard.defaultProps = {
  selected: false,
};

const formVariants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
  exit: {
    opacity: 0,
    y: -50,
  },
};

const backdropVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

const modalVariants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
  exit: {
    opacity: 0,
    y: -50,
  },
};

const RegistrationModal = ({ onClose, selectedRole }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslatedContent();
  const loading = useSelector(selectRegistrationLoading);
  const error = useSelector(selectRegistrationError);

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [onClose]);

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      setStatus(null);
      const registerAction = {
        user: registerUser,
        breeder: registerBreeder,
        specialist: registerSpecialist,
      }[selectedRole.id];

      if (!registerAction) {
        throw new Error("Неверный тип пользователя");
      }

      await dispatch(registerAction(values));

      toast.success("Регистрация прошла успешно!", {
        duration: 3000,
        position: "top-center",
        style: {
          background: "#4caf50",
          color: "#fff",
          fontSize: "16px",
          padding: "16px",
          borderRadius: "8px",
        },
      });

      dispatch(
        addNotification({
          id: Date.now(),
          title: "Добро пожаловать!",
          message: `Здравствуйте, ${values.username}! Мы рады приветствовать вас на нашей платформе.`,
          timestamp: new Date().toISOString(),
        })
      );

      const loginResult = await dispatch(
        login({
          username: values.username,
          password: values.password,
        })
      );

      if (loginResult?.payload?.user) {
        const redirectPaths = {
          breeder: "/mainbcs",
          specialist: "/mainspecialistsystem",
          user: "/mainusersystem",
        };
        navigate(redirectPaths[selectedRole.id]);
      }
    } catch (error) {
      console.error("Registration/Login error:", error);
      setStatus("Ошибка при регистрации");
      toast.error(
        error.response?.data?.message || "Произошла ошибка при регистрации"
      );
    } finally {
      setSubmitting(false);
    }
  };

  const FormComponent = {
    user: UserRegistrationForm,
    breeder: BreederRegistrationForm,
    specialist: SpecialistRegistrationForm,
  }[selectedRole.id];

  if (!FormComponent) {
    console.error("Неверный тип пользователя:", selectedRole.id);
    onClose();
    return null;
  }

  return (
    <motion.div
      className={styles.modalBackdrop}
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        className={styles.modalContent}
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className={styles.modalBackground}>
          <Aurora
            colorStops={selectedRole.colors}
            amplitude={1.2}
            speed={0.5}
          />
        </div>
        <div className={styles.modalInner}>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
          <div className={styles.registrationContainer}>
            <motion.div
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <Formik
                initialValues={getInitialValues(selectedRole.id)}
                validationSchema={getValidationSchema(selectedRole.id)}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form className={styles.registrationForm}>
                    <h2>
                      Регистрация{" "}
                      {t(`registration.roles.${selectedRole.id}.title`)}
                    </h2>
                    {error && (
                      <div className={styles.error}>{error.toString()}</div>
                    )}
                    <FormComponent
                      loading={loading}
                      isSubmitting={isSubmitting}
                    />
                    <button
                      type="submit"
                      className={styles.submitButton}
                      disabled={loading || isSubmitting}
                    >
                      {loading || isSubmitting
                        ? t("registration.loading")
                        : t("registration.submit")}
                    </button>
                  </Form>
                )}
              </Formik>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

RegistrationModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  selectedRole: PropTypes.shape({
    id: PropTypes.string.isRequired,
    icon: PropTypes.elementType.isRequired,
    colors: PropTypes.arrayOf(PropTypes.string).isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

const RegistrationForm = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const cardContainerRef = useRef(null);
  const { t } = useTranslatedContent();

  useEffect(() => {
    const handleScroll = () => {
      if (cardContainerRef.current) {
        const scrollPosition = cardContainerRef.current.scrollLeft;
        const cardWidth = cardContainerRef.current.offsetWidth;
        const newSlide = Math.round(scrollPosition / cardWidth);
        setCurrentSlide(newSlide);
      }
    };

    const container = cardContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const scrollToSlide = (index) => {
    if (cardContainerRef.current) {
      const cardWidth = cardContainerRef.current.offsetWidth;
      cardContainerRef.current.scrollTo({
        left: cardWidth * index,
        behavior: "smooth",
      });
    }
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Aurora colorStops={roleTypes[0].colors} amplitude={1.2} speed={0.5} />
      <div className={styles.registrationContainer}>
        <div className={styles.swipeHintContainer}>
          <div className={styles.swipeHint}>
            <FaArrowsAltH className={styles.swipeIcon} />
            <span>Листайте для выбора типа регистрации</span>
          </div>
        </div>
        <div className={styles.cardContainer} ref={cardContainerRef}>
          {roleTypes.map((role) => (
            <motion.div
              key={role.id}
              variants={cardVariants}
              whileHover={{
                scale: 1.05,
                transition: { type: "spring", stiffness: 300 },
              }}
              whileTap={{ scale: 0.95 }}
              className={`${styles.roleCard} ${
                selectedRole?.id === role.id ? styles.selected : ""
              }`}
              onClick={() => handleRoleSelect(role)}
            >
              <img
                src={role.image}
                alt={t(`registration.roles.${role.id}.title`)}
                className={styles.roleCardImage}
              />
              <role.icon size={40} className={styles.roleIcon} />
              <h3 className={styles.roleTitle}>
                {t(`registration.roles.${role.id}.title`)}
              </h3>
              <p className={styles.roleDescription}>
                {t(`registration.roles.${role.id}.description`)}
              </p>
            </motion.div>
          ))}
        </div>
        <div className={styles.slideIndicators}>
          {roleTypes.map((_, index) => (
            <div
              key={index}
              className={`${styles.indicator} ${
                currentSlide === index ? styles.active : ""
              }`}
              onClick={() => scrollToSlide(index)}
            />
          ))}
        </div>
      </div>
      <AnimatePresence>
        {isModalOpen && (
          <RegistrationModal
            onClose={handleCloseModal}
            selectedRole={selectedRole}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default RegistrationForm;
