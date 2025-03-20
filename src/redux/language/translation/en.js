const enTranslation = {
  // General
  welcome: {
    title: "Welcome to the world of pets!",
    subtitle: "Find your perfect pet with verified breeders",
  },
  login: "Login",
  register: "Register",
  logout: "Logout",

  // Navigation
  home: "Home",
  animals: "Animals",
  gallery: "Gallery",
  about: "About",
  ourMission: "Our Mission",
  breeders: "Breeders",
  findBreeder: "Find a Breeder",
  findYourPet: "Find Your Pet",
  breeds: {
    title: "Pet Breeds",
    dogs: "Dogs",
    cats: "Cats",
    searchPlaceholder: "Search breeds...",
  },

  // Animal Form
  addAnimal: "Add Animal",
  name: "Name",
  age: "Age",
  breed: "Breed",
  description: "Description",
  submit: "Submit",

  // Statuses
  success: "Success",
  error: "Error",
  loading: "Loading...",

  // Messages
  animalAdded: "Animal successfully added",
  animalUpdated: "Animal successfully updated",
  animalDeleted: "Animal successfully deleted",

  // Registration
  registration: {
    loading: "Registration...",
    submit: "Register",
    step: "Step {{current}} of {{total}}",
    success: "Registration successful!",
    error: "Registration error occurred",
    roles: {
      user: {
        title: "User",
        description:
          "Register as a user to find the perfect pet for your family",
      },
      breeder: {
        title: "Breeder",
        description:
          "Create a breeder profile to list your pets and connect with potential owners",
      },
      specialist: {
        title: "Specialist Registration",
        description:
          "Register as a pet care specialist (veterinarian, pet store owner, groomer)",
      },
    },
    user: {
      title: "User Registration",
      username: "Username",
      email: "Email",
      password: "Password",
      submit: "Register",
    },
    breeder: {
      title: "Breeder Registration",
      steps: {
        basic: "Basic Information",
        kennel: "Kennel Information",
        experience: "Experience & Certificates",
      },
      form: {
        username: "Username",
        email: "Email",
        password: "Password",
        companyName: "Kennel Name",
        specialization: {
          label: "Specialization",
          placeholder: "Select specialization",
          dog: "Dogs",
          cat: "Cats",
        },
        country: {
          label: "Country",
          placeholder: "Select country",
        },
        city: {
          label: "City",
          placeholder: "Enter city in Latin letters",
        },
        submit: "Complete Registration",
        next: "Next",
        back: "Back",
      },
    },
    social: {
      or: "or sign in with",
      google: "Google",
      facebook: "Facebook",
      apple: "Apple",
    },
    license: {
      agree: "I agree to the",
      text: "terms of service",
    },
    errors: {
      required: "Required field",
      email: "Invalid email",
      minLength: "Minimum {{count}} characters",
      maxLength: "Maximum {{count}} characters",
      acceptTerms: "You must accept the terms of use",
      countryFirstLetter: "Country name must start with a capital letter",
      cityFirstLetter: "City name must start with a capital letter",
      username:
        "Username must start with a capital letter and contain 3 to 30 characters (letters, numbers, _ or -)",
      usernameRepeating:
        "Username must not contain repeating characters or letters (e.g., AAA, A A A)",
      password:
        "Password must be at least 8 characters long and include at least one letter and one number",
      companyName: "Company name must start with a capital letter",
      companyNameFormat: "Only Latin letters and symbols are allowed: - _ ; *",
      specialization: {
        breeder: "Select specialization: dog or cat",
        specialist: "Select specialization: veterinary, petshop, or service",
      },
    },
  },

  // Footer
  footer: {
    mission: {
      title: "Our Mission",
      description:
        "We help animals find loving homes and caring owners. Every animal deserves a happy life.",
      readMore: "Read More About Our Mission",
    },
    quickLinks: {
      title: "Quick Links",
      animals: "Our Pets",
      howToAdopt: "How to Adopt",
      successStories: "Success Stories",
      volunteer: "Become a Volunteer",
    },
    contact: {
      title: "Contact",
      shelter: "Shelter",
      address: "123 Example St., London",
      email: "info@adopt-e.uk",
      phone: "+44 (20) 1234-5678",
      phoneLabel: "Phone",
      workingHours: "Working Hours",
      hours: "Mon-Sun: 10:00 AM - 6:00 PM",
    },
    rights: "All rights reserved",
  },

  // Kennels section
  kennels: {
    title: "Find Your Breeder",
    rating: "Rating",
    outOf: "out of",
    viewMore: "View More",
    viewMoreText: "View All Breeders",
    petTypes: {
      dogs: "Dogs",
      cats: "Cats",
    },
    filters: {
      title: "Filters",
      button: "Filters",
      apply: "Apply Filters",
      reset: "Reset Filters",
      sort: {
        label: "Sort by",
        nameAsc: "Name (A-Z)",
        nameDesc: "Name (Z-A)",
        ratingDesc: "Rating (High to Low)",
        ratingAsc: "Rating (Low to High)",
      },
      country: {
        label: "Country",
        all: "All Countries",
      },
      breed: {
        label: "Breed",
        all: "All Breeds",
      },
      rating: {
        label: "Minimum Rating",
        all: "Any Rating",
      },
    },
    list: {
      goldenParadise: {
        name: "Golden Paradise",
        breed: "Golden Retriever",
      },
      royalPaws: {
        name: "Royal Paws",
        breed: "British Shorthair",
      },
      eliteGermanShepherds: {
        name: "Elite German Shepherds",
        breed: "German Shepherd",
      },
      siberianStars: {
        name: "Siberian Stars",
        breed: "Siberian Husky",
      },
      // Cats
      persianPalace: {
        breed: "Persian Cat",
      },
      britishCharm: {
        breed: "British Shorthair",
      },
      maineCoonMagic: {
        breed: "Maine Coon",
      },
      siameseSecrets: {
        breed: "Siamese Cat",
      },
      countries: {
        us: "United States",
        gb: "United Kingdom",
        de: "Germany",
        ru: "Russia",
        ir: "Iran",
        th: "Thailand",
        ua: "Ukraine",
        fr: "France",
      },
    },
  },

  // Advantages
  advantages: {
    searchTitle: "Convenient Pet Search",
    searchContent:
      "Use advanced filters to find the perfect pet by breed, age, size, and location.",
    breedersTitle: "Verified Breeders",
    breedersContent:
      "All breeders undergo thorough verification. We guarantee the safety and reliability of every transaction.",
    supportTitle: "24/7 Support",
    supportContent:
      "Our support team is available around the clock to help you with any questions about choosing and acquiring a pet.",
    toolsTitle: "Convenient Tools for Breeders",
    toolsContent:
      "Breeders get access to professional tools for managing listings, communicating with buyers, and maintaining documentation.",
  },

  // Banners
  banners: {
    special: "Special Offer",
    newPets: "New Pets",
    monthlyDeals: "Monthly Deals",
  },

  hero: {
    title: "Find Your Perfect Pet",
    subtitle:
      "We'll help you find a loyal friend among thousands of animals waiting for their new home",
    findBreeder: "Find a Breeder",
  },

  // Pets section
  pets: {
    title: "Find Your Pet",
    findYourPet: "Find Your Pet",
    viewMore: "Show More",
    viewMoreText: "View All Available Pets",
    age: "{{age}} years",
    price: "${{price}}",
    rating: "Rating",
    outOf: "out of",
    viewBreeder: "View Breeder",
    ageYearsAndMonths: "{{years}}y {{months}}m",
    ageYears: "{{years}}y",
    ageMonths: "{{months}}m",
  },

  products: {
    zootovary: "Pet Supplies",
    services: "Pet Services",
    veterinary: "Veterinary Services",
    title: "Products and Services",
    findProducts: "Find Pet Products",
    findServices: "Find Services",
    findVeterinary: "Find Veterinary Services",
    viewMore: "Show More",
    viewMoreText: "View All Products",
    viewDetails: "View Details",
    categories: {
      food: "Pet Food",
      toys: "Toys",
      equipment: "Equipment",
      beds: "Beds",
      hygiene: "Hygiene",
      accessories: "Accessories",
      grooming: "Grooming",
      training: "Training",
      boarding: "Boarding",
      walking: "Dog Walking",
      photoshoot: "Pet Photography",
      petaxi: "Pet Taxi",
      consultation: "Consultation",
      vaccination: "Vaccination",
      diagnostics: "Diagnostics",
      dental: "Dental Care",
      surgery: "Surgery",
      tests: "Tests",
    },
    price: "{{price}} $",
    badges: {
      top: "Best Seller",
      new: "New",
      sale: "Sale",
      popular: "Popular",
    },
  },

  services: {
    findServices: "Find Services",
    findProducts: "Find Pet Services",
    viewMore: "Show More",
    viewMoreText: "View All Services",
    viewDetails: "View Details",
    categories: {
      grooming: "Grooming",
      training: "Training",
      boarding: "Boarding",
      walking: "Walking",
      photoshoot: "Photo Session",
      petaxi: "Pet Taxi",
    },
    price: "${{price}}",
  },

  veterinary: {
    findProducts: "Find Veterinary Services",
    viewMore: "Show More",
    viewMoreText: "View All Veterinary Services",
    viewDetails: "View Details",
    categories: {
      consultation: "Consultation",
      vaccination: "Vaccination",
      diagnostics: "Diagnostics",
      dental: "Dental Care",
      surgery: "Surgery",
      tests: "Tests",
    },
    price: "${{price}}",
  },

  // Badges
  badges: {
    top: "Best Seller",
    new: "New",
    discount: "{{percent}}% Off",
    topService: "Popular Service",
    newService: "New Service",
    topDoctor: "Top Specialist",
    newDoctor: "New Doctor",
    sale: "Sale",
  },

  notFound: {
    message: "Page Not Found",
    returnHome: "Return to Home",
  },

  // Common
  common: {
    dogs: "Dogs",
    cats: "Cats",
    back: "Back",
    addToFavorites: "Add to favorites",
    removeFromFavorites: "Remove from favorites",
    navigation: {
      about: "About Us",
      findBreeder: "Find a Breeder",
      findYourPet: "Find Your Pet",
      login: "Login",
      register: "Register",
      zootovary: "Pet Supplies",
      services: "Services",
      veterinary: "Veterinary",
      savedAds: "Saved Listings",
      profileSettings: "Profile Settings",
      logout: "Logout",
    },
  },

  // Breeders page
  breeders: {
    title: "Find Your Breeder",
    filters: {
      title: "Filters",
      button: "Filters",
      apply: "Apply",
      reset: "Reset",
      sortBy: "Sort by",
      nameAsc: "Name (A-Z)",
      nameDesc: "Name (Z-A)",
      ratingDesc: "Rating (high)",
      ratingAsc: "Rating (low)",
      priceAsc: "Price (low to high)",
      priceDesc: "Price (high to low)",
      countries: "Country",
      breeds: "Breed",
      minRating: "Minimum Rating",
      any: "Any rating",
    },
    viewModes: {
      grid: "Grid",
      list: "List",
    },
  },

  specialist: {
    dashboard: {
      welcome: "Welcome, {{name}}!",
    },
  },

  auth: {
    favoriteFeature: "Favorites Feature",
    registerToUse:
      "This feature is only available to registered users, please sign in or register",
    benefitsDescription:
      "Registration gives you access to additional features:",
    benefits: {
      favorites: "Save favorite pets and products",
      personalAccount: "Personal account with viewing history",
    },
    register: "Register",
    login: "Sign in",
    errors: {
      serverUnavailable:
        "❌ Server is temporarily unavailable. Please try again later.",
      emailInUse: "❌ This email is already in use by another user",
      usernameInUse: "❌ This username is already taken",
      userExists: "❌ User with these credentials already exists",
      emailCheckError: "❌ Error checking email. Please use a different email",
      usernameCheckError:
        "❌ Error checking username. Please use a different username",
      registrationError:
        "❌ Registration error occurred. Please try again later",
      breederRegistrationError: "❌ Error occurred during breeder registration",
      specialistRegistrationError:
        "❌ Error occurred during specialist registration",
      invalidServerResponse: "❌ Invalid server response",
    },
  },

  // Login Modal
  loginModal: {
    title: "Welcome Back!",
    userTypes: {
      individual: {
        title: "User",
        description: "Find and adopt your perfect pet",
      },
      breeder: {
        title: "Breeder/Specialist",
        description: "Manage your kennel and listings",
      },
      specialist: {
        title: "Pet Specialist",
        description: "Access your specialist dashboard",
      },
    },
    form: {
      email: "Email",
      password: "Password",
      forgotPassword: "Forgot Password?",
      loginButton: "Sign In",
      orContinueWith: "or continue with",
      sellerNote:
        "Are you a breeder or specialist? Contact our support team for assistance",
      supportLink: "Contact Support",
    },
    social: {
      google: "Continue with Google",
      facebook: "Continue with Facebook",
      apple: "Continue with Apple",
    },
  },

  // Password Recovery
  forgotPassword: {
    title: "Password Recovery",
    description:
      "Enter your registered email address and we'll send you password reset instructions.",
    submitButton: "Send Instructions",
    success: {
      title: "Check Your Email",
      message:
        "We've sent password reset instructions to your email address. If you don't see it, please check your spam folder.",
      backToLogin: "Back to Login",
    },
    error: "An error occurred while sending. Please try again later.",
    emailPlaceholder: "Enter your email",
  },
};

export default enTranslation;
