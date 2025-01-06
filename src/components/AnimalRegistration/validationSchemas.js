import * as Yup from "yup";

// Вспомогательные функции для работы с датами
const getMaxDate = () => {
  const date = new Date();
  date.setMonth(date.getMonth() - 1); // Минимальный возраст - 1 месяц
  return date;
};

const getMinDate = () => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 20); // Максимальный возраст - 20 лет
  return date;
};

// Константы для валидации
const EYE_COLORS = {
  aqua: { label: "Аква", color: "#00ffff" },
  blue: { label: "Голубой", color: "#0000ff" },
  cooper: { label: "Медный", color: "#b87333" },
  gold: { label: "Золотой", color: "#ffd700" },
  hazel: { label: "Ореховый", color: "#8e7618" },
  oddEyed: {
    label: "Разные глаза",
    color: "linear-gradient(to right, #0000ff 50%, #8e7618 50%)",
  },
  pink: { label: "Розовый", color: "#ffc0cb" },
  unknown: { label: "Неизвестно", color: "#808080" },
};

// Константы для цветов шерсти
const FUR_COLORS = {
  // Основные цвета
  black: { label: "Black (чёрный)", category: "Основные цвета" },
  white: { label: "White (белый)", category: "Основные цвета" },
  grayBlue: { label: "Gray/Blue (серый/голубой)", category: "Основные цвета" },
  red: { label: "Red (рыжий)", category: "Основные цвета" },
  cream: { label: "Cream (кремовый)", category: "Основные цвета" },
  brown: { label: "Brown (коричневый)", category: "Основные цвета" },
  cinnamon: { label: "Cinnamon (корица)", category: "Основные цвета" },
  fawn: { label: "Fawn (серовато-бежевый)", category: "Основные цвета" },

  // Паттерны и вариации
  tabby: { label: "Tabby (полосатый/тигровый)", category: "Паттерны" },
  classicTabby: { label: "Classic Tabby (мраморный)", category: "Паттерны" },
  mackerelTabby: { label: "Mackerel Tabby (тигровый)", category: "Паттерны" },
  spottedTabby: { label: "Spotted Tabby (пятнистый)", category: "Паттерны" },
  tickedTabby: { label: "Ticked Tabby (абиссинский)", category: "Паттерны" },
  solid: { label: "Solid (однотонный)", category: "Паттерны" },
  tortoiseshell: { label: "Tortoiseshell (черепаховый)", category: "Паттерны" },
  calico: { label: "Calico (трёхцветный)", category: "Паттерны" },
  bicolor: { label: "Bicolor (двухцветный)", category: "Паттерны" },
  tricolor: { label: "Tricolor (трёхцветный)", category: "Паттерны" },

  // Поинты
  pointed: { label: "Pointed (акромеланический)", category: "Поинты" },
  sealPoint: { label: "Seal Point (тёмно-коричневые)", category: "Поинты" },
  bluePoint: { label: "Blue Point (голубые)", category: "Поинты" },
  chocolatePoint: { label: "Chocolate Point (шоколадные)", category: "Поинты" },
  lilacPoint: { label: "Lilac Point (сиреневые)", category: "Поинты" },
  redPoint: { label: "Red Point (рыжие)", category: "Поинты" },
  creamPoint: { label: "Cream Point (кремовые)", category: "Поинты" },
  colorpointWhite: { label: "Colorpoint and White", category: "Поинты" },

  // Специальные окрасы
  smoke: { label: "Smoke (дымчатый)", category: "Специальные" },
  shaded: { label: "Shaded (затушёванный)", category: "Специальные" },
  chinchilla: { label: "Chinchilla (шиншилловый)", category: "Специальные" },
  silver: { label: "Silver (серебристый)", category: "Специальные" },
  golden: { label: "Golden (золотистый)", category: "Специальные" },
  tipped: {
    label: "Tipped (с окрашенными кончиками)",
    category: "Специальные",
  },

  // Редкие окрасы
  mink: { label: "Mink (тонкинезский)", category: "Редкие" },
  sepia: { label: "Sepia (бирманский)", category: "Редкие" },
  lavender: { label: "Lavender (сиреневый)", category: "Редкие" },
  caramel: { label: "Caramel (карамельный)", category: "Редкие" },
};

// Константы для типов шерсти
const FUR_TYPES = {
  shortHaired: { label: "Short-haired (Короткошёрстный)" },
  mediumHaired: { label: "Medium-haired (Среднешёрстный)" },
  longHaired: { label: "Long-haired (Длинношёрстный)" },
  curly: { label: "Curly (Кудрявый)" },
  hairless: { label: "Hairless (Бесшёрстный)" },
  plush: { label: "Plush (Плюшевый)" },
};

// Схема валидации для формы регистрации животного
export const animalRegistrationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Кличка обязательна")
    .min(2, "Минимум 2 символа")
    .max(50, "Максимум 50 символов"),

  breed: Yup.string()
    .required("Порода обязательна")
    .min(2, "Минимум 2 символа")
    .max(50, "Максимум 50 символов"),

  birthDate: Yup.date()
    .required("Дата рождения обязательна")
    .max(new Date(), "Дата рождения не может быть в будущем"),

  eyeColor: Yup.string().required("Цвет глаз обязателен"),

  type: Yup.string()
    .required("Тип животного обязателен")
    .oneOf(["cat", "dog"], "Выберите кошку или собаку"),

  microchip: Yup.string(),

  furColor: Yup.string().required("Цвет шерсти обязателен"),

  furLength: Yup.string().required("Тип шерсти обязателен"),
});

// Экспортируем константы для использования в компоненте
export { EYE_COLORS, FUR_COLORS, FUR_TYPES };
