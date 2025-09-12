// Contact form data with 4-language support

export const contactFormContent = {
  en: {
    formTitle: 'Send Message',
    fields: {
      name: {
        label: 'Your Name',
        placeholder: 'Enter your full name',
        required: true
      },
      email: {
        label: 'Email Address',
        placeholder: 'your.email@example.com',
        required: true
      },
      phone: {
        label: 'Phone Number',
        placeholder: '+XX XXX XX XX',
        required: false
      },
      message: {
        label: 'Your Message',
        placeholder: 'Please describe your granite project requirements...',
        required: true
      }
    },
    submitButton: 'Send Message',
    successMessage: {
      title: 'Thank you for your inquiry!',
      description: 'Your message has been sent successfully. Our team will contact you soon with detailed information about your granite project.'
    },
    validation: {
      nameRequired: 'Please enter your name',
      nameInvalid: 'Name must be 2-50 characters and contain only letters',
      emailRequired: 'Please enter your email address',
      emailInvalid: 'Please enter a valid email address',
      messageRequired: 'Please enter your message',
      phoneInvalid: 'Please enter a valid phone number'
    }
  },
  ua: {
    formTitle: 'Напишіть нам',
    fields: {
      name: {
        label: 'Ваше ім\'я',
        placeholder: 'Введіть ваше повне ім\'я',
        required: true
      },
      email: {
        label: 'Email адреса',
        placeholder: 'your.email@example.com',
        required: true
      },
      phone: {
        label: 'Номер телефону',
        placeholder: '+XX XXX XX XX',
        required: false
      },
      message: {
        label: 'Ваше повідомлення',
        placeholder: 'Опишіть будь ласка ваші вимоги до гранітного проекту...',
        required: true
      }
    },
    submitButton: 'Відправити',
    successMessage: {
      title: 'Дякуємо за ваше звернення!',
      description: 'Ваше повідомлення успішно відправлено. Наша команда незабаром зв\'яжеться з вами з детальною інформацією щодо вашого гранітного проекту.'
    },
    validation: {
      nameRequired: 'Будь ласка, введіть ваше ім\'я',
      nameInvalid: 'Ім\'я має містити 2-50 символів і тільки літери',
      emailRequired: 'Будь ласка, введіть email адресу',
      emailInvalid: 'Будь ласка, введіть дійсну email адресу',
      messageRequired: 'Будь ласка, введіть ваше повідомлення',
      phoneInvalid: 'Будь ласка, введіть дійсний номер телефону'
    }
  },
  de: {
    formTitle: 'Nachricht senden',
    fields: {
      name: {
        label: 'Ihr Name',
        placeholder: 'Geben Sie Ihren vollständigen Namen ein',
        required: true
      },
      email: {
        label: 'E-Mail-Adresse',
        placeholder: 'ihre.email@beispiel.com',
        required: true
      },
      phone: {
        label: 'Telefonnummer',
        placeholder: '+XXX XXX XXXX',
        required: false
      },
      message: {
        label: 'Ihre Nachricht',
        placeholder: 'Bitte beschreiben Sie Ihre Granit-Projektanforderungen...',
        required: true
      }
    },
    submitButton: 'Nachricht senden',
    successMessage: {
      title: 'Vielen Dank für Ihre Anfrage!',
      description: 'Ihre Nachricht wurde erfolgreich gesendet. Unser Team wird sich bald mit detaillierten Informationen zu Ihrem Granit-Projekt bei Ihnen melden.'
    },
    validation: {
      nameRequired: 'Bitte geben Sie Ihren Namen ein',
      nameInvalid: 'Name muss 2-50 Zeichen lang sein und nur Buchstaben enthalten',
      emailRequired: 'Bitte geben Sie Ihre E-Mail-Adresse ein',
      emailInvalid: 'Bitte geben Sie eine gültige E-Mail-Adresse ein',
      messageRequired: 'Bitte geben Sie Ihre Nachricht ein',
      phoneInvalid: 'Bitte geben Sie eine gültige Telefonnummer ein'
    }
  },
  pl: {
    formTitle: 'Wyślij wiadomość',
    fields: {
      name: {
        label: 'Twoje imię',
        placeholder: 'Wprowadź swoje pełne imię',
        required: true
      },
      email: {
        label: 'Adres e-mail',
        placeholder: 'twoj.email@example.com',
        required: true
      },
      phone: {
        label: 'Numer telefonu',
        placeholder: '+XXX XXX XXX',
        required: false
      },
      message: {
        label: 'Twoja wiadomość',
        placeholder: 'Proszę opisać swoje wymagania dotyczące projektu granitowego...',
        required: true
      }
    },
    submitButton: 'Wyślij wiadomość',
    successMessage: {
      title: 'Dziękujemy za zapytanie!',
      description: 'Twoja wiadomość została pomyślnie wysłana. Nasz zespół skontaktuje się z Tobą wkrótce ze szczegółowymi informacjami o Twoim projekcie granitowym.'
    },
    validation: {
      nameRequired: 'Proszę podać swoje imię',
      nameInvalid: 'Imię musi mieć 2-50 znaków i zawierać tylko litery',
      emailRequired: 'Proszę podać adres e-mail',
      emailInvalid: 'Proszę podać prawidłowy adres e-mail',
      messageRequired: 'Proszę wpisać swoją wiadomość',
      phoneInvalid: 'Proszę podać prawidłowy numer telefonu'
    }
  }
}

export const contactInfoContent = {
  en: {
    title: 'Contact Information',
    workingHours: 'Working Hours',
    workingTime: 'Monday - Friday: 8:00 - 18:00',
    socialMedia: 'Follow Us'
  },
  ua: {
    title: 'Контактна інформація',
    workingHours: 'Робочі години',
    workingTime: 'Понеділок - П\'ятниця: 8:00 - 18:00',
    socialMedia: 'Слідкуйте за нами'
  },
  de: {
    title: 'Kontaktinformationen',
    workingHours: 'Arbeitszeiten',
    workingTime: 'Montag - Freitag: 8:00 - 18:00',
    socialMedia: 'Folgen Sie uns'
  },
  pl: {
    title: 'Informacje kontaktowe',
    workingHours: 'Godziny pracy',
    workingTime: 'Poniedziałek - Piątek: 8:00 - 18:00',
    socialMedia: 'Śledź nas'
  }
}