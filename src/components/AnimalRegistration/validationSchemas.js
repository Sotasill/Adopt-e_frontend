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
  AMBER: { label: "Amber (Янтарный)", color: "#FFBF00" },
  BLUE: { label: "Blue (Голубой)", color: "#89CFF0" },
  BROWN: { label: "Brown (Коричневый)", color: "#964B00" },
  COPPER: { label: "Copper (Медный)", color: "#B87333" },
  GREEN: { label: "Green (Зеленый)", color: "#228B22" },
  HAZEL: { label: "Hazel (Ореховый)", color: "#8E7618" },
  ODD: {
    label: "Odd-eyed (Разноцветные)",
    color: "linear-gradient(to right, #89CFF0 50%, #228B22 50%)",
  },
  ORANGE: { label: "Orange (Оранжевый)", color: "#FFA500" },
  YELLOW: { label: "Yellow (Желтый)", color: "#FFD700" },
};

// Константы для цветов шерсти кошек
const CAT_FUR_COLORS = {
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

// Константы для типов шерсти кошек
const CAT_FUR_TYPES = {
  shortHaired: { label: "Short-haired (Короткошёрстный)" },
  mediumHaired: { label: "Medium-haired (Среднешёрстный)" },
  longHaired: { label: "Long-haired (Длинношёрстный)" },
  curly: { label: "Curly (Кудрявый)" },
  hairless: { label: "Hairless (Бесшёрстный)" },
  plush: { label: "Plush (Плюшевый)" },
};

// Константы для цветов шерсти собак
const DOG_FUR_COLORS = {
  // Однотонные окрасы
  black: { label: "Black (черный)", category: "Однотонные окрасы" },
  white: { label: "White (белый)", category: "Однотонные окрасы" },
  brown: {
    label: "Brown/Chocolate (коричневый/шоколадный)",
    category: "Однотонные окрасы",
  },
  red: { label: "Red (рыжий)", category: "Однотонные окрасы" },
  fawn: { label: "Fawn (палевый)", category: "Однотонные окрасы" },
  cream: { label: "Cream (кремовый)", category: "Однотонные окрасы" },
  blue: { label: "Blue (серо-голубой)", category: "Однотонные окрасы" },
  gray: { label: "Gray (серый)", category: "Однотонные окрасы" },

  // Двухцветные окрасы
  blackAndWhite: {
    label: "Black and White (черно-белый)",
    category: "Двухцветные окрасы",
  },
  brownAndWhite: {
    label: "Brown and White (коричнево-белый)",
    category: "Двухцветные окрасы",
  },
  redAndWhite: {
    label: "Red and White (рыже-белый)",
    category: "Двухцветные окрасы",
  },

  // Трехцветные окрасы
  blackWhiteTan: {
    label: "Black, White and Tan (черный, белый и рыжий)",
    category: "Трехцветные окрасы",
  },
  brownWhiteTan: {
    label: "Brown, White and Tan (коричневый, белый и рыжий)",
    category: "Трехцветные окрасы",
  },

  // Специальные и узорчатые окрасы
  brindle: {
    label: "Brindle (тигровый)",
    category: "Специальные и узорчатые окрасы",
  },
  blueMerle: {
    label: "Blue Merle (голубой мраморный)",
    category: "Специальные и узорчатые окрасы",
  },
  redMerle: {
    label: "Red Merle (красный мраморный)",
    category: "Специальные и узорчатые окрасы",
  },
  sable: {
    label: "Sable (зонарный)",
    category: "Специальные и узорчатые окрасы",
  },
  ticked: {
    label: "Ticked (крапчатый)",
    category: "Специальные и узорчатые окрасы",
  },
  harlequin: {
    label: "Harlequin (арлекин)",
    category: "Специальные и узорчатые окрасы",
  },

  // Редкие окрасы
  isabella: {
    label: "Isabella/Lilac (изабелловый)",
    category: "Редкие окрасы",
  },
  roan: { label: "Roan (чалый)", category: "Редкие окрасы" },
  tanPoints: {
    label: "Tan Points (рыжие подпалины)",
    category: "Редкие окрасы",
  },
  domino: {
    label: "Domino/Grizzle (градиент темный-светлый)",
    category: "Редкие окрасы",
  },
};

// Константы для типов шерсти собак
const DOG_FUR_TYPES = {
  shortHaired: { label: "Short-haired (Гладкая)" },
  mediumHaired: { label: "Medium-haired (Средняя)" },
  longHaired: { label: "Long-haired (Длинная)" },
  wireHaired: { label: "Wire-haired (Жесткая)" },
  curlyHaired: { label: "Curly-haired (Кудрявая)" },
  corded: { label: "Corded (Шнуровидная)" },
  hairless: { label: "Hairless (Голая)" },
  doubleCoated: { label: "Double-coated (Двойная шерсть)" },
  undercoat: { label: "Undercoat (Подшерсток)" },
  outercoat: { label: "Outercoat (Ость)" },
  fluffy: { label: "Fluffy (Ватная/пуховая)" },
  wavy: { label: "Wavy (Волнистая)" },
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
const animalRegistrationSchema = Yup.object().shape({
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

export {
  SEX_OPTIONS,
  EYE_COLORS,
  CAT_FUR_COLORS,
  DOG_FUR_COLORS,
  CAT_FUR_TYPES,
  DOG_FUR_TYPES,
  animalRegistrationSchema,
};
