// Утіліти для роботи з URL в статичному режимі
import { BASE_URL as CONFIG_BASE_URL } from '../config/siteConfig'

// Базовий URL для GitHub Pages
export const BASE_URL = process.env.NODE_ENV === 'development'
  ? ''  // localhost без префіксу
  : ''  // github pages

export const DOMAIN = process.env.NODE_ENV === 'development'
  ? 'http://localhost:3001'
  : CONFIG_BASE_URL

// Створення локалізованого URL без hash
export const createLocalizedPath = (path, targetLang = 'en') => {
  // Очищуємо шлях від початкового слешу
  const cleanPath = path.startsWith('/') ? path.slice(1) : path

  // Всі мови тепер мають свої директорії (включно з en)
  // Це забезпечує консистентну SEO структуру
  return cleanPath
    ? `${BASE_URL}/${targetLang}/${cleanPath}/`
    : `${BASE_URL}/${targetLang}/`
}

// Створення повного URL
export const createFullUrl = (path, targetLang = 'en') => {
  const localPath = createLocalizedPath(path, targetLang)
  return `${DOMAIN}${localPath}`
}

// Отримання поточного шляху з URL
export const getCurrentPath = () => {
  if (typeof window === 'undefined') return '/'

  // Спочатку перевіряємо hash (legacy підтримка)
  if (window.location.hash) {
    return window.location.hash.substring(1)
  }

  // Потім pathname
  return window.location.pathname.replace(BASE_URL, '') || '/'
}

// Навігація без hash
export const navigateToPage = (path, language = 'en') => {
  const newUrl = createLocalizedPath(path, language)

  if (typeof window !== 'undefined') {
    window.location.href = newUrl
  }
}

// Перевірка чи це локальне посилання
export const isInternalLink = (href) => {
  if (!href) return false

  // Локальні посилання
  if (href.startsWith('/') || href.startsWith('./') || href.startsWith('../')) {
    return true
  }

  // Посилання на той же домен
  if (href.includes(DOMAIN)) {
    return true
  }

  return false
}

// Конвертація hash URL в статичний URL
export const convertHashToStatic = (hashUrl) => {
  if (!hashUrl.includes('#')) return hashUrl

  const hashPart = hashUrl.split('#')[1]
  if (!hashPart) return hashUrl

  // Визначаємо мову з hash URL
  const langMatch = hashPart.match(/^\/(ua|en|de|pl)/)
  const lang = langMatch ? langMatch[1] : 'en'

  // Визначаємо шлях
  const pathPart = hashPart.replace(/^\/(ua|en|de|pl)/, '') || '/'

  return createLocalizedPath(pathPart, lang)
}

// Генерація breadcrumbs для SEO
export const generateBreadcrumbs = (path, language) => {
  const parts = path.split('/').filter(Boolean)
  const breadcrumbs = [
    {
      name: language === 'ua' ? 'Головна' : language === 'en' ? 'Home' : language === 'de' ? 'Startseite' : 'Strona główna',
      url: createLocalizedPath('', language)
    }
  ]

  let currentPath = ''
  parts.forEach(part => {
    currentPath += `/${part}`
    breadcrumbs.push({
      name: formatPageName(part, language),
      url: createLocalizedPath(currentPath, language)
    })
  })

  return breadcrumbs
}

// Форматування назви сторінки для breadcrumbs
const formatPageName = (page, language) => {
  const pageNames = {
    ua: {
      products: 'Продукція',
      about: 'Про нас',
      contact: 'Контакти',
      gallery: 'Галерея',
      articles: 'Статті'
    },
    en: {
      products: 'Products',
      about: 'About',
      contact: 'Contact',
      gallery: 'Gallery',
      articles: 'Articles'
    },
    de: {
      products: 'Produkte',
      about: 'Über uns',
      contact: 'Kontakt',
      gallery: 'Galerie',
      articles: 'Artikel'
    },
    pl: {
      products: 'Produkty',
      about: 'O nas',
      contact: 'Kontakt',
      gallery: 'Galeria',
      articles: 'Artykuły'
    }
  }

  return pageNames[language]?.[page] || page
}