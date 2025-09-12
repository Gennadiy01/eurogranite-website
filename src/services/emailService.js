import emailjs from '@emailjs/browser'

// EmailJS configuration
const EMAILJS_SERVICE_ID = 'service_eurogranite'
const EMAILJS_TEMPLATE_ID = 'template_contact_form'
const EMAILJS_PUBLIC_KEY = '-W7YDuoUrPUWUPdjR'

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY)

// Language-specific email templates
const getEmailTemplates = (language) => {
  const templates = {
    en: {
      subject: 'Запит з форми сайту EuroGranite',
      autoReplySubject: 'Thank you for contacting EuroGranite',
      autoReplyMessage: `Dear {{name}},

Thank you for your inquiry! You have contacted EuroGranite - specialists in granite products.

Our company specializes in the production of granite paving stones of various sizes and colors, manufactured to individual order according to your needs.

We are ready to discuss with you:
• Technical requirements and specifications  
• Packaging and logistics options
• Pricing and payment conditions
• Production timeframes

Our team will contact you shortly to discuss your project in detail.

Your contact person:
Yulia - Sales Manager
Phone: +380 96 004 47 44
Email: 7777sov@gmail.com
Available messengers: Viber, WhatsApp, Telegram

Best regards,
EuroGranite Team

© 2025 EuroGranite | European Granite Products`
    },
    ua: {
      subject: 'Запит з форми сайту EuroGranite',
      autoReplySubject: 'Дякуємо за звернення до EuroGranite',
      autoReplyMessage: `Доброго дня!

Шановний(-а) {{name}},

Дякуємо за ваше звернення! Ви зв'язалися з EuroGranite - спеціалістами у сфері гранітної продукції.

Наша компанія займається виробництвом гранітної бруківки різних розмірів та кольорів, виготовленої за індивідуальним замовленням відповідно до ваших потреб.

Ми готові обговорити з вами:
• Технічні вимоги та специфікації
• Варіанти упаковки та логістики
• Ціноутворення та умови оплати
• Терміни виготовлення

Наша команда зв'яжеться з вами найближчим часом для детального обговорення вашого проекту.

Ваш менеджер:
Юлія - Менеджер з продажу
Телефон: +380 96 004 47 44
Email: 7777sov@gmail.com
Доступні месенджери: Viber, WhatsApp, Telegram

З повагою,
Команда EuroGranite

© 2025 EuroGranite | Преміальні гранітні вироби`
    },
    de: {
      subject: 'Запит з форми сайту EuroGranite',
      autoReplySubject: 'Vielen Dank für Ihre Kontaktaufnahme mit EuroGranite',
      autoReplyMessage: `Liebe(r) {{name}},

Vielen Dank für Ihre Anfrage! Sie haben sich an EuroGranite gewandt - Ihren Spezialisten für Granit-Produkte.

Unser Unternehmen spezialisiert sich auf die Herstellung von Granit-Pflastersteinen verschiedener Größen und Farben, die nach individueller Bestellung entsprechend Ihren Anforderungen gefertigt werden.

Wir sind bereit, mit Ihnen zu besprechen:
• Technische Anforderungen und Spezifikationen
• Verpackungs- und Logistikoptionen
• Preisgestaltung und Zahlungsbedingungen
• Produktionszeiten

Unser Team wird sich in Kürze mit Ihnen in Verbindung setzen, um Ihr Projekt im Detail zu besprechen.

Ihre Ansprechpartnerin:
Yulia - Verkaufsmanagerin
Telefon: +380 96 004 47 44
E-Mail: 7777sov@gmail.com
Verfügbare Messenger: Viber, WhatsApp, Telegram

Mit freundlichen Grüßen,
EuroGranite Team

© 2025 EuroGranite | Europäische Granit-Produkte`
    },
    pl: {
      subject: 'Запит з форми сайту EuroGranite',
      autoReplySubject: 'Dziękujemy za kontakt z EuroGranite',
      autoReplyMessage: `Drogi(-a) {{name}},
Ddziękujemy za zapytanie! Skontaktowałeś(-aś) się z EuroGranite - specjalistami od produktów granitowych.

Nasza firma specjalizuje się w produkcji kostki granitowej różnych rozmiarów i kolorów, wytwarzanej na indywidualne zamówienie zgodnie z Twoimi potrzebami.

Jesteśmy gotowi omówić z Tobą:
• Wymagania techniczne i specyfikacje
• Opcje pakowania i logistyki
• Cennik i warunki płatności
• Terminy produkcji

Nasz zespół skontaktuje się z Tobą wkrótce, aby szczegółowo omówić Twój projekt.

Twoja osoba kontaktowa:
Yulia - Menedżer ds. sprzedaży
Telefon: +380 96 004 47 44
E-mail: 7777sov@gmail.com
Dostępne komunikatory: Viber, WhatsApp, Telegram

Z poważaniem,
Zespół EuroGranite

© 2025 EuroGranite | Europejskie produkty granitowe`
    }
  }

  return templates[language] || templates.en
}

// Send contact email function
export const sendContactEmail = async (formData) => {
  try {
    console.log('Sending contact email with data:', formData)
    
    const { name, email, phone, message, language = 'en' } = formData
    
    if (!name || !email || !message) {
      throw new Error('Missing required fields: name, email, or message')
    }

    const templates = getEmailTemplates(language)

    // Prepare email data for the main notification email (to admin)
    const emailData = {
      to_email: 'sales@euro-granite.com',
      from_name: name,
      from_email: email,
      phone: phone || 'Not provided',
      message: message,
      language_code: language.toUpperCase(),
      subject: 'EuroGranite'
    }

    console.log('Sending main email to admin...')
    // Send main email to admin
    const mainEmailResult = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      emailData,
      EMAILJS_PUBLIC_KEY
    )

    console.log('Main email sent successfully:', mainEmailResult)

    // Prepare auto-reply email data (to customer)
    const autoReplyData = {
      to_email: email,
      to_name: name,
      from_name: 'EuroGranite Team',
      from_email: 'sales@euro-granite.com',
      subject: templates.autoReplySubject,
      message: templates.autoReplyMessage.replace('{{name}}', name),
      language: language
    }

    console.log('Sending auto-reply to:', email)
    // Send auto-reply to customer
    const autoReplyResult = await emailjs.send(
      EMAILJS_SERVICE_ID,
      'template_auto_reply', // Different template for auto-reply
      autoReplyData,
      EMAILJS_PUBLIC_KEY
    )

    console.log('Auto-reply sent successfully:', autoReplyResult)

    return { 
      success: true, 
      message: 'Emails sent successfully',
      mainEmail: mainEmailResult,
      autoReply: autoReplyResult
    }

  } catch (error) {
    console.error('Error sending contact email:', error)
    return { 
      success: false, 
      message: error.message || 'Failed to send email',
      error: error 
    }
  }
}