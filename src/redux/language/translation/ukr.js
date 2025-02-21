const ukrTranslation = {
  // Загальні
  welcome: {
    title: "Ласкаво просимо до світу домашніх улюбленців!",
    subtitle:
      "Знайдіть свого ідеального улюbленця за допомогою перевірених заводчиків",
  },
  login: "Увійти",
  register: "Зареєструватися",
  logout: "Вийти",
  findBreeder: "Знайти заводчика",
  findYourPet: "Знайти улюбленця",

  // Навігація
  navigation: {
    home: "Головна",
    animals: "Тварини",
    gallery: "Галерея",
    about: "Про нас",
    ourMission: "Наша місія",
    breeders: "Заводчики",
    findBreeder: "Знайти заводчика",
    findYourPet: "Знайти улюbленця",
    breeds: "Породи тварин",
  },

  // Породи
  breeds: {
    title: "Породи тварин",
    dogs: "Собаки",
    cats: "Коти",
    searchPlaceholder: "Пошук порід...",
  },

  // Форма тварини
  addAnimal: "Додати тварину",
  name: "Ім'я",
  age: "Вік",
  breed: "Порода",
  description: "Опис",
  submit: "Відправити",

  // Статуси
  success: "Успішно",
  error: "Помилка",
  loading: "Завантаження...",

  // Повідомлення
  animalAdded: "Тварину успішно додано",
  animalUpdated: "Тварину успішно оновлено",
  animalDeleted: "Тварину успішно видалено",

  // Реєстрація
  registration: {
    loading: "Реєстрація...",
    submit: "Зареєструватися",
    step: "Крок {{current}} з {{total}}",
    success: "Реєстрація пройшла успішно!",
    error: "Виникла помилка при реєстрації",
    roles: {
      user: {
        title: "Користувач",
        description:
          "Зареєструйтесь як користувач, щоб знайти ідеального друга для вашої родини",
      },
      breeder: {
        title: "Заводчик",
        description:
          "Створіть профіль заводчика для розміщення ваших тварин та зв'язку з потенційними власниками",
      },
      specialist: {
        title: "Реєстрація спеціаліста",
        description:
          "Зареєструйтесь як спеціаліст з догляду за тваринами (ветеринар, продавець зоотоварів, грумер)",
        form: {
          username: "Ім'я користувача",
          email: "Електронна пошта",
          password: "Пароль",
          companyName: "Назва організації",
          specialization: {
            label: "Спеціалізація",
            placeholder: "Оберіть спеціалізацію",
            veterinary: "Ветеринарні послуги",
            petshop: "Зоотовари",
            services: "Інші послуги для тварин",
          },
          country: {
            label: "Країна",
            placeholder: "Оберіть країну",
          },
          city: {
            label: "Місто",
            placeholder: "Введіть місто латиницею",
          },
          submit: "Завершити реєстрацію",
          next: "Далі",
          back: "Назад",
        },
      },
    },
    user: {
      title: "Реєстрація користувача",
      username: "Ім'я користувача",
      email: "Електронна пошта",
      password: "Пароль",
      submit: "Зареєструватися",
    },
    breeder: {
      title: "Реєстрація заводчика",
      steps: {
        basic: "Основна інформація",
        kennel: "Інформація про розплідник",
        experience: "Досвід та сертифікати",
      },
      form: {
        username: "Ім'я користувача",
        email: "Електронна пошта",
        password: "Пароль",
        companyName: "Назва розплідника",
        specialization: {
          label: "Спеціалізація",
          placeholder: "Оберіть спеціалізацію",
          dog: "Собаки",
          cat: "Коти",
        },
        country: {
          label: "Країна",
          placeholder: "Оберіть країну",
        },
        city: {
          label: "Місто",
          placeholder: "Введіть місто латиницею",
        },
        submit: "Завершити реєстрацію",
        next: "Далі",
        back: "Назад",
      },
    },
    social: {
      or: "або увійдіть через",
      google: "Google",
      facebook: "Facebook",
      apple: "Apple",
    },
    license: {
      agree: "Я погоджуюсь з",
      text: "умовами використання",
    },
    errors: {
      required: "Обов'язкове поле",
      email: "Некоректна email адреса",
      minLength: "Мінімум {{count}} символів",
      maxLength: "Максимум {{count}} символів",
    },
  },

  // Футер
  footer: {
    mission: {
      title: "Наша Місія",
      description:
        "Ми допомагаємо тваринам знайти люблячий дім та дбайливих господарів. Кожна тварина заслуговує на щасливе життя.",
      readMore: "Дізнатися більше про нашу місію",
    },
    quickLinks: {
      title: "Швидкі посилання",
      animals: "Наші улюbленці",
      howToAdopt: "Як усиновити",
      successStories: "Історії успіху",
      volunteer: "Стати волонтером",
    },
    contact: {
      title: "Контакти",
      shelter: "Притулок",
      address: "вул. Приклад, 123, Київ",
      email: "info@adopt-e.ua",
      phone: "+380 (99) 123-45-67",
      phoneLabel: "Телефон",
      workingHours: "Години роботи",
      hours: "Пн-Нд: 10:00 - 18:00",
    },
    rights: "Всі права захищені",
  },

  // Секція розплідників
  kennels: {
    title: "Знайдіть свого заводчика",
    rating: "Рейтинг",
    outOf: "з",
    viewMore: "Показати більше",
    viewMoreText: "Дивитись усіх заводчиків",
    petTypes: {
      dogs: "Собаки",
      cats: "Коти",
    },
    filters: {
      title: "Фільтри",
      button: "Фільтри",
      apply: "Застосувати",
      reset: "Скинути",
      sort: {
        label: "Сортувати за",
        nameAsc: "Ім'ям (А-Я)",
        nameDesc: "Ім'ям (Я-А)",
        ratingDesc: "Рейтингом (високий)",
        ratingAsc: "Рейтингом (низький)",
      },
      country: {
        label: "Країна",
        all: "Всі країни",
      },
      breed: {
        label: "Порода",
        all: "Всі породи",
      },
      rating: {
        label: "Мінімальний рейтинг",
        all: "Будь-який рейтинг",
      },
    },
    list: {
      // Собаки
      goldenParadise: {
        breed: "Золотистий ретривер",
        country: "США",
      },
      royalPaws: {
        breed: "Лабрадор",
        country: "Велика Британія",
      },
      eliteGermanShepherds: {
        breed: "Німецька вівчарка",
        country: "Німеччина",
      },
      siberianStars: {
        breed: "Сибірський хаскі",
        country: "Росія",
      },
      // Коти
      persianPalace: {
        breed: "Перська кішка",
      },
      britishCharm: {
        breed: "Британська короткошерста",
      },
      maineCoonMagic: {
        breed: "Мейн-кун",
      },
      siameseSecrets: {
        breed: "Сіамська кішка",
      },
      countries: {
        us: "США",
        gb: "Велика Британія",
        de: "Німеччина",
        ru: "Росія",
        ir: "Іран",
        th: "Таїланд",
        ua: "Україна",
        fr: "Франція",
      },
    },
  },

  // Переваги
  advantages: {
    searchTitle: "Зручний пошук вихованців",
    searchContent:
      "Використовуйте розширені фільтри для пошуку ідеального вихованця за породою, віком, розміром та місцезнаходженням.",
    breedersTitle: "Перевірені заводчики",
    breedersContent:
      "Всі заводчики проходять ретельну перевірку. Ми гарантуємо безпеку та надійність кожної угоди.",
    supportTitle: "Підтримка 24/7",
    supportContent:
      "Наша служба підтримки доступна цілодобово, щоб допомогти вам з будь-якими питаннями щодо вибору та придбання вихованця.",
    toolsTitle: "Зручні інструменти для заводчиків",
    toolsContent:
      "Заводчики отримують доступ до професійних інструментів для управління оголошеннями, спілкування з покупцями та ведення документації.",
  },

  // Банери
  banners: {
    special: "Спеціальна пропозиція",
    newPets: "Нові вихованці",
    monthlyDeals: "Акції місяця",
  },

  hero: {
    title: "Знайдіть свого ідеального улюбленця",
    subtitle:
      "Ми допоможемо вам знайти вірного друга серед тисяч тварин, які чекають на свій новий дім",
    findBreeder: "Знайти заводчика",
  },

  // Секція тварин
  pets: {
    title: "Знайди свого улюбленця",
    findYourPet: "Знайди свого улюбленця",
    viewMore: "Показати більше",
    viewMoreText: "Переглянути всіх доступних тварин",
    age: "{{age}} років",
    price: "{{price}}₴",
    rating: "Рейтинг",
    outOf: "з",
    viewBreeder: "Переглянути заводчика",
    ageYearsAndMonths: "{{years}}р {{months}}м",
    ageYears: "{{years}}р",
    ageMonths: "{{months}}м",
  },

  products: {
    title: "Зоотовари та послуги",
    zootovary: "Зоотовари",
    services: "Послуги",
    veterinary: "Ветеринарія",
    findProducts: "Знайти зоотовари",
    findServices: "Знайти послуги",
    findVeterinary: "Знайти ветеринарні послуги",
    viewMore: "Показати більше",
    viewMoreText: "Переглянути всі товари",
    viewDetails: "Детальніше",
    categories: {
      food: "Корм",
      toys: "Іграшки",
      equipment: "Обладнання",
      beds: "Лежаки",
      hygiene: "Гігієна",
      accessories: "Аксесуари",
      grooming: "Грумінг",
      training: "Дресирування",
      boarding: "Перетримка",
      walking: "Вигул",
      photoshoot: "Фотосесія",
      petaxi: "Зоотаксі",
      consultation: "Консультація",
      vaccination: "Вакцинація",
      diagnostics: "Діагностика",
      dental: "Стоматологія",
      surgery: "Хірургія",
      tests: "Аналізи",
    },
    price: "{{price}} ₴",
    badges: {
      top: "Хіт продажу",
      new: "Новинка",
      sale: "Знижка",
      popular: "Популярне",
    },
  },

  services: {
    findServices: "Знайти послуги",
    findProducts: "Знайти послуги для улюbленців",
    viewMore: "Показати більше",
    viewMoreText: "Переглянути всі послуги",
    viewDetails: "Детальніше",
    categories: {
      grooming: "Грумінг",
      training: "Дресирування",
      boarding: "Перетримка",
      walking: "Вигул",
      photoshoot: "Фотосесія",
      petaxi: "Зоотаксі",
    },
    price: "{{price}}₴",
  },

  veterinary: {
    findProducts: "Знайти ветеринарні послуги",
    viewMore: "Показати більше",
    viewMoreText: "Переглянути всі ветеринарні послуги",
    viewDetails: "Детальніше",
    categories: {
      consultation: "Консультація",
      vaccination: "Вакцинація",
      diagnostics: "Діагностика",
      dental: "Стоматологія",
      surgery: "Хірургія",
      tests: "Аналізи",
    },
    price: "{{price}}₴",
  },

  // Мітки
  badges: {
    top: "Хіт продажу",
    new: "Новинка",
    discount: "Знижка {{percent}}%",
    topService: "Популярна послуга",
    newService: "Нова послуга",
    topDoctor: "Кращий спеціаліст",
    newDoctor: "Новий лікар",
    sale: "Розпродаж",
  },

  notFound: {
    message: "Сторінку не знайдено",
    returnHome: "Повернутися на головну",
  },

  // Типи тварин
  cats: {
    findPets: "Знайти кішку",
    viewMore: "Показати більше кішок",
    viewMoreText: "Переглянути всіх доступних кішок",
  },
  dogs: {
    findPets: "Знайти собаку",
    viewMore: "Показати більше собак",
    viewMoreText: "Переглянути всіх доступних собак",
  },

  // Загальні
  common: {
    dogs: "Собаки",
    cats: "Коти",
  },

  // Сторінка заводчиків
  breeders: {
    title: "Знайди свого заводчика",
    filters: {
      title: "Фільтри",
      button: "Фільтри",
      apply: "Застосувати",
      reset: "Скинути",
      sortBy: "Сортувати за",
      nameAsc: "Ім'ям (А-Я)",
      nameDesc: "Ім'ям (Я-А)",
      ratingDesc: "Рейтингом (високий)",
      ratingAsc: "Рейтингом (низький)",
      priceAsc: "Ціною (за зростанням)",
      priceDesc: "Ціною (за спаданням)",
      countries: "Країна",
      breeds: "Порода",
      minRating: "Мінімальний рейтинг",
      any: "Будь-який рейтинг",
    },
    viewModes: {
      grid: "Сітка",
      list: "Список",
    },
  },

  specialist: {
    dashboard: {
      welcome: "Ласкаво просимо, {{name}}!",
    },
  },
};

console.log("Ukrainian translations loaded:", {
  navigationBreeds: ukrTranslation.navigation?.breeds,
  breedsTitle: ukrTranslation.breeds?.title,
});

export default ukrTranslation;
