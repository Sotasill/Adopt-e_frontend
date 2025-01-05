import { Field } from "formik";
import styles from "./LoginForm.module.css";

export const TextField = ({
  name,
  label,
  type = "text",
  disabled,
  error,
  touched,
  ...props
}) => (
  <div className={styles.formGroup}>
    <label htmlFor={name}>{label}</label>
    <Field
      type={type}
      id={name}
      name={name}
      className={`${styles.input} ${error && touched ? styles.inputError : ""}`}
      disabled={disabled}
      {...props}
    />
    {error && touched && <div className={styles.fieldError}>{error}</div>}
  </div>
);

export const PasswordField = ({
  name,
  label,
  showPassword,
  onTogglePassword,
  disabled,
  error,
  touched,
  ...props
}) => (
  <div className={styles.formGroup}>
    <label htmlFor={name}>{label}</label>
    <div className={styles.passwordInputContainer}>
      <Field
        type={showPassword ? "text" : "password"}
        id={name}
        name={name}
        className={`${styles.input} ${
          error && touched ? styles.inputError : ""
        }`}
        disabled={disabled}
        {...props}
      />
      <button
        type="button"
        className={styles.togglePasswordButton}
        onClick={onTogglePassword}
        disabled={disabled}
        tabIndex="-1"
        aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
      >
        {showPassword ? "Скрыть" : "Показать"}
      </button>
    </div>
    {error && touched && <div className={styles.fieldError}>{error}</div>}
  </div>
);

export const CheckboxField = ({ name, label, disabled, ...props }) => (
  <label className={styles.rememberMeLabel}>
    <Field
      type="checkbox"
      name={name}
      className={styles.rememberMeCheckbox}
      disabled={disabled}
      {...props}
    />
    {label}
  </label>
);
