import { useState } from "react";
import styles from "./HomePage.module.css";

const advantages = [
  {
    id: 1,
    title: "Удобный поиск питомцев",
    content:
      "Используйте расширенные фильтры для поиска идеального питомца по породе, возрасту, размеру и местоположению.",
  },
  {
    id: 2,
    title: "Проверенные заводчики",
    content:
      "Все заводчики проходят тщательную проверку. Мы гарантируем безопасность и надежность каждой сделки.",
  },
  {
    id: 3,
    title: "Поддержка 24/7",
    content:
      "Наша служба поддержки доступна круглосуточно, чтобы помочь вам с любыми вопросами по выбору и приобретению питомца.",
  },
  {
    id: 4,
    title: "Удобные инструменты для заводчиков",
    content:
      "Заводчики получают доступ к профессиональным инструментам для управления объявлениями, общения с покупателями и ведения документации.",
  },
];

const HomePage = () => {
  const [activeId, setActiveId] = useState(null);

  const toggleAccordion = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Welcome to Adopt-e</h1>
        <p className={styles.subtitle}>
          Ваша платформа для соединения заводчиков и любителей домашних
          животных! Найдите своего идеального питомца уже сегодня.
        </p>
        <div className={styles.accordion}>
          {advantages.map((item) => (
            <div key={item.id} className={styles.accordionItem}>
              <div
                className={styles.accordionHeader}
                onClick={() => toggleAccordion(item.id)}
              >
                {item.title}
                <span
                  className={`${styles.accordionIcon} ${
                    activeId === item.id ? styles.active : ""
                  }`}
                >
                  ▼
                </span>
              </div>
              <div
                className={`${styles.accordionContent} ${
                  activeId === item.id ? styles.active : ""
                }`}
              >
                <p className={styles.accordionText}>{item.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
