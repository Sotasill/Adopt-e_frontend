const frTranslation = {
  // Général
  welcome: {
    title: "Bienvenue dans le monde des animaux de compagnie !",
    subtitle: "Trouvez votre animal parfait avec des éleveurs vérifiés",
  },
  login: "Connexion",
  register: "S'inscrire",
  logout: "Déconnexion",

  // Navigation
  home: "Accueil",
  animals: "Animaux",
  gallery: "Galerie",
  about: "À propos",
  ourMission: "Notre Mission",
  breeders: "Éleveurs",
  findBreeder: "Trouver un éleveur",
  findYourPet: "Trouver votre animal",
  breeds: {
    title: "Races d'animaux",
    dogs: "Chiens",
    cats: "Chats",
    searchPlaceholder: "Rechercher des races...",
  },

  // Formulaire animal
  addAnimal: "Ajouter un animal",
  name: "Nom",
  age: "Âge",
  breed: "Race",
  description: "Description",
  submit: "Envoyer",

  // Statuts
  success: "Succès",
  error: "Erreur",
  loading: "Chargement...",

  // Messages
  animalAdded: "Animal ajouté avec succès",
  animalUpdated: "Animal mis à jour avec succès",
  animalDeleted: "Animal supprimé avec succès",

  // Inscription
  registration: {
    loading: "Inscription en cours...",
    submit: "S'inscrire",
    step: "Étape {{current}} sur {{total}}",
    success: "Inscription réussie !",
    error: "Une erreur s'est produite lors de l'inscription",
    roles: {
      user: {
        title: "Utilisateur",
        description:
          "Inscrivez-vous en tant qu'utilisateur pour trouver le compagnon idéal pour votre famille",
      },
      breeder: {
        title: "Éleveur",
        description:
          "Créez un profil d'éleveur pour présenter vos animaux et communiquer avec les propriétaires potentiels",
      },
      specialist: {
        title: "Inscription Spécialiste",
        description:
          "Inscrivez-vous en tant que spécialiste des soins pour animaux (vétérinaire, vendeur d'articles pour animaux, toiletteur)",
        form: {
          username: "Nom d'utilisateur",
          email: "E-mail",
          password: "Mot de passe",
          companyName: "Nom de l'entreprise",
          specialization: {
            label: "Spécialisation",
            placeholder: "Sélectionnez une spécialisation",
            veterinary: "Services vétérinaires",
            petshop: "Articles pour animaux",
            services: "Autres services animaliers",
          },
          country: {
            label: "Pays",
            placeholder: "Sélectionnez un pays",
          },
          city: {
            label: "Ville",
            placeholder: "Entrez la ville en lettres latines",
          },
          submit: "Terminer l'inscription",
          next: "Suivant",
          back: "Retour",
        },
      },
    },
    user: {
      title: "Inscription utilisateur",
      username: "Nom d'utilisateur",
      email: "E-mail",
      password: "Mot de passe",
      submit: "S'inscrire",
    },
    breeder: {
      title: "Inscription éleveur",
      steps: {
        basic: "Informations de base",
        kennel: "Informations sur l'élevage",
        experience: "Expérience et certificats",
      },
      form: {
        username: "Nom d'utilisateur",
        email: "E-mail",
        password: "Mot de passe",
        companyName: "Nom de l'élevage",
        specialization: {
          label: "Spécialisation",
          placeholder: "Sélectionnez une spécialisation",
          dog: "Chiens",
          cat: "Chats",
        },
        country: {
          label: "Pays",
          placeholder: "Sélectionnez un pays",
        },
        city: {
          label: "Ville",
          placeholder: "Entrez la ville en lettres latines",
        },
        description: "Description de l'élevage",
        experience: "Années d'expérience",
        certificates: {
          label: "Télécharger les certificats",
          hint: "Vous pouvez sélectionner plusieurs fichiers",
        },
        submit: "Terminer l'inscription",
        next: "Suivant",
        back: "Retour",
      },
    },
    social: {
      or: "ou connectez-vous avec",
      google: "Google",
      facebook: "Facebook",
      apple: "Apple",
    },
    license: {
      agree: "J'accepte les",
      text: "conditions d'utilisation",
    },
    errors: {
      required: "Ce champ est obligatoire",
      email: "Adresse e-mail invalide",
      minLength: "Minimum {{count}} caractères",
      maxLength: "Maximum {{count}} caractères",
    },
  },

  // Footer
  footer: {
    mission: {
      title: "Notre Mission",
      description:
        "Nous aidons les animaux à trouver des foyers aimants et des propriétaires attentionnés. Chaque animal mérite une vie heureuse.",
      readMore: "En savoir plus sur notre mission",
    },
    quickLinks: {
      title: "Liens Rapides",
      animals: "Nos Animaux",
      howToAdopt: "Comment Adopter",
      successStories: "Histoires de Réussite",
      volunteer: "Devenir Bénévole",
    },
    contact: {
      title: "Contact",
      shelter: "Refuge",
      address: "123 Rue Exemple, Paris",
      email: "info@adopt-e.fr",
      phone: "+33 1 23 45 67 89",
      phoneLabel: "Téléphone",
      workingHours: "Heures d'Ouverture",
      hours: "Lun-Dim: 10h00 - 18h00",
    },
    rights: "Tous droits réservés",
  },

  // Section éleveurs
  kennels: {
    title: "Trouvez Votre Éleveur",
    rating: "Note",
    outOf: "sur",
    viewMore: "Voir Plus",
    viewMoreText: "Voir Tous les Éleveurs",
    petTypes: {
      dogs: "Chiens",
      cats: "Chats",
    },
    filters: {
      title: "Filtres",
      button: "Filtres",
      apply: "Appliquer",
      reset: "Réinitialiser",
      sort: {
        label: "Trier par",
        nameAsc: "Nom (A-Z)",
        nameDesc: "Nom (Z-A)",
        ratingDesc: "Note (Élevée)",
        ratingAsc: "Note (Basse)",
      },
      country: {
        label: "Pays",
        all: "Tous les Pays",
      },
      breed: {
        label: "Race",
        all: "Toutes les Races",
      },
      rating: {
        label: "Note Minimale",
        all: "Toutes les Notes",
      },
    },
    list: {
      goldenParadise: {
        breed: "Golden Retriever",
        country: "États-Unis",
      },
      royalPaws: {
        breed: "Labrador",
        country: "Royaume-Uni",
      },
      eliteGermanShepherds: {
        breed: "Berger Allemand",
        country: "Allemagne",
      },
      siberianStars: {
        breed: "Husky Sibérien",
        country: "Russie",
      },
      // Chats
      persianPalace: {
        breed: "Chat Persan",
      },
      britishCharm: {
        breed: "British Shorthair",
      },
      maineCoonMagic: {
        breed: "Maine Coon",
      },
      siameseSecrets: {
        breed: "Chat Siamois",
      },
      countries: {
        us: "États-Unis",
        gb: "Royaume-Uni",
        de: "Allemagne",
        ru: "Russie",
        ir: "Iran",
        th: "Thaïlande",
        ua: "Ukraine",
        fr: "France",
      },
    },
  },

  // Avantages
  advantages: {
    searchTitle: "Recherche pratique d'animaux",
    searchContent:
      "Utilisez des filtres avancés pour trouver l'animal parfait par race, âge, taille et localisation.",
    breedersTitle: "Éleveurs vérifiés",
    breedersContent:
      "Tous les éleveurs passent une vérification approfondie. Nous garantissons la sécurité et la fiabilité de chaque transaction.",
    supportTitle: "Support 24/7",
    supportContent:
      "Notre équipe de support est disponible 24h/24 pour vous aider avec toutes vos questions sur le choix et l'acquisition d'un animal.",
    toolsTitle: "Outils pratiques pour les éleveurs",
    toolsContent:
      "Les éleveurs ont accès à des outils professionnels pour gérer les annonces, communiquer avec les acheteurs et maintenir la documentation.",
  },

  // Bannières
  banners: {
    special: "Offre spéciale",
    newPets: "Nouveaux animaux",
    monthlyDeals: "Offres du mois",
  },

  hero: {
    title: "Trouvez Votre Animal Parfait",
    subtitle:
      "Nous vous aiderons à trouver un ami fidèle parmi des milliers d'animaux qui attendent leur nouveau foyer",
    findBreeder: "Trouver un Éleveur",
  },

  // Section animaux
  pets: {
    title: "Trouvez Votre Animal",
    findYourPet: "Trouvez votre animal",
    viewMore: "Voir plus",
    viewMoreText: "Voir tous les animaux disponibles",
    age: "{{age}} ans",
    price: "{{price}}€",
    rating: "Note",
    outOf: "sur",
    viewBreeder: "Voir l'éleveur",
    ageYearsAndMonths: "{{years}}a {{months}}m",
    ageYears: "{{years}}a",
    ageMonths: "{{months}}m",
  },

  products: {
    title: "Produits et Services pour Animaux",
    zootovary: "Produits pour Animaux",
    services: "Services",
    veterinary: "Vétérinaire",
    findProducts: "Trouver des Produits",
    findServices: "Trouver des Services",
    findVeterinary: "Trouver un Vétérinaire",
    viewMore: "Voir Plus",
    viewMoreText: "Voir Tous les Produits",
    viewDetails: "Voir les Détails",
    categories: {
      food: "Nourriture",
      toys: "Jouets",
      equipment: "Équipement",
      beds: "Lits",
      hygiene: "Hygiène",
      accessories: "Accessoires",
      grooming: "Toilettage",
      training: "Dressage",
      boarding: "Pension",
      walking: "Promenade",
      photoshoot: "Séance Photo",
      petaxi: "Taxi Animalier",
      consultation: "Consultation",
      vaccination: "Vaccination",
      diagnostics: "Diagnostic",
      dental: "Soins Dentaires",
      surgery: "Chirurgie",
      tests: "Analyses",
    },
    price: "{{price}} €",
    badges: {
      top: "Meilleure Vente",
      new: "Nouveau",
      sale: "Soldes",
      popular: "Populaire",
    },
  },

  services: {
    findServices: "Trouver des services",
    findProducts: "Trouver des services pour animaux",
    viewMore: "Voir plus",
    viewMoreText: "Voir tous les services",
    viewDetails: "Voir les détails",
    categories: {
      grooming: "Toilettage",
      training: "Dressage",
      boarding: "Pension",
      walking: "Promenade",
      photoshoot: "Séance photo",
      petaxi: "Taxi animalier",
    },
    price: "{{price}}€",
  },

  veterinary: {
    findProducts: "Trouver des services vétérinaires",
    viewMore: "Voir plus",
    viewMoreText: "Voir tous les services vétérinaires",
    viewDetails: "Voir les détails",
    categories: {
      consultation: "Consultation",
      vaccination: "Vaccination",
      diagnostics: "Diagnostic",
      dental: "Soins dentaires",
      surgery: "Chirurgie",
      tests: "Analyses",
    },
    price: "{{price}}€",
  },

  // Badges (Étiquettes)
  badges: {
    top: "Meilleures ventes",
    new: "Nouveau",
    discount: "-{{percent}}%",
    topService: "Service populaire",
    newService: "Nouveau service",
    topDoctor: "Meilleur spécialiste",
    newDoctor: "Nouveau médecin",
    sale: "Soldes",
  },

  notFound: {
    message: "Page Non Trouvée",
    returnHome: "Retour à l'Accueil",
  },

  // Commun
  common: {
    dogs: "Chiens",
    cats: "Chats",
  },

  // Page des éleveurs
  breeders: {
    title: "Trouvez Votre Éleveur",
    filters: {
      title: "Filtres",
      button: "Filtres",
      apply: "Appliquer",
      reset: "Réinitialiser",
      sortBy: "Trier par",
      nameAsc: "Nom (A-Z)",
      nameDesc: "Nom (Z-A)",
      ratingDesc: "Note (élevée)",
      ratingAsc: "Note (basse)",
      countries: "Pays",
      breeds: "Race",
      minRating: "Note minimale",
      any: "Toute note",
    },
    viewModes: {
      grid: "Grille",
      list: "Liste",
    },
  },

  specialist: {
    dashboard: {
      welcome: "Bienvenue, {{name}}!",
    },
  },
};

export default frTranslation;
