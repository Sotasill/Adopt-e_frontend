import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import Select from "react-select";
import * as Yup from "yup";
import toast from "react-hot-toast";
import {
  registerUser,
  registerBreeder,
} from "../../redux/registration/registrationThunks";
import {
  selectRegistrationLoading,
  selectRegistrationError,
  selectRegistrationSuccess,
} from "../../redux/registration/registrationSlice";
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

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Минимум 3 символа")
    .max(30, "Максимум 30 символов")
    .required("Обязательное поле"),
  email: Yup.string().email("Некорректный email").required("Обязательное поле"),
  password: Yup.string()
    .min(6, "Минимум 6 символов")
    .required("Обязательное поле"),
  role: Yup.string().required("Обязательное поле"),
  companyName: Yup.string().when("role", {
    is: "breeder",
    then: () => Yup.string().required("Обязательное поле для заводчика"),
  }),
  address: Yup.string().when("role", {
    is: "breeder",
    then: () => Yup.string().required("Обязательное поле для заводчика"),
  }),
  country: Yup.string().when("role", {
    is: "breeder",
    then: () => Yup.string().required("Выберите страну"),
  }),
  specialization: Yup.string().when("role", {
    is: "breeder",
    then: () => Yup.string().required("Обязательное поле для заводчика"),
  }),
});

const CustomSelect = ({ field, form, isDisabled, ...props }) => {
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

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector(selectRegistrationLoading);
  const error = useSelector(selectRegistrationError);
  const success = useSelector(selectRegistrationSuccess);

  useEffect(() => {
    if (success) {
      toast.success(
        "Регистрация прошла успешно! Перенаправление на страницу входа...",
        {
          duration: 3000,
          position: "top-center",
          style: {
            background: "#4caf50",
            color: "#fff",
            fontSize: "16px",
            padding: "16px",
            borderRadius: "8px",
          },
        }
      );
      const timer = setTimeout(() => {
        navigate("/login");
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  const initialValues = {
    username: "",
    email: "",
    password: "",
    role: "user",
    companyName: "",
    address: "",
    country: "",
    specialization: "dog",
  };

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      setStatus(null);
      if (values.role === "breeder") {
        await dispatch(registerBreeder(values)).unwrap();
      } else {
        await dispatch(registerUser(values)).unwrap();
      }
    } catch (err) {
      toast.error(err.message || "Произошла ошибка при регистрации", {
        duration: 3000,
        position: "top-center",
        style: {
          background: "#f44336",
          color: "#fff",
          fontSize: "16px",
          padding: "16px",
          borderRadius: "8px",
        },
      });
      setStatus(err.message || "Произошла ошибка при регистрации");
      console.error("Ошибка при регистрации:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.registrationContainer}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, status, isSubmitting }) => (
          <Form className={styles.registrationForm}>
            <h2>Регистрация</h2>
            {status && <div className={styles.error}>{status}</div>}
            {error && <div className={styles.error}>{error}</div>}

            <div className={styles.formGroup}>
              <label htmlFor="role">Тип пользователя:</label>
              <Field
                as="select"
                id="role"
                name="role"
                disabled={loading || isSubmitting}
              >
                <option value="user">Пользователь</option>
                <option value="breeder">Заводчик</option>
              </Field>
              {errors.role && touched.role && (
                <div className={styles.error}>{errors.role}</div>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="username">Имя пользователя:</label>
              <Field
                type="text"
                id="username"
                name="username"
                autoComplete="username"
                disabled={loading || isSubmitting}
              />
              {errors.username && touched.username && (
                <div className={styles.error}>{errors.username}</div>
              )}
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
              {errors.email && touched.email && (
                <div className={styles.error}>{errors.email}</div>
              )}
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
              {errors.password && touched.password && (
                <div className={styles.error}>{errors.password}</div>
              )}
            </div>

            {values.role === "breeder" && (
              <>
                <div className={styles.formGroup}>
                  <label htmlFor="companyName">Название компании:</label>
                  <Field
                    type="text"
                    id="companyName"
                    name="companyName"
                    disabled={loading || isSubmitting}
                  />
                  {errors.companyName && touched.companyName && (
                    <div className={styles.error}>{errors.companyName}</div>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="address">Адрес:</label>
                  <Field
                    type="text"
                    id="address"
                    name="address"
                    disabled={loading || isSubmitting}
                  />
                  {errors.address && touched.address && (
                    <div className={styles.error}>{errors.address}</div>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="country">Страна:</label>
                  <Field
                    name="country"
                    component={CustomSelect}
                    isDisabled={loading || isSubmitting}
                  />
                  {errors.country && touched.country && (
                    <div className={styles.error}>{errors.country}</div>
                  )}
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
                  {errors.specialization && touched.specialization && (
                    <div className={styles.error}>{errors.specialization}</div>
                  )}
                </div>
              </>
            )}

            <button
              type="submit"
              className={styles.submitButton}
              disabled={loading || isSubmitting}
            >
              {loading || isSubmitting
                ? "Регистрация..."
                : "Зарегистрироваться"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegistrationForm;
