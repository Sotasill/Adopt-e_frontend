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
      acceptTerms: "Необходимо принять условия использования",
      countryFirstLetter: "Название страны должно начинаться с заглавной буквы",
      cityFirstLetter: "Название города должно начинаться с заглавной буквы",
      username:
        "Имя пользователя должно начинаться с заглавной буквы и содержать от 3 до 30 символов (буквы, цифры, _ или -)",
      password:
        "Пароль должен содержать минимум 8 символов, включая хотя бы одну букву и одну цифру",
      companyName: "Название компании должно начинаться с заглавной буквы",
      specialization: {
        breeder: "Выберите специализацию: dog или cat",
        specialist: "Выберите специализацию: veterinary, petshop или service",
      },
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
    zootovary: "Зоотовары",
    services: "Услуги для животных",
    veterinary: "Ветеринарные услуги",
    title: "Товары и услуги",
    categories: {
      food: "Корма",
      toys: "Игрушки",
      equipment: "Оборудование",
      hygiene: "Гигиена",
      accessories: "Аксессуары",
      grooming: "Груминг",
      training: "Дрессировка",
      boarding: "Передержка",
      walking: "Выгул",
      photoshoot: "Фотосессия",
      petaxi: "Зоотакси",
      consultation: "Консультация",
      vaccination: "Вакцинация",
      diagnostics: "Диагностика",
      dental: "Стоматология",
      surgery: "Хирургия",
      tests: "Анализы",
    },
    findProducts: "Найти зоотовары",
    findServices: "Найти услуги",
    findVeterinary: "Найти ветеринарные услуги",
    viewMore: "Показать больше",
    viewMoreText: "Посмотреть все зоотовары",
    viewDetails: "Подробнее",
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
    back: "Назад",
    addToFavorites: "Добавить в избранное",
    removeFromFavorites: "Удалить из избранного",
    navigation: {
      about: "О нас",
      findBreeder: "Найти заводчика",
      findYourPet: "Найти питомца",
      login: "Войти",
      register: "Регистрация",
      zootovary: "Зоотовары",
      services: "Услуги для животных",
      veterinary: "Ветеринарные услуги",
    },
    breeds: {
      title: "Породы",
    },
  },

  specialist: {
    dashboard: {
      welcome: "Добро пожаловать, {{name}}!",
    },
  },

  // Login Modal
  loginModal: {
    title: "С возвращением!",
    userTypes: {
      individual: {
        title: "Пользователь",
        description: "Найдите и возьмите своего идеального питомца",
      },
      breeder: {
        title: "Заводчик/Специалист",
        description: "Управляйте своим питомником и объявлениями",
      },
      specialist: {
        title: "Специалист",
        description: "Доступ к панели специалиста",
      },
    },
    form: {
      email: "Электронная почта",
      password: "Пароль",
      forgotPassword: "Забыли пароль?",
      loginButton: "Войти",
      orContinueWith: "или продолжить через",
      sellerNote:
        "Вы заводчик или специалист? Свяжитесь с нашей службой поддержки",
      supportLink: "Связаться с поддержкой",
    },
    social: {
      google: "Продолжить через Google",
      facebook: "Продолжить через Facebook",
      apple: "Продолжить через Apple",
    },
  },

  auth: {
    favoriteFeature: "Функция избранного",
    registerToUse:
      "Эта функция доступна только зарегистрированным пользователям, войдите или зарегистрируйтесь на сайте",
    benefitsDescription:
      "Регистрация на сайте дает вам доступ к дополнительным возможностям:",
    benefits: {
      favorites: "Сохранение избранных товаров и питомцев",
      personalAccount: "Личный кабинет с историей просмотров",
    },
    register: "Зарегистрироваться",
    login: "Войти",
    errors: {
      serverUnavailable:
        "❌ Сервер временно недоступен. Пожалуйста, попробуйте позже.",
      emailInUse: "❌ Этот email уже используется другим пользователем",
      usernameInUse: "❌ Это имя пользователя уже занято",
      userExists: "❌ Пользователь с такими данными уже существует",
      emailCheckError:
        "❌ Ошибка при проверке email. Пожалуйста, используйте другой email",
      usernameCheckError:
        "❌ Ошибка при проверке имени пользователя. Пожалуйста, используйте другое имя",
      registrationError:
        "❌ Произошла ошибка при регистрации. Пожалуйста, попробуйте позже",
      breederRegistrationError: "❌ Произошла ошибка при регистрации заводчика",
      specialistRegistrationError:
        "❌ Произошла ошибка при регистрации специалиста",
      invalidServerResponse: "❌ Некорректный ответ от сервера",
    },
  },

  // Восстановление пароля
  forgotPassword: {
    title: "Восстановление пароля",
    description:
      "Введите email, указанный при регистрации, и мы отправим вам инструкции по восстановлению пароля.",
    submitButton: "Отправить инструкции",
    success: {
      title: "Проверьте вашу почту",
      message:
        'Мы отправили инструкции по восстановлению пароля на указанный email. Если вы не получили письмо, проверьте папку "Спам".',
      backToLogin: "Вернуться к входу",
    },
    error: "Произошла ошибка при отправке. Пожалуйста, попробуйте позже.",
    emailPlaceholder: "Введите ваш email",
  },
};

export default ruTranslation;
