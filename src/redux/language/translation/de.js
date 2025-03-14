const deTranslation = {
  auth: {
    favoriteFeature: "Favoritenfunktion",
    registerToUse:
      "Diese Funktion ist nur für registrierte Benutzer verfügbar. Bitte melden Sie sich an oder registrieren Sie sich",
    benefitsDescription:
      "Die Registrierung gibt Ihnen Zugang zu zusätzlichen Funktionen:",
    benefits: {
      favorites: "Speichern Sie Ihre Lieblingsprodukte und Haustiere",
      personalAccount: "Persönliches Konto mit Verlauf",
    },
    register: "Registrieren",
    login: "Anmelden",
    errors: {
      serverUnavailable:
        "❌ Server vorübergehend nicht verfügbar. Bitte versuchen Sie es später erneut.",
      emailInUse:
        "❌ Diese E-Mail wird bereits von einem anderen Benutzer verwendet",
      usernameInUse: "❌ Dieser Benutzername ist bereits vergeben",
      userExists: "❌ Ein Benutzer mit diesen Anmeldedaten existiert bereits",
      emailCheckError:
        "❌ Fehler bei der E-Mail-Überprüfung. Bitte verwenden Sie eine andere E-Mail",
      usernameCheckError:
        "❌ Fehler bei der Überprüfung des Benutzernamens. Bitte verwenden Sie einen anderen Namen",
      registrationError:
        "❌ Bei der Registrierung ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut",
      breederRegistrationError: "❌ Fehler bei der Registrierung als Züchter",
      specialistRegistrationError:
        "❌ Fehler bei der Registrierung als Spezialist",
      invalidServerResponse: "❌ Ungültige Serverantwort",
    },
  },
  registration: {
    errors: {
      required: "Dieses Feld ist erforderlich",
      email: "Ungültige E-Mail-Adresse",
      minLength: "Mindestens {{count}} Zeichen",
      maxLength: "Maximal {{count}} Zeichen",
      acceptTerms: "Sie müssen die Nutzungsbedingungen akzeptieren",
      countryFirstLetter:
        "Der Ländername muss mit einem Großbuchstaben beginnen",
      cityFirstLetter: "Der Stadtname muss mit einem Großbuchstaben beginnen",
      username:
        "Der Benutzername muss mit einem Großbuchstaben beginnen und zwischen 3 und 30 Zeichen enthalten (Buchstaben, Zahlen, _ oder -)",
      password:
        "Das Passwort muss mindestens 8 Zeichen lang sein und mindestens einen Buchstaben und eine Zahl enthalten",
      companyName: "Der Firmenname muss mit einem Großbuchstaben beginnen",
      companyNameFormat: "Nur lateinische Buchstaben und Symbole sind erlaubt: - _ ; *",
      specialization: {
        breeder: "Wählen Sie eine Spezialisierung: dog oder cat",
        specialist:
          "Wählen Sie eine Spezialisierung: veterinary, petshop oder service",
      },
    },
  },
};

export default deTranslation;
