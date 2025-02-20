import { useState } from "react";
import { Field, ErrorMessage } from "formik";
import PropTypes from "prop-types";
import Select from "react-select";
import * as Yup from "yup";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import styles from "./RegistrationForm.module.css";
import { useTranslatedContent } from "../../redux/hooks/useTranslatedContent";
import { handleSocialAuth } from "../../utils/socialAuth";

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

export const UserRegistrationForm = ({ loading, isSubmitting }) => {
  const { t } = useTranslatedContent();
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToLicense, setAgreedToLicense] = useState(false);

  const onSocialAuth = async (provider) => {
    try {
      await handleSocialAuth(provider);
    } catch (error) {
      console.error(`${provider} auth failed:`, error);
    }
  };

  return (
    <div className={styles.userForm}>
      <h2 className={styles.formTitle}>{t("registration.user.title")}</h2>

      <div className={styles.inputGroup}>
        <FaUser className={styles.inputIcon} />
        <Field
          type="text"
          id="username"
          name="username"
          className={styles.input}
          placeholder={t("registration.user.username")}
          autoComplete="username"
          disabled={loading || isSubmitting}
        />
        <ErrorMessage
          name="username"
          component="div"
          className={styles.error}
        />
      </div>

      <div className={styles.inputGroup}>
        <FaEnvelope className={styles.inputIcon} />
        <Field
          type="email"
          id="email"
          name="email"
          className={styles.input}
          placeholder={t("registration.user.email")}
          autoComplete="email"
          disabled={loading || isSubmitting}
        />
        <ErrorMessage name="email" component="div" className={styles.error} />
      </div>

      <div className={styles.inputGroup}>
        <FaLock className={styles.inputIcon} />
        <Field
          type={showPassword ? "text" : "password"}
          id="password"
          name="password"
          className={styles.input}
          placeholder={t("registration.user.password")}
          autoComplete="new-password"
          disabled={loading || isSubmitting}
        />
        <button
          type="button"
          className={styles.showPasswordButton}
          onClick={() => setShowPassword(!showPassword)}
          tabIndex={-1}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
        <ErrorMessage
          name="password"
          component="div"
          className={styles.error}
        />
      </div>

      <div className={styles.licenseAgreement}>
        <input
          type="checkbox"
          id="license"
          className={styles.checkbox}
          checked={agreedToLicense}
          onChange={(e) => setAgreedToLicense(e.target.checked)}
        />
        <label htmlFor="license">
          {t("registration.license.agree")}{" "}
          <a
            href="/license"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.licenseLink}
          >
            {t("registration.license.text")}
          </a>
        </label>
      </div>

      <div className={styles.socialAuth}>
        <div className={styles.socialDivider}>
          {t("registration.social.or")}
        </div>
        <div className={styles.socialButtons}>
          <button
            type="button"
            className={styles.socialButton}
            onClick={() => onSocialAuth("google")}
          >
            <img src="/images/social/google.svg" alt="Google" />
            {t("registration.social.google")}
          </button>
          <button
            type="button"
            className={styles.socialButton}
            onClick={() => onSocialAuth("facebook")}
          >
            <img src="/images/social/facebook.svg" alt="Facebook" />
            {t("registration.social.facebook")}
          </button>
          <button
            type="button"
            className={styles.socialButton}
            onClick={() => onSocialAuth("apple")}
          >
            <img src="/images/social/apple.svg" alt="Apple" />
            {t("registration.social.apple")}
          </button>
        </div>
      </div>
    </div>
  );
};

export const BreederRegistrationForm = ({ loading, isSubmitting }) => (
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

export const SpecialistRegistrationForm = ({ loading, isSubmitting }) => (
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

export const getValidationSchema = (roleId) => {
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

export const getInitialValues = (roleId) => {
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

const formPropTypes = {
  loading: PropTypes.bool.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
};

UserRegistrationForm.propTypes = formPropTypes;
BreederRegistrationForm.propTypes = formPropTypes;
SpecialistRegistrationForm.propTypes = formPropTypes;

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
