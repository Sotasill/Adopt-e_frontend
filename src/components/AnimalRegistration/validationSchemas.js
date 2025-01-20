import * as Yup from "yup";
import { CAT_BREEDS, DOG_BREEDS } from "./breedData";

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
const SEX_OPTIONS = {
  male: { label: "Male (Самец)" },
  female: { label: "Female (Самка)" },
};

const EYE_COLORS = {
  aqua: { label: "Aqua", color: "#00ffff" },
  blue: { label: "Blue", color: "#0000ff" },
  cooper: { label: "Cooper", color: "#b87333" },
  gold: { label: "Gold", color: "#ffd700" },
  hazel: { label: "Hazel", color: "#8e7618" },
  oddEyed: {
    label: "Odd-eyed",
    color: "linear-gradient(to right, #0000ff 50%, #8e7618 50%)",
  },
  pink: { label: "Pink", color: "#ffc0cb" },
  unknown: { label: "Unknown", color: "#808080" },
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

// Функция для проверки уникальности имени животного
const checkNameUniqueness = async (name) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      "http://localhost:3000/api/animals/check-name",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name }),
      }
    );

    const data = await response.json();

    if (data.status === "success") {
      return !data.data.exists; // Возвращаем true если имя уникально (exists: false)
    }

    console.error("Ошибка при проверке имени:", data);
    return false; // В случае неуспешного ответа считаем имя неуникальным
  } catch (error) {
    console.error("Ошибка при проверке имени:", error);
    return false; // В случае ошибки считаем имя неуникальным
  }
};

// Схема валидации для формы регистрации животного
export const animalRegistrationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Кличка обязательна")
    .min(2, "Кличка должна содержать минимум 2 символа")
    .max(50, "Кличка не должна превышать 50 символов")
    .matches(
      /^[A-Z][a-z]+$/,
      "Кличка должна начинаться с большой буквы и содержать только латинские буквы"
    )
    .test(
      "name-unique",
      "У вас уже есть животное с таким именем",
      async (value) => {
        if (!value) return true;
        return await checkNameUniqueness(value);
      }
    ),

  sex: Yup.string()
    .required("Пол животного обязателен")
    .oneOf(["male", "female"], "Выберите пол животного"),

  breed: Yup.string()
    .required("Порода обязательна")
    .test("valid-breed", "Выберите породу из списка", function (value) {
      const { type } = this.parent;
      const breeds = type === "cat" ? CAT_BREEDS : DOG_BREEDS;
      return Object.keys(breeds).includes(value);
    }),

  birthDate: Yup.date()
    .required("Дата рождения обязательна")
    .max(new Date(), "Дата рождения не может быть в будущем"),

  eyeColor: Yup.string().required("Цвет глаз обязателен"),

  type: Yup.string()
    .required("Тип животного обязателен")
    .test(
      "type-validation",
      "Тип животного не соответствует специализации",
      function (value) {
        if (!value) return false;

        // Получаем данные пользователя из localStorage
        const userStr = localStorage.getItem("user");
        console.log("Данные пользователя из localStorage:", userStr);

        const user = JSON.parse(userStr || "{}");
        const isBreeder = user.role === "breeder";
        const breederSpecialization = user.specialization?.toLowerCase();

        console.log("Детальная информация о пользователе:", {
          userFromStorage: user,
          isBreeder,
          breederSpecialization,
          rawValue: value,
          normalizedValue: value?.toLowerCase(),
        });

        if (isBreeder && breederSpecialization) {
          // Для бридера тип животного должен строго соответствовать его специализации
          const isValid = value.toLowerCase() === breederSpecialization;
          console.log("Результат валидации для бридера:", {
            isValid,
            valueFromForm: value.toLowerCase(),
            breederSpecialization,
            match: value.toLowerCase() === breederSpecialization,
          });
          return isValid;
        }

        // Для обычного пользователя проверяем, что тип это кошка или собака
        const isValid = ["cat", "dog"].includes(value.toLowerCase());
        console.log("Результат валидации для обычного пользователя:", {
          isValid,
          value: value.toLowerCase(),
          allowedTypes: ["cat", "dog"],
        });
        return isValid;
      }
    ),

  microchip: Yup.string()
    .nullable()
    .transform((value) => (value === "" ? null : value))
    .matches(/^[0-9 ]*$/, "Микрочип может содержать только цифры и пробелы"),

  furColor: Yup.string().required("Цвет шерсти обязателен"),

  furLength: Yup.string().required("Тип шерсти обязателен"),

  litterRegistrationNumber: Yup.string().when("registrationType", {
    is: "litter",
    then: () => Yup.string().required("Номер помёта обязателен"),
  }),

  mother: Yup.string().when("registrationType", {
    is: "parent",
    then: () => Yup.string(),
  }),

  father: Yup.string().when("registrationType", {
    is: "parent",
    then: () => Yup.string(),
  }),
});

// Экспортируем константы для использования в компоненте
export { EYE_COLORS, FUR_COLORS, FUR_TYPES, SEX_OPTIONS };
