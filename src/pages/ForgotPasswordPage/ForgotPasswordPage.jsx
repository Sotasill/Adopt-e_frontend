import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ForgotPasswordPage.module.css";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("initial"); // initial, loading, success, error
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      // Здесь будет логика отправки запроса на сервер
      // Имитация запроса
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        "Произошла ошибка при отправке. Пожалуйста, попробуйте позже."
      );
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formCard}>
        <button className={styles.backButton} onClick={() => navigate(-1)}>
          ← Назад
        </button>
        <h1>Восстановление пароля</h1>

        {status === "success" ? (
          <div className={styles.successMessage}>
            <div className={styles.successIcon}>✓</div>
            <h2>Проверьте вашу почту</h2>
            <p>
              Мы отправили инструкции по восстановлению пароля на указанный
              email. Если вы не получили письмо, проверьте папку "Спам".
            </p>
            <button
              className={styles.returnButton}
              onClick={() => navigate("/")}
            >
              Вернуться на главную
            </button>
          </div>
        ) : (
          <>
            <p className={styles.description}>
              Введите email, указанный при регистрации, и мы отправим вам
              инструкции по восстановлению пароля.
            </p>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Введите ваш email"
                  required
                  disabled={status === "loading"}
                  className={styles.input}
                />
              </div>

              {status === "error" && (
                <div className={styles.errorMessage}>{errorMessage}</div>
              )}

              <button
                type="submit"
                className={styles.submitButton}
                disabled={status === "loading"}
              >
                {status === "loading" ? (
                  <span className={styles.loadingSpinner}>⟳</span>
                ) : (
                  "Отправить инструкции"
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
