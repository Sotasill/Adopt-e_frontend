const ruTranslation = {
  // Общие
  welcome: {
    title: "Добро пожаловать в мир домашних питомцев!",
    subtitle:
      "Найдите своего идеального питомца с помощью проверенных заводчиков",
  },
  login: "Войти",
  register: "Зарегистрироваться",
  logout: "Выйти",

  // Навигация
  home: "Главная",
  animals: "Животные",
  gallery: "Галерея",
  about: "О нас",
  ourMission: "Наша миссия",
  breeders: {
    title: "Найди своего заводчика",
    filters: {
      title: "Фильтры",
      button: "Фильтры",
      apply: "Применить",
      reset: "Сбросить",
      sortBy: "Сортировать по",
      nameAsc: "Имени (А-Я)",
      nameDesc: "Имени (Я-А)",
      ratingDesc: "Рейтингом (высокий)",
      ratingAsc: "Рейтингом (низкий)",
      priceAsc: "Цене (по возрастанию)",
      priceDesc: "Цене (по убыванию)",
      countries: "Страна",
      breeds: "Порода",
      minRating: "Минимальный рейтинг",
      any: "Любой рейтинг",
    },
    viewModes: {
      grid: "Сетка",
      list: "Список",
    },
  },
  findBreeder: "Найти заводчика",
  findYourPet: "Найти питомца",
  breeds: {
    title: "Породы питомцев",
    dogs: "Собаки",
    cats: "Кошки",
    searchPlaceholder: "Поиск пород...",
  },

  // Форма животного
  addAnimal: "Добавить животное",
  name: "Имя",
  age: "Возраст",
  breed: "Порода",
  description: "Описание",
  submit: "Отправить",

  // Статусы
  success: "Успешно",
  error: "Ошибка",
  loading: "Загрузка...",

  // Сообщения
  animalAdded: "Животное успешно добавлено",
  animalUpdated: "Животное успешно обновлено",
  animalDeleted: "Животное успешно удалено",

  // Регистрация
  registration: {
    loading: "Регистрация...",
    submit: "Зарегистрироваться",
    step: "Шаг {{current}} из {{total}}",
    success: "Регистрация прошла успешно!",
    error: "Произошла ошибка при регистрации",
    roles: {
      user: {
        title: "Пользователь",
        description:
          "Зарегистрируйтесь как пользователь, чтобы найти идеального друга для вашей семьи",
      },
      breeder: {
        title: "Заводчик",
        description:
          "Создайте профиль заводчика для размещения ваших питомцев и связи с потенциальными владельцами",
      },
      specialist: {
        title: "Регистрация специалиста",
        description:
          "Зарегистрируйтесь как специалист по уходу за животными (ветеринар, продавец зоотоваров, грумер)",
        form: {
          username: "Имя пользователя",
          email: "Электронная почта",
          password: "Пароль",
          companyName: "Название организации",
          specialization: {
            label: "Специализация",
            placeholder: "Выберите специализацию",
            veterinary: "Ветеринарные услуги",
            petshop: "Зоотовары",
            services: "Прочие услуги для животных",
          },
          country: {
            label: "Страна",
            placeholder: "Выберите страну",
          },
          city: {
            label: "Город",
            placeholder: "Введите город латиницей",
          },
          submit: "Завершить регистрацию",
          next: "Далее",
          back: "Назад",
        },
      },
    },
    user: {
      title: "Регистрация пользователя",
      username: "Имя пользователя",
      email: "Электронная почта",
      password: "Пароль",
      submit: "Зарегистрироваться",
    },
    breeder: {
      title: "Регистрация заводчика",
      steps: {
        basic: "Основная информация",
        kennel: "Информация о питомнике",
        experience: "Опыт и сертификаты",
      },
      form: {
        username: "Имя пользователя",
        email: "Электронная почта",
        password: "Пароль",
        companyName: "Название питомника",
        specialization: {
          label: "Специализация",
          placeholder: "Выберите специализацию",
          dog: "Собаки",
          cat: "Кошки",
        },
        country: {
          label: "Страна",
          placeholder: "Выберите страну",
        },
        city: {
          label: "Город",
          placeholder: "Введите город латиницей",
        },
        submit: "Завершить регистрацию",
        next: "Далее",
        back: "Назад",
      },
    },
    social: {
      or: "или войдите через",
      google: "Google",
      facebook: "Facebook",
      apple: "Apple",
    },
    license: {
      agree: "Я согласен с",
      text: "условиями использования",
    },
    errors: {
      required: "Обязательное поле",
      email: "Некорректный email",
      minLength: "Минимум {{count}} символов",
      maxLength: "Максимум {{count}} символов",
    },
  },

  // Футер
  footer: {
    mission: {
      title: "Наша Миссия",
      description:
        "Мы помогаем животным найти любящий дом и заботливых хозяев. Каждое животное заслуживает счастливой жизни.",
      readMore: "Узнать больше о нашей миссии",
    },
    quickLinks: {
      title: "Быстрые ссылки",
      animals: "Наши питомцы",
      howToAdopt: "Как усыновить",
      successStories: "Истории успеха",
      volunteer: "Стать волонтером",
    },
    contact: {
      title: "Контакты",
      shelter: "Приют",
      address: "ул. Примерная, 123, Kyiv",
      email: "info@adopt-e.ua",
      phone: "+380 (99) 123-45-67",
      phoneLabel: "Телефон",
      workingHours: "Время работы",
      hours: "Пн-Вс: 10:00 - 18:00",
    },
    rights: "Все права защищены",
  },

  // Секция питомников
  kennels: {
    title: "Найдите своего заводчика",
    rating: "Рейтинг",
    outOf: "из",
    viewMore: "Показать больше",
    viewMoreText: "Смотреть всех заводчиков",
    petTypes: {
      dogs: "Собаки",
      cats: "Кошки",
    },
    filters: {
      title: "Фильтры",
      button: "Фильтры",
      apply: "Применить",
      reset: "Сбросить",
      sort: {
        label: "Сортировать по",
        nameAsc: "Имени (А-Я)",
        nameDesc: "Имени (Я-А)",
        ratingDesc: "Рейтингу (высокий)",
        ratingAsc: "Рейтингу (низкий)",
      },
      country: {
        label: "Страна",
        all: "Все страны",
      },
      breed: {
        label: "Порода",
        all: "Все породы",
      },
      rating: {
        label: "Минимальный рейтинг",
        all: "Любой рейтинг",
      },
    },
    list: {
      // Собаки
      goldenParadise: {
        breed: "Золотистый ретривер",
        country: "США",
      },
      royalPaws: {
        breed: "Лабрадор",
        country: "Великобритания",
      },
      eliteGermanShepherds: {
        breed: "Немецкая овчарка",
        country: "Германия",
      },
      siberianStars: {
        breed: "Сибирский хаски",
        country: "Россия",
      },
      // Кошки
      persianPalace: {
        breed: "Персидская кошка",
      },
      britishCharm: {
        breed: "Британская короткошерстная",
      },
      maineCoonMagic: {
        breed: "Мейн-кун",
      },
      siameseSecrets: {
        breed: "Сиамская кошка",
      },
      // Общие переводы стран
      countries: {
        us: "США",
        gb: "Великобритания",
        de: "Германия",
        ru: "Россия",
        ir: "Иран",
        th: "Таиланд",
        ua: "Украина",
        fr: "Франция",
      },
    },
  },

  // Преимущества
  advantages: {
    searchTitle: "Удобный поиск питомцев",
    searchContent:
      "Используйте расширенные фильтры для поиска идеального питомца по породе, возрасту, размеру и местоположению.",
    breedersTitle: "Проверенные заводчики",
    breedersContent:
      "Все заводчики проходят тщательную проверку. Мы гарантируем безопасность и надежность каждой сделки.",
    supportTitle: "Поддержка 24/7",
    supportContent:
      "Наша служба поддержки доступна круглосуточно, чтобы помочь вам с любыми вопросами по выбору и приобретению питомца.",
    toolsTitle: "Удобные инструменты для заводчиков",
    toolsContent:
      "Заводчики получают доступ к профессиональным инструментам для управления объявлениями, общения с покупателями и ведения документации.",
  },

  // Баннеры
  banners: {
    special: "Специальное предложение",
    newPets: "Новые питомцы",
    monthlyDeals: "Акции месяца",
  },

  hero: {
    title: "Найдите своего идеального питомца",
    subtitle:
      "Мы поможем вам найти верного друга среди тысяч животных, ждущих своего нового дома",
    findBreeder: "Найти заводчика",
  },

  // Секция питомцев
  pets: {
    title: "Найди своего питомца",
    findYourPet: "Найди своего питомца",
    viewMore: "Показать больше",
    viewMoreText: "Посмотреть всех доступных питомцев",
    age: "{{age}} лет",
    price: "{{price}} ₽",
    rating: "Рейтинг",
    outOf: "из",
    viewBreeder: "Посмотреть заводчика",
    ageYearsAndMonths: "{{years}} г. {{months}} мес.",
    ageYears: "{{years}} г.",
    ageMonths: "{{months}} мес.",
  },

  products: {
    title: "Зоотовары и услуги",
    zootovary: "Зоотовары",
    services: "Услуги",
    veterinary: "Ветеринария",
    findProducts: "Найти зоотовары",
    findServices: "Найти услуги",
    findVeterinary: "Найти ветеринарные услуги",
    viewMore: "Показать больше",
    viewMoreText: "Посмотреть все зоотовары",
    viewDetails: "Подробнее",
    categories: {
      food: "Корм",
      toys: "Игрушки",
      equipment: "Оборудование",
      beds: "Лежанки",
      hygiene: "Гигиена",
      accessories: "Аксессуары",
    },
    price: "{{price}} ₽",
  },

  services: {
    findServices: "Найти услуги",
    findProducts: "Найти услуги для питомцев",
    viewMore: "Показать больше",
    viewMoreText: "Посмотреть все услуги",
    viewDetails: "Подробнее",
    categories: {
      grooming: "Груминг",
      training: "Дрессировка",
      boarding: "Передержка",
      walking: "Выгул",
      photoshoot: "Фотосессия",
      petaxi: "Зоотакси",
    },
    price: "{{price}} ₽",
  },

  veterinary: {
    findProducts: "Найти ветеринарные услуги",
    viewMore: "Показать больше",
    viewMoreText: "Переглянуть все ветеринарные услуги",
    viewDetails: "Детальніше",
    categories: {
      consultation: "Консультация",
      vaccination: "Вакцинация",
      diagnostics: "Диагностика",
      dental: "Стоматология",
      surgery: "Хирургия",
      tests: "Анализы",
    },
    price: "{{price}}₴",
  },

  // Метки
  badges: {
    top: "Хит продаж",
    new: "Новинка",
    discount: "Скидка {{percent}}%",
    topService: "Популярная услуга",
    newService: "Новая услуга",
    topDoctor: "Лучший специалист",
    newDoctor: "Новый врач",
    sale: "Распродажа",
  },

  notFound: {
    message: "Страница не найдена",
    returnHome: "Вернуться на главную",
  },

  // Типы животных
  cats: {
    findPets: "Найти кошку",
    viewMore: "Показать больше кошек",
    viewMoreText: "Посмотреть всех доступных кошек",
  },
  dogs: {
    findPets: "Найти собаку",
    viewMore: "Показать больше собак",
    viewMoreText: "Посмотреть всех доступных собак",
  },

  // Общие
  common: {
    dogs: "Собаки",
    cats: "Кошки",
  },

  specialist: {
    dashboard: {
      welcome: "Добро пожаловать, {{name}}!",
    },
  },
};

export default ruTranslation;
